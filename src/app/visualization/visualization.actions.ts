import {Action} from "@ngrx/store";
import {Commit} from "../domain/Commit";
import {IDeltaTreeGetResponse} from "../domain/IDeltaTreeGetResponse";
import {IMetricMapping} from "../domain/IMetricMapping";

export const LOAD_METRIC_TREE = 'LOAD_METRIC_TREE';
export const LOAD_METRIC_TREE_SUCCESS = 'LOAD_METRIC_TREE_SUCCESS';
export const LOAD_METRIC_TREE_ERROR = 'LOAD_METRIC_TREE_ERROR';
export const CALCULATE_MINIMUM_AND_MAXIMUM_VALUES = 'CALCULATE_MINIMUM_AND_MAXIMUM_VALUES';
export const GENERATE_UNIQUE_FILE_LIST = 'GENERATE_UNIQUE_FILE_LIST';

export function loadMetricTree(leftCommit: Commit, rightCommit: Commit, metricMapping: IMetricMapping): Action {
    return {
        type: LOAD_METRIC_TREE,
        payload: {
            leftCommit: leftCommit,
            rightCommit: rightCommit,
            metricMapping: metricMapping
        }
    };
}

export function loadMetricTreeSuccess(metricTree: IDeltaTreeGetResponse): Action {
    return {
        type: LOAD_METRIC_TREE_SUCCESS,
        payload: metricTree
    };
}

export function loadMetricTreeError(error: string): Action {
    return {
        type: LOAD_METRIC_TREE_ERROR,
        payload: error
    };
}

export function calculateMinimumAndMaximumValues(metricTree: IDeltaTreeGetResponse): Action {
    return {
        type: CALCULATE_MINIMUM_AND_MAXIMUM_VALUES,
        payload: metricTree
    };
}

export function generateUniqueFileList(metricTree: IDeltaTreeGetResponse): Action {
    return {
        type: GENERATE_UNIQUE_FILE_LIST,
        payload: metricTree
    };
}