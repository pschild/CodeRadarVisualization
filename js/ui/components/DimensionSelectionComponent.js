import {MetricNameService} from '../../service/MetricNameService';
import {PopoverComponent} from '../components/PopoverComponent';
import {config} from '../../Config';
import * as Constants from '../../Constants';
import * as PubSub from 'pubsub-js';

export class DimensionSelectionComponent extends PopoverComponent {

    constructor(componentElement) {
        super(componentElement);

        this.metricNameService = new MetricNameService();

        this.heightDimensionSelect = componentElement.querySelector('#height-metric-name');
        this.groundAreaDimensionSelect = componentElement.querySelector('#ground-area-metric-name');
        this.colorDimensionSelect = componentElement.querySelector('#color-metric-name');

        this._fillDropdowns(this.heightDimensionSelect);
        this._fillDropdowns(this.groundAreaDimensionSelect);
        this._fillDropdowns(this.colorDimensionSelect);

        this._setSelectedOptions();

        this._bindEvents();
    }

    _bindEvents() {
        super._bindEvents();

        this.heightDimensionSelect.addEventListener('change', function() {
            PubSub.publish('dimensionChange', {
                dimension: Constants.HEIGHT_DIMENSION,
                metricName: this.value
            });
        });

        this.groundAreaDimensionSelect.addEventListener('change', function() {
            PubSub.publish('dimensionChange', {
                dimension: Constants.GROUNDAREA_DIMENSION,
                metricName: this.value
            });
        });

        this.colorDimensionSelect.addEventListener('change', function() {
            PubSub.publish('dimensionChange', {
                dimension: Constants.COLOR_DIMENSION,
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