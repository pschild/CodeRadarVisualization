import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef} from '@angular/core';
import {ViewType} from '../../../enum/ViewType';
import {faSquare} from '@fortawesome/free-regular-svg-icons';

declare var $: any;

@Component({
    selector: 'app-view-control',
    templateUrl: './view-control.component.html',
    styleUrls: ['./view-control.component.scss']
})
export class ViewControlComponent implements OnInit {

    faSquare = faSquare;

    viewTypes: any = {
        split: ViewType.SPLIT,
        merged: ViewType.MERGED
    };

    @Input() activeViewType: ViewType;

    @Output() viewTypeChanged = new EventEmitter();

    @ViewChild('splitScreenLabel') splitScreenLabelRef: ElementRef;
    @ViewChild('fullScreenLabel') fullScreenLabelRef: ElementRef;

    constructor() {
    }

    ngOnInit() {
        $(this.splitScreenLabelRef.nativeElement).tooltip();
        $(this.fullScreenLabelRef.nativeElement).tooltip();
    }

    changeViewType(value) {
        this.viewTypeChanged.emit(value === 0 ? ViewType.SPLIT : ViewType.MERGED);
    }

}
