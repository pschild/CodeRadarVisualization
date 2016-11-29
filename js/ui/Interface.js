import {SearchComponent} from './SearchComponent';
import {LegendComponent} from './LegendComponent';
import {CommitSelectionComponent} from './CommitSelectionComponent';
import {CheckboxComponent} from './CheckboxComponent';
import {ComparisonContainerComponent} from './ComparisonContainerComponent';

export class Interface {

    constructor(application) {
        this._application = application;

        this.renderCallsDisplay = document.querySelector('#render-calls');

        this._bindEvents();

        this.searchComponent = new SearchComponent(application);
        this.legendComponent = new LegendComponent();
        this.commitSelectionComponent = new CommitSelectionComponent(application);
        this.checkboxComponent = new CheckboxComponent();
        this.comparisonContainerComponent = new ComparisonContainerComponent(application);
    }

    showLoadingIndicator() {
        document.querySelector('.loading-indicator-container').style.display = 'block';
    }

    hideLoadingIndicator() {
        document.querySelector('.loading-indicator-container').style.display = 'none';
    }

    _bindEvents() {
        window.renderCalls = 0;
        setInterval(() => {
            this.renderCallsDisplay.innerHTML = renderCalls + ' renderings/s';
            window.renderCalls = 0;
        }, 1000);
    }
}