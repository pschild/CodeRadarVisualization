import * as VisualizationActions from "./visualization.actions";
import {Action, ActionReducer} from "@ngrx/store";
import {ElementAnalyzer} from "../helper/element-analyzer";
import {INode} from "../domain/INode";

export interface VisualizationState {
    metricsLoading: boolean;
    metricTree: INode;
    uniqueFileList: any[];
}

const initialState: VisualizationState = {
    metricsLoading: false,
    metricTree: null,
    uniqueFileList: []
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
            newState.metricTree = action.payload;

            return newState;

        case VisualizationActions.GENERATE_UNIQUE_FILE_LIST:
            newState = Object.assign({}, state);
            newState.uniqueFileList = ElementAnalyzer.generateUniqueElementList(action.payload);

            return newState;

        case VisualizationActions.LOAD_METRIC_TREE_ERROR:
            newState = Object.assign({}, state);
            newState.metricsLoading = false;
            console.error(`Error while loading metrics: ${action.payload}`);
            return state;

        default:
            return state;
    }
};

export const getMetricsLoading = (state: VisualizationState) => state.metricsLoading;

export const getMetricTree = (state: VisualizationState) => state.metricTree;

export const getUniqueFileList = (state: VisualizationState) => state.uniqueFileList;