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