import {Component, OnInit} from '@angular/core';
import {TooltipService} from "../../service/tooltip.service";
import {Observable} from "rxjs/Observable";
import {MetricNameHelper} from "../../helper/metric-name-helper";
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {

    tooltipElement: HTMLElement;

    content$: Observable<{elementName: string, metrics: any}>;

    constructor(private tooltipService: TooltipService) {
    }

    ngOnInit() {
        this.tooltipElement = <HTMLElement>document.querySelector('#tooltip');

        this.content$ = this.tooltipService.tooltipContent$
            .pipe(
                map((tooltipObject) => {
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
                })
            );

        this.tooltipService.hideTooltip$.subscribe(() => {
            this.hide();
        });

        this.tooltipService.showTooltip$.subscribe(() => {
            this.show();
        });

        this.tooltipService.trackPosition$.subscribe((position) => {
            this.followPosition(position);
        });

    }

    followPosition(position: {x: number, y: number}) {
        this.tooltipElement.style.left = position.x + 15 + 'px';
        this.tooltipElement.style.top = position.y + 15 + 'px';
    }

    show() {
        this.tooltipElement.classList.add('visible');
    }

    hide() {
        this.tooltipElement.classList.remove('visible');
        this.tooltipElement.style.left = '-1000px';
        this.tooltipElement.style.top = '-1000px';
    }

}