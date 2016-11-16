import {Block} from './Block';
import {config} from './Config';
import {ElementAnalyzer} from './ElementAnalyzer';

const COMMIT_TYPE_CURRENT = 'current';
const COMMIT_TYPE_OTHER = 'other';

export class Drawer {

    constructor(scene, currentCommitId, minMaxPairOfHeight) {
        this.scene = scene;
        this.currentCommitId = currentCommitId;
        this.minHeight = minMaxPairOfHeight ? minMaxPairOfHeight.min : 0;
        this.maxHeight = minMaxPairOfHeight ? minMaxPairOfHeight.max : 0;
        this.packer = this._getPacker();
    }

    calculateGroundAreas(elements) {
        elements.forEach((element) => {
            element.w = 0;
            element.h = 0;

            if (element.type == 'FILE') {
                var greatestMetricValueForGroundArea = ElementAnalyzer.getMaxMetricValueByMetricName(element.metricValues, config.GROUND_AREA_METRIC_NAME);
                element.w = greatestMetricValueForGroundArea * config.GROUND_AREA_FACTOR + config.BLOCK_SPACING;
                element.h = greatestMetricValueForGroundArea * config.GROUND_AREA_FACTOR + config.BLOCK_SPACING;
            }

            if (element.children && element.children.length > 0) {
                var result = this.calculateGroundAreas(element.children);
                element.w = result.w + config.BLOCK_SPACING * 3;
                element.h = result.h + config.BLOCK_SPACING * 3;
            }
        });

        elements.sort(function (a, b) {
            return (b.w > a.w);
        });

        this.packer.fit(elements);
        return {
            packer: this.packer.root,
            w: this.packer.root.w,
            h: this.packer.root.h
        };
    }

    _getPacker() {
        return new GrowingPacker();
    }

    drawElements(elements, parent, bottom = 0) {
        elements.forEach((element) => {
            // don't draw empty modules
            if (element.type == 'MODULE' && !this._hasChildrenForCurrentCommit(element)) {
                return;
            }

            var height, color;
            if (element.type == 'FILE') {
                height = this._getMetricValueOfElementAndCommitType(element, config.HEIGHT_METRIC_NAME, COMMIT_TYPE_CURRENT) * config.HEIGHT_FACTOR;
                color = this._getColor(height);
            } else {
                height = config.DEFAULT_BLOCK_HEIGHT;
                color = '#cccccc';
            }

            var greatestSize = element.w;
            var currentCommitSize = this._getMetricValueOfElementAndCommitType(element, config.GROUND_AREA_METRIC_NAME, COMMIT_TYPE_CURRENT) * config.GROUND_AREA_FACTOR + config.BLOCK_SPACING;

            var helperBlockDrawn = false;
            if (!isNaN(currentCommitSize) && greatestSize != currentCommitSize) {
                // draw a helper cube
                this.drawBlock(element, parent, color, currentCommitSize, bottom, height, true, greatestSize);
                helperBlockDrawn = true;
            }

            if (helperBlockDrawn) {
                console.log('helperBlock was drawn', element.name);
                // element.fit.x += (greatestSize - element.w) / 2;
                // element.fit.y += (greatestSize - element.h) / 2;
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
        finalX = element.fit.x + (parent ? parent.renderedX : 0) + config.BLOCK_SPACING;
        finalY = bottom;
        finalZ = element.fit.y + (parent ? parent.renderedY : 0) + config.BLOCK_SPACING;

        // save the rendered positions to draw children relative to their parent
        element.renderedX = finalX;
        element.renderedY = finalZ;

        if (isHelper) {
            finalWidth = helperSize - config.BLOCK_SPACING;
            finalHeight = this._getMetricValueOfElementAndCommitType(element, config.HEIGHT_METRIC_NAME, COMMIT_TYPE_OTHER) * config.HEIGHT_FACTOR;
            finalDepth = helperSize - config.BLOCK_SPACING;

            // cube.material.wireframe = true;
            cube.material.transparent = true;
            cube.material.opacity = 0.4;
            cube.material.color = new THREE.Color('#ffff00');
            cube.visible = !isHelper || config.HELPER_BLOCK_VISIBLE;
        } else {
            finalWidth = element.type == 'FILE' ? currentCommitSize - config.BLOCK_SPACING : element.w - config.BLOCK_SPACING * 2;
            finalHeight = height;
            finalDepth = element.type == 'FILE' ? currentCommitSize - config.BLOCK_SPACING : element.h - config.BLOCK_SPACING * 2;
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

    _getColor(value) {
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

    _hasChildrenForCurrentCommit(element) {
        var found = false;

        for (let child of element.children) {
            if (this._hasMetricValuesForCurrentCommit(child)) {
                found = true;
            }

            if (child.children && child.children.length > 0 && !found) {
                found = this._hasChildrenForCurrentCommit(child);
            }
        }

        return found;
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

    _getMetricValueOfElementAndCommitType(element, metricName, commitType) {
        for (let key in element.metricValues) {
            if (typeof element.metricValues[key] == 'object') {
                var metricValue = element.metricValues[metricName];
                if (!metricValue) {
                    throw new Error(metricName + ' was not found in metricValues ' + JSON.stringify(element.metricValues));
                }

                for (let commitKey in metricValue) {
                    if (commitType == COMMIT_TYPE_OTHER && commitKey != this.currentCommitId) {
                        return metricValue[commitKey];
                    } else if (commitType == COMMIT_TYPE_CURRENT && commitKey == this.currentCommitId) {
                        return metricValue[commitKey];
                    }
                }

                console.info('no matching metricValue found for commitType ' + commitType);
            } else {
                throw new Error('metricValues must be an object. current value: ' + (typeof element.metricValues[key]));
            }
        }
    }
}