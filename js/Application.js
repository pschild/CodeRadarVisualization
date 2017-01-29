import {UserInterface} from './ui/UserInterface';
import {Screen} from './Screen';
import {config} from './Config';
import {ElementAnalyzer} from './util/ElementAnalyzer';
import {CoderadarMetricService} from './service/CoderadarMetricService';
import {DummyMetricService} from './service/DummyMetricService';
import {DummyCommitService} from './service/DummyCommitService';
import {CoderadarCommitService} from './service/CoderadarCommitService';
import {CoderadarAuthorizationService} from './service/CoderadarAuthorizationService';
import {MetricNameService} from './service/MetricNameService';
import {CommitMapper} from './domain/CommitMapper';
import {MergedDrawer} from './drawer/MergedDrawer';
import {SingleDrawer} from './drawer/SingleDrawer';
import * as PubSub from 'pubsub-js';

export class Application {

    constructor() {
        this.SYNCHRONIZE_ENABLED = true;
        this.IS_FULLSCREEN = false;

        this._uniqueElementList = [];

        this.authorizationService = new CoderadarAuthorizationService();
        this.commitService = new CoderadarCommitService(); // DummyCommitService CoderadarCommitService
        this.metricService = new CoderadarMetricService(); // DummyMetricService CoderadarMetricService
        this.metricNameService = new MetricNameService();

        this._createUserInterface();
        this._initializeEventListeners();

        this.leftCommitId = undefined;
        this.rightCommitId = undefined;

        this.result = undefined;
        this.minMaxPairOfColorMetric = undefined;

        this.screens = {};
        this.createLeftScreen();
        this.createRightScreen();
    }

    initialize() {
        this.login()
            .then(this.loadCommits.bind(this))
            .then(this.loadMetricData.bind(this));
    }

    login() {
        return this.authorizationService.authorize();
    }

    loadCommits() {
        return this.commitService.load()
            .then((response) => {
                var commitMapper = new CommitMapper(response.data);
                commitMapper.mapAll();

                var commits = commitMapper.getAll();
                commits.sort(function(a, b) {
                    return b.timestamp - a.timestamp;
                });

                // TODO: what if we have less than 2 commits?
                this.leftCommitId = commits[1].getName();
                this.rightCommitId = commits[0].getName();

                PubSub.publish('commitsLoaded', { commits: commits });

                this.getLeftScreen().setCommitId(this.leftCommitId);
                this.getRightScreen().setCommitId(this.rightCommitId);
            });
    }

    loadMetricData() {
        this.userInterface.showLoadingIndicator();
        return this.metricService.loadDeltaTree(this.leftCommitId, this.rightCommitId)
            .then((result) => {
                this.result = result.data;

                // #3: set commitId dynamically
                // firstCommitResult.commitId = this.leftCommitId;
                // secondCommitResult.commitId = this.rightCommitId;

                // console.time('merging time');
                // var result = CommitMerger.merge(firstCommitResult, secondCommitResult);
                // console.timeEnd('merging time');
                // console.log('merging ' + this.leftCommitId + ' and ' + this.rightCommitId + ':', result);

                this._uniqueElementList = ElementAnalyzer.generateUniqueElementList(this.result);
                var minMaxPairOfHeight = ElementAnalyzer.findSmallestAndBiggestMetricValueByMetricName(this.result, config.HEIGHT_METRIC_NAME);
                var minMaxPairOfGroundArea = ElementAnalyzer.findSmallestAndBiggestMetricValueByMetricName(this.result, config.GROUND_AREA_METRIC_NAME);
                this.minMaxPairOfColorMetric = ElementAnalyzer.findSmallestAndBiggestMetricValueByMetricName(this.result, config.COLOR_METRIC_NAME);

                config.HEIGHT_FACTOR = config.GLOBAL_MAX_HEIGHT / minMaxPairOfHeight.max;
                config.GROUND_AREA_FACTOR = config.GLOBAL_MAX_GROUND_AREA / minMaxPairOfGroundArea.max;

                this._initializeScreens();
                this.userInterface.hideLoadingIndicator();

                PubSub.publish('metricsLoaded');
            });
    }

    _initializeScreens() {
        if (this.IS_FULLSCREEN) {
            this.getLeftScreen().reset();
            this.getLeftScreen().setData(this.result, this.minMaxPairOfColorMetric);
            this.getLeftScreen().setDrawer(MergedDrawer);
            this.getLeftScreen().render();
            this.getLeftScreen().centerCamera();
        } else {
            this.getLeftScreen().reset();
            this.getLeftScreen().setData(this.result, this.minMaxPairOfColorMetric);
            this.getLeftScreen().setDrawer(SingleDrawer);
            this.getLeftScreen().render();
            this.getLeftScreen().centerCamera();

            this.getRightScreen().reset();
            this.getRightScreen().setData(this.result, this.minMaxPairOfColorMetric);
            this.getRightScreen().setDrawer(SingleDrawer);
            this.getRightScreen().render();
            this.getRightScreen().centerCamera();
        }
    }

