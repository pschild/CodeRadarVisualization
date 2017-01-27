export class ElementAnalyzer {

    static generateUniqueElementList(elements, uniqueElements = []) {
        if (!Array.isArray(elements)) {
            elements = [elements];
        }

        for (let element of elements) {
            if (uniqueElements.indexOf(element.name) < 0) {
                uniqueElements.push(element.name);
            }

            // recursion
            if (element.children && element.children.length > 0) {
                this.generateUniqueElementList(element.children, uniqueElements);
            }
        }

        return uniqueElements;
    }

    static findSmallestAndBiggestMetricValueByMetricName(elements, metricName) {
        if (typeof elements != 'object' || elements == null) {
            throw new Error('elements is not an object or null!');
        }

        if (!Array.isArray(elements)) {
            elements = [elements];
        }

        var min = Number.MAX_VALUE;
        var max = Number.MIN_VALUE;

        for (let element of elements) {
            // investigate only FILEs, because only files can have different sizes and colors
            if (element.type == 'FILE') {
                var commit1Metrics = element.commit1Metrics || null;
                var commit2Metrics = element.commit2Metrics || null;

                var big = this.getMaxMetricValueByMetricName(commit1Metrics, commit2Metrics, metricName);
                if (big > max) {
                    max = big;
                }

                var small = this.getMinMetricValueByMetricName(commit1Metrics, commit2Metrics, metricName);
                if (small < min) {
                    min = small;
                }
            }

            // recursion
            if (element.children && element.children.length > 0) {
                var result = this.findSmallestAndBiggestMetricValueByMetricName(element.children, metricName);
                if (result.max > max) {
                    max = result.max;
                }
                if (result.min < min) {
                    min = result.min;
                }
            }
        }

        return {
            min: min,
            max: max
        };
    }

    static getMinMetricValueByMetricName(commit1Metrics, commit2Metrics, metricName) {
        if (commit1Metrics == null && commit2Metrics == null) {
            throw new Error(`No metric objects given`);
        }

        if (commit1Metrics == null) {
            return commit2Metrics[metricName];
        } else if (commit2Metrics == null) {
            return commit1Metrics[metricName];
        } else {
            return commit1Metrics[metricName] < commit2Metrics[metricName] ? commit1Metrics[metricName] : commit2Metrics[metricName];
        }
    }

    static getMaxMetricValueByMetricName(commit1Metrics, commit2Metrics, metricName) {
        if (commit1Metrics == null && commit2Metrics == null) {
            throw new Error(`No metric objects given`);
        }

        if (commit1Metrics == null) {
            return commit2Metrics[metricName];
        } else if (commit2Metrics == null) {
            return commit1Metrics[metricName];
        } else {
            return commit1Metrics[metricName] > commit2Metrics[metricName] ? commit1Metrics[metricName] : commit2Metrics[metricName];
        }
    }
}