import * as PubSub from 'pubsub-js';

export class Interface {

    constructor() {
        this.bindEvents();
    }

    bindEvents() {
        document.getElementById('first-commit-btn').addEventListener('click', () => {
            PubSub.publish('commitChange', { commit: 1 });
        });

        document.getElementById('second-commit-btn').addEventListener('click', () => {
            PubSub.publish('commitChange', { commit: 50 });
        });
    }
}