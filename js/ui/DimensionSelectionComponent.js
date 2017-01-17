import {config} from '../Config';
import * as PubSub from 'pubsub-js';

export class DimensionSelectionComponent {

    constructor() {
        this.heightDimensionSelect = document.querySelector('#height-metric-name');
        this.groundAreaDimensionSelect = document.querySelector('#ground-area-metric-name');
        this.colorDimensionSelect = document.querySelector('#color-metric-name');

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
}