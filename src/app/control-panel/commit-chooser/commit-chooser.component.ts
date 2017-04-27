import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ICommit} from "../../interfaces/ICommit";
import {CommitType} from "../../enum/CommitType";
import * as moment from 'moment';

@Component({
    selector: 'app-commit-chooser',
    templateUrl: './commit-chooser.component.html',
    styleUrls: ['./commit-chooser.component.scss']
})
export class CommitChooserComponent implements OnInit {

    @Input() commitType: CommitType;
    @Input() commits: ICommit[];
    @Input() selected: ICommit;
    @Input() loading: boolean;

    @Output() changeCommit = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    handleValueChanged(chosenModel: ICommit) {
        this.changeCommit.emit({commitType: this.commitType, commit: chosenModel});
    }

    formatCommit(data: any): string {
        let formattedDateAndTime = moment(data.timestamp).format('DD.MM.YYYY HH:mm');
        return `${formattedDateAndTime}, ${data.author}, ${data.name.substr(0, 7)}`;
    }

}
