import {Component, Input, OnInit} from '@angular/core';
import {ViewType} from '../../enum/ViewType';
import {AppConfig} from '../../AppConfig';
import { IMetric } from '../../interfaces/IMetric';
import {faArrowsAltV, faArrowsAlt, faPalette} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../shared/reducers';
import { IMetricMapping } from '../../interfaces/IMetricMapping';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-legend',
    templateUrl: './legend.component.html',
    styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit {

    @Input() activeViewType: ViewType;
    
    metricMapping$: Observable<IMetricMapping>;
    heightMetric: IMetric;
    groundAreaMetric: IMetric;
    colorMetric: IMetric;

    faArrowsAltV = faArrowsAltV;
    faArrowsAlt = faArrowsAlt;
    faPalette = faPalette;

    colorFirstCommit: string;
    colorSecondCommit: string;
    colorAddedFile: string;
    colorDeletedFile: string;
    colorUnchangedFile: string;

    viewTypes: any = {
        split: ViewType.SPLIT,
        merged: ViewType.MERGED
    };

    legendItemCommit1: HTMLElement;
    legendItemCommit2: HTMLElement;
    legendItemColorCode: HTMLElement;
    legendItemAddedFiles: HTMLElement;
    legendItemDeletedFiles: HTMLElement;
    legendItemUnchangedFiles: HTMLElement;

    constructor(private store: Store<fromRoot.AppState>) {
    }

    ngOnInit() {
        this.metricMapping$ = this.store.select(fromRoot.getMetricMapping);
        this.metricMapping$.subscribe(metricMapping => {
            this.heightMetric = AppConfig.getShortNameByMetricName(metricMapping.heightMetricName);
            this.groundAreaMetric = AppConfig.getShortNameByMetricName(metricMapping.groundAreaMetricName);
            this.colorMetric = AppConfig.getShortNameByMetricName(metricMapping.colorMetricName);
        });

        this.colorFirstCommit = AppConfig.COLOR_FIRST_COMMIT;
        this.colorSecondCommit = AppConfig.COLOR_SECOND_COMMIT;
        this.colorAddedFile = AppConfig.COLOR_ADDED_FILE;
        this.colorDeletedFile = AppConfig.COLOR_DELETED_FILE;
        this.colorUnchangedFile = AppConfig.COLOR_UNCHANGED_FILE;

        this.legendItemCommit1 = <HTMLElement>document.querySelector('#legend-item-commit-1');
        this.legendItemCommit2 = <HTMLElement>document.querySelector('#legend-item-commit-2');
        this.legendItemColorCode = <HTMLElement>document.querySelector('#legend-item-color-code');
        this.legendItemAddedFiles = <HTMLElement>document.querySelector('#legend-item-added-files');
        this.legendItemDeletedFiles = <HTMLElement>document.querySelector('#legend-item-deleted-files');
        this.legendItemUnchangedFiles = <HTMLElement>document.querySelector('#legend-item-unchanged-files');
    }
}
