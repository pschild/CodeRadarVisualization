import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VisualizationComponent} from './visualization.component';
import {ScreenComponent} from './screen/screen.component';
import {MetricService} from "./metric.service";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        VisualizationComponent,
        ScreenComponent
    ],
    exports: [
        VisualizationComponent
    ],
    providers: [
        MetricService
    ]
})
export class VisualizationModule {
}
