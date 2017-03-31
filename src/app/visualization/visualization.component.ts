import {Component, OnInit} from '@angular/core';
import {ScreenType} from "../enum/ScreenType";
import {Subscription} from "rxjs";
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
        this.subscriptions.push(this.store.select(state => state.controlPanelState)
            .subscribe((controlPanelState) => {
                if (controlPanelState.commits.length >= 2 && controlPanelState.leftCommit && controlPanelState.rightCommit) {
                    this.store.dispatch(loadMetricTree(controlPanelState.leftCommit, controlPanelState.rightCommit));
                }
            })
        );

        this.subscriptions.push(this.store.select(state => state.visualizationState)
            .subscribe((visualizationState) => {
                this.metricsLoading = visualizationState.metricsLoading;
            })
        );
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }

}
