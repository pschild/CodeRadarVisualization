const MAX_WIDTH = 400;

export class AutocompleteComponent {

    constructor(componentElement) {
        this._componentElement = componentElement;

        this.input = componentElement.querySelector('input[type=text]');
        this.showSuggestionsButton = componentElement.querySelector('.show-suggestions-button');
        this.clearButton = componentElement.querySelector('.clear-button');
        this.suggestionsContainer = componentElement.querySelector('.suggestions-container');
        this.suggestionsList = this.suggestionsContainer.querySelector('ul.suggestions-list');

        this._elements = [];
        this._filteredElements = [];

        this._hideSuggestions();
        this._bindEvents();

        this._fitSuggestionsContainerToScreen();
    }

    setElements(elements) {
        this._elements = elements;
        this._resetFilteredElements();
        this._updateSuggestionList();
    }

    setSelection(value) {
        for (let element of this._filteredElements) {
            if (element.value == value) {
                this.input.value = element.label;
                this._markSelectedElement(element);
            }
        }
    }

    hideShowSuggestionsButton() {
        this.showSuggestionsButton.style.display = 'none';
    }

    hideClearButton() {
        this.clearButton.style.display = 'none';
    }

    disableFirstOption() {
        var listItems = this.suggestionsList.querySelectorAll('li');
        listItems[0].classList.add('inactive');
    }

    disableLastOption() {
        var listItems = this.suggestionsList.querySelectorAll('li');
        listItems[listItems.length - 1].classList.add('inactive');
    }

    _fitSuggestionsContainerToScreen() {
        var left = this._componentElement.getBoundingClientRect().left;
        var windowWidth = window.innerWidth;
        if (left + MAX_WIDTH > windowWidth) {
            this.suggestionsContainer.style.left = 'auto';
            this.suggestionsContainer.style.right = '0px';

            this.suggestionsList.classList.add('rtl');
        }
    }

    _bindEvents() {
        document.addEventListener('click', (event) => {
            if (event.target != this.showSuggestionsButton) {
                this._hideSuggestions();
            }
        });

        this.input.addEventListener('keyup', () => {
            this._filterElements(this.input.value);
            this._updateSuggestionList();
            this._showSuggestions();
        });

        this.showSuggestionsButton.addEventListener('click', () => {
            this._toggleSuggestions();
        });

        this.clearButton.addEventListener('click', () => {
            this.input.value = '';
            this.input.focus();
            this._resetFilteredElements();
        });
    }

    _updateSuggestionList() {
        this.suggestionsList.innerHTML = '';
        for (let element of this._filteredElements) {
            let listItem = this._createListItem(element);
            this.suggestionsList.appendChild(listItem);
        }
    }

    _createListItem(element) {
        let li = document.createElement('li');

        if (this.input.value.length > 0) {
            li.innerHTML = this._highlightSubstring(element.label, this.input.value);
        } else {
            li.innerHTML = element.label;
        }

        li.dataset.value = element.value;

        li.addEventListener('click', (event) => {
            if (event.target.classList.contains('inactive')) {
                return;
            }

            this.input.value = element.label;
            this._markSelectedElement(element);
            this._clearHighlights();

            this._onSelection({
                selection: element.value
            });
        });

        return li;
    }

    _onSelection(args) { console.warn('not implemented'); }

    _markSelectedElement(element) {
        var listItems = this.suggestionsList.querySelectorAll('li');
        for (let item of listItems) {
            if (item.dataset.value == element.value) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        }
    }

    _filterElements(value) {
        this._filteredElements = [];
        for (let element of this._elements) {
            if (element.label.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                this._filteredElements.push(element);
            }
        }
    }

    _highlightSubstring(label, searchValue) {
        return label.replace(new RegExp('(' + searchValue + ')', 'ig'), '<b>$1</b>');
    }

    _clearHighlights() {
        var listItems = this.suggestionsList.querySelectorAll('li');
        for (let item of listItems) {
            item.innerHTML = item.innerHTML.replace('<b>', '');
            item.innerHTML = item.innerHTML.replace('</b>', '');
        }
    }

    _resetFilteredElements() {
        this._filteredElements = this._elements;
        this._updateSuggestionList();
    }

    _showSuggestions() {
        this.suggestionsContainer.style.display = 'block';
    }

    _hideSuggestions() {
        this.suggestionsContainer.style.display = 'none';
    }

    _toggleSuggestions() {
        if (this.suggestionsContainer.style.display == 'none') {
            this._showSuggestions();

            var selectedElement = this.suggestionsList.querySelector('.selected');
            if (selectedElement) {
                selectedElement.scrollIntoView();
            }
        } else {
            this._hideSuggestions();
        }
    }
}