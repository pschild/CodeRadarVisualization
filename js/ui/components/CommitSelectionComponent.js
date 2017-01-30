import {AutocompleteComponent} from './AutocompleteComponent';
import * as PubSub from 'pubsub-js';
import * as Constants from '../../Constants';

export class CommitSelectionComponent extends AutocompleteComponent {

    constructor(componentElement, application, commitType) {
        super(componentElement);
        this._application = application;
        this._commitType = commitType;
    }

    _bindEvents() {
        super._bindEvents();

        PubSub.subscribe('commitsLoaded', (eventName, args) => {
            let elements = [];
            for (let commit of args.commits) {
                elements.push({
                    value: commit.getName(),
                    label: commit.getFormattedDatetime() + ', ' + commit.getAuthor() + ', ' + commit.getName()
                });
            }

            this.setElements(elements);

            if (this._commitType == Constants.FIRST_COMMIT) {
                this.setSelection(this._application.leftCommitId);
            } else if (this._commitType == Constants.SECOND_COMMIT) {
                this.setSelection(this._application.rightCommitId);
            } else {
                throw new Error(`Unknown commit type ${this._commitType}!`);
            }
        });
    }

    _onSelection(args) {
        PubSub.publish('commitChange', {
            commitType: this._commitType,
            commitId: args.selection
        });
    }
}