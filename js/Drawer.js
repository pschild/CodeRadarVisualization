const BLOCK_SPACING = 200;
const DEFAULT_BLOCK_HEIGHT = 200;
const DEFAULT_BLOCK_DIMENSIONS = 100;
const HELPER_BLOCK_HEIGHT = 100;

const GROUND_AREA_METRIC_NAME = 'coderadar:javaMoc';
const GROUND_AREA_FACTOR = 10;

const HEIGHT_METRIC_NAME = 'coderadar:javaLoc';
const HEIGHT_FACTOR = 10;

import {Block} from './Block';

export class Drawer {

    constructor(application) {
        this.application = application;
        this.currentCommitId = application.getCurrentCommitId();
    }

    calculateGroundAreas(elements) {
        elements.forEach((element) => {
            element.w = 0;
            element.h = 0;

            if (element.type == 'FILE') {
                var greatestMetricValueForGroundArea = this._getGreatestMetricValueForGroundArea(element.metricValues);
                element.w = greatestMetricValueForGroundArea * GROUND_AREA_FACTOR;
                element.h = greatestMetricValueForGroundArea * GROUND_AREA_FACTOR;
            }

            if (element.children && element.children.length > 0) {
                var result = this.calculateGroundAreas(element.children);
                element.w = result.w;
                element.h = result.h;
            }
        });

        var packer = new GrowingPacker();

        elements.sort(function (a, b) {
            return (b.w > a.w);
        });

        packer.fit(elements);
        return {
            packer: packer.root,
            w: packer.root.w,
            h: packer.root.h
        };
    }

    drawElements(elements, parent, bottom = 0) {
        elements.forEach((element) => {
            // don't drawElements empty modules
            if (element.type == 'MODULE' && (!element.children || element.children.length == 0)) {
                return;
            }

            var height, color;
            if (element.type == 'FILE') {
                color = '#00cc00';
                height = this._getMetricValueOfElementAndCurrentCommit(element, HEIGHT_METRIC_NAME, this.currentCommitId) * HEIGHT_FACTOR;
            } else {
                color = '#cccccc';
                height = DEFAULT_BLOCK_HEIGHT;
            }

            var greatestSize = element.w;
            var currentCommitSize = this._getMetricValueOfElementAndCurrentCommit(element, GROUND_AREA_METRIC_NAME, this.currentCommitId) * GROUND_AREA_FACTOR;

            if (!isNaN(currentCommitSize) && greatestSize != currentCommitSize) {
                // drawElements a helper cube
                this.drawBlock(element, parent, color, currentCommitSize, bottom, height, true, greatestSize);
            }

            this.drawBlock(element, parent, color, currentCommitSize, bottom, height);

            if (element.children && element.children.length > 0) {
                this.drawElements(element.children, element, bottom + height);
            }
        });
    }

    drawBlock(element, parent, color, currentCommitSize, bottom, height, isHelper, helperSize) {
        var cube = new Block(color, isHelper ? 'HELPER' : element.name);
        cube.position.x = element.fit.x + (parent ? parent.fit.x : 0);
        cube.position.y = bottom;
        cube.position.z = element.fit.y + (parent ? parent.fit.y : 0);

        if (isHelper) {
            cube.scale.x = helperSize - BLOCK_SPACING;
            cube.scale.y = HELPER_BLOCK_HEIGHT;
            cube.scale.z = helperSize - BLOCK_SPACING;
        } else {
            cube.scale.x = element.type == 'FILE' ? currentCommitSize - BLOCK_SPACING : element.w - BLOCK_SPACING;
            cube.scale.y = height;
            cube.scale.z = element.type == 'FILE' ? currentCommitSize - BLOCK_SPACING : element.w - BLOCK_SPACING;
        }

        cube.material.wireframe = isHelper;

        this.application.getScene().add(cube);
    }

    _getGreatestMetricValueForGroundArea(metricValues) {
        if (typeof metricValues != 'object') {
            throw 'metricValues is not an object!';
        }

        for (let key in metricValues) {
            if (typeof metricValues[key] == 'object') {
                if (key == GROUND_AREA_METRIC_NAME) {
                    let maxValue = -1;
                    for (let commitId in metricValues[key]) {
                        var metricValue = metricValues[key][commitId];
                        if (maxValue < metricValue) {
                            maxValue = metricValue;
                        }
                    }
                    return maxValue;
                }
            } else if (typeof metricValues[key] == 'number') {
                if (key == GROUND_AREA_METRIC_NAME) {
                    return metricValues[key];
                }
            } else {
                throw 'unknown type!';
            }
        }
    }

    _getMetricValueOfElementAndCurrentCommit(element, metricName, commitId) {
        for (let key in element.metricValues) {
            if (typeof element.metricValues[key] == 'object') {
                return element.metricValues[metricName][commitId];
            } else if (typeof element.metricValues[key] == 'number') {
                if (key == metricName) {
                    return element.metricValues[key];
                }
            } else {
                throw 'unknown type!';
            }
        }
    }
}