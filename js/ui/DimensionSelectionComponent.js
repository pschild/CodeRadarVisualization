import {config} from '../Config';
import * as PubSub from 'pubsub-js';

export class DimensionSelectionComponent {

    constructor() {
        this.heightDimensionSelect = document.querySelector('#height-metric-name');

        this._bindEvents();
    }

    _bindEvents() {
        this.heightDimensionSelect.addEventListener('change', function() {
            PubSub.publish('heightDimensionChange', {
                metricName: this.value
            });
        });
    }
}