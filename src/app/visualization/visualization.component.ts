import {Component, OnInit} from '@angular/core';
import {ScreenType} from "../enum/ScreenType";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromRoot from "../shared/reducers";
import {loadMetricTree} from "./visualization.actions";
import {ViewType} from "../enum/ViewType";
import {IFilter} from "../interfaces/IFilter";
import {INode} from "../interfaces/INode";
import {IMetricMapping} from "../interfaces/IMetricMapping";
import {ElementAnalyzer} from "../helper/element-analyzer";
import {MetricNameHelper} from "../helper/metric-name-helper";

@Component({
    selector: 'app-visualization',
    templateUrl: './visualization.component.html',
    styleUrls: ['./visualization.component.scss']
})
export class VisualizationComponent implements OnInit {

    metricsLoading$: Observable<boolean>;
    activeViewType$: Observable<ViewType>;
    activeFilter$: Observable<IFilter>;
    metricTree$: Observable<INode>;
    colorMetricName$: Observable<string>;

    subscriptions: Subscription[] = [];

    screenTypes: any = {
        left: ScreenType.LEFT,
        right: ScreenType.RIGHT
    };

    constructor(private store: Store<fromRoot.AppState>) {
    }

    ngOnInit() {
        this.metricsLoading$ = this.store.select(fromRoot.getMetricsLoading);
        this.activeViewType$ = this.store.select(fromRoot.getActiveViewType);
        this.activeFilter$ = this.store.select(fromRoot.getActiveFilter);
        this.metricTree$ = this.store.select(fromRoot.getMetricTree);
        this.colorMetricName$ = this.store.select(fromRoot.getMetricMapping)
            .map(metricMapping => metricMapping.colorMetricName)
            .map(colorMetricName => MetricNameHelper.getShortNameByFullName(colorMetricName));

        this.subscriptions.push(
            Observable.combineLatest(this.store.select(fromRoot.getLeftCommit), this.store.select(fromRoot.getRightCommit), this.store.select(fromRoot.getMetricMapping))
                .filter(([leftCommit, rightCommit, metricMapping]) => !!leftCommit && !!rightCommit)
                .subscribe(([leftCommit, rightCommit, metricMapping]) => {
                    this.store.dispatch(loadMetricTree(leftCommit, rightCommit, metricMapping));
                })
        );
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }

}
