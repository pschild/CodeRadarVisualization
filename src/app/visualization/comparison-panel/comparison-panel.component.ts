import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromRoot from "../../shared/reducers";
import {Subscription} from "rxjs/Subscription";
import {ElementAnalyzer} from "../../helper/element-analyzer";
import {ICommit} from "../../interfaces/ICommit";
import {IMetricMapping} from "../../interfaces/IMetricMapping";
import {INode} from "../../interfaces/INode";
import {FocusService} from "../../service/focus.service";
import {MetricNameHelper} from "../../helper/metric-name-helper";

@Component({
    selector: 'app-comparison-panel',
    templateUrl: './comparison-panel.component.html',
    styleUrls: ['./comparison-panel.component.scss']
})
export class ComparisonPanelComponent implements OnInit {

    comparisonPanel: HTMLElement;

    subscriptions: Subscription[] = [];

    metricTree: any;
    metricMapping: IMetricMapping;
    tableRows: any[] = [];

    elementName: string;
    foundElement: INode;
    leftCommit: ICommit;
    rightCommit: ICommit;

    constructor(
        private store: Store<fromRoot.AppState>,
        private focusService: FocusService) {
    }

    ngOnInit() {
        this.comparisonPanel = <HTMLElement>document.querySelector('#comparison-panel');

        this.subscriptions.push(
            this.focusService.elementFocussed$.subscribe((elementName) => {
                this.elementName = elementName;
                this.foundElement = ElementAnalyzer.findElementByName(this.metricTree, elementName);
                this.prepareTableData();
                this.show();
            })
        );

        this.subscriptions.push(
            this.store.select(fromRoot.getLeftAndRightCommit).subscribe((result) => {
                if (result) {
                    this.leftCommit = result.leftCommit;
                    this.rightCommit = result.rightCommit;
                }
            })
        );

        this.subscriptions.push(
            this.store.select(fromRoot.getMetricMapping).subscribe((metricMapping) => {
                this.metricMapping = metricMapping;
            })
        );

        this.subscriptions.push(
            this.store.select(fromRoot.getMetricTree).subscribe((metricTree) => {
                this.metricTree = metricTree;
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

    prepareTableData() {
        let rows = [];
        for (let key of Object.keys(this.metricMapping)) {
            let metricName = this.metricMapping[key];

            let leftCommitValue;
            if (this.foundElement.commit1Metrics && this.foundElement.commit1Metrics[metricName]) {
                leftCommitValue = this.foundElement.commit1Metrics[metricName];
            }

            let rightCommitValue;
            if (this.foundElement.commit2Metrics && this.foundElement.commit2Metrics[metricName]) {
                rightCommitValue = this.foundElement.commit2Metrics[metricName];
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
