import {config} from '../Config';
import * as PubSub from 'pubsub-js';

export class LegendComponent {

    constructor() {
        this.legendItemCommit1 = document.querySelector('#legend-item-commit-1');
        this.legendItemCommit2 = document.querySelector('#legend-item-commit-2');
        this.legendItemUnchangedFiles = document.querySelector('#legend-item-unchanged-files');
        this.legendItemColorCode = document.querySelector('#legend-item-color-code');

        this.setCommitColors();
        this.setColorCode();

        this._bindEvents();
    }

    setCommitColors() {
        this.legendItemCommit1.querySelector('.legend-color').style.background = config.COLOR_FIRST_COMMIT;
        this.legendItemCommit2.querySelector('.legend-color').style.background = config.COLOR_SECOND_COMMIT;
        this.legendItemUnchangedFiles.querySelector('.legend-color').style.background = config.COLOR_UNCHANGED_FILES;
    }

    setColorCode() {
        this.legendItemColorCode.querySelector('.legend-label').innerHTML = config.COLOR_METRIC_NAME;
    }

    _showCommitItems() {
        this.legendItemCommit1.style.display = 'inline-block';
        this.legendItemCommit2.style.display = 'inline-block';
    }

    _hideCommitItems() {
        this.legendItemCommit1.style.display = 'none';
        this.legendItemCommit2.style.display = 'none';
    }

    _showUnchangedFilesItem() {
        this.legendItemUnchangedFiles.style.display = 'inline-block';
    }

    _hideUnchangedFilesItem() {
        this.legendItemUnchangedFiles.style.display = 'none';
    }

    _showColorCodeItem() {
        this.legendItemColorCode.style.display = 'inline-block';
    }

    _hideColorCodeItem() {
        this.legendItemColorCode.style.display = 'none';
    }

    _bindEvents() {
        PubSub.subscribe('fullSplitToggle', (eventName, args) => {
            this._showCommitItems();
            if (args.enabled) {
                this._hideColorCodeItem();
                this._showUnchangedFilesItem();
            } else {
                this._hideUnchangedFilesItem();
            }
        });

        PubSub.subscribe('colorcodeChange', (eventName, args) => {
            if (args.colorcode == 'metric') {
                this._showColorCodeItem();
                this._hideCommitItems();
            } else {
                this._hideColorCodeItem();
                this._showCommitItems();
            }
        });
    }
}