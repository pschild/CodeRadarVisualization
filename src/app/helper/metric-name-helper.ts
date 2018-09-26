import {AppConfig} from '../AppConfig';
import {environment} from '../../environments/environment';

export class MetricNameHelper {

    static getAll() {
        if (environment.useCoderadarEndpoint) {
            return AppConfig.AVAILABLE_METRICS;
        } else {
            // filter metric names for demo
            return AppConfig.AVAILABLE_METRICS.filter((metric) => {
                return metric.name === 'coderadar:size:loc:java'
                    || metric.name === 'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck'
                    || metric.name === 'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck';
            });
        }
    }

    static getMetricNameByShortName(shortName: string): string {
        return AppConfig.AVAILABLE_METRICS.find(metric => metric.shortName === shortName).name;
    }

    static getShortNameByFullName(fullName) {
        return AppConfig.AVAILABLE_METRICS.find(metric => metric.name === fullName).shortName;
    }

}
