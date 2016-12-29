import {AutocompleteComponent} from './AutocompleteComponent';
import * as PubSub from 'pubsub-js';

export class SearchComponent {

    constructor(application) {
        this._application = application;

        this.searchAutocompleteWrapper = document.querySelector('#search-auto-complete-wrapper');
        this.searchAutocompleteComponent = new AutocompleteComponent(this.searchAutocompleteWrapper);
        this.searchAutocompleteComponent.hideShowSuggestionsButton();

        this._bindEvents();
    }

    _bindEvents() {
        PubSub.subscribe('metricsLoaded', () => {
            let elements = [];
            for (let elementName of this._application.getUniqueElementList()) {
                elements.push({
                    value: elementName,
                    label: elementName
                });
            }

            this.searchAutocompleteComponent.setElements(elements);
        });

        PubSub.subscribe('autocompleteElementClicked', (eventName, args) => {
            if (args.componentId == this.searchAutocompleteWrapper.id) {
                PubSub.publish('searchEntryClicked', { elementName: args.selection });
            }
        });
    }
}