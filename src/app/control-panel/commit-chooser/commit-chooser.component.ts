import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../shared/reducers";
import {Subscription} from "rxjs";
import {Commit} from "../../domain/Commit";
import {changeCommit, loadCommits} from "../control-panel.actions";
import {CommitType} from "../../enum/CommitType";

@Component({
    selector: 'app-commit-chooser',
    templateUrl: './commit-chooser.component.html',
    styleUrls: ['./commit-chooser.component.scss']
})
export class CommitChooserComponent implements OnInit {

    subscription: Subscription;
    private loading: boolean = false;
    commits: Commit[];
    selected: Commit;

    @Input() commitType: CommitType;

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

    handleValueChanged(chosenModel: Commit) {
        this.store.dispatch(changeCommit(this.commitType, chosenModel));
    }

    autocompleteListFormatter = (data: any) => {
        return `${data.name.substr(0, 7)}, ${data.author}`;
    }

}
