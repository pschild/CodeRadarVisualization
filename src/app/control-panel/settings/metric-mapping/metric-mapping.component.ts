import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../shared/reducers";
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

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.metricNames = MetricNameHelper.getAll();

        this.subscription = this.store.select(state => state.settingsState)
            .subscribe((settingsState) => {
                this.metricMapping = settingsState.metricMapping;
            });
    }

    applyMetricMappings() {
        this.store.dispatch(setMetricMapping(this.metricMapping));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
