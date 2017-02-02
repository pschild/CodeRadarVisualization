import {PopoverComponent} from '../components/PopoverComponent';
import * as PubSub from 'pubsub-js';

export class FilterComponent extends PopoverComponent {

    constructor(componentElement) {
        super(componentElement);

        this.fileVisibilityCheckboxes = componentElement.querySelectorAll('input');

        this._bindEvents();
    }

    _bindEvents() {
        super._bindEvents();

        for (let checkbox of this.fileVisibilityCheckboxes) {
            checkbox.addEventListener('change', (event) => {
                PubSub.publish('fileVisibilityChange', {
                    type: event.target.value,
                    enabled: event.target.checked
                });
            });
        }

        PubSub.subscribe('fullSplitToggle', (eventName, args) => {
            this._toggleVisibilityCheckboxes(!args.enabled);
        });
    }

    _toggleVisibilityCheckboxes(enabled) {
        for (let checkbox of this.fileVisibilityCheckboxes) {
            checkbox.disabled = enabled;
        }
    }
}