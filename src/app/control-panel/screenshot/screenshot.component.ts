import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ScreenType} from "../../enum/ScreenType";
import {ViewType} from "../../enum/ViewType";
declare var gifshot: any;

@Component({
    selector: 'app-screenshot',
    templateUrl: './screenshot.component.html',
    styleUrls: ['./screenshot.component.scss']
})
export class ScreenshotComponent implements OnInit {

    @Input() activeViewType: ViewType;
    @Input() screenshots: any[];

    @Output() handleTakeScreenshot = new EventEmitter();
    @Output() handleRemoveScreenshots = new EventEmitter();

    screenTypes: any = {
        left: ScreenType.LEFT,
        right: ScreenType.RIGHT
    };

    gifSource: string;
    isGenerating: boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

    takeScreenshot() {
        this.handleTakeScreenshot.emit();
    }

    generateGif(screenType: ScreenType) {
        if (this.screenshots.length > 0) {
            let images = this.screenshots.filter(screenshotObject => screenshotObject.screenType === screenType).map(screenshotObject => screenshotObject.file);
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
    }

    removeScreenshots() {
        this.handleRemoveScreenshots.emit();
        this.gifSource = undefined;
    }

}
