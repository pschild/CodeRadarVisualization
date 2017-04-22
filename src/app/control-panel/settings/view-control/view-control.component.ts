import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ViewType} from "../../../enum/ViewType";

@Component({
    selector: 'app-view-control',
    templateUrl: './view-control.component.html',
    styleUrls: ['./view-control.component.scss']
})
export class ViewControlComponent implements OnInit {

    viewTypes: any = {
        split: ViewType.SPLIT,
        merged: ViewType.MERGED
    };

    @Input() activeViewType: ViewType;

    @Output() viewTypeChanged = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    changeViewType(value) {
        this.viewTypeChanged.emit(value === 0 ? ViewType.SPLIT : ViewType.MERGED);
    }

}
