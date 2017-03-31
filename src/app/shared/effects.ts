import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from "rxjs";
import * as actions from '../shared/actions';
import {CommitService} from "../control-panel/commit-chooser/commit.service";
import {ICommitsGetResponse} from "../domain/ICommitsGetResponse";
import {ICommitsGetErrorResponse} from "../domain/ICommitsGetErrorResponse";

@Injectable()
export class AppEffects {

    constructor(private actions$: Actions, private commitService: CommitService) { }

    @Effect() loadCommitsEffects$ = this.actions$
        .ofType(actions.LOAD_COMMITS)
        .switchMap(
            () => this.commitService.loadCommits()
                .map((result: ICommitsGetResponse) => {
                    return actions.loadCommitsSuccess(result._embedded.commitResourceList);
                })
                .catch((response: ICommitsGetErrorResponse) => {
                    return Observable.of(actions.loadCommitsError(response.error));
                })
        );
}