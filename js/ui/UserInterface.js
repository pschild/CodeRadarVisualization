import {SearchComponent} from './components/SearchComponent';
import {LegendComponent} from './components/LegendComponent';
import {CommitSelectionComponent} from './components/CommitSelectionComponent';
import {CheckboxComponent} from './components/CheckboxComponent';
import {ComparisonContainerComponent} from './components/ComparisonContainerComponent';
import {DimensionSelectionComponent} from './components/DimensionSelectionComponent';
import {FilterComponent} from './components/FilterComponent';
import {ContextMenuComponent} from './components/ContextMenuComponent';
import {ScreenshotComponent} from './components/ScreenshotComponent';
import * as Constants from '../Constants';

export class UserInterface {

    constructor(application) {
        let searchComponentElement = document.querySelector('#search-auto-complete-wrapper');
        let firstCommitComponentElement = document.querySelector('#first-commit-auto-complete-wrapper');
        let secondCommitComponentElement = document.querySelector('#second-commit-auto-complete-wrapper');
        let dimensionSelectionComponentElement = document.querySelector('#mapping-component');
        let filterComponentElement = document.querySelector('#filter-component');

        let searchComponent = new SearchComponent(searchComponentElement, application);
        let firstCommitSelectionComponent = new CommitSelectionComponent(firstCommitComponentElement, application, Constants.FIRST_COMMIT);
        let secondCommitSelectionComponent = new CommitSelectionComponent(secondCommitComponentElement, application, Constants.SECOND_COMMIT);
        let checkboxComponent = new CheckboxComponent();
        let comparisonContainerComponent = new ComparisonContainerComponent(application);

        let dimensionSelectionComponent = new DimensionSelectionComponent(dimensionSelectionComponentElement);
        let filterComponent = new FilterComponent(filterComponentElement);

        let contextMenuComponent = new ContextMenuComponent();
        let screenshotComponent = new ScreenshotComponent(application);

        this.legendComponent = new LegendComponent();
    }

    getLegendComponent() {
        return this.legendComponent;
    }

    showLoadingIndicator() {
        document.querySelector('.loading-indicator-container').style.display = 'block';
    }

    hideLoadingIndicator() {
        document.querySelector('.loading-indicator-container').style.display = 'none';
    }
}