import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IMetricMapping} from "../../../interfaces/IMetricMapping";
import {MetricNameHelper} from "../../../helper/metric-name-helper";
declare var $: any;

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

        // prevent bootstrap dropdown from being closed by clicking on its content
        $(document).on('click', '#metric-mapping-dropdown', function (e) {
            // if the button is clicked, the popup does need to be closed, so exclude the button from this exception...
            if (e.target.tagName !== 'BUTTON') {
                e.stopPropagation();
            }
        });
    }

    applyMetricMappings() {
        this.metricMappingChanged.emit();
    }

}
