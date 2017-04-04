import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserXhr, HttpModule, ResponseOptions, XHRBackend, XSRFStrategy} from '@angular/http';

import {AppComponent} from './app.component';
import {ControlPanelModule} from "./control-panel/control-panel.module";
import {VisualizationModule} from "./visualization/visualization.module";
import {reducer} from "./shared/reducers";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {AppEffects} from "./shared/effects";
import {environment} from "../environments/environment";
import {InMemoryBackendService} from "angular-in-memory-web-api";
import {MockData} from "./mocks/mock-data";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ControlPanelModule,
        VisualizationModule,
        StoreModule.provideStore(reducer),
        EffectsModule.run(AppEffects)
    ],
    providers: [
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
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
