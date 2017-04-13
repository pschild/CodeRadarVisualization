import {Component, OnInit} from '@angular/core';
import * as fromRoot from "../../shared/reducers";
import {Store} from "@ngrx/store";
import {clearScreenshots, requestScreenshot} from "../control-panel.actions";
import {Subscription} from "rxjs";
import {ScreenType} from "../../enum/ScreenType";
declare var gifshot: any;

@Component({
    selector: 'app-screenshot',
    templateUrl: './screenshot.component.html',
    styleUrls: ['./screenshot.component.scss']
})
export class ScreenshotComponent implements OnInit {

    subscriptions: Subscription[] = [];

    constructor(private store: Store<fromRoot.AppState>) {
    }

    ngOnInit() {
        this.subscriptions.push(
            this.store.select(fromRoot.getScreenshots).subscribe((screenshots) => {
                if (screenshots.length > 0) {
                    this.generateGifs(screenshots);
                }
            })
        );
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }

    takeScreenshot() {
        this.store.dispatch(requestScreenshot());
    }

    generateGifs(screenshotObjects: any[]) {
        let screenshotsForLeftScreen = screenshotObjects.filter(screenshotObject => screenshotObject.screenType === ScreenType.LEFT).map(screenshotObject => screenshotObject.file);
        let screenshotsForRightScreen = screenshotObjects.filter(screenshotObject => screenshotObject.screenType === ScreenType.RIGHT).map(screenshotObject => screenshotObject.file);
        this.generateGif(screenshotsForLeftScreen, ScreenType.LEFT);
        this.generateGif(screenshotsForRightScreen, ScreenType.RIGHT);
    }

    generateGif(images: any[], screenType: ScreenType) {
        if (!images.length) {
            return;
        }

        gifshot.createGIF({
            images: images,
            interval: 1
        }, (obj) => {
            if (!obj.error) {
                let image = obj.image;
                let animatedImage = <HTMLImageElement>document.querySelector(screenType === ScreenType.LEFT ? '#left-gif' : '#right-gif');
                animatedImage.src = image;
            }
        });
    }

    removeScreenshots() {
        this.store.dispatch(clearScreenshots());
        (<HTMLImageElement>document.querySelector('#left-gif')).src = '';
        (<HTMLImageElement>document.querySelector('#right-gif')).src = '';
    }

}
