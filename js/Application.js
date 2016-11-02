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

    getScreen(name) {
        return this.screens[name];
    }

    createInterface() {
        this.interface = new Interface();
    }

    initializeEventListeners() {
        PubSub.subscribe('commitChange', (eventName, args) => {
            console.log(args);
        });

        PubSub.subscribe('synchronizeEnabledChange', (eventName, args) => {
            this.SYNCHRONIZE_ENABLED = args.enabled;
        });

        PubSub.subscribe('mouseMove', (eventName, args) => {
            if (args.screen == 'left') {
                this.screens['left'].getControls().enabled = true;
                this.screens['right'].getControls().enabled = this.SYNCHRONIZE_ENABLED;

                this.screens['left'].getInteractionHandler().setEnabled(true);
                this.screens['right'].getInteractionHandler().setEnabled(false);
            } else if (args.screen == 'right') {
                this.screens['left'].getControls().enabled = this.SYNCHRONIZE_ENABLED;
                this.screens['right'].getControls().enabled = true;

                this.screens['left'].getInteractionHandler().setEnabled(false);
                this.screens['right'].getInteractionHandler().setEnabled(true);
            }
        });
    }
}