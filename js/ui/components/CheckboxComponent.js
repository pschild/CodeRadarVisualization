import * as PubSub from 'pubsub-js';

export class CheckboxComponent {

    constructor() {
        this.screenModeRadios = document.querySelectorAll('#control-group-screen input');
        this.cameraModeRadios = document.querySelectorAll('#control-group-camera input');

        this._bindEvents();
    }

    _bindEvents() {
        for (let radio of this.screenModeRadios) {
            radio.addEventListener('change', (event) => {
                let fullscreenEnabled = event.target.value == 'full';

                this._toggleCameraRadios(fullscreenEnabled);

                PubSub.publish('closeComparisonContainer');
                PubSub.publish('fullSplitToggle', { enabled: fullscreenEnabled });
            });
        }

        for (let radio of this.cameraModeRadios) {
            radio.addEventListener('change', (event) => {
                let syncEnabled = event.target.value == 'sync';
                PubSub.publish('synchronizeEnabledChange', { enabled: syncEnabled });
            });
        }
    }

    _toggleCameraRadios(enabled) {
        for (let radio of this.cameraModeRadios) {
            radio.disabled = enabled;
        }
    }
}