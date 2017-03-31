import {Component, OnInit} from '@angular/core';
import {SettingsState} from "./settings.reducers";
import {Store} from "@ngrx/store";
import {AppState} from "../../shared/reducers";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    settingsState: SettingsState;

    subscription: Subscription;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.subscription = this.store.select(state => state.settingsState)
            .subscribe((settingsState) => {
                this.settingsState = settingsState;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
