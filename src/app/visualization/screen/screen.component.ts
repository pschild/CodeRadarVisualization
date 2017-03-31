import {Component, Input, OnInit} from '@angular/core';
import {ScreenType} from "../../enum/ScreenType";

@Component({
    selector: 'app-screen',
    templateUrl: './screen.component.html',
    styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {

    @Input() screenType: ScreenType;

    constructor() {
    }

    ngOnInit() {
    }

}
