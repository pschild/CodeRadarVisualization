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
        var date = new Date();
        return [
            date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
            '-',
            date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
            '-',
            date.getFullYear(),
            '_',
            date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
            '-',
            date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
            '-',
            date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        ].join('');
    }
}