import {Component, OnInit} from '@angular/core';
import {AppState} from "../../shared/reducers";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    subscription: Subscription;
    searchTerm: string;
    uniqueFileList: string[] = [];

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.subscription = this.store.select(state => state.visualizationState)
            .subscribe((visualizationState) => {
                this.uniqueFileList = visualizationState.uniqueFileList;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    handleValueChanged(chosenItem: string) {
        console.log(chosenItem);
    }

    autocompleteListFormatter = (data: string) => {
        return data;
    }

}
