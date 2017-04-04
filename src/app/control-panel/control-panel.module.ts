import {Injector, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ControlPanelComponent} from "./control-panel.component";
import {SettingsComponent} from "./settings/settings.component";
import {ViewControlComponent} from "./settings/view-control/view-control.component";
import {FormsModule} from "@angular/forms";
import {NguiAutoCompleteModule} from "@ngui/auto-complete";
import {CommitChooserComponent} from "./commit-chooser/commit-chooser.component";
import {CommitService} from "./commit-chooser/commit.service";
import {MockData} from "../mocks/mock-data";
import {environment} from "../../environments/environment";
import {InMemoryBackendService} from "angular-in-memory-web-api";
import {CommitMockService} from "../mocks/commit-mock.service";
import {BrowserXhr, ResponseOptions, XHRBackend, XSRFStrategy} from "@angular/http";

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
    providers: [
        {
            provide: CommitService,
            useClass: environment.demo ? CommitMockService : CommitService
        },
        {
            provide: XHRBackend,
            useFactory: (injector: Injector, browser: BrowserXhr, xsrf: XSRFStrategy, options: ResponseOptions): any => {
                if (environment.demo) {
                    return new InMemoryBackendService(injector, new MockData(), {
                        // This is the configuration options
                    });
                } else {
                    return new XHRBackend(browser, options, xsrf);
                }
            },
            deps: [Injector, BrowserXhr, XSRFStrategy, ResponseOptions]
        }
    ]
})
export class ControlPanelModule {
}
