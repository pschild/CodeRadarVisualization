import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {ScreenType} from "../enum/ScreenType";
import {Store} from "@ngrx/store";
import * as fromRoot from "../shared/reducers";
import {addScreenshot, clearScreenshots} from "../control-panel/control-panel.actions";

@Injectable()
export class ScreenShotService {

    private screenShotRequestedSource = new Subject<string>();

    screenShotRequested$ = this.screenShotRequestedSource.asObservable();

    constructor(private store: Store<fromRoot.AppState>) {
    }

    requestScreenShot() {
        this.screenShotRequestedSource.next();
    }

    addScreenShot(screenShot: {screenType: ScreenType, file: string}) {
        this.store.dispatch(addScreenshot(screenShot));
    }

    clearScreenShots() {
        this.store.dispatch(clearScreenshots());
    }

    getScreenShots() {
        return this.store.select(fromRoot.getScreenshots);
    }
}
