import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VisualizationComponent} from './visualization.component';
import {ScreenComponent} from './screen/screen.component';
import {MetricService} from "../service/metric.service";
import {environment} from "../../environments/environment";
import {MetricMockService} from "../service/mocks/metric-mock.service";
import {TooltipComponent} from './tooltip/tooltip.component';
import {ComparisonPanelComponent} from './comparison-panel/comparison-panel.component';
import {LegendComponent} from './legend/legend.component';
import {KeyValuePipe} from "../pipes/key-value.pipe";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        VisualizationComponent,
        ScreenComponent,
        TooltipComponent,
        ComparisonPanelComponent,
        LegendComponent,
        KeyValuePipe
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
