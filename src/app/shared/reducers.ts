import {createSelector} from 'reselect';
import {combineReducers} from '@ngrx/store';
import * as fromControlPanel from '../control-panel/control-panel.reducers';
import * as fromSettings from '../control-panel/settings/settings.reducers';
import * as fromVisualization from '../visualization/visualization.reducers';

export interface AppState {
    controlPanelState: fromControlPanel.ControlPanelState;
    settingsState: fromSettings.SettingsState;
    visualizationState: fromVisualization.VisualizationState;
}

const reducers = {
    controlPanelState: fromControlPanel.ControlPanelReducer,
    settingsState: fromSettings.SettingsReducer,
    visualizationState: fromVisualization.VisualizationReducer
};

const combined = combineReducers(reducers);

export function reducer(state: any, action: any) {
    return combined(state, action);
}

export const getControlPanelState = (state: AppState) => state.controlPanelState;

export const getVisualizationState = (state: AppState) => state.visualizationState;

export const getSettingsState = (state: AppState) => state.settingsState;

export const getCommitsLoading = createSelector(getControlPanelState, fromControlPanel.getCommitsLoading);

export const getCommits = createSelector(getControlPanelState, fromControlPanel.getCommits);

export const getLeftCommit = createSelector(getControlPanelState, fromControlPanel.getLeftCommit);

export const getRightCommit = createSelector(getControlPanelState, fromControlPanel.getRightCommit);

export const getMetricsLoading = createSelector(getVisualizationState, fromVisualization.getMetricsLoading);

export const getUniqueFileList = createSelector(getVisualizationState, fromVisualization.getUniqueFileList);

export const getMetricMapping = createSelector(getSettingsState, fromSettings.getMetricMapping);

export const getActiveFilter = createSelector(getSettingsState, fromSettings.getActiveFilter);

export const getActiveViewType = createSelector(getSettingsState, fromSettings.getActiveViewType);

export const isReadyForLoadingMetrics = createSelector(getCommits, getLeftCommit, getRightCommit, getMetricMapping, (commits, leftCommit, rightCommit, metricMapping) => {
    if (commits && commits.length > 2 && leftCommit !== null && rightCommit !== null) {
        return {
            leftCommit: leftCommit,
            rightCommit: rightCommit,
            metricMapping: metricMapping
        };
    }
});