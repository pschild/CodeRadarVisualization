import * as PubSub from 'pubsub-js';

export class CommitSelectionComponent {

    constructor(application) {
        this._application = application;

        this.leftSelect = document.querySelector('#first-commit-select');
        this.rightSelect = document.querySelector('#second-commit-select');

        this._bindEvents();
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
    }
}