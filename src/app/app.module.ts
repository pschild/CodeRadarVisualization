import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {environment} from '../environments/environment';

import {AppComponent} from './app.component';
import {ControlPanelModule} from './control-panel/control-panel.module';
import {VisualizationModule} from './visualization/visualization.module';
import {reducers} from './shared/reducers';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {AppEffects} from './shared/effects';
import {ScreenShotService} from './service/screenshot.service';
import {FocusService} from './service/focus.service';
import {TooltipService} from './service/tooltip.service';
import {ComparisonPanelService} from './service/comparison-panel.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ControlPanelModule,
        VisualizationModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([AppEffects]),
        environment.production ? [] : StoreDevtoolsModule.instrument({ maxAge: 50 })
    ],
    providers: [
        ScreenShotService,
        FocusService,
        TooltipService,
        ComparisonPanelService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
