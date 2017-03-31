import * as ControlPanelActions from "./control-panel.actions";
import {Action, ActionReducer} from "@ngrx/store";
import {Commit} from "../domain/Commit";

export interface ControlPanelState {
    commits: Commit[];
    commitsLoading: boolean;
}

const initialState: ControlPanelState = {
    commits: [],
    commitsLoading: false
};

export const ControlPanelReducer: ActionReducer<ControlPanelState> = (state = initialState, action: Action) => {
    let newState;
    switch (action.type) {
        case ControlPanelActions.LOAD_COMMITS:
            newState = Object.assign({}, state);
            newState.commitsLoading = true;
            return newState;

        case ControlPanelActions.LOAD_COMMITS_SUCCESS:
            newState = Object.assign({}, state);
            newState.commits = action.payload;
            newState.commitsLoading = false;
            return newState;

        case ControlPanelActions.LOAD_COMMITS_ERROR:
            newState.commitsLoading = false;
            console.error(`Error while loading commits: ${action.payload}`);
            return state;

        default:
            return state;
    }
};