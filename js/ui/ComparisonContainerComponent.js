import {config} from '../Config';
import * as PubSub from 'pubsub-js';

export class ComparisonContainerComponent {

    constructor(application) {
        this._application = application;

        this.comparisonContainer = document.querySelector('#comparison-container');

        this._bindEvents();
    }

    _bindEvents() {
        PubSub.subscribe('openComparisonContainer', (eventName, args) => {
            if (args.leftElement) {
                this.comparisonContainer.querySelector('h3').innerHTML = args.leftElement.name;
            } else {
                this.comparisonContainer.querySelector('h3').innerHTML = args.rightElement.name;
            }

            this.comparisonContainer.querySelector('#first-commit-id').innerHTML = this._application.leftCommitId.substring(0, 7) + '...';
            this.comparisonContainer.querySelector('#second-commit-id').innerHTML = this._application.rightCommitId.substring(0, 7) + '...';

            this.comparisonContainer.querySelector('#comparison-table tbody').innerHTML = '';
            this._addMetricRows(args);

            this.comparisonContainer.classList.add('open');
        });

        PubSub.subscribe('closeComparisonContainer', (eventName, args) => {
            this.comparisonContainer.classList.remove('open');
        });
    }

    _addMetricRows(args) {
        var metricNames = [config.HEIGHT_METRIC_NAME, config.GROUND_AREA_METRIC_NAME, config.COLOR_METRIC_NAME];
        for (let metricName of metricNames) {
            var rowEl = document.createElement('tr');

            var metricNameEl = document.createElement('td');
            metricNameEl.innerHTML = metricName;
            rowEl.appendChild(metricNameEl);

            var firstCommitMetricValueEl = document.createElement('td');
            firstCommitMetricValueEl.innerHTML = args.leftElement ? args.leftElement.userData.metrics[metricName] : '-';
            rowEl.appendChild(firstCommitMetricValueEl);

            var secondCommitMetricValueEl = document.createElement('td');
            secondCommitMetricValueEl.innerHTML = args.rightElement ? args.rightElement.userData.metrics[metricName] : '-';
            rowEl.appendChild(secondCommitMetricValueEl);

            var diffMetricValueEl = document.createElement('td');

            var diffLabel, diffCssClass;
            if (args.leftElement && args.rightElement) {
                var diff = args.rightElement.userData.metrics[metricName] - args.leftElement.userData.metrics[metricName];
                if (diff > 0) {
                    diffLabel = '+' + diff;
                    diffCssClass = 'increase';
                } else if (diff < 0) {
                    diffLabel = diff;
                    diffCssClass = 'decrease';
                } else {
                    diffLabel = diff;
                    diffCssClass = 'same';
                }
            } else {
                diffLabel = '-';
            }

            diffMetricValueEl.innerHTML = diffLabel;
            diffMetricValueEl.classList.add(diffCssClass);
            rowEl.appendChild(diffMetricValueEl);

            this.comparisonContainer.querySelector('#comparison-table tbody').appendChild(rowEl);
        }
    }
}