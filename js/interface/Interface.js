import {config} from '../Config';
import {SearchComponent} from './SearchComponent';
import {LegendComponent} from './LegendComponent';
import * as PubSub from 'pubsub-js';

export class Interface {

    constructor(application) {
        this._application = application;

        this.leftSelect = document.querySelector('#first-commit-select');
        this.rightSelect = document.querySelector('#second-commit-select');

        this.fullscreenCheckbox = document.querySelector('#fullscreen-enabled-checkbox');
        this.synchronizeCheckbox = document.querySelector('#synchronize-enabled-checkbox');
        this.colorcodeCheckbox = document.querySelector('#colorcode-checkbox');
        this.unchangedFilesCheckbox = document.querySelector('#unchanged-files-checkbox');

        this.comparisonContainer = document.querySelector('#comparison-container');

        this.renderCallsDisplay = document.querySelector('#render-calls');

        this._bindEvents();

        this.searchComponent = new SearchComponent(application);
        this.legendComponent = new LegendComponent();
    }

    showLoadingIndicator() {
        document.querySelector('.loading-indicator-container').style.display = 'block';
    }

    hideLoadingIndicator() {
        document.querySelector('.loading-indicator-container').style.display = 'none';
    }

    _createOptionElements(selectElement, data) {
        for (let commit of data.commits) {
            var option = document.createElement('option');
            option.value = commit.getName();
            option.innerHTML = commit.getShortName() + ' - ' + commit.getAuthor() + ' ' + commit.getFormattedDatetime();
            selectElement.appendChild(option);
        }
    }

    _bindEvents() {
        window.renderCalls = 0;
        setInterval(() => {
            this.renderCallsDisplay.innerHTML = renderCalls + ' renderings/s';
            window.renderCalls = 0;
        }, 1000);

        this.fullscreenCheckbox.addEventListener('change', (event) => {
            this.synchronizeCheckbox.disabled = event.target.checked;
            this.colorcodeCheckbox.disabled = event.target.checked;
            this.unchangedFilesCheckbox.disabled = !event.target.checked;

            PubSub.publish('closeComparisonContainer');
            PubSub.publish('fullSplitToggle', { enabled: event.target.checked });
        });

        this.synchronizeCheckbox.addEventListener('change', (event) => {
            PubSub.publish('synchronizeEnabledChange', { enabled: event.target.checked });
        });

        this.colorcodeCheckbox.addEventListener('change', (event) => {
            PubSub.publish('colorcodeChange', { colorcode: event.target.checked ? 'commit' : 'metric' });
        });

        this.unchangedFilesCheckbox.addEventListener('change', (event) => {
            PubSub.publish('unchangedFilesChange', { enabled: event.target.checked });
        });

        this.leftSelect.addEventListener('change', function() {
            PubSub.publish('commitChange', {
                type: 'left',
                commit: this.value
            });
        });

        this.rightSelect.addEventListener('change', function() {
            PubSub.publish('commitChange', {
                type: 'right',
                commit: this.value
            });
        });

        PubSub.subscribe('commitsLoaded', (eventName, args) => {
            this._createOptionElements(this.leftSelect, args);
            this._createOptionElements(this.rightSelect, args);

            for (let option of this.leftSelect.options) {
                if (option.value == this._application.leftCommitId) {
                    option.selected = true;
                    break;
                }
            }

            for (let option of this.rightSelect.options) {
                if (option.value == this._application.rightCommitId) {
                    option.selected = true;
                    break;
                }
            }
        });

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