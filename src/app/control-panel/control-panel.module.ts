import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ControlPanelComponent} from "./control-panel.component";
import {SettingsComponent} from "./settings/settings.component";
import {ViewControlComponent} from "./settings/view-control/view-control.component";
import {FormsModule} from "@angular/forms";
import {NguiAutoCompleteModule} from "@ngui/auto-complete";
import {CommitChooserComponent} from "./commit-chooser/commit-chooser.component";
import {CommitService} from "./commit-chooser/commit.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NguiAutoCompleteModule
    ],
    declarations: [
        ControlPanelComponent,
        SettingsComponent,
        ViewControlComponent,
        CommitChooserComponent
    ],
    exports: [
        ControlPanelComponent
    ],
    providers: [CommitService]
})
export class ControlPanelModule {
}
