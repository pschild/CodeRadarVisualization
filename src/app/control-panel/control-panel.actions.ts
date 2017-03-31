import {Action} from "@ngrx/store";
import {Commit} from "../domain/Commit";

export const LOAD_COMMITS = 'LOAD_COMMITS';
export const LOAD_COMMITS_SUCCESS = 'LOAD_COMMITS_SUCCESS';
export const LOAD_COMMITS_ERROR = 'LOAD_COMMITS_ERROR';

export function loadCommits(): Action {
    return {
        type: LOAD_COMMITS
    };
}

export function loadCommitsSuccess(commits: Commit[]): Action {
    return {
        type: LOAD_COMMITS_SUCCESS,
        payload: commits
    };
}

export function loadCommitsError(error: string): Action {
    return {
        type: LOAD_COMMITS_ERROR,
        payload: error
    };
}