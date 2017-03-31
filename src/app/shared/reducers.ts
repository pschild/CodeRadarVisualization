import {combineReducers} from '@ngrx/store';
import * as fromSettings from '../control-panel/settings/settings.reducers';

export interface AppState {
    settingsState: fromSettings.SettingsState;
}

const reducers = {
    settingsState: fromSettings.SettingsReducer
};

const combined = combineReducers(reducers);

export function reducer(state: any, action: any) {
    return combined(state, action);
}