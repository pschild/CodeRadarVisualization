import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VisualizationComponent} from './visualization.component';
import {ScreenComponent} from './screen/screen.component';
import {MetricService} from "./metric.service";
import {environment} from "../../environments/environment";
import {MetricMockService} from "../mocks/metric-mock.service";

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
        {
            provide: MetricService,
            useClass: environment.demo ? MetricMockService : MetricService
        }
    ]
})
export class VisualizationModule {
}
