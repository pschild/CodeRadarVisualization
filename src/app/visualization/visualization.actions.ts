import {Action} from "@ngrx/store";
import {Commit} from "../domain/Commit";
import {IDeltaTreeGetResponse} from "../domain/IDeltaTreeGetResponse";

export const LOAD_METRIC_TREE = 'LOAD_METRIC_TREE';
export const LOAD_METRIC_TREE_SUCCESS = 'LOAD_METRIC_TREE_SUCCESS';
export const LOAD_METRIC_TREE_ERROR = 'LOAD_METRIC_TREE_ERROR';

export function loadMetricTree(leftCommit: Commit, rightCommit: Commit): Action {
    return {
        type: LOAD_METRIC_TREE,
        payload: {
            leftCommit: leftCommit,
            rightCommit: rightCommit
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