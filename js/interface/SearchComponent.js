import * as PubSub from 'pubsub-js';

export class SearchComponent {

    constructor(application) {
        this._application = application;

        this.searchInput = document.querySelector('#search-input');
        this.autoCompleteContainer = document.querySelector('#autocomplete-container');
        this.suggestionsList = document.querySelector('.suggestions-list');

        this._bindEvents();
    }

    _updateAutoCompletePanel(entries) {
        if (entries.length == 0) {
            this.suggestionsList.innerHTML = '<li>Keine Ergebnisse</li>';
        } else {
            this.suggestionsList.innerHTML = '';
        }

        for (let entry of entries) {
            var suggestionItem = document.createElement('li');
            suggestionItem.innerHTML = this._highlightSubstring(entry, this.searchInput.value);
            suggestionItem.addEventListener('click', () => {
                this.searchInput.value = entry;
                PubSub.publish('searchEntryClicked', { elementName: entry });
            });
            this.suggestionsList.appendChild(suggestionItem);
        }
    }

    _bindEvents() {
        this.searchInput.addEventListener('keyup', () => {
            this._updateAutoCompletePanel(this.getSuggestions());
            this._showAutoCompleteContainer();
        });

        document.addEventListener('click', (event) => {
            if (event.target != this.searchInput) {
                this._closeAutoCompleteContainer();
            }
        });
    }

    getSuggestions() {
        var uniqueElements = this._application.getUniqueElementList();
        var suggestions = [];
        for (let elementName of uniqueElements) {
            if (elementName.toLowerCase().indexOf(this.searchInput.value.toLowerCase()) >= 0) {
                suggestions.push(elementName);
            }
        }
        return suggestions.sort();
    }

    _closeAutoCompleteContainer() {
        this.autoCompleteContainer.style.display = 'none';
    }

    _showAutoCompleteContainer() {
        this.autoCompleteContainer.style.display = 'block';
    }

    _highlightSubstring(entry, searchValue) {
        return entry.replace(new RegExp('(' + searchValue + ')', 'ig'), '<b>$1</b>');
    }
}