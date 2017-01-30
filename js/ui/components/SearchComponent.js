import {AutocompleteComponent} from './AutocompleteComponent';
import * as PubSub from 'pubsub-js';

export class SearchComponent extends AutocompleteComponent {

    constructor(componentElement, application) {
        super(componentElement);
        this._application = application;

        this.hideShowSuggestionsButton();
    }

    _bindEvents() {
        super._bindEvents();

        PubSub.subscribe('metricsLoaded', () => {
            let elements = [];
            for (let elementName of this._application.getUniqueElementList()) {
                elements.push({
                    value: elementName,
                    label: elementName
                });
            }

            this.setElements(elements);
        });
    }

    _onSelection(args) {
        PubSub.publish('searchEntryClicked', { elementName: args.selection });
    }
}