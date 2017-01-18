export class MetricNameService {

    constructor() {
        this._metricNamesMap = {
            'LOC': 'coderadar:size:loc:java',
            'SLOC': 'coderadar:size:sloc:java',
            'ELOC': 'coderadar:size:eloc:java',
            'MagicNumber': 'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck',
            'ReturnCountCheck': 'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.ReturnCountCheck',
            'CyclomaticComplexityCheck': 'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck',
            'JavaNCSSCheck': 'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.JavaNCSSCheck',
            'NPathComplexityCheck': 'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.NPathComplexityCheck',
            'ExecutableStatementCountCheck': 'checkstyle:com.puppycrawl.tools.checkstyle.checks.sizes.ExecutableStatementCountCheck'
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