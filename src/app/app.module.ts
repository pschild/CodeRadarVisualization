import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserXhr, HttpModule, ResponseOptions, XHRBackend, XSRFStrategy} from '@angular/http';

import {AppComponent} from './app.component';
import {ControlPanelModule} from './control-panel/control-panel.module';
import {VisualizationModule} from './visualization/visualization.module';
import {reducer} from './shared/reducers';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {AppEffects} from './shared/effects';
import {XHRBackendFactory} from './XHRBackendFactory';
import {ScreenShotService} from "./service/screenshot.service";
import {FocusService} from "./service/focus.service";
import {TooltipService} from "./service/tooltip.service";
import {ComparisonPanelService} from "./service/comparison-panel.service";

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
        EffectsModule.run(AppEffects),
        StoreDevtoolsModule.instrumentOnlyWithExtension()
    ],
    providers: [
        {
            provide: XHRBackend,
            useFactory: XHRBackendFactory,
            deps: [Injector, BrowserXhr, XSRFStrategy, ResponseOptions]
        },
        ScreenShotService,
        FocusService,
        TooltipService,
        ComparisonPanelService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
