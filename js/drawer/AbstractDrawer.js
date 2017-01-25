import {config} from '../Config';
import {ElementAnalyzer} from '../ElementAnalyzer';
import {MetricNameService} from '../service/MetricNameService';
import * as chroma from 'chroma-js/chroma';

export class AbstractDrawer {

    constructor(scene, position, isFullscreen) {
        if (new.target === AbstractDrawer) {
            throw new TypeError('Instantiating AbstractDrawer not allowed.');
        }

        this.COMMIT_TYPE_OTHER = 'other';
        this.COMMIT_TYPE_CURRENT = 'current';

        this.minBottomValue = 0;
        this.maxBottomValue = -1;

        this.scene = scene;
        this.position = position;
        this.isFullscreen = isFullscreen;
        this.packer = this._getPacker();

        this.metricNameService = new MetricNameService();

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
                var groundArea = this._getValueForGroundArea(element.commit1Metrics, element.commit2Metrics);
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

    _getValueForGroundArea(commit1Metrics, commit2Metrics) {
        return ElementAnalyzer.getMaxMetricValueByMetricName(commit1Metrics, commit2Metrics, config.GROUND_AREA_METRIC_NAME);
    }

    drawElements(elements, parent, bottom = 0) {}

    drawBlock(element, parent, color, currentCommitSize, bottom, height, isTransparent) {}

    colorizeModules() {
        for (var i = this.scene.children.length - 1; i >= 0; i--) {
            var child = this.scene.children[i];

            if (child.userData && child.userData.type == 'MODULE') {
                child.material.color.set(this._getColorByBottomValue(child.userData.bottom));
            }
        }
    }

    _getColorByBottomValue(value) {
        var colorScale = chroma.scale([config.COLOR_MODULE_FROM, config.COLOR_MODULE_TO]);
        var hexValue = colorScale(value / (this.maxBottomValue + this.minBottomValue)).hex();
        return new THREE.Color(hexValue);
    }

    setColorization(colorMode) {}

    initializeEventListeners() {}

    _generateTooltipHtml(elementName, metrics) {
        var tooltipHtml = [
            '<div class="element-name">' + elementName + '</div>'
        ];

        if (metrics) {
            for (let key of Object.keys(metrics)) {
                tooltipHtml.push('<div>' + this.metricNameService.getShortNameByFullName(key) + ': ' + metrics[key] + '</div>');
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
        // when in fullscreen mode, metrics for at least one commit should be present
        if (this.isFullscreen) {
            return element.commit1Metrics != null || element.commit2Metrics != null;
        }

        if (this.position == 'left') {
            return element.commit1Metrics != null;
        } else if (this.position == 'right') {
            return element.commit2Metrics != null;
        }
    }

    _getMetricValueOfElementAndCommitType(element, metricName, commitType) {
        if (this.position == 'left') {
            if (commitType == this.COMMIT_TYPE_CURRENT) {
                return element.commit1Metrics ? element.commit1Metrics[metricName] : undefined;
            } else if (commitType == this.COMMIT_TYPE_OTHER) {
                return element.commit2Metrics ? element.commit2Metrics[metricName] : undefined;
            }

        } else if (this.position == 'right') {
            if (commitType == this.COMMIT_TYPE_CURRENT) {
                return element.commit2Metrics ? element.commit2Metrics[metricName] : undefined;
            } else if (commitType == this.COMMIT_TYPE_OTHER) {
                return element.commit1Metrics ? element.commit1Metrics[metricName] : undefined;
            }

        }
    }


}