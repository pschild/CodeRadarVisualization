import * as VisualizationActions from "./visualization.actions";
import {Action, ActionReducer} from "@ngrx/store";
import {IDeltaTreeGetResponse} from "../domain/IDeltaTreeGetResponse";

export interface VisualizationState {
    metricsLoading: boolean;
    metricTree: IDeltaTreeGetResponse;
}

const initialState: VisualizationState = {
    metricsLoading: false,
    metricTree: null
};

export const VisualizationReducer: ActionReducer<VisualizationState> = (state = initialState, action: Action) => {
    let newState;
    switch (action.type) {
        case VisualizationActions.LOAD_METRIC_TREE:
            newState = Object.assign({}, state);
            newState.metricsLoading = true;
            return newState;

        case VisualizationActions.LOAD_METRIC_TREE_SUCCESS:
            newState = Object.assign({}, state);
            newState.metricsLoading = false;
            newState.metricTree = action.payload.metricTree;
            return newState;

        case VisualizationActions.LOAD_METRIC_TREE_ERROR:
            newState.metricsLoading = false;
            console.error(`Error while loading metrics: ${action.payload}`);
            return state;

        default:
            return state;
    }
};