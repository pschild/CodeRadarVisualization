import {Component, OnInit} from '@angular/core';
import {ViewType} from "../../../enum/ViewType";
import {Store} from "@ngrx/store";
import {AppState} from "../../../shared/reducers";
import {Subscription} from "rxjs";
import {changeViewType} from "../settings.actions";

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

    activeViewType: ViewType;

    subscription: Subscription;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.subscription = this.store.select(state => state.settingsState)
            .subscribe((settingsState) => {
                this.activeViewType = settingsState.activeViewType;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    changeViewType(value) {
        this.store.dispatch(changeViewType(value === 0 ? ViewType.SPLIT : ViewType.MERGED));
    }

}
