import {Action} from '@ngrx/store';
import {ViewType} from "../../enum/ViewType";

export const CHANGE_VIEW_TYPE = 'CHANGE_VIEW_TYPE';

export function changeViewType(viewType: ViewType): Action {
    return {
        type: CHANGE_VIEW_TYPE,
        payload: viewType
    };
}