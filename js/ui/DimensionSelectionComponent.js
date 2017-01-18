import {MetricNameService} from '../service/MetricNameService';
import {config} from '../Config';
import * as PubSub from 'pubsub-js';

export class DimensionSelectionComponent {

    constructor() {
        this.metricNameService = new MetricNameService();

        this.heightDimensionSelect = document.querySelector('#height-metric-name');
        this.groundAreaDimensionSelect = document.querySelector('#ground-area-metric-name');
        this.colorDimensionSelect = document.querySelector('#color-metric-name');

        this._fillDropdowns(this.heightDimensionSelect);
        this._fillDropdowns(this.groundAreaDimensionSelect);
        this._fillDropdowns(this.colorDimensionSelect);

        this._setSelectedOptions();

        this._bindEvents();
    }

    _bindEvents() {
        this.heightDimensionSelect.addEventListener('change', function() {
            PubSub.publish('heightDimensionChange', {
                metricName: this.value
            });
        });

        this.groundAreaDimensionSelect.addEventListener('change', function() {
            PubSub.publish('groundAreaDimensionChange', {
                metricName: this.value
            });
        });

        this.colorDimensionSelect.addEventListener('change', function() {
            PubSub.publish('colorDimensionChange', {
                metricName: this.value
            });
        });
    }

    _fillDropdowns(selectElement) {
        var metricNames = this.metricNameService.getAll();
        for (let shortName of Object.keys(metricNames)) {
            var optionEl = document.createElement('option');
            optionEl.innerHTML = shortName;
            optionEl.value = shortName;
            selectElement.appendChild(optionEl);
        }
    }

    _setSelectedOptions() {
        this.heightDimensionSelect.value = this.metricNameService.getShortNameByFullName(config.HEIGHT_METRIC_NAME);
        this.groundAreaDimensionSelect.value = this.metricNameService.getShortNameByFullName(config.GROUND_AREA_METRIC_NAME);
        this.colorDimensionSelect.value = this.metricNameService.getShortNameByFullName(config.COLOR_METRIC_NAME);
    }
}