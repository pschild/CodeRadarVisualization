import * as PubSub from 'pubsub-js';

export class Interface {

    constructor() {
        this.leftSelect = document.querySelector('#first-commit-select');
        this.rightSelect = document.querySelector('#second-commit-select');

        this.synchronizeCheckbox = document.querySelector('#synchronize-enabled-checkbox');

        this._bindEvents();
    }

    showLoadingIndicator() {
        document.querySelector('#loading-indicator').style.display = 'block';
    }

    hideLoadingIndicator() {
        document.querySelector('#loading-indicator').style.display = 'none';
    }

    _createOptionElements(selectElement, data) {
        for (let commit of data.commits) {
            var option = document.createElement('option');
            option.value = commit.getName();
            option.innerHTML = commit.getName();
            selectElement.appendChild(option);
        }
    }

    _bindEvents() {
        this.synchronizeCheckbox.addEventListener('change', (event) => {
            PubSub.publish('synchronizeEnabledChange', { enabled: event.target.checked });
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
        });
    }
}