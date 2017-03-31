import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../shared/reducers";
import {Subscription} from "rxjs";
import {Commit} from "../../domain/Commit";
import {loadCommits} from "../control-panel.actions";

@Component({
    selector: 'app-commit-chooser',
    templateUrl: './commit-chooser.component.html',
    styleUrls: ['./commit-chooser.component.scss']
})
export class CommitChooserComponent implements OnInit {

    subscription: Subscription;
    private loading: boolean = false;
    commits: Commit[];

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.subscription = this.store.select(state => state.controlPanelState)
            .subscribe((controlPanelState) => {
                this.loading = controlPanelState.commitsLoading;
                this.commits = controlPanelState.commits;
            });

        this.store.dispatch(loadCommits());
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    autocompleListFormatter = (data: any) => {
        return `${data.name.substr(0, 7)}, ${data.author}`;
    }

}
