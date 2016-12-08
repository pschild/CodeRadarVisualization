import * as PubSub from 'pubsub-js';

export class CheckboxComponent {

    constructor() {
        this.screenModeRadios = document.querySelectorAll('#control-group-screen input');

        this.synchronizeCheckbox = document.querySelector('#synchronize-enabled-checkbox');
        this.colorcodeCheckbox = document.querySelector('#colorcode-checkbox');
        this.unchangedFilesCheckbox = document.querySelector('#unchanged-files-checkbox');

        this._bindEvents();
    }

    _bindEvents() {
        for (let radio of this.screenModeRadios) {
            radio.addEventListener('change', (event) => {
                let fullscreenEnabled = event.target.value == 'full';

                this.synchronizeCheckbox.disabled = fullscreenEnabled;
                this.colorcodeCheckbox.disabled = fullscreenEnabled;
                this.unchangedFilesCheckbox.disabled = !fullscreenEnabled;

                PubSub.publish('closeComparisonContainer');
                PubSub.publish('fullSplitToggle', { enabled: fullscreenEnabled });
            });
        }

        this.synchronizeCheckbox.addEventListener('change', (event) => {
            PubSub.publish('synchronizeEnabledChange', { enabled: event.target.checked });
        });

        this.colorcodeCheckbox.addEventListener('change', (event) => {
            PubSub.publish('colorcodeChange', { colorcode: event.target.checked ? 'commit' : 'metric' });
        });

        this.unchangedFilesCheckbox.addEventListener('change', (event) => {
            PubSub.publish('unchangedFilesChange', { enabled: event.target.checked });
        });
    }
}