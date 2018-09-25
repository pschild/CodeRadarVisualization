import {ICommit} from '../interfaces/ICommit';
import {IMetricMapping} from '../interfaces/IMetricMapping';
import {INode} from '../interfaces/INode';
import { IActionWithPayload } from '../interfaces/IActionWithPayload';

export const LOAD_METRIC_TREE = 'LOAD_METRIC_TREE';
export const LOAD_METRIC_TREE_SUCCESS = 'LOAD_METRIC_TREE_SUCCESS';
export const LOAD_METRIC_TREE_ERROR = 'LOAD_METRIC_TREE_ERROR';
export const GENERATE_UNIQUE_FILE_LIST = 'GENERATE_UNIQUE_FILE_LIST';

export function loadMetricTree(
    leftCommit: ICommit,
    rightCommit: ICommit,
    metricMapping: IMetricMapping
): IActionWithPayload<{leftCommit: ICommit, rightCommit: ICommit, metricMapping: IMetricMapping}> {
    return {
        type: LOAD_METRIC_TREE,
        payload: {
            leftCommit: leftCommit,
            rightCommit: rightCommit,
            metricMapping: metricMapping
        }
    };
}

export function loadMetricTreeSuccess(metricTree: INode): IActionWithPayload<INode> {
    return {
        type: LOAD_METRIC_TREE_SUCCESS,
        payload: metricTree
    };
}

export function loadMetricTreeError(error: string): IActionWithPayload<string> {
    return {
        type: LOAD_METRIC_TREE_ERROR,
        payload: error
    };
}

export function generateUniqueFileList(metricTree: INode): IActionWithPayload<INode> {
    return {
        type: GENERATE_UNIQUE_FILE_LIST,
        payload: metricTree
    };
}
