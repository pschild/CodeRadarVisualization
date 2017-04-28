import {Component, Input, OnInit} from '@angular/core';
import {ViewType} from "../../enum/ViewType";
import {AppConfig} from "../../AppConfig";

@Component({
    selector: 'app-legend',
    templateUrl: './legend.component.html',
    styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit {

    @Input() activeViewType: ViewType;
    @Input() colorMetricName: string;

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

    constructor() {
    }

    ngOnInit() {
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
