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
            // don't draw empty modules
            if (element.type == 'MODULE' && !this._hasChildrenForCurrentCommit(element)) {
                return;
            }

            var height, color;
            if (element.type == 'FILE') {
                color = '#00cc00';
                height = this._getMetricValueOfElementAndCurrentCommit(element, config.HEIGHT_METRIC_NAME) * config.HEIGHT_FACTOR;
            } else {
                color = '#cccccc';
                height = config.DEFAULT_BLOCK_HEIGHT;
            }

            var greatestSize = element.w;
            var currentCommitSize = this._getMetricValueOfElementAndCurrentCommit(element, config.GROUND_AREA_METRIC_NAME) * config.GROUND_AREA_FACTOR;

            if (!isNaN(currentCommitSize) && greatestSize != currentCommitSize) {
                // draw a helper cube
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
        finalX = element.fit.x + (parent ? parent.renderedX : 0);
        finalY = bottom;
        finalZ = element.fit.y + (parent ? parent.renderedY : 0);

        // save the rendered positions to draw children relative to their parent
        element.renderedX = finalX;
        element.renderedY = finalZ;

        if (isHelper) {
            finalWidth = helperSize - config.BLOCK_SPACING;
            finalHeight = this._getMetricValueOfElementAndOtherCommit(element, config.HEIGHT_METRIC_NAME) * config.HEIGHT_FACTOR;
            finalDepth = helperSize - config.BLOCK_SPACING;

            // cube.material.wireframe = true;
            cube.material.transparent = true;
            cube.material.opacity = 0.4;
            cube.material.color = new THREE.Color('#ffff00');
            cube.visible = !isHelper || config.HELPER_BLOCK_VISIBLE;
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

        cube.userData = {
            tooltipLabel: element.name + '<br>height=' + finalHeight + '<br>size=' + finalWidth + 'x' + finalDepth,
            isHelper: isHelper
        };

        this.scene.add(cube);
    }

    _getGreatestMetricValueForGroundArea(metricValues) {
        if (typeof metricValues != 'object' || metricValues == null) {
            throw new Error('metricValues is not an object or null!');
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
            } else {
                throw new Error('wrong type ' + typeof metricValues[key] + '!');
            }
        }
    }

    _hasChildrenForCurrentCommit(element) {
        if (!element.children || element.children.length == 0) {
            return false;
        }

        for (let child of element.children) {
            if (this._hasMetricValuesForCurrentCommit(child)) {
                return true;
            }

            if (child.children && child.children.length > 0) {
                return this._hasChildrenForCurrentCommit(child);
            }
        }

        return false;
    }

    _hasMetricValuesForCurrentCommit(element) {
        for (let key in element.metricValues) {
            if (typeof element.metricValues[key] == 'object') {
                if (Object.keys(element.metricValues[key]).indexOf(this.currentCommitId) >= 0) {
                    return true;
                }

                return false;
            } else {
                throw new Error('metricValues must be an object. current value: ' + (typeof element.metricValues[key]));
            }
        }
    }

    _getMetricValueOfElementAndCurrentCommit(element, metricName) {
        for (let key in element.metricValues) {
            if (typeof element.metricValues[key] == 'object') {
                if (!element.metricValues[metricName]) {
                    throw new Error(metricName + ' was not found in metricValues ' + JSON.stringify(element.metricValues));
                }
                return element.metricValues[metricName][this.currentCommitId];
            } else {
                throw new Error('metricValues must be an object. current value: ' + (typeof element.metricValues[key]));
            }
        }
    }

    _getMetricValueOfElementAndOtherCommit(element, metricName) {
        for (let key in element.metricValues) {
            if (typeof element.metricValues[key] == 'object') {
                var metricValue = element.metricValues[metricName];
                if (!metricValue) {
                    throw new Error(metricName + ' was not found in metricValues ' + JSON.stringify(element.metricValues));
                }

                for (let commitKey in metricValue) {
                    if (commitKey != this.currentCommitId) {
                        return metricValue[commitKey];
                    }
                }

                throw new Error('other commit id not found');
            } else {
                throw new Error('metricValues must be an object. current value: ' + (typeof element.metricValues[key]));
            }
        }
    }
}