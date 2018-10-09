import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {of} from 'rxjs';
import * as actions from '../shared/actions';
import {CommitService} from '../service/commit.service';
import {ICommitsGetResponse} from '../interfaces/ICommitsGetResponse';
import {ICommitsGetErrorResponse} from '../interfaces/ICommitsGetErrorResponse';
import {IDeltaTreeGetErrorResponse} from '../interfaces/IDeltaTreeGetErrorResponse';
import {IDeltaTreeGetResponse} from '../interfaces/IDeltaTreeGetResponse';
import {MetricService} from '../service/metric.service';
import {catchError, map, switchMap, mergeMap} from 'rxjs/operators';
import { IActionWithPayload } from '../interfaces/IActionWithPayload';
import { IAvailableMetricsGetResponse } from '../interfaces/IAvailableMetricsGetResponse';
import { IAvailableMetricsGetErrorResponse } from '../interfaces/IAvailableMetricsGetErrorResponse';
import { IMetric } from '../interfaces/IMetric';

@Injectable()
export class AppEffects {

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

    @Effect() loadAvailableMetricsEffects$ = this.actions$
        .ofType(actions.LOAD_AVAILABLE_METRICS)
        .pipe(
            switchMap(
                () => this.metricService.loadAvailableMetrics()
                    .pipe(
                        mergeMap((result: IAvailableMetricsGetResponse) => {
                            const availableMetrics = result._embedded.metricResourceList;
                            // TODO: Error handling when less than three metrics are available
                            return [
                                actions.loadAvailableMetricsSuccess(availableMetrics),
                                actions.setMetricMapping({
                                    heightMetricName: availableMetrics[0].metricName,
                                    groundAreaMetricName: availableMetrics[1].metricName,
                                    colorMetricName: availableMetrics[2].metricName
                                })
                            ];
                        }),
                        catchError((response: IAvailableMetricsGetErrorResponse) => {
                            return of(actions.loadAvailableMetricsError(response.error));
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

    constructor(
        private actions$: Actions<IActionWithPayload<any>>,
        private commitService: CommitService,
        private metricService: MetricService
    ) { }
}
