import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ControlPanelComponent} from "./control-panel.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ControlPanelComponent
    ],
    exports: [
        ControlPanelComponent
    ]
})
export class ControlPanelModule {
}
