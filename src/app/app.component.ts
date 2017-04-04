declare var GrowingPacker: any;
import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor() {
        var packer = new GrowingPacker();
        var blocks = [
            {w: 100, h: 100},
            {w: 100, h: 100},
            {w: 80, h: 80},
            {w: 80, h: 80}
        ];

        packer.fit(blocks);
        console.log(packer);
    }
}
