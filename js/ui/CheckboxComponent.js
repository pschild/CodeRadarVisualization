import * as PubSub from 'pubsub-js';

export class CheckboxComponent {

    constructor() {
        this.fullscreenCheckbox = document.querySelector('#fullscreen-enabled-checkbox');
        this.synchronizeCheckbox = document.querySelector('#synchronize-enabled-checkbox');
        this.colorcodeCheckbox = document.querySelector('#colorcode-checkbox');
        this.unchangedFilesCheckbox = document.querySelector('#unchanged-files-checkbox');

        this._bindEvents();
    }

    _bindEvents() {
        this.fullscreenCheckbox.addEventListener('change', (event) => {
            this.synchronizeCheckbox.disabled = event.target.checked;
            this.colorcodeCheckbox.disabled = event.target.checked;
            this.unchangedFilesCheckbox.disabled = !event.target.checked;

            PubSub.publish('closeComparisonContainer');
            PubSub.publish('fullSplitToggle', { enabled: event.target.checked });
        });

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