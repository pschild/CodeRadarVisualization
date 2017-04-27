import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from "rxjs";
import * as actions from '../shared/actions';
import {CommitService} from "../service/commit.service";
import {ICommitsGetResponse} from "../domain/ICommitsGetResponse";
import {ICommitsGetErrorResponse} from "../domain/ICommitsGetErrorResponse";
import {IDeltaTreeGetErrorResponse} from "../domain/IDeltaTreeGetErrorResponse";
import {IDeltaTreeGetResponse} from "../domain/IDeltaTreeGetResponse";
import {MetricService} from "../service/metric.service";

@Injectable()
export class AppEffects {

    constructor(private actions$: Actions, private commitService: CommitService, private metricService: MetricService) { }

    @Effect() loadCommitsEffects$ = this.actions$
        .ofType(actions.LOAD_COMMITS)
        .switchMap(
            () => this.commitService.loadCommits()
                .map((result: ICommitsGetResponse) => {
                    return actions.loadCommitsSuccess(result._embedded.commitResourceList);
                })
                .catch((response: ICommitsGetErrorResponse) => {
                    return Observable.of(actions.loadCommitsError(response.error));
                })
        );

    @Effect() loadMetricTreeEffects$ = this.actions$
        .ofType(actions.LOAD_METRIC_TREE)
        .map((action) => action.payload)
        .switchMap(
            (payload) => this.metricService.loadDeltaTree(payload.leftCommit, payload.rightCommit, payload.metricMapping)
                .mergeMap((result: IDeltaTreeGetResponse) => {
                    return [
                        actions.loadMetricTreeSuccess(result.rootNode),
                        actions.generateUniqueFileList(result.rootNode)
                    ];
                })
                .catch((response: IDeltaTreeGetErrorResponse) => {
                    return Observable.of(actions.loadMetricTreeError(response.error));
                })
        );
}