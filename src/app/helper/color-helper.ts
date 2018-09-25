import {AppConfig} from '../AppConfig';
import {ScreenType} from '../enum/ScreenType';
import {Color} from 'three';
declare var chroma: any;

export class ColorHelper {

    static getColorByPosition(screenType: ScreenType): string {
        return screenType === ScreenType.LEFT ? AppConfig.COLOR_FIRST_COMMIT : AppConfig.COLOR_SECOND_COMMIT;
    }

    static getContraryColorByColor(color: string): string {
        return color === AppConfig.COLOR_FIRST_COMMIT ? AppConfig.COLOR_SECOND_COMMIT : AppConfig.COLOR_FIRST_COMMIT;
    }

    static getColorByMetricValue(value: number, max: number, min: number): THREE.Color {
        return this.getColorScale(AppConfig.COLOR_HEATMAP_RANGE, value, max, min);
    }

    static getColorByLevelValue(value: number, max: number, min: number): THREE.Color {
        return this.getColorScale(AppConfig.COLOR_HIERARCHY_RANGE, value, max, min);
    }

    static getColorScale(range, value: number, max: number, min: number): THREE.Color {
        const colorScale = chroma.scale(range);
        const hexValue = colorScale(value / (max + min)).hex();
        return new Color(hexValue);
    }

}
