import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IFilter} from "app/interfaces/IFilter";

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

    @Input() activeFilter: IFilter;

    @Output() filterChanged = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    handleFilterChanged() {
        this.filterChanged.emit(this.activeFilter);
    }

}
