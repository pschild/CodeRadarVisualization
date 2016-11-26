export class ElementAnalyzer {

    static generateUniqueElementList(elements, uniqueElements = []) {
        if (!Array.isArray(elements)) {
            elements = [elements];
        }

        for (let element of elements) {
            if (uniqueElements.indexOf(element.name) < 0) {
                uniqueElements.push(element.name);
            }

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
        var values = this.getMetricValuesByMetricName(metricValues, metricName);
        if (values.length > 1) {
            return values[0] > values[1] ? values[1] : values[0];
        } else {
            return values[0];
        }
    }

    static getMaxMetricValueByMetricName(metricValues, metricName) {
        var values = this.getMetricValuesByMetricName(metricValues, metricName);
        if (values.length > 1) {
            return values[0] < values[1] ? values[1] : values[0];
        } else {
            return values[0];
        }
    }

    static getMetricValuesByMetricName(metricValues, metricName) {
        if (typeof metricValues != 'object' || metricValues == null) {
            throw new Error('metricValues is not an object or null!');
        }

        for (let key in metricValues) {
            if (typeof metricValues[key] == 'object') {
                if (key == metricName) {
                    let values = [];
                    for (let commitId in metricValues[key]) {
                        values.push(metricValues[key][commitId]);
                    }

                    if (values.length == 0 || values.length > 2) {
                        throw new Error(`found either no or too many metricValues for ${metricName}! found metricValues: ${values.length}`);
                    }

                    return values;
                }
            } else {
                throw new Error('wrong type ' + typeof metricValues[key] + '!');
            }
        }
    }
}