import * as Constants from '../Constants';
import {config} from '../Config';
import * as chroma from 'chroma-js/chroma';
import * as THREE from 'three';

export class ColorHelper {

    static getColorByPosition(position) {
        return position == Constants.LEFT_SCREEN ? config.COLOR_FIRST_COMMIT : config.COLOR_SECOND_COMMIT;
    }

    static getContraryColorByColor(color) {
        return color == config.COLOR_FIRST_COMMIT ? config.COLOR_SECOND_COMMIT : config.COLOR_FIRST_COMMIT;
    }

    static getColorByMetricValue(value, max, min) {
        return this.getColorScale(config.COLOR_HEATMAP_RANGE, value, max, min);
    }

    static getColorByBottomValue(value, max, min) {
        return this.getColorScale(config.COLOR_HIERARCHY_RANGE, value, max, min);
    }

    static getColorScale(range, value, max, min) {
        var colorScale = chroma.scale(range);
        var hexValue = colorScale(value / (max + min)).hex();
        return new THREE.Color(hexValue);
    }
}