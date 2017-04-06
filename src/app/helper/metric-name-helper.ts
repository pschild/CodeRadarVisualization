import {AppConfig} from "../AppConfig";

export class MetricNameHelper {

    static getAll() {
        return AppConfig.AVAILABLE_METRICS;
    }

    static getMetricNameByShortName(shortName: string): string {
        return AppConfig.AVAILABLE_METRICS.find(metric => metric.shortName === shortName).name;
    }

    static getShortNameByFullName(fullName) {
        return AppConfig.AVAILABLE_METRICS.find(metric => metric.name === fullName).shortName;
    }

}
