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
            var column = this.comparisonContainer.querySelector('.column.' + args.position);
            if (args.element) {
                this.comparisonContainer.querySelector('h2').innerHTML = args.element.name;

                var html = [];
                let metricValues = args.element.userData.metrics;
                for (let key of Object.keys(metricValues)) {
                    html.push('<div>' + key + ': ' + metricValues[key] + '</div>');
                }

                column.innerHTML = html.join('');
            } else {
                column.innerHTML = 'Keine Metriken vorhanden.';
            }

            this.comparisonContainer.classList.add('open');
        });

        PubSub.subscribe('closeComparisonContainer', (eventName, args) => {
            this.comparisonContainer.classList.remove('open');
        });
    }
}