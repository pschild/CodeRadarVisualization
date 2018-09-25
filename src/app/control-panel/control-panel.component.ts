import {Component, OnInit} from '@angular/core';
import {CommitType} from '../enum/CommitType';
import {Store} from '@ngrx/store';
import * as fromRoot from '../shared/reducers';
import {changeCommit, loadCommits} from './control-panel.actions';
import {ICommit} from '../interfaces/ICommit';
import {Observable} from 'rxjs/Observable';
import {ViewType} from '../enum/ViewType';
import {ScreenShotService} from '../service/screenshot.service';
import {FocusService} from '../service/focus.service';

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

    uniqueFileList$: Observable<string[]>;

    activeViewType$: Observable<ViewType>;
    screenShots$: Observable<any[]>;

    constructor(private store: Store<fromRoot.AppState>, private screenShotService: ScreenShotService, private focusService: FocusService) {
    }

    ngOnInit() {
        this.store.dispatch(loadCommits());

        this.commits$ = this.store.select(fromRoot.getCommits);
        this.commitsLoading$ = this.store.select(fromRoot.getCommitsLoading);
        this.leftCommit$ = this.store.select(fromRoot.getLeftCommit);
        this.rightCommit$ = this.store.select(fromRoot.getRightCommit);

        this.uniqueFileList$ = this.store.select(fromRoot.getUniqueFileList);

        this.activeViewType$ = this.store.select(fromRoot.getActiveViewType);
        this.screenShots$ = this.screenShotService.getScreenShots();
    }

    handleCommitChanged(payload: {commitType: CommitType, commit: ICommit}) {
        this.store.dispatch(changeCommit(payload.commitType, payload.commit));
    }

    handleSearchStarted(chosenItem: string) {
        this.focusService.focusElement(chosenItem);
    }

    handleTakeScreenshot() {
        this.screenShotService.requestScreenShot();
    }

    handleRemoveScreenshots() {
        this.screenShotService.clearScreenShots();
    }

}
