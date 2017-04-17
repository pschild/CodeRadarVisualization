import {Component, OnInit} from '@angular/core';
import * as fromRoot from "../../shared/reducers";
import {Store} from "@ngrx/store";
import {clearScreenshots, requestScreenshot} from "../control-panel.actions";
import {Subscription} from "rxjs";
import {ScreenType} from "../../enum/ScreenType";
import {ViewType} from "../../enum/ViewType";
declare var gifshot: any;

@Component({
    selector: 'app-screenshot',
    templateUrl: './screenshot.component.html',
    styleUrls: ['./screenshot.component.scss']
})
export class ScreenshotComponent implements OnInit {

    subscriptions: Subscription[] = [];

    activeViewType: ViewType;

    viewTypes: any = {
        merged: ViewType.MERGED,
        split: ViewType.SPLIT
    };

    leftGifSource: string;
    rightGifSource: string;

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

        this.subscriptions.push(
            this.store.select(fromRoot.getActiveViewType).subscribe((activeViewType) => {
                this.activeViewType = activeViewType;
                this.removeScreenshots();
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
        this.generateGif(screenshotsForLeftScreen, ScreenType.LEFT);

        if (this.activeViewType === ViewType.SPLIT) {
            let screenshotsForRightScreen = screenshotObjects.filter(screenshotObject => screenshotObject.screenType === ScreenType.RIGHT).map(screenshotObject => screenshotObject.file);
            this.generateGif(screenshotsForRightScreen, ScreenType.RIGHT);
        }
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
                if (screenType === ScreenType.LEFT) {
                    this.leftGifSource = obj.image;
                } else if (screenType === ScreenType.RIGHT) {
                    this.rightGifSource = obj.image;
                } else {
                    throw new Error(`Unknown screentype ${screenType}`);
                }
            }
        });
    }

    removeScreenshots() {
        this.store.dispatch(clearScreenshots());
        this.leftGifSource = undefined;
        this.rightGifSource = undefined;
    }

}
