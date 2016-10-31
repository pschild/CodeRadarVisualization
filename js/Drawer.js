import {Block} from './Block';
import {config} from './Config';

export class Drawer {

    constructor(scene, currentCommitId) {
        this.scene = scene;
        this.currentCommitId = currentCommitId;
    }

    calculateGroundAreas(elements) {
        elements.forEach((element) => {
            element.w = 0;
            element.h = 0;

            if (element.type == 'FILE') {
                var greatestMetricValueForGroundArea = this._getGreatestMetricValueForGroundArea(element.metricValues);
                element.w = greatestMetricValueForGroundArea * config.GROUND_AREA_FACTOR;
                element.h = greatestMetricValueForGroundArea * config.GROUND_AREA_FACTOR;
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
                height = this._getMetricValueOfElementAndCurrentCommit(element, config.HEIGHT_METRIC_NAME, this.currentCommitId) * config.HEIGHT_FACTOR;
            } else {
                color = '#cccccc';
                height = config.DEFAULT_BLOCK_HEIGHT;
            }

            var greatestSize = element.w;
            var currentCommitSize = this._getMetricValueOfElementAndCurrentCommit(element, config.GROUND_AREA_METRIC_NAME, this.currentCommitId) * config.GROUND_AREA_FACTOR;

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
        var finalX, finalY, finalZ;
        var finalWidth, finalHeight, finalDepth;

        var cube = new Block(color, isHelper ? 'HELPER' : element.name);
        finalX = element.fit.x + (parent ? parent.fit.x : 0);
        finalY = bottom;
        finalZ = element.fit.y + (parent ? parent.fit.y : 0);

        if (isHelper) {
            finalWidth = helperSize - config.BLOCK_SPACING;
            finalHeight = config.HELPER_BLOCK_HEIGHT;
            finalDepth = helperSize - config.BLOCK_SPACING;
        } else {
            finalWidth = element.type == 'FILE' ? currentCommitSize - config.BLOCK_SPACING : element.w - config.BLOCK_SPACING;
            finalHeight = height;
            finalDepth = element.type == 'FILE' ? currentCommitSize - config.BLOCK_SPACING : element.h - config.BLOCK_SPACING;
        }

        cube.position.x = finalX;
        cube.position.y = finalY;
        cube.position.z = finalZ;

        cube.scale.x = finalWidth;
        cube.scale.y = finalHeight;
        cube.scale.z = finalDepth;

        cube.material.wireframe = isHelper;
        cube.visible = !isHelper || config.HELPER_BLOCK_VISIBLE;

        cube.userData = {
            tooltipLabel: element.name + '<br>height=' + finalHeight + '<br>size=' + finalWidth + 'x' + finalDepth
        };

        this.scene.add(cube);
    }

    _getGreatestMetricValueForGroundArea(metricValues) {
        if (typeof metricValues != 'object') {
            throw 'metricValues is not an object!';
        }

        for (let key in metricValues) {
            if (typeof metricValues[key] == 'object') {
                if (key == config.GROUND_AREA_METRIC_NAME) {
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
                if (key == config.GROUND_AREA_METRIC_NAME) {
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