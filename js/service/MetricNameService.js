export class MetricNameService {

    constructor() {
        this._metricNamesMap = {
            'LOC': 'coderadar:size:loc:java',
            'SLOC': 'coderadar:size:sloc:java',
            'ELOC': 'coderadar:size:eloc:java',
            'MagicNumber': 'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck'
        };
    }

    getMetricNameByShortName(shortName) {
        return this._metricNamesMap[shortName];
    }

    getShortNameByFullName(fullName) {
        for (let shortName of Object.keys(this._metricNamesMap)) {
            if (this._metricNamesMap[shortName] == fullName) {
                return shortName;
            }
        }
    }
}