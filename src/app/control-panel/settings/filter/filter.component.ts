import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../shared/reducers";
import {IFilter} from "app/domain/IFilter";
import {changeActiveFilter} from "../settings.actions";
declare var $: any;

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

    activeFilter: IFilter;

    subscription: Subscription;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.subscription = this.store.select(state => state.settingsState)
            .subscribe((settingsState) => {
                this.activeFilter = settingsState.activeFilter;
            });

        // prevent bootstrap dropdown from being closed by clicking on its content
        $(document).on('click', '.dropdown-menu', function (e) {
            e.stopPropagation();
        });
    }

    handleFilterChanged() {
        this.store.dispatch(changeActiveFilter(this.activeFilter));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
