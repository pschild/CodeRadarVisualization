import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromRoot from "../../../shared/reducers";
import {Subscription} from "rxjs";
import {setMetricMapping} from "../settings.actions";
import {IMetricMapping} from "../../../domain/IMetricMapping";
import {MetricNameHelper} from "../../../helper/metric-name-helper";

@Component({
    selector: 'app-metric-mapping',
    templateUrl: './metric-mapping.component.html',
    styleUrls: ['./metric-mapping.component.scss']
})
export class MetricMappingComponent implements OnInit {

    metricMapping: IMetricMapping;
    metricNames: Object;

    subscription: Subscription;

    constructor(private store: Store<fromRoot.AppState>) {
    }

    ngOnInit() {
        this.metricNames = MetricNameHelper.getAll();

        this.subscription = this.store.select(fromRoot.getMetricMapping).subscribe((metricMapping) => {
            this.metricMapping = metricMapping;
        });
    }

    applyMetricMappings() {
        this.store.dispatch(setMetricMapping(this.metricMapping));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
