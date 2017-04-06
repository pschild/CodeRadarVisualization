import * as SettingsActions from "./settings.actions";
import {Action, ActionReducer} from "@ngrx/store";
import {ViewType} from "../../enum/ViewType";
import {IFilter} from "../../domain/IFilter";

export interface SettingsState {
    activeViewType: ViewType;
    activeFilter: IFilter;
}

const initialState: SettingsState = {
    activeViewType: ViewType.SPLIT,
    activeFilter: {
        unchanged: true,
        changed: true,
        deleted: true,
        added: true,
        moved: true
    }
};

export const SettingsReducer: ActionReducer<SettingsState> = (state = initialState, action: Action) => {
    let newState;
    switch (action.type) {
        case SettingsActions.CHANGE_VIEW_TYPE:
            newState = Object.assign({}, state);
            newState.activeViewType = action.payload;
            return newState;

        case SettingsActions.CHANGE_ACTIVE_FILTER:
            newState = Object.assign({}, state);
            newState.activeFilter = action.payload;
            return newState;

        default:
            return state;
    }
};