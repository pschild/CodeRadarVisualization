import {Interface} from './interface/Interface';
import {Screen} from './Screen';
import * as PubSub from 'pubsub-js';

export class Application {

    constructor() {
        this.SYNCHRONIZE_ENABLED = true;

        this.createInterface();
        this.initializeEventListeners();

        this.screens = {};
    }

    createLeftScreen(commitId) {
        this.screens['left'] = new Screen('left', commitId);
    }

    createRightScreen(commitId) {
        this.screens['right'] = new Screen('right', commitId);
    }

    getLeftScreen() {
        return this.screens['left'];
    }

    getRightScreen() {
        return this.screens['right'];
    }

    createInterface() {
        this.interface = new Interface();
    }

    initializeEventListeners() {
        PubSub.subscribe('commitChange', (eventName, args) => {
            console.log(args);
        });

        PubSub.subscribe('synchronizeEnabledChange', (eventName, args) => {
            if (args.enabled) {
                this.getLeftScreen().getControls().reset();
                this.getRightScreen().getControls().reset();
            }

            this.SYNCHRONIZE_ENABLED = args.enabled;
        });

        PubSub.subscribe('mouseMove', (eventName, args) => {
            if (args.screen == 'left') {
                this.getLeftScreen().getControls().enabled = true;
                this.getRightScreen().getControls().enabled = this.SYNCHRONIZE_ENABLED;

                this.getLeftScreen().getInteractionHandler().setEnabled(true);
                this.getRightScreen().getInteractionHandler().setEnabled(false);
            } else if (args.screen == 'right') {
                this.getLeftScreen().getControls().enabled = this.SYNCHRONIZE_ENABLED;
                this.getRightScreen().getControls().enabled = true;

                this.getLeftScreen().getInteractionHandler().setEnabled(false);
                this.getRightScreen().getInteractionHandler().setEnabled(true);
            }
        });
    }
}