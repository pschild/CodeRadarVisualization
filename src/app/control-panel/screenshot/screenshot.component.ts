import {Component, OnInit} from '@angular/core';
import {ScreenshotService} from "../../service/screenshot.service";
import {ScreenType} from "../../enum/ScreenType";
declare var gifshot: any;

@Component({
    selector: 'app-screenshot',
    templateUrl: './screenshot.component.html',
    styleUrls: ['./screenshot.component.scss']
})
export class ScreenshotComponent implements OnInit {

    constructor(private screenshotService: ScreenshotService) {
    }

    ngOnInit() {
    }

    takeScreenshot() {
        this.screenshotService.requestScreenshot();
        this.generateGif();
    }

    generateGif() {
        gifshot.createGIF({
            images: this.screenshotService.getAll().filter(data => data.screenType === ScreenType.LEFT).map(data => data.file),
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
        this.screenshotService.clearAll();
        if (document.querySelector('#left-gif-placeholder img')) {
            document.querySelector('#left-gif-placeholder img').remove();
        }
    }

}
