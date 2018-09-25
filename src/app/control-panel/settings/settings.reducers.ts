import * as SettingsActions from './settings.actions';
import {ActionReducer} from '@ngrx/store';
import {ViewType} from '../../enum/ViewType';
import {IFilter} from '../../interfaces/IFilter';
import {IMetricMapping} from '../../interfaces/IMetricMapping';
import {AppConfig} from '../../AppConfig';
import {IActionWithPayload} from '../../interfaces/IActionWithPayload';

export interface SettingsState {
    activeViewType: ViewType;
    activeFilter: IFilter;
    metricMapping: IMetricMapping;
}

const initialState: SettingsState = {
    activeViewType: ViewType.SPLIT,
    activeFilter: {
        unchanged: true,
        changed: true,
        deleted: true,
        added: true,
        moved: true
    },
    metricMapping: {
        heightMetricName: AppConfig.HEIGHT_METRIC_NAME,
        groundAreaMetricName: AppConfig.GROUND_AREA_METRIC_NAME,
        colorMetricName: AppConfig.COLOR_METRIC_NAME
    }
};

export const SettingsReducer: ActionReducer<SettingsState> = (state = initialState, action: IActionWithPayload<any>) => {
    let newState;
    switch (action.type) {
        case SettingsActions.CHANGE_VIEW_TYPE:
            newState = Object.assign({}, state);
            newState.activeViewType = action.payload;
            return newState;

        case SettingsActions.CHANGE_ACTIVE_FILTER:
            newState = Object.assign({}, state);
            newState.activeFilter = Object.assign({}, state.activeFilter, action.payload);
            return newState;

        case SettingsActions.SET_METRIC_MAPPING:
            newState = Object.assign({}, state);
            newState.metricMapping = Object.assign({}, state.metricMapping, action.payload);
            return newState;

        default:
            return state;
    }
};

export const getActiveViewType = (state: SettingsState) => state.activeViewType;

export const getActiveFilter = (state: SettingsState) => state.activeFilter;

export const getMetricMapping = (state: SettingsState) => state.metricMapping;
