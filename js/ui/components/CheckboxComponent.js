import * as PubSub from 'pubsub-js';

export class CheckboxComponent {

    constructor() {
        this.screenModeRadios = document.querySelectorAll('#control-group-screen input');
        this.cameraModeRadios = document.querySelectorAll('#control-group-camera input');
        this.colorModeRadios = document.querySelectorAll('#control-group-color input');
        // this.fileVisibilityCheckboxes = document.querySelectorAll('#control-group-visible-files input');

        this._bindEvents();
    }

    _bindEvents() {
        for (let radio of this.screenModeRadios) {
            radio.addEventListener('change', (event) => {
                let fullscreenEnabled = event.target.value == 'full';

                this._toggleCameraRadios(fullscreenEnabled);
                this._toggleColorRadios(fullscreenEnabled);
                // this._toggleVisibilityCheckboxes(!fullscreenEnabled);

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

        for (let radio of this.colorModeRadios) {
            radio.addEventListener('change', (event) => {
                PubSub.publish('colorcodeChange', { colorcode: event.target.value });
            });
        }

        // for (let checkbox of this.fileVisibilityCheckboxes) {
        //     checkbox.addEventListener('change', (event) => {
        //         PubSub.publish('fileVisibilityChange', {
        //             type: event.target.value,
        //             enabled: event.target.checked
        //         });
        //     });
        // }
    }

    _toggleCameraRadios(enabled) {
        for (let radio of this.cameraModeRadios) {
            radio.disabled = enabled;
        }
    }

    _toggleColorRadios(enabled) {
        for (let radio of this.colorModeRadios) {
            radio.disabled = enabled;
        }
    }

    // _toggleVisibilityCheckboxes(enabled) {
    //     for (let checkbox of this.fileVisibilityCheckboxes) {
    //         checkbox.disabled = enabled;
    //     }
    // }
}