import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../../shared/reducers";
import {IFilter} from "app/domain/IFilter";
import {changeActiveFilter} from "../settings.actions";

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

    activeFilter: IFilter;

    subscription: Subscription;

    constructor(private store: Store<fromRoot.AppState>) {
    }

    ngOnInit() {
        this.subscription = this.store.select(fromRoot.getActiveFilter).subscribe((activeFilter) => {
            this.activeFilter = activeFilter;
        });
    }

    handleFilterChanged() {
        this.store.dispatch(changeActiveFilter(this.activeFilter));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
