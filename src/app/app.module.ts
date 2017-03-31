import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {ControlPanelModule} from "./control-panel/control-panel.module";
import {VisualizationModule} from "./visualization/visualization.module";
import {reducer} from "./shared/reducers";
import {StoreModule} from "@ngrx/store";

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
        StoreModule.provideStore(reducer)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
