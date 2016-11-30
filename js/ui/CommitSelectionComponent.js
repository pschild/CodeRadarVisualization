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
        this.leftSelect.addEventListener('change', (event) => {
            PubSub.publish('commitChange', {
                type: 'left',
                commit: event.target.value
            });

            this._disableOlderCommits();
        });

        this.rightSelect.addEventListener('change', (event) => {
            PubSub.publish('commitChange', {
                type: 'right',
                commit: event.target.value
            });
        });

        PubSub.subscribe('commitsLoaded', (eventName, args) => {
            this._createOptionElements(this.leftSelect, args);
            this._createOptionElements(this.rightSelect, args);

            this._selectCurrentCommit();
            this._disableOlderCommits();
        });
    }

    _selectCurrentCommit() {
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
    }

    _disableOlderCommits() {
        // In the second commit select it should not be possible to select a commit that is prior to the commit in the
        // first select. So the second select always shows a later commit.
        var disabled = false;
        for (let option of this.rightSelect.options) {
            if (option.value == this.leftSelect.value) {
                disabled = true;
                // option.style.color = '#00f';
                // option.style.fontWeight = 'bold';
            }
            option.disabled = disabled;
        }
    }
}