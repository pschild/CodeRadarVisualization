import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ControlPanelComponent} from "./control-panel.component";
import {SettingsComponent} from './settings/settings.component';
import {ViewControlComponent} from './settings/view-control/view-control.component';
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        ControlPanelComponent,
        SettingsComponent,
        ViewControlComponent
    ],
    exports: [
        ControlPanelComponent
    ]
})
export class ControlPanelModule {
}
