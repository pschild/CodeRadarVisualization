import * as SettingsActions from "./settings.actions";
import {Action, ActionReducer} from "@ngrx/store";
import {ViewType} from "../../enum/ViewType";
import {IFilter} from "../../domain/IFilter";
import {IMetricMapping} from "../../domain/IMetricMapping";

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
        heightMetricName: 'coderadar:size:loc:java',
        groundAreaMetricName: 'coderadar:size:sloc:java',
        colorMetricName: 'coderadar:size:eloc:java'
    }
};

export const SettingsReducer: ActionReducer<SettingsState> = (state = initialState, action: Action) => {
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