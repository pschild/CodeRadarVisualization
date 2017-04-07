import * as VisualizationActions from "./visualization.actions";
import {Action, ActionReducer} from "@ngrx/store";
import {Node} from "../domain/Node";
import {ElementAnalyzer} from "../helper/element-analyzer";
import {AppConfig} from "../AppConfig";

export interface VisualizationState {
    metricsLoading: boolean;
    metricTree: Node;
    uniqueFileList: any[];
    minColorMetricValue: number;
    maxColorMetricValue: number;
}

const initialState: VisualizationState = {
    metricsLoading: false,
    metricTree: null,
    uniqueFileList: [],
    minColorMetricValue: undefined,
    maxColorMetricValue: undefined
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

        case VisualizationActions.CALCULATE_MINIMUM_AND_MAXIMUM_VALUES:
            newState = Object.assign({}, state);

            let minMaxPairOfColorMetric = ElementAnalyzer.findSmallestAndBiggestMetricValueByMetricName(newState.metricTree, AppConfig.COLOR_METRIC_NAME);
            newState.minColorMetricValue = minMaxPairOfColorMetric.min;
            newState.maxColorMetricValue = minMaxPairOfColorMetric.max;

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

export const getMinColorMetricValue = (state: VisualizationState) => state.minColorMetricValue;
export const getMaxColorMetricValue = (state: VisualizationState) => state.maxColorMetricValue;