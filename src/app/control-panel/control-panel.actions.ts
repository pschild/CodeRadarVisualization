import {Action} from "@ngrx/store";
import {Commit} from "../domain/Commit";
import {CommitType} from "../enum/CommitType";
import {ICommit} from "../domain/ICommit";

export const LOAD_COMMITS = 'LOAD_COMMITS';
export const LOAD_COMMITS_SUCCESS = 'LOAD_COMMITS_SUCCESS';
export const LOAD_COMMITS_ERROR = 'LOAD_COMMITS_ERROR';
export const CHANGE_COMMIT = 'CHANGE_COMMIT';
export const REQUEST_SCREENSHOT = 'REQUEST_SCREENSHOT';
export const ADD_SCREENSHOT = 'ADD_SCREENSHOT';
export const CLEAR_SCREENSHOTS = 'CLEAR_SCREENSHOTS';

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

export function changeCommit(commitType: CommitType, commit: ICommit): Action {
    return {
        type: CHANGE_COMMIT,
        payload: {
            commitType: commitType,
            commit: commit
        }
    };
}

export function addScreenshot(screenshotObject: any): Action {
    return {
        type: ADD_SCREENSHOT,
        payload: screenshotObject
    };
}

export function clearScreenshots(): Action {
    return {
        type: CLEAR_SCREENSHOTS
    };
}