import {AutocompleteComponent} from './AutocompleteComponent';
import * as PubSub from 'pubsub-js';

export class CommitSelectionComponent {

    constructor(application) {
        this._application = application;

        this.firstCommitSelect = document.querySelector('#first-commit-select');
        this.secondCommitSelect = document.querySelector('#second-commit-select');

        this.firstAutocompleteComponent = new AutocompleteComponent(this.firstCommitSelect);
        this.secondAutocompleteComponent = new AutocompleteComponent(this.secondCommitSelect);

        this._bindEvents();
    }

    _bindEvents() {
        PubSub.subscribe('commitsLoaded', (eventName, args) => {
            let elements = [];
            for (let commit of args.commits) {
                elements.push({
                    value: commit.getName(),
                    label: commit.getFormattedDatetime() + ', ' + commit.getAuthor() + ', ' + commit.getName()
                });
            }

            this.firstAutocompleteComponent.setElements(elements);
            this.firstAutocompleteComponent.setSelection(this._application.leftCommitId);

            this.secondAutocompleteComponent.setElements(elements);
            this.secondAutocompleteComponent.setSelection(this._application.rightCommitId);

            // this._disableInitialOptions();
        });

        PubSub.subscribe('autocompleteElementClicked', (eventName, args) => {
            if (args.componentId == this.firstCommitSelect.id || args.componentId == this.secondCommitSelect.id) {
                PubSub.publish('commitChange', {
                    type: args.componentId == this.firstCommitSelect.id ? 'left' : 'right',
                    commitId: args.selection
                });
            }
        });
    }

    _disableInitialOptions() {
        this.firstAutocompleteComponent.disableFirstOption();
        this.secondAutocompleteComponent.disableLastOption();
    }
}