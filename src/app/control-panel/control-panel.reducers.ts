import * as ControlPanelActions from "./control-panel.actions";
import {Action, ActionReducer} from "@ngrx/store";
import {ViewType} from "../enum/ViewType";

export interface ControlPanelState {
    activeViewType: ViewType;
}

const initialState: ControlPanelState = {
    activeViewType: ViewType.SPLIT
};

export const ControlPanelReducer: ActionReducer<ControlPanelState> = (state = initialState, action: Action) => {
    let newState;
    switch (action.type) {
        case ControlPanelActions.CHANGE_VIEW_TYPE:
            newState = Object.assign({}, state);
            newState.activeViewType = action.payload;
            return newState;

        default:
            return state;
    }
};