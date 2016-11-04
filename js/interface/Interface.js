import * as PubSub from 'pubsub-js';

export class Interface {

    constructor() {
        this.bindEvents();
    }

    bindEvents() {
        document.querySelector('#synchronize-enabled-checkbox').addEventListener('change', (event) => {
            PubSub.publish('synchronizeEnabledChange', { enabled: event.target.checked });
        });

        document.querySelector('#first-commit-btn').addEventListener('click', () => {
            PubSub.publish('commitChange', { commit: 'abc123' });
        });

        document.querySelector('#second-commit-btn').addEventListener('click', () => {
            PubSub.publish('commitChange', { commit: 'def456' });
        });
    }
}