import {Component, OnInit} from '@angular/core';
import {ViewType} from "../../../enum/ViewType";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../../shared/reducers";
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

    constructor(private store: Store<fromRoot.AppState>) {
    }

    ngOnInit() {
        this.subscription = this.store.select(fromRoot.getActiveViewType).subscribe((activeViewType) => {
            this.activeViewType = activeViewType;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    changeViewType(value) {
        this.store.dispatch(changeViewType(value === 0 ? ViewType.SPLIT : ViewType.MERGED));
    }

}
