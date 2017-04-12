import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class ScreenshotService {

    private screenshots: any[] = [];

    private screenshotRequestedSource = new Subject<string>();

    screenshotRequested$ = this.screenshotRequestedSource.asObservable();

    requestScreenshot() {
        this.screenshotRequestedSource.next();
    }

    add(data: any) {
        this.screenshots.push(data);
    }

    getAll() {
        return this.screenshots;
    }

    clearAll() {
        this.screenshots = [];
    }

}
