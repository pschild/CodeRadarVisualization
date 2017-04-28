import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IFilter} from "app/interfaces/IFilter";
declare var $: any;

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
        // prevent bootstrap dropdown from being closed by clicking on its content
        $(document).on('click', '#filter-dropdown', function (e) {
            e.stopPropagation();
        });
    }

    handleFilterChanged() {
        this.filterChanged.emit(this.activeFilter);
    }

}
