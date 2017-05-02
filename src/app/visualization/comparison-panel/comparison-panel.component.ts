import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromRoot from "../../shared/reducers";
import {Subscription} from "rxjs/Subscription";
import {ICommit} from "../../interfaces/ICommit";
import {IMetricMapping} from "../../interfaces/IMetricMapping";
import {INode} from "../../interfaces/INode";
import {MetricNameHelper} from "../../helper/metric-name-helper";
import {ComparisonPanelService} from "../../service/comparison-panel.service";

@Component({
    selector: 'app-comparison-panel',
    templateUrl: './comparison-panel.component.html',
    styleUrls: ['./comparison-panel.component.scss']
})
export class ComparisonPanelComponent implements OnInit {

    @Input() metricMapping: IMetricMapping;
    @Input() leftCommit: ICommit;
    @Input() rightCommit: ICommit;

    comparisonPanel: HTMLElement;

    subscriptions: Subscription[] = [];

    tableRows: any[] = [];

    elementName: string;

    constructor(
        private store: Store<fromRoot.AppState>,
        private comparisonPanelService: ComparisonPanelService) {
    }

    ngOnInit() {
        this.comparisonPanel = <HTMLElement>document.querySelector('#comparison-panel');

        this.subscriptions.push(
            this.comparisonPanelService.showComparisonPanel$.subscribe((params) => {
                this.elementName = params.elementName;
                this.prepareTableData(params.foundElement);
                this.show();
            })
        );

        this.subscriptions.push(
            this.comparisonPanelService.hideComparisonPanel$.subscribe(() => {
                this.hide();
            })
        );
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }

    handleClose() {
        this.hide();
    }

    prepareTableData(foundElement: INode) {
        let rows = [];
        for (let key of Object.keys(this.metricMapping)) {
            let metricName = this.metricMapping[key];

            let leftCommitValue;
            if (foundElement.commit1Metrics && foundElement.commit1Metrics[metricName]) {
                leftCommitValue = foundElement.commit1Metrics[metricName];
            }

            let rightCommitValue;
            if (foundElement.commit2Metrics && foundElement.commit2Metrics[metricName]) {
                rightCommitValue = foundElement.commit2Metrics[metricName];
            }

            let difference: number = 0;
            if (leftCommitValue && rightCommitValue) {
                difference = rightCommitValue - leftCommitValue;
            }

            rows.push({
                metricName: MetricNameHelper.getShortNameByFullName(metricName),
                leftCommitValue: leftCommitValue || 'N/A',
                rightCommitValue: rightCommitValue || 'N/A',
                difference: difference
            });
        }
        this.tableRows = rows;
    }

    show() {
        this.comparisonPanel.classList.add('open');
    }

    hide() {
        this.comparisonPanel.classList.remove('open');
    }

}
