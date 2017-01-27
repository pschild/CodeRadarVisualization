import {SearchComponent} from './components/SearchComponent';
import {LegendComponent} from './components/LegendComponent';
import {CommitSelectionComponent} from './components/CommitSelectionComponent';
import {CheckboxComponent} from './components/CheckboxComponent';
import {ComparisonContainerComponent} from './components/ComparisonContainerComponent';
import {DimensionSelectionComponent} from './components/DimensionSelectionComponent';
import {ContextMenuComponent} from './components/ContextMenuComponent';
import {ScreenshotComponent} from './components/ScreenshotComponent';

export class UserInterface {

    constructor(application) {
        this._application = application;

        this.renderCallsDisplay = document.querySelector('#render-calls');

        this._bindEvents();

        this.searchComponent = new SearchComponent(application);
        this.legendComponent = new LegendComponent();
        this.commitSelectionComponent = new CommitSelectionComponent(application);
        this.checkboxComponent = new CheckboxComponent();
        this.comparisonContainerComponent = new ComparisonContainerComponent(application);
        this.dimensionSelectionComponent = new DimensionSelectionComponent(application);
        this.contextMenuComponent = new ContextMenuComponent();
        this.screenshotComponent = new ScreenshotComponent(application);
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