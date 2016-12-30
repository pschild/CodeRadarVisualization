import {Block} from '../Block';
import {BlockConnection} from '../BlockConnection';
import {config} from '../Config';
import {AbstractDrawer} from './AbstractDrawer';
import * as PubSub from 'pubsub-js';

export class MergedDrawer extends AbstractDrawer {

    constructor(scene, position, isFullscreen) {
        super(scene, position, isFullscreen);

        this.movedElements = [];
    }

    // override
    drawElements(elements, parent, bottom = 0) {
        if (!Array.isArray(elements)) {
            elements = [elements];
        }

        elements.forEach((element) => {
            var blueHeight;

            // FILE
            if (element.type == 'FILE') {
                var blueHeightMetric = this._getMetricValueOfElementAndCommitType(element, config.HEIGHT_METRIC_NAME, this.COMMIT_TYPE_CURRENT);
                var orangeHeightMetric = this._getMetricValueOfElementAndCommitType(element, config.HEIGHT_METRIC_NAME, this.COMMIT_TYPE_OTHER);

                var blueGroundAreaMetric = this._getMetricValueOfElementAndCommitType(element, config.GROUND_AREA_METRIC_NAME, this.COMMIT_TYPE_CURRENT);
                var orangeGroundAreaMetric = this._getMetricValueOfElementAndCommitType(element, config.GROUND_AREA_METRIC_NAME, this.COMMIT_TYPE_OTHER);

                var blueColorMetric = this._getMetricValueOfElementAndCommitType(element, config.COLOR_METRIC_NAME, this.COMMIT_TYPE_CURRENT);
                var orangeColorMetric = this._getMetricValueOfElementAndCommitType(element, config.COLOR_METRIC_NAME, this.COMMIT_TYPE_OTHER);

                var blueMetrics = {
                    [config.HEIGHT_METRIC_NAME]: blueHeightMetric,
                    [config.GROUND_AREA_METRIC_NAME]: blueGroundAreaMetric,
                    [config.COLOR_METRIC_NAME]: blueColorMetric
                };

                var orangeMetrics = {
                    [config.HEIGHT_METRIC_NAME]: orangeHeightMetric,
                    [config.GROUND_AREA_METRIC_NAME]: orangeGroundAreaMetric,
                    [config.COLOR_METRIC_NAME]: orangeColorMetric
                };

                blueHeight = blueHeightMetric * config.HEIGHT_FACTOR + config.GLOBAL_MIN_HEIGHT;
                var orangeHeight = orangeHeightMetric * config.HEIGHT_FACTOR + config.GLOBAL_MIN_HEIGHT;

                var blueGA = blueGroundAreaMetric * config.GROUND_AREA_FACTOR + config.GLOBAL_MIN_GROUND_AREA + config.BLOCK_SPACING;
                var orangeGA = orangeGroundAreaMetric * config.GROUND_AREA_FACTOR + config.GLOBAL_MIN_GROUND_AREA + config.BLOCK_SPACING;

                var blueColor = this._getColorByPosition(this.position);
                var orangeColor = this._getContraryColorByColor(blueColor);

                var blueTransparency = blueHeight >= orangeHeight && blueGA >= orangeGA;
                var orangeTransparency = orangeHeight >= blueHeight && orangeGA >= blueGA;

                if (!isNaN(blueGA) && !isNaN(orangeGA)) {
                    // both blocks
                    if (blueGA < orangeGA || blueHeight < orangeHeight) {
                        this.drawBlock(element, parent, orangeColor, orangeGA, bottom, orangeHeight, orangeTransparency, orangeMetrics, this.COMMIT_TYPE_OTHER, { modified: true });

                        element.fit.x += (orangeGA - blueGA) / 2;
                        element.fit.y += (orangeGA - blueGA) / 2;
                        this.drawBlock(element, parent, blueColor, blueGA, bottom, blueHeight, blueTransparency, blueMetrics, this.COMMIT_TYPE_CURRENT, { modified: true });
                    } else if (blueGA > orangeGA || blueHeight > orangeHeight) {
                        this.drawBlock(element, parent, blueColor, blueGA, bottom, blueHeight, blueTransparency, blueMetrics, this.COMMIT_TYPE_CURRENT, { modified: true });

                        element.fit.x += (blueGA - orangeGA) / 2;
                        element.fit.y += (blueGA - orangeGA) / 2;
                        this.drawBlock(element, parent, orangeColor, orangeGA, bottom, orangeHeight, orangeTransparency, orangeMetrics, this.COMMIT_TYPE_OTHER, { modified: true });
                    } else {
                        // ground area and height are the same
                        this.drawBlock(element, parent, config.COLOR_UNCHANGED_FILE, orangeGA, bottom, orangeHeight, false, orangeMetrics, undefined, { modified: false });
                    }

                } else if (isNaN(orangeGA)) {
                    // only blue block
                    this.drawBlock(element, parent, config.COLOR_DELETED_FILE, blueGA, bottom, blueHeight, false, blueMetrics, this.COMMIT_TYPE_CURRENT, { deleted: true });

                    // cache element to draw connections
                    if (this._isElementMoved(element)) {
                        this.movedElements.push({
                            fromElementName: element.name,
                            toElementName: element.renamedTo
                        });
                    }

                } else if (isNaN(blueGA)) {
                    // only orange block
                    this.drawBlock(element, parent, config.COLOR_ADDED_FILE, orangeGA, bottom, orangeHeight, false, orangeMetrics, this.COMMIT_TYPE_OTHER, { added: true });
                }

            // MODULE
            } else {
                // don't draw empty modules
                if (this._hasChildrenForCurrentCommit(element)) {
                    blueHeight = config.DEFAULT_BLOCK_HEIGHT;
                    this.drawBlock(element, parent, config.COLOR_MODULE, undefined, bottom, blueHeight);
                }
            }

            // recursion
            if (element.children && element.children.length > 0) {
                this.drawElements(element.children, element, bottom + blueHeight);
            }
        });
    }

