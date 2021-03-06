import {Block} from '../shape/Block';
import {BlockConnection} from '../shape/BlockConnection';
import {config} from '../Config';
import * as Constants from '../Constants';
import {AbstractDrawer} from './AbstractDrawer';
import {ElementAnalyzer} from '../util/ElementAnalyzer';
import {ColorHelper} from '../util/ColorHelper';

export class MergedDrawer extends AbstractDrawer {

    constructor(scene, position) {
        super(scene, position);

        this.movedElements = [];
    }

    // override
    drawElements(elements, parent, bottom = 0) {
        if (!Array.isArray(elements)) {
            elements = [elements];
        }

        elements.forEach((element) => {
            if (!element.fit) {
                console.warn(`element ${element.name} at position ${this.position} has no fit!`);
                return;
            }

            var blueHeight;

            // FILE
            if (element.type == Constants.ELEMENT_TYPE_FILE) {
                var blueHeightMetric = ElementAnalyzer.getMetricValueOfElementAndCommitType(element, config.HEIGHT_METRIC_NAME, Constants.COMMIT_TYPE_CURRENT, this.position);
                var orangeHeightMetric = ElementAnalyzer.getMetricValueOfElementAndCommitType(element, config.HEIGHT_METRIC_NAME, Constants.COMMIT_TYPE_OTHER, this.position);

                var blueGroundAreaMetric = ElementAnalyzer.getMetricValueOfElementAndCommitType(element, config.GROUND_AREA_METRIC_NAME, Constants.COMMIT_TYPE_CURRENT, this.position);
                var orangeGroundAreaMetric = ElementAnalyzer.getMetricValueOfElementAndCommitType(element, config.GROUND_AREA_METRIC_NAME, Constants.COMMIT_TYPE_OTHER, this.position);

                var blueColorMetric = ElementAnalyzer.getMetricValueOfElementAndCommitType(element, config.COLOR_METRIC_NAME, Constants.COMMIT_TYPE_CURRENT, this.position);
                var orangeColorMetric = ElementAnalyzer.getMetricValueOfElementAndCommitType(element, config.COLOR_METRIC_NAME, Constants.COMMIT_TYPE_OTHER, this.position);

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

                var blueColor = ColorHelper.getColorByPosition(this.position);
                var orangeColor = ColorHelper.getContraryColorByColor(blueColor);

                var blueTransparency = blueHeight >= orangeHeight && blueGA >= orangeGA;
                var orangeTransparency = orangeHeight >= blueHeight && orangeGA >= blueGA;

                if (!isNaN(blueGA) && !isNaN(orangeGA)) {
                    // both blocks
                    if (blueGA < orangeGA) {
                        // draw the bigger block ...
                        this.drawBlock(element, parent, orangeColor, orangeGA, bottom, orangeHeight, orangeTransparency, orangeMetrics, Constants.COMMIT_TYPE_OTHER, { modified: true });

                        // ... calculate the center position for the smaller block ...
                        element.fit.x += (orangeGA - blueGA) / 2;
                        element.fit.y += (orangeGA - blueGA) / 2;

                        // ... draw the smaller block
                        this.drawBlock(element, parent, blueColor, blueGA, bottom, blueHeight, blueTransparency, blueMetrics, Constants.COMMIT_TYPE_CURRENT, { modified: true });
                    } else if (blueGA > orangeGA) {
                        // draw the bigger block ...
                        this.drawBlock(element, parent, blueColor, blueGA, bottom, blueHeight, blueTransparency, blueMetrics, Constants.COMMIT_TYPE_CURRENT, { modified: true });

                        // ... calculate the center position for the smaller block ...
                        element.fit.x += (blueGA - orangeGA) / 2;
                        element.fit.y += (blueGA - orangeGA) / 2;

                        // ... draw the smaller block
                        this.drawBlock(element, parent, orangeColor, orangeGA, bottom, orangeHeight, orangeTransparency, orangeMetrics, Constants.COMMIT_TYPE_OTHER, { modified: true });
                    } else {
                        // ground areas are the same
                        if (blueHeight != orangeHeight) {
                            // heights are different, so draw both blocks
                            this.drawBlock(element, parent, blueColor, blueGA, bottom, blueHeight, blueTransparency, blueMetrics, Constants.COMMIT_TYPE_CURRENT, { modified: true });
                            this.drawBlock(element, parent, orangeColor, orangeGA, bottom, orangeHeight, orangeTransparency, orangeMetrics, Constants.COMMIT_TYPE_OTHER, { modified: true });
                        } else {
                            // heights are the same, so the file has not changed
                            this.drawBlock(element, parent, config.COLOR_UNCHANGED_FILE, orangeGA, bottom, orangeHeight, false, orangeMetrics, undefined, { modified: false });
                        }
                    }

                } else if (isNaN(orangeGA)) {
                    // only blue block

                    var changeTypes = { deleted: true };
                    // cache element to draw connections
                    if (this._isElementMoved(element)) {
                        this.movedElements.push({
                            fromElementName: element.name,
                            toElementName: element.renamedTo
                        });

                        changeTypes.moved = true;
                    }

                    this.drawBlock(element, parent, config.COLOR_DELETED_FILE, blueGA, bottom, blueHeight, false, blueMetrics, Constants.COMMIT_TYPE_CURRENT, changeTypes);

                } else if (isNaN(blueGA)) {
                    // only orange block

                    var changeTypes = { added: true };
                    if (this._isElementMoved(element)) {
                        changeTypes.moved = true;
                    }

                    this.drawBlock(element, parent, config.COLOR_ADDED_FILE, orangeGA, bottom, orangeHeight, false, orangeMetrics, Constants.COMMIT_TYPE_OTHER, changeTypes);
                }

            // MODULE
            } else {
                // don't draw empty modules
                if (ElementAnalyzer.hasChildrenForCurrentCommit(element, true, this.position)) {
                    if (bottom > this.maxBottomValue) {
                        this.maxBottomValue = bottom;
                    }

                    blueHeight = config.DEFAULT_BLOCK_HEIGHT;
                    this.drawBlock(element, parent, config.COLOR_HIERARCHY_RANGE[0], undefined, bottom, blueHeight, false);
                }
            }

            // recursion
            if (element.children && element.children.length > 0) {
                this.drawElements(element.children, element, bottom + blueHeight);
            }
        });
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

        finalWidth = element.type == Constants.ELEMENT_TYPE_FILE ? currentCommitSize - config.BLOCK_SPACING : element.w - config.BLOCK_SPACING * 2;
        finalHeight = height;
        finalDepth = element.type == Constants.ELEMENT_TYPE_FILE ? currentCommitSize - config.BLOCK_SPACING : element.h - config.BLOCK_SPACING * 2;

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
            parentName: parent ? parent.name : undefined,
            bottom: bottom,
            metrics: metrics,
            type: element.type,
            tooltipLabel: this._generateTooltipHtml(element.name, metrics),
            isHelper: isTransparent,
            changeTypes: changeTypes,
            commitType: commitType
        };

        this.scene.add(cube);
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

    drawBlockConnection(fromElement, toElement) {
        this.scene.add(new BlockConnection(fromElement, toElement).getCurve());
    }

    _isElementMoved(element) {
        return element.renamedTo != null || element.renamedFrom != null;
    }
}