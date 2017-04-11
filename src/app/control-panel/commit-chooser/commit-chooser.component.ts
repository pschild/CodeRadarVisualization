import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromRoot from "../../shared/reducers";
import {Observable, Subscription} from "rxjs";
import {Commit} from "../../domain/Commit";
import {changeCommit, loadCommits} from "../control-panel.actions";
import {CommitType} from "../../enum/CommitType";
import * as moment from 'moment';

@Component({
    selector: 'app-commit-chooser',
    templateUrl: './commit-chooser.component.html',
    styleUrls: ['./commit-chooser.component.scss']
})
export class CommitChooserComponent implements OnInit {

    subscription: Subscription;
    loading$: Observable<boolean>;
    commits: Commit[];
    selected: Commit;

    @Input() commitType: CommitType;

    constructor(private store: Store<fromRoot.AppState>) {
    }

    ngOnInit() {
        this.loading$ = this.store.select(fromRoot.getCommitsLoading);

        this.subscription = this.store.select(fromRoot.getCommits).subscribe((commits) => {
            this.commits = commits;
        });

        this.store.dispatch(loadCommits());
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    handleValueChanged(chosenModel: Commit) {
        this.store.dispatch(changeCommit(this.commitType, chosenModel));
    }

    formatCommit(data: any): string {
        let formattedDateAndTime = moment(data.timestamp).format('DD.MM.YYYY HH:mm');
        return `${formattedDateAndTime}, ${data.author}, ${data.name.substr(0, 7)}`;
    }

}
