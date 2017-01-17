import {config} from '../Config';
import {MetricNameService} from '../service/MetricNameService';
import * as PubSub from 'pubsub-js';

export class LegendComponent {

    constructor() {
        this.legendItemCommit1 = document.querySelector('#legend-item-commit-1');
        this.legendItemCommit2 = document.querySelector('#legend-item-commit-2');
        this.legendItemAddedFiles = document.querySelector('#legend-item-added-files');
        this.legendItemDeletedFiles = document.querySelector('#legend-item-deleted-files');
        this.legendItemUnchangedFiles = document.querySelector('#legend-item-unchanged-files');
        this.legendItemColorCode = document.querySelector('#legend-item-color-code');

        this.metricNameService = new MetricNameService();

        this.setCommitColors();
        this.setAddedDeletedUnchangedColors();

        this._bindEvents();
    }

    setCommitColors() {
        this.legendItemCommit1.querySelector('.legend-color').style.background = config.COLOR_FIRST_COMMIT;
        this.legendItemCommit2.querySelector('.legend-color').style.background = config.COLOR_SECOND_COMMIT;
        this.legendItemUnchangedFiles.querySelector('.legend-color').style.background = config.COLOR_UNCHANGED_FILE;
    }

    setAddedDeletedUnchangedColors() {
        this.legendItemAddedFiles.querySelector('.legend-color').style.background = config.COLOR_ADDED_FILE;
        this.legendItemDeletedFiles.querySelector('.legend-color').style.background = config.COLOR_DELETED_FILE;
        this.legendItemUnchangedFiles.querySelector('.legend-color').style.background = config.COLOR_UNCHANGED_FILE;
    }

    setColorCode() {
        this.legendItemColorCode.querySelector('.legend-label').innerHTML = this.metricNameService.getShortNameByFullName(config.COLOR_METRIC_NAME);
    }

    _showCommitItems() {
        this.legendItemCommit1.style.display = 'inline-block';
        this.legendItemCommit2.style.display = 'inline-block';
    }

    _hideCommitItems() {
        this.legendItemCommit1.style.display = 'none';
        this.legendItemCommit2.style.display = 'none';
    }

    _showAddedDeletedUnchangedFilesItems() {
        this.legendItemAddedFiles.style.display = 'inline-block';
        this.legendItemDeletedFiles.style.display = 'inline-block';
        this.legendItemUnchangedFiles.style.display = 'inline-block';
    }

    _hideAddedDeletedUnchangedFilesItems() {
        this.legendItemAddedFiles.style.display = 'none';
        this.legendItemDeletedFiles.style.display = 'none';
        this.legendItemUnchangedFiles.style.display = 'none';
    }

    _showColorCodeItem() {
        this.setColorCode();
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
                this._showAddedDeletedUnchangedFilesItems();
            } else {
                this._hideAddedDeletedUnchangedFilesItems();
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