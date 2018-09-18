import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {of} from "rxjs";
import * as actions from '../shared/actions';
import {CommitService} from "../service/commit.service";
import {ICommitsGetResponse} from "../interfaces/ICommitsGetResponse";
import {ICommitsGetErrorResponse} from "../interfaces/ICommitsGetErrorResponse";
import {IDeltaTreeGetErrorResponse} from "../interfaces/IDeltaTreeGetErrorResponse";
import {IDeltaTreeGetResponse} from "../interfaces/IDeltaTreeGetResponse";
import {MetricService} from "../service/metric.service";
import {catchError, map, switchMap, mergeMap} from 'rxjs/operators';
import { IActionWithPayload } from '../interfaces/IActionWithPayload';

@Injectable()
export class AppEffects {

    constructor(private actions$: Actions<IActionWithPayload<any>>, private commitService: CommitService, private metricService: MetricService) { }

    @Effect() loadCommitsEffects$ = this.actions$
        .ofType(actions.LOAD_COMMITS)
        .pipe(
            switchMap(
                () => this.commitService.loadCommits()
                    .pipe(
                        map((result: ICommitsGetResponse) => {
                            return actions.loadCommitsSuccess(result._embedded.commitResourceList);
                        }),
                        catchError((response: ICommitsGetErrorResponse) => {
                            return of(actions.loadCommitsError(response.error));
                        })
                    )
            )
        );

    @Effect() loadMetricTreeEffects$ = this.actions$
        .ofType(actions.LOAD_METRIC_TREE)
        .pipe(
            map((action) => action.payload),
            switchMap(
                (payload) => this.metricService.loadDeltaTree(payload.leftCommit, payload.rightCommit, payload.metricMapping)
                    .pipe(
                        mergeMap((result: IDeltaTreeGetResponse) => {
                            return [
                                actions.loadMetricTreeSuccess(result.rootNode),
                                actions.generateUniqueFileList(result.rootNode)
                            ];
                        }),
                        catchError((response: IDeltaTreeGetErrorResponse) => {
                            return of(actions.loadMetricTreeError(response.error));
                        })
                    )
            )
        );
}