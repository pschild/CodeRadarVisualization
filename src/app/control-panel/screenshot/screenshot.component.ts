import {Component, OnInit} from '@angular/core';
import * as fromRoot from "../../shared/reducers";
import {Store} from "@ngrx/store";
import {clearScreenshots, requestScreenshot} from "../control-panel.actions";
import {Subscription} from "rxjs";
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
                    this.generateGif(screenshots);
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

    generateGif(images: any[]) {
        gifshot.createGIF({
            images: images.map(image => image.file),
            interval: 1
        }, (obj) => {
            if (!obj.error) {
                let image = obj.image;

                if (!document.querySelector('#left-gif-placeholder img')) {
                    let animatedImage = document.createElement('img');
                    animatedImage.src = image;
                    document.querySelector('#left-gif-placeholder').appendChild(animatedImage);
                } else {
                    (<HTMLImageElement>document.querySelector('#left-gif-placeholder img')).src = image;
                }
            }
        });
    }

    removeScreenshots() {
        this.store.dispatch(clearScreenshots());
        if (document.querySelector('#left-gif-placeholder img')) {
            document.querySelector('#left-gif-placeholder img').remove();
        }
    }

}
