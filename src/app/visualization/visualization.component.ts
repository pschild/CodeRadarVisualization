import {Component, OnInit} from '@angular/core';
import {ScreenType} from "../enum/ScreenType";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../shared/reducers";
import {loadMetricTree} from "./visualization.actions";

@Component({
    selector: 'app-visualization',
    templateUrl: './visualization.component.html',
    styleUrls: ['./visualization.component.scss']
})
export class VisualizationComponent implements OnInit {

    metricsLoading: boolean = false;

    subscriptions: Subscription[] = [];

    screenTypes: any = {
        left: ScreenType.LEFT,
        right: ScreenType.RIGHT
    };

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.subscriptions.push(this.store.select(state => state.visualizationState)
            .subscribe((visualizationState) => {
                this.metricsLoading = visualizationState.metricsLoading;
            })
        );

        // combine states as we need information from all of them at the same time
        let states = Observable.combineLatest(
            this.store.select(state => state.controlPanelState),
            this.store.select(state => state.settingsState
        ), (controlPanelState, settingsState) => {
            return {
                controlPanelState: controlPanelState,
                settingsState: settingsState
            };
        });

        this.subscriptions.push(
            states.subscribe((result) => {
                if (
                    result.controlPanelState.commits.length >= 2
                    && result.controlPanelState.leftCommit
                    && result.controlPanelState.rightCommit
                ) {
                    this.store.dispatch(loadMetricTree(result.controlPanelState.leftCommit, result.controlPanelState.rightCommit, result.settingsState.metricMapping));
                }
            })
        );
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }

}
