import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IMetricMapping} from "../../../interfaces/IMetricMapping";
import {MetricNameHelper} from "../../../helper/metric-name-helper";

@Component({
    selector: 'app-metric-mapping',
    templateUrl: './metric-mapping.component.html',
    styleUrls: ['./metric-mapping.component.scss']
})
export class MetricMappingComponent implements OnInit {

    @Input() metricMapping: IMetricMapping;

    @Output() metricMappingChanged = new EventEmitter();

    metricNames: Object;

    constructor() {
    }

    ngOnInit() {
        this.metricNames = MetricNameHelper.getAll();
    }

    applyMetricMappings() {
        this.metricMappingChanged.emit();
    }

}
