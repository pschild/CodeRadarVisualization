import {Component, OnInit} from '@angular/core';
import {TooltipService} from "../../service/tooltip.service";
import {Observable} from "rxjs/Observable";
import {MetricNameHelper} from "../../helper/metric-name-helper";

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {

    content$: Observable<{elementName: string, metrics: any}>;

    constructor(private tooltipService: TooltipService) {
    }

    ngOnInit() {
        this.content$ = this.tooltipService.tooltipContent$
            .map((tooltipObject) => {
                let readableMetrics = {};

                if (tooltipObject.metrics) {
                    Object.keys(tooltipObject.metrics).map((key) => {
                        readableMetrics[MetricNameHelper.getShortNameByFullName(key)] = tooltipObject.metrics[key];
                    });
                }

                return {
                    elementName: tooltipObject.elementName,
                    metrics: readableMetrics
                };
            });
    }

}
