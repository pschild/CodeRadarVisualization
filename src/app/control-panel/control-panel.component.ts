import {Component, OnInit} from "@angular/core";
import {CommitType} from "../enum/CommitType";
import {Store} from "@ngrx/store";
import * as fromRoot from "../shared/reducers";
import {changeCommit, loadCommits} from "./control-panel.actions";
import {ICommit} from "../domain/ICommit";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'app-control-panel',
    templateUrl: './control-panel.component.html',
    styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {

    commitTypes: any = {
        left: CommitType.LEFT,
        right: CommitType.RIGHT
    };

    commits$: Observable<ICommit[]>;
    leftCommit$: Observable<ICommit>;
    rightCommit$: Observable<ICommit>;
    commitsLoading$: Observable<boolean>;

    constructor(private store: Store<fromRoot.AppState>) {
    }

    ngOnInit() {
        this.store.dispatch(loadCommits());

        this.commits$ = this.store.select(fromRoot.getCommits);
        this.commitsLoading$ = this.store.select(fromRoot.getCommitsLoading);
        this.leftCommit$ = this.store.select(fromRoot.getLeftCommit);
        this.rightCommit$ = this.store.select(fromRoot.getRightCommit);
    }

    handleCommitChanged(payload: {commitType: CommitType, commit: ICommit}) {
        this.store.dispatch(changeCommit(payload.commitType, payload.commit));
    }

}
