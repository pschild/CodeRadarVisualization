import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Commit} from "../../domain/Commit";
import {CommitType} from "../../enum/CommitType";
import * as moment from 'moment';
import {ICommit} from "../../domain/ICommit";

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

    handleValueChanged(chosenModel: Commit) {
        this.changeCommit.emit({commitType: this.commitType, commit: chosenModel});
    }

    formatCommit(data: any): string {
        let formattedDateAndTime = moment(data.timestamp).format('DD.MM.YYYY HH:mm');
        return `${formattedDateAndTime}, ${data.author}, ${data.name.substr(0, 7)}`;
    }

}
