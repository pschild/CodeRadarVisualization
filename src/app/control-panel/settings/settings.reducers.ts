import * as SettingsActions from "./settings.actions";
import {Action, ActionReducer} from "@ngrx/store";
import {ViewType} from "../../enum/ViewType";

export interface SettingsState {
    activeViewType: ViewType;
}

const initialState: SettingsState = {
    activeViewType: ViewType.SPLIT
};

export const SettingsReducer: ActionReducer<SettingsState> = (state = initialState, action: Action) => {
    let newState;
    switch (action.type) {
        case SettingsActions.CHANGE_VIEW_TYPE:
            newState = Object.assign({}, state);
            newState.activeViewType = action.payload;
            return newState;

        default:
            return state;
    }
};