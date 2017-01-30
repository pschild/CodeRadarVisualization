import {SearchComponent} from './components/SearchComponent';
import {LegendComponent} from './components/LegendComponent';
import {CommitSelectionComponent} from './components/CommitSelectionComponent';
import {CheckboxComponent} from './components/CheckboxComponent';
import {ComparisonContainerComponent} from './components/ComparisonContainerComponent';
import {DimensionSelectionComponent} from './components/DimensionSelectionComponent';
import {ContextMenuComponent} from './components/ContextMenuComponent';
import {ScreenshotComponent} from './components/ScreenshotComponent';
import * as Constants from '../Constants';

export class UserInterface {

    constructor(application) {
        this._application = application;

        this.searchComponentElement = document.querySelector('#search-auto-complete-wrapper');
        this.firstCommitComponentElement = document.querySelector('#first-commit-auto-complete-wrapper');
        this.secondCommitComponentElement = document.querySelector('#second-commit-auto-complete-wrapper');

        this.searchComponent = new SearchComponent(this.searchComponentElement, application);
        this.firstCommitSelectionComponent = new CommitSelectionComponent(this.firstCommitComponentElement, application, Constants.FIRST_COMMIT);
        this.secondCommitSelectionComponent = new CommitSelectionComponent(this.secondCommitComponentElement, application, Constants.SECOND_COMMIT);
        this.legendComponent = new LegendComponent();
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
}