    drawBlockConnections() {
        for (let movedElementPair of this.movedElements) {
            var fromElement = this.scene.getObjectByName(movedElementPair.fromElementName);
            var toElement = this.scene.getObjectByName(movedElementPair.toElementName);

            if (fromElement && toElement) {
                this.drawBlockConnection(fromElement, toElement);
            } else {
                console.warn(`A connection could not be drawn because at least one element could not be found in the scene.`);
            }
        }
    }

    // override
    drawBlock(element, parent, color, currentCommitSize, bottom, height, isTransparent, metrics, commitType, changeTypes) {
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
            isHelper: isTransparent,
            changeTypes: changeTypes,
            commitType: commitType
        };

        this.scene.add(cube);
    }

    drawBlockConnection(fromElement, toElement) {
        this.scene.add(new BlockConnection(fromElement, toElement).getCurve());
    }

    // override
    initializeEventListeners() {
        PubSub.subscribe('fileVisibilityChange', (eventName, args) => {
            this._handleFileVisibilityChange(args.type, args.enabled);
        });
    }

    _handleFileVisibilityChange(type, enabled) {
        for (var i = this.scene.children.length - 1; i >= 0; i--) {
            var child = this.scene.children[i];

            if (child.type == 'Mesh' && child.userData.type == 'FILE') {
                if (type == 'UNCHANGED' && child.userData.changeTypes.modified == false) {
                    child.visible = enabled;
                } else if (type == 'CHANGED' && child.userData.changeTypes.modified == true) {
                    child.visible = enabled;
                } else if (type == 'DELETED' && child.userData.changeTypes.deleted == true) {
                    child.visible = enabled;
                } else if (type == 'ADDED' && child.userData.changeTypes.added == true) {
                    child.visible = enabled;
                }
            }
        }
    }

    _isElementMoved(element) {
        return element.renamedTo != null;
    }
}