import {MetricNameService} from '../service/MetricNameService';
import {config} from '../Config';
import * as PubSub from 'pubsub-js';

export class ComparisonContainerComponent {

    constructor(application) {
        this._application = application;

        this.metricNameService = new MetricNameService();

        this.comparisonContainer = document.querySelector('#comparison-container');

        this._bindEvents();
    }

    _bindEvents() {
        PubSub.subscribe('openComparisonContainer', (eventName, args) => {
            // If we don't have metric values in at least one of the elements, close the container and return.
            // No information can be shown then.
            if (
                (args.leftElement && !args.leftElement.userData.metrics)
                || (args.rightElement && !args.rightElement.userData.metrics))
            {
                this.comparisonContainer.classList.remove('open');
                return;
            }

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

        PubSub.subscribe('closeComparisonContainer', () => {
            this.comparisonContainer.classList.remove('open');
        });
    }

    _addMetricRows(args) {
        var metricNames = [config.HEIGHT_METRIC_NAME, config.GROUND_AREA_METRIC_NAME, config.COLOR_METRIC_NAME];
        for (let metricName of metricNames) {
            var rowEl = document.createElement('tr');

            var metricNameEl = document.createElement('td');
            metricNameEl.innerHTML = this.metricNameService.getShortNameByFullName(metricName);
            rowEl.appendChild(metricNameEl);

            var firstCommitMetricValueEl = document.createElement('td');
            firstCommitMetricValueEl.innerHTML = args.leftElement ? args.leftElement.userData.metrics[metricName] || 'N/A' : '-';
            rowEl.appendChild(firstCommitMetricValueEl);

            var secondCommitMetricValueEl = document.createElement('td');
            secondCommitMetricValueEl.innerHTML = args.rightElement ? args.rightElement.userData.metrics[metricName] || 'N/A' : '-';
            rowEl.appendChild(secondCommitMetricValueEl);

            var diffMetricValueEl = document.createElement('td');

            var diffLabel, iconEl;
            if (args.leftElement && args.rightElement) {
                var diff = args.rightElement.userData.metrics[metricName] - args.leftElement.userData.metrics[metricName];
                if (diff > 0) {
                    diffLabel = '+' + diff;
                    iconEl = '<span class="icon-arrow-up-right"></span>';
                } else if (diff < 0) {
                    diffLabel = diff;
                    iconEl = '<span class="icon-arrow-down-right"></span>';
                } else if (diff == 0) {
                    diffLabel = diff;
                    iconEl = '<span class="icon-arrow-right"></span>';
                } else {
                    diffLabel = '-';
                    iconEl = '';
                }
            } else {
                diffLabel = '-';
                iconEl = '';
            }

            diffMetricValueEl.innerHTML = iconEl + diffLabel;
            rowEl.appendChild(diffMetricValueEl);

            this.comparisonContainer.querySelector('#comparison-table tbody').appendChild(rowEl);
        }
    }
}