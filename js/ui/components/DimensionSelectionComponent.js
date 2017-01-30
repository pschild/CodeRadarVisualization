import {MetricNameService} from '../../service/MetricNameService';
import {config} from '../../Config';
import * as Constants from '../../Constants';
import * as PubSub from 'pubsub-js';

export class DimensionSelectionComponent {

    constructor() {
        this.metricNameService = new MetricNameService();

        this.toggleDynamicMappingPanelButton = document.querySelector('#toggle-dynamic-mapping-panel-btn');
        this.dimensionSelectionContainer = document.querySelector('.dimension-selection-container');

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
        this.toggleDynamicMappingPanelButton.addEventListener('click', () => {
            this._toggleDimensionSelectionContainerVisibility();
            this._toggleButtonActiveState();
        });

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

    _toggleDimensionSelectionContainerVisibility() {
        if (this.dimensionSelectionContainer.style.display == 'block') {
            this.dimensionSelectionContainer.style.display = 'none';
        } else {
            this.dimensionSelectionContainer.style.display = 'block';
        }
    }

    _toggleButtonActiveState() {
        if (this.toggleDynamicMappingPanelButton.classList.contains('active')) {
            this.toggleDynamicMappingPanelButton.classList.remove('active');
        } else {
            this.toggleDynamicMappingPanelButton.classList.add('active');
        }
    }
}