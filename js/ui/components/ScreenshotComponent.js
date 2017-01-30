import {DatetimeFormatter} from '../../util/DatetimeFormatter';

export class ScreenshotComponent {

    constructor(application) {
        this._application = application;

        this.screenshotButton = document.querySelector('#screenshot-btn');

        this._bindEvents();
    }

    _bindEvents() {
        this.screenshotButton.addEventListener('click', () => {
            var downloads = [];

            // decide if we need to download one or two screenshots
            if (!this._application.getIsFullscreen()) {
                downloads.push({ commitInfo: this._application.getLeftScreen().getCommitId().substr(0, 5), renderer: this._application.getLeftScreen().getRenderer() });
                downloads.push({ commitInfo: this._application.getRightScreen().getCommitId().substr(0, 5), renderer: this._application.getRightScreen().getRenderer() });
            } else {
                downloads.push({
                    commitInfo: this._application.getLeftScreen().getCommitId().substr(0, 5) + '_' + this._application.getRightScreen().getCommitId().substr(0, 5),
                    renderer: this._application.getLeftScreen().getRenderer()
                });
            }

            for (let download of downloads) {
                var imgFromCanvas = download.renderer.domElement.toDataURL('image/png');
                var pngFile = imgFromCanvas.replace(/^data:image\/png/, 'data:application/octet-stream');

                var link = document.querySelector('#screenshot-link');
                link.download = this._getDateTimeAsString() + '_' + download.commitInfo + '.png';
                link.href = pngFile;
                link.click(); // execute hidden link to trigger download
            }
        });
    }

    _getDateTimeAsString() {
        return new DatetimeFormatter()
            .withDateSeparator('-')
            .withTimeSeparator('-')
            .withDatetimeSeparator('_')
            .withShowSeconds(false)
            .formatDate();
    }
}