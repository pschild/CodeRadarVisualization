import {combineReducers} from '@ngrx/store';
import * as fromControlPanel from '../control-panel/control-panel.reducers';

export interface AppState {
    controlPanelState: fromControlPanel.ControlPanelState;
}

const reducers = {
    controlPanelState: fromControlPanel.ControlPanelReducer
};

const combined = combineReducers(reducers);

export function reducer(state: any, action: any) {
    return combined(state, action);
}