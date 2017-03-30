import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VisualizationComponent} from './visualization.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        VisualizationComponent
    ],
    exports: [
        VisualizationComponent
    ]
})
export class VisualizationModule {
}
