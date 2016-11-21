import {Block} from '../Block';
import {config} from '../Config';
import {AbstractDrawer} from './AbstractDrawer';
import * as PubSub from 'pubsub-js';

export class SingleDrawer extends AbstractDrawer {

    constructor(scene, currentCommitId, position, minMaxPairOfHeight) {
        super(scene, currentCommitId, position);

        this.minHeight = minMaxPairOfHeight ? minMaxPairOfHeight.min : 0;
        this.maxHeight = minMaxPairOfHeight ? minMaxPairOfHeight.max : 0;
    }

    // override
    drawElements(elements, parent, bottom = 0) {
        elements.forEach((element) => {
            // don't draw empty modules
            if (element.type == 'MODULE' && !this._hasChildrenForCurrentCommit(element)) {
                return;
            }

            var myHeight;
            if (element.type == 'FILE') {
                myHeight = this._getMetricValueOfElementAndCommitType(element, config.HEIGHT_METRIC_NAME, this.COMMIT_TYPE_CURRENT) * config.HEIGHT_FACTOR;

                var myGA = this._getMetricValueOfElementAndCommitType(element, config.GROUND_AREA_METRIC_NAME, this.COMMIT_TYPE_CURRENT) * config.GROUND_AREA_FACTOR + config.BLOCK_SPACING;
                var otherGA = this._getMetricValueOfElementAndCommitType(element, config.GROUND_AREA_METRIC_NAME, this.COMMIT_TYPE_OTHER) * config.GROUND_AREA_FACTOR + config.BLOCK_SPACING;

                var myColor = this._getColorByPosition(this.position);

                if (myGA < otherGA) {
                    element.fit.x += (otherGA - myGA) / 2;
                    element.fit.y += (otherGA - myGA) / 2;
                }
                this.drawBlock(element, parent, myColor, myGA, bottom, myHeight);

            } else {
                myHeight = config.DEFAULT_BLOCK_HEIGHT;
                this.drawBlock(element, parent, config.COLOR_MODULE, undefined, bottom, myHeight);
            }

            // recursion
            if (element.children && element.children.length > 0) {
                this.drawElements(element.children, element, bottom + myHeight);
            }
        });
    }

    // override
    drawBlock(element, parent, color, currentCommitSize, bottom, height, isTransparent) {
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
            // TODO: add all metrics and change quality to new metric
            metrics: {
                quality: finalHeight
            },
            type: element.type,
            tooltipLabel: element.name + '<br>height=' + finalHeight + '<br>size=' + finalWidth + 'x' + finalDepth,
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
        var mid = (this.maxHeight * config.HEIGHT_FACTOR + this.minHeight * config.HEIGHT_FACTOR) / 2;
        var blue = 0;
        var red, green;

        if (value <= mid) {
            // green to yellow
            red = Math.floor(255 * (value / mid));
            green = 255;

        } else {
            // yellow to red
            red = 255;
            green = Math.floor(255 * ((mid - (value - 1) % mid) / mid));
        }

        return new THREE.Color('rgb(' + red + ',' + green + ',' + blue + ')');
    }

    _handleColorcodeChanged(newColorcode) {
        for (var i = this.scene.children.length - 1; i >= 0; i--) {
            var child = this.scene.children[i];

            if (child.type == 'Mesh' && child.userData.type == 'FILE') {
                if (newColorcode == 'commit') {
                    child.material.color.set(this._getColorByPosition(this.position));
                } else if (newColorcode == 'metric') {
                    child.material.color.set(this._getColorByMetricValue(child.userData.metrics.quality));
                }
            }
        }
    }

}