    _handleSingleSplitToggle(enabled) {
        this.IS_FULLSCREEN = enabled;

        if (this.IS_FULLSCREEN) {
            document.querySelector('#stage').classList.remove('split');
            this.getLeftScreen().reset();
            this.getLeftScreen().setFullscreen();
            this.getLeftScreen().setDrawer(MergedDrawer);
            this.getLeftScreen().render();

            this.getRightScreen().setFullscreen();
        } else {
            document.querySelector('#stage').classList.add('split');
            this.getLeftScreen().reset();
            this.getLeftScreen().setSplitscreen();
            this.getLeftScreen().setDrawer(SingleDrawer);
            this.getLeftScreen().render();

            this.getRightScreen().reset();
            this.getRightScreen().setSplitscreen();
            this.getRightScreen().setData(this.result, this.minMaxPairOfColorMetric);
            this.getRightScreen().setDrawer(SingleDrawer);
            this.getRightScreen().render();
        }
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

    getIsFullscreen() {
        return this.IS_FULLSCREEN;
    }

    _createUserInterface() {
        this.userInterface = new UserInterface(this);
    }

    getUniqueElementList() {
        return this._uniqueElementList;
    }

    _initializeEventListeners() {
        PubSub.subscribe('heightDimensionChange', (eventName, args) => {
            config.HEIGHT_METRIC_NAME = this.metricNameService.getMetricNameByShortName(args.metricName);
            this.loadMetricData();
        });

        PubSub.subscribe('groundAreaDimensionChange', (eventName, args) => {
            config.GROUND_AREA_METRIC_NAME = this.metricNameService.getMetricNameByShortName(args.metricName);
            this.loadMetricData();
        });

        PubSub.subscribe('colorDimensionChange', (eventName, args) => {
            config.COLOR_METRIC_NAME = this.metricNameService.getMetricNameByShortName(args.metricName);
            this.userInterface.legendComponent.setColorCode();
            this.loadMetricData();
        });

        PubSub.subscribe('commitChange', (eventName, args) => {
            if (args.type == 'left') {
                this.leftCommitId = args.commitId;
                this.getLeftScreen().setCommitId(this.leftCommitId);
            } else if (args.type == 'right') {
                this.rightCommitId = args.commitId;
                this.getRightScreen().setCommitId(this.rightCommitId);
            }

            this.loadMetricData();
            PubSub.publish('closeComparisonContainer');
        });

        PubSub.subscribe('synchronizeEnabledChange', (eventName, args) => {
            if (args.enabled) {
                this.getLeftScreen().centerCamera();
                this.getRightScreen().centerCamera();
            }

            this.SYNCHRONIZE_ENABLED = args.enabled;
        });

        PubSub.subscribe('fullSplitToggle', (eventName, args) => {
            this._handleSingleSplitToggle(args.enabled);
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

        PubSub.subscribe('elementClicked', (eventName, args) => {
            if (args.doReset) {
                PubSub.publish('closeComparisonContainer');
            } else {
                PubSub.publish('openComparisonContainer', {
                    leftElement: this._findLeftElementForComparisonByName(args.elementName),
                    rightElement: this._findRightElementForComparisonByName(args.elementName)
                });
            }
        });

        PubSub.subscribe('searchEntryClicked', (eventName, args) => {
            PubSub.publish('openComparisonContainer', {
                leftElement: this._findLeftElementForComparisonByName(args.elementName),
                rightElement: this._findRightElementForComparisonByName(args.elementName)
            });
        });
    }

    _findLeftElementForComparisonByName(elementName) {
        // when we are in fullscreen mode, we need to look for the comparing elements only in the left screen.
        if (this.IS_FULLSCREEN) {
            for (var i = this.getLeftScreen().getScene().children.length - 1; i >= 0; i--) {
                var child = this.getLeftScreen().getScene().children[i];
                if (child.name == elementName) {
                    if (child.userData.commitType != 'other') {
                        return child;
                    }
                }
            }
        } else {
            return this.getLeftScreen().getScene().getObjectByName(elementName);
        }
    }

    _findRightElementForComparisonByName(elementName) {
        // when we are in fullscreen mode, we need to look for the comparing elements only in the left screen.
        if (this.IS_FULLSCREEN) {
            for (var i = this.getLeftScreen().getScene().children.length - 1; i >= 0; i--) {
                var child = this.getLeftScreen().getScene().children[i];
                if (child.name == elementName) {
                    if (child.userData.commitType != 'current') {
                        return child;
                    }
                }
            }
        } else {
            return this.getRightScreen().getScene().getObjectByName(elementName);
        }
    }
}