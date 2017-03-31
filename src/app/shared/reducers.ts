import {combineReducers} from '@ngrx/store';
import * as fromControlPanel from '../control-panel/control-panel.reducers';
import * as fromSettings from '../control-panel/settings/settings.reducers';

export interface AppState {
    controlPanelState: fromControlPanel.ControlPanelState;
    settingsState: fromSettings.SettingsState;
}

const reducers = {
    controlPanelState: fromControlPanel.ControlPanelReducer,
    settingsState: fromSettings.SettingsReducer
};

const combined = combineReducers(reducers);

export function reducer(state: any, action: any) {
    return combined(state, action);
}