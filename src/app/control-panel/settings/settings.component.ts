import {Component, OnInit} from "@angular/core";
declare var $: any;

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        // prevent bootstrap dropdown from being closed by clicking on its content
        $(document).on('click', '.dropdown-menu', function (e) {
            e.stopPropagation();
        });
    }

}
