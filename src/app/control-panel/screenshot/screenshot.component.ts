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

    screenTypes: any = {
        left: ScreenType.LEFT,
        right: ScreenType.RIGHT
    };

    viewTypes: any = {
        merged: ViewType.MERGED,
        split: ViewType.SPLIT
    };

    gifSource: string;

    isGenerating: boolean = false;

    constructor(private store: Store<fromRoot.AppState>) {
    }

    ngOnInit() {
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

    generateGif(screenType: ScreenType) {
        this.store.select(fromRoot.getScreenshots).subscribe((screenshots) => {
            if (screenshots.length > 0) {
                let images = screenshots.filter(screenshotObject => screenshotObject.screenType === screenType).map(screenshotObject => screenshotObject.file);
                if (!images.length) {
                    return;
                }

                this.isGenerating = true;
                gifshot.createGIF({
                    images: images,
                    interval: 1,
                    gifWidth: this.activeViewType === ViewType.SPLIT ? window.innerWidth / 2 : window.innerWidth,
                    gifHeight: window.innerHeight
                }, (obj) => {
                    if (!obj.error) {
                        this.gifSource = obj.image;
                    }

                    this.isGenerating = false;
                });
            } else {
                alert(`Es wurden keine gespeicherten Screenshots gefunden.`);
            }
        }).unsubscribe();
    }

    removeScreenshots() {
        this.store.dispatch(clearScreenshots());
        this.gifSource = undefined;
    }

}
