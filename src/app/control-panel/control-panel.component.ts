import {Component, OnInit} from "@angular/core";
import {CommitType} from "../enum/CommitType";

@Component({
    selector: 'app-control-panel',
    templateUrl: './control-panel.component.html',
    styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {

    commitTypes: any = {
        left: CommitType.LEFT,
        right: CommitType.RIGHT
    };

    constructor() {
    }

    ngOnInit() {
    }

}
