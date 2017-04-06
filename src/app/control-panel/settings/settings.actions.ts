import {Action} from '@ngrx/store';
import {ViewType} from "../../enum/ViewType";
import {IFilter} from "../../domain/IFilter";

export const CHANGE_VIEW_TYPE = 'CHANGE_VIEW_TYPE';
export const CHANGE_ACTIVE_FILTER = 'CHANGE_ACTIVE_FILTER';

export function changeViewType(viewType: ViewType): Action {
    return {
        type: CHANGE_VIEW_TYPE,
        payload: viewType
    };
}

export function changeActiveFilter(filter: IFilter): Action {
    return {
        type: CHANGE_ACTIVE_FILTER,
        payload: filter
    };
}