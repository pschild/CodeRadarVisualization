import {config} from '../Config';
import {ElementAnalyzer} from '../ElementAnalyzer';

export class AbstractDrawer {

    constructor(scene, currentCommitId, position) {
        if (new.target === AbstractDrawer) {
            throw new TypeError('Instantiating AbstractDrawer not allowed.');
        }

        this.COMMIT_TYPE_OTHER = 'other';
        this.COMMIT_TYPE_CURRENT = 'current';

        this.scene = scene;
        this.currentCommitId = currentCommitId;
        this.position = position;
        this.packer = this._getPacker();

        this.initializeEventListeners();
    }

    calculateGroundAreas(elements) {
        if (!Array.isArray(elements)) {
            elements = [elements];
        }

        for (let element of elements) {
            element.w = 0;
            element.h = 0;

            if (element.type == 'FILE') {
                var groundArea = this._getValueForGroundArea(element.metricValues);
                element.w = groundArea * config.GROUND_AREA_FACTOR + config.GLOBAL_MIN_GROUND_AREA + config.BLOCK_SPACING;
                element.h = groundArea * config.GROUND_AREA_FACTOR + config.GLOBAL_MIN_GROUND_AREA + config.BLOCK_SPACING;
            }

            if (element.children && element.children.length > 0) {
                var result = this.calculateGroundAreas(element.children);
                element.w = result.w + config.BLOCK_SPACING * 3;
                element.h = result.h + config.BLOCK_SPACING * 3;
            }
        }

        elements.sort(function (a, b) {
            return b.w - a.w;
        });

        this.packer.fit(elements);
        return {
            packer: this.packer.root,
            w: this.packer.root.w,
            h: this.packer.root.h
        };
    }

    _getValueForGroundArea(metricValues) {
        return ElementAnalyzer.getMaxMetricValueByMetricName(metricValues, config.GROUND_AREA_METRIC_NAME);
    }

    drawElements(elements, parent, bottom = 0) {}

    drawBlock(element, parent, color, currentCommitSize, bottom, height, isTransparent) {}

    initializeEventListeners() {}

    _generateTooltipHtml(elementName, metrics) {
        var tooltipHtml = [
            '<div class="element-name">' + elementName + '</div>'
        ];

        if (metrics) {
            for (let key of Object.keys(metrics)) {
                tooltipHtml.push('<div>' + key + ': ' + metrics[key] + '</div>');
            }
        }

        return tooltipHtml.join('');
    }

    _getPacker() {
        return new GrowingPacker();
    }

    _getColorByPosition(position) {
        return position == 'left' ? config.COLOR_FIRST_COMMIT : config.COLOR_SECOND_COMMIT;
    }

    _getContraryColorByColor(color) {
        return color == config.COLOR_FIRST_COMMIT ? config.COLOR_SECOND_COMMIT : config.COLOR_FIRST_COMMIT;
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
                    if (commitType == this.COMMIT_TYPE_OTHER && commitKey != this.currentCommitId) {
                        return metricValue[commitKey];
                    } else if (commitType == this.COMMIT_TYPE_CURRENT && commitKey == this.currentCommitId) {
                        return metricValue[commitKey];
                    }
                }

                // console.info('no matching metricValue found for commitType ' + commitType);
            } else {
                throw new Error('metricValues must be an object. current value: ' + (typeof element.metricValues[key]));
            }
        }
    }


}