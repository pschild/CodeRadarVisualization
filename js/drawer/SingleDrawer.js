import {Block} from '../Block';
import {config} from '../Config';
import {AbstractDrawer} from './AbstractDrawer';
import * as chroma from 'chroma-js/chroma';
import * as PubSub from 'pubsub-js';

export class SingleDrawer extends AbstractDrawer {

    constructor(scene, position, isFullscreen, minMaxPairOfColorMetric) {
        super(scene, position, isFullscreen);

        this.minColorMetricValue = minMaxPairOfColorMetric ? minMaxPairOfColorMetric.min : 0;
        this.maxColorMetricValue = minMaxPairOfColorMetric ? minMaxPairOfColorMetric.max : 0;
    }

    // override
    drawElements(elements, parent, bottom = 0) {
        if (!Array.isArray(elements)) {
            elements = [elements];
        }

        elements.forEach((element) => {
            // don't draw empty modules
            if (element.type == 'MODULE' && !this._hasChildrenForCurrentCommit(element)) {
                return;
            }

            if (!element.fit) {
                console.warn(`element ${element.name} at position ${this.position} has no fit!`);
                return;
            }

            var heightMetric = this._getMetricValueOfElementAndCommitType(element, config.HEIGHT_METRIC_NAME, this.COMMIT_TYPE_CURRENT);
            var groundAreaMetric = this._getMetricValueOfElementAndCommitType(element, config.GROUND_AREA_METRIC_NAME, this.COMMIT_TYPE_CURRENT);
            var colorMetric = this._getMetricValueOfElementAndCommitType(element, config.COLOR_METRIC_NAME, this.COMMIT_TYPE_CURRENT);

            var metrics = {
                [config.HEIGHT_METRIC_NAME]: heightMetric,
                [config.GROUND_AREA_METRIC_NAME]: groundAreaMetric,
                [config.COLOR_METRIC_NAME]: colorMetric
            };

            var myHeight;
            if (element.type == 'FILE') {
                if (!heightMetric || !groundAreaMetric) {
                    return;
                }

                myHeight = heightMetric * config.HEIGHT_FACTOR + config.GLOBAL_MIN_HEIGHT;

                var myGA = groundAreaMetric * config.GROUND_AREA_FACTOR + config.GLOBAL_MIN_GROUND_AREA + config.BLOCK_SPACING;
                var otherGA = this._getMetricValueOfElementAndCommitType(element, config.GROUND_AREA_METRIC_NAME, this.COMMIT_TYPE_OTHER) * config.GROUND_AREA_FACTOR + config.GLOBAL_MIN_GROUND_AREA + config.BLOCK_SPACING;

                var myColor = this._getColorByPosition(this.position);

                if (myGA < otherGA) {
                    element.fit.x += (otherGA - myGA) / 2;
                    element.fit.y += (otherGA - myGA) / 2;
                }
                this.drawBlock(element, parent, myColor, myGA, bottom, myHeight, false, metrics);

            } else {
                myHeight = config.DEFAULT_BLOCK_HEIGHT;
                this.drawBlock(element, parent, config.COLOR_MODULE, undefined, bottom, myHeight, false, metrics);
            }

            // recursion
            if (element.children && element.children.length > 0) {
                this.drawElements(element.children, element, bottom + myHeight);
            }
        });
    }

    // override
    drawBlock(element, parent, color, currentCommitSize, bottom, height, isTransparent, metrics) {
        var finalX, finalY, finalZ;
        var finalWidth, finalHeight, finalDepth;

        var cube = new Block(color, element.name);
        finalX = element.fit.x + (parent ? parent.renderedX : 0) + config.BLOCK_SPACING;
        finalY = bottom;
        finalZ = element.fit.y + (parent ? parent.renderedY : 0) + config.BLOCK_SPACING;

        // save the rendered positions to draw children relative to their parent
        element.renderedX = finalX;
        element.renderedY = finalZ;

        finalWidth = element.type == 'FILE' ? currentCommitSize - config.BLOCK_SPACING : element.w - config.BLOCK_SPACING * 2;
        finalHeight = height;
        finalDepth = element.type == 'FILE' ? currentCommitSize - config.BLOCK_SPACING : element.h - config.BLOCK_SPACING * 2;

        if (isTransparent) {
            cube.material.transparent = true;
            cube.material.opacity = 0.4;
        }

        cube.position.x = finalX;
        cube.position.y = finalY;
        cube.position.z = finalZ;

        cube.scale.x = finalWidth;
        cube.scale.y = finalHeight;
        cube.scale.z = finalDepth;

        cube.userData = {
            metrics: metrics,
            type: element.type,
            tooltipLabel: this._generateTooltipHtml(element.name, metrics),
            isHelper: isTransparent
        };

        this.scene.add(cube);
    }

    // override
    initializeEventListeners() {
        PubSub.subscribe('colorcodeChange', (eventName, args) => {
            this._handleColorcodeChanged(args.colorcode);
        });
    }

    _getColorByMetricValue(value) {
        var colorScale = chroma.scale(['#ffffff','#ffc905','#f78400','#e92100','#9b1909','#4f1609','#5d0000']);
        var hexValue = colorScale(value / (this.maxColorMetricValue + this.minColorMetricValue)).hex();
        return new THREE.Color(hexValue);
    }

    _handleColorcodeChanged(newColorcode) {
        for (var i = this.scene.children.length - 1; i >= 0; i--) {
            var child = this.scene.children[i];

            if (child.type == 'Mesh' && child.userData.type == 'FILE') {
                if (newColorcode == 'commit') {
                    child.material.color.set(this._getColorByPosition(this.position));
                } else if (newColorcode == 'metric') {
                    child.material.color.set(this._getColorByMetricValue(child.userData.metrics[config.COLOR_METRIC_NAME]));
                }
            }
        }
    }

}