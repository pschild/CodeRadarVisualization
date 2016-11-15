export class ElementAnalyzer {

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
            var metricValues = element.metricValues;
            if (metricValues) {
                var big = this.getMaxMetricValueByMetricName(metricValues, metricName);
                if (big > max) {
                    max = big;
                }

                var small = this.getMinMetricValueByMetricName(metricValues, metricName);
                if (small < min) {
                    min = small;
                }
            }

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

    static getMinMetricValueByMetricName(metricValues, metricName) {
        if (typeof metricValues != 'object' || metricValues == null) {
            throw new Error('metricValues is not an object or null!');
        }

        for (let key in metricValues) {
            if (typeof metricValues[key] == 'object') {
                if (key == metricName) {
                    let minValue = Number.MAX_VALUE;
                    for (let commitId in metricValues[key]) {
                        var metricValue = metricValues[key][commitId];
                        if (minValue > metricValue) {
                            minValue = metricValue;
                        }
                    }
                    return minValue;
                }
            } else {
                throw new Error('wrong type ' + typeof metricValues[key] + '!');
            }
        }
    }

    static getMaxMetricValueByMetricName(metricValues, metricName) {
        if (typeof metricValues != 'object' || metricValues == null) {
            throw new Error('metricValues is not an object or null!');
        }

        for (let key in metricValues) {
            if (typeof metricValues[key] == 'object') {
                if (key == metricName) {
                    let maxValue = Number.MIN_VALUE;
                    for (let commitId in metricValues[key]) {
                        var metricValue = metricValues[key][commitId];
                        if (maxValue < metricValue) {
                            maxValue = metricValue;
                        }
                    }
                    return maxValue;
                }
            } else {
                throw new Error('wrong type ' + typeof metricValues[key] + '!');
            }
        }
    }
}