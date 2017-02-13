import {UserInterface} from './ui/UserInterface';
import {Screen} from './Screen';
import {config} from './Config';
import * as Constants from './Constants';
import {ElementAnalyzer} from './util/ElementAnalyzer';
import {MergedDrawer} from './drawer/MergedDrawer';
import {SingleDrawer} from './drawer/SingleDrawer';
import {ServiceLocator} from './service/ServiceLocator';
import * as PubSub from 'pubsub-js';

export class Application {

    constructor() {
        this.SYNCHRONIZE_ENABLED = true;
        this.IS_FULLSCREEN = false;

        this._uniqueElementList = [];

        this.authorizationService = ServiceLocator.getInstance().get('authorizationService');
        this.commitService = ServiceLocator.getInstance().get('commitService');
        this.metricService = ServiceLocator.getInstance().get('metricService');
        this.metricNameService = ServiceLocator.getInstance().get('metricNameService');

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
            .then(() => {
                var commits = this.commitService.getCommits();

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
        this.screens[Constants.LEFT_SCREEN] = new Screen(Constants.LEFT_SCREEN);
    }

    createRightScreen() {
        this.screens[Constants.RIGHT_SCREEN] = new Screen(Constants.RIGHT_SCREEN);
    }

    getLeftScreen() {
        return this.screens[Constants.LEFT_SCREEN];
    }

    getRightScreen() {
        return this.screens[Constants.RIGHT_SCREEN];
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
        PubSub.subscribe('dimensionChange', (eventName, args) => {
            switch (args.dimension) {
                case Constants.HEIGHT_DIMENSION:
                    config.HEIGHT_METRIC_NAME = this.metricNameService.getMetricNameByShortName(args.metricName);
                    break;
                case Constants.GROUNDAREA_DIMENSION:
                    config.GROUND_AREA_METRIC_NAME = this.metricNameService.getMetricNameByShortName(args.metricName);
                    break;
                case Constants.COLOR_DIMENSION:
                    config.COLOR_METRIC_NAME = this.metricNameService.getMetricNameByShortName(args.metricName);
                    this.userInterface.getLegendComponent().setColorCode();
                    break;
                default:
                    throw new Error(`Unknown dimension ${args.dimension}!`);
            }

            this.loadMetricData();
        });

        PubSub.subscribe('commitChange', (eventName, args) => {
            if (args.commitType == Constants.FIRST_COMMIT) {
                this.leftCommitId = args.commitId;
                this.getLeftScreen().setCommitId(this.leftCommitId);
            } else if (args.commitType == Constants.SECOND_COMMIT) {
                this.rightCommitId = args.commitId;
                this.getRightScreen().setCommitId(this.rightCommitId);
            } else {
                throw new Error(`Unknown screen type ${args.commitType}!`);
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
            if (args.screen == Constants.LEFT_SCREEN) {
                this.getLeftScreen().getControls().enabled = true;
                this.getRightScreen().getControls().enabled = this.SYNCHRONIZE_ENABLED;

                this.getLeftScreen().getInteractionHandler().setEnabled(true);
                this.getRightScreen().getInteractionHandler().setEnabled(false);
            } else if (args.screen == Constants.RIGHT_SCREEN) {
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
                    if (child.userData.commitType != Constants.COMMIT_TYPE_OTHER) {
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
                    if (child.userData.commitType != Constants.COMMIT_TYPE_CURRENT) {
                        return child;
                    }
                }
            }
        } else {
            return this.getRightScreen().getScene().getObjectByName(elementName);
        }
    }
}