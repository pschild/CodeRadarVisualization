import {Interface} from './interface/Interface';
import {Screen} from './Screen';
import {CoderadarMetricService} from './service/CoderadarMetricService';
import {DummyMetricService} from './service/DummyMetricService';
import {CommitService} from './service/CommitService';
import {CommitMapper} from './domain/CommitMapper';
import {CommitMerger} from './CommitMerger';
import * as PubSub from 'pubsub-js';

export class Application {

    constructor() {
        this.SYNCHRONIZE_ENABLED = true;

        this.createInterface();
        this.initializeEventListeners();

        this.leftCommitId = undefined;
        this.rightCommitId = undefined;

        this.screens = {};
        this.createLeftScreen();
        this.createRightScreen();
    }

    initialize() {
        var commitService = new CommitService();
        // FIRST: load commits
        commitService.load((data) => {
            var commitMapper = new CommitMapper(data);
            commitMapper.mapAll();

            PubSub.publish('commitsLoaded', { commits: commitMapper.getAll() });

            this.leftCommitId = 'abc123';
            this.rightCommitId = 'def456';

            this.getLeftScreen().setCommitId(this.leftCommitId);
            this.getRightScreen().setCommitId(this.rightCommitId);

            // SECOND: load commit data
            this.loadMetricData();
        });
    }

    loadMetricData() {
        this.interface.showLoadingIndicator();

        let metricService = new DummyMetricService();
        metricService.loadTwoCommits(this.leftCommitId, this.rightCommitId, (firstCommitResult, secondCommitResult) => {
            this.getLeftScreen().reset();
            this.getRightScreen().reset();

            var result = CommitMerger.merge(firstCommitResult, secondCommitResult);
            console.log('merging ' + this.leftCommitId + ' and ' + this.rightCommitId + ':', result);

            this.getLeftScreen().setData(result);
            this.getLeftScreen().render();

            this.getRightScreen().setData(result);
            this.getRightScreen().render();

            this.interface.hideLoadingIndicator();
        });
    }

    createLeftScreen() {
        this.screens['left'] = new Screen('left');
    }

    createRightScreen() {
        this.screens['right'] = new Screen('right');
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
            if (args.type == 'left') {
                this.leftCommitId = args.commit;
                this.getLeftScreen().setCommitId(this.leftCommitId);
            } else if (args.type == 'right') {
                this.rightCommitId = args.commit;
                this.getRightScreen().setCommitId(this.rightCommitId);
            }

            this.loadMetricData();
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