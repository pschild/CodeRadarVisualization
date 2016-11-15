var assert = require('assert');

import {ElementAnalyzer} from '../js/ElementAnalyzer';

describe('ElementAnalyzer', function () {
    describe('#getMaxMetricValueByMetricName(metricValues, metricName)', function () {
        it('should throw an error when data is not valid', function () {
            assert.throws(() => {
                ElementAnalyzer.getMaxMetricValueByMetricName(null, 'metricName1');
            });

            assert.throws(() => {
                ElementAnalyzer.getMaxMetricValueByMetricName(42, 'metricName1');
            });
        });

        it('should return undefined when empty object is given', function () {
            assert.equal(ElementAnalyzer.getMaxMetricValueByMetricName({}, 'metricName1'), undefined);
        });

        it('should return the biggest value', function () {
            assert.equal(ElementAnalyzer.getMaxMetricValueByMetricName({
                'metricName1': {
                    'abc123': 111
                },
                'metricName2': {
                    'abc123': 222
                }
            }, 'metricName1'), 111);

            assert.equal(ElementAnalyzer.getMaxMetricValueByMetricName({
                'metricName1': {
                    'abc123': 111,
                    'def456': 222
                },
                'metricName2': {
                    'abc123': 333,
                    'def456': 444
                }
            }, 'metricName1'), 222);

            assert.equal(ElementAnalyzer.getMaxMetricValueByMetricName({
                'metricName1': {
                    'abc123': 111,
                    'def456': 111
                },
                'metricName2': {
                    'abc123': 333,
                    'def456': 333
                }
            }, 'metricName1'), 111);
        });
    });

    describe('#getMinMetricValueByMetricName(metricValues, metricName)', function () {
        it('should throw an error when data is not valid', function () {
            assert.throws(() => {
                ElementAnalyzer.getMinMetricValueByMetricName(null, 'metricName1');
            });

            assert.throws(() => {
                ElementAnalyzer.getMinMetricValueByMetricName(42, 'metricName1');
            });
        });

        it('should return undefined when empty object is given', function () {
            assert.equal(ElementAnalyzer.getMinMetricValueByMetricName({}, 'metricName1'), undefined);
        });

        it('should return the smallest value', function () {
            assert.equal(ElementAnalyzer.getMinMetricValueByMetricName({
                'metricName1': {
                    'abc123': 111
                },
                'metricName2': {
                    'abc123': 222
                }
            }, 'metricName1'), 111);

            assert.equal(ElementAnalyzer.getMinMetricValueByMetricName({
                'metricName1': {
                    'abc123': 111,
                    'def456': 222
                },
                'metricName2': {
                    'abc123': 333,
                    'def456': 444
                }
            }, 'metricName1'), 111);

            assert.equal(ElementAnalyzer.getMinMetricValueByMetricName({
                'metricName1': {
                    'abc123': 111,
                    'def456': 111
                },
                'metricName2': {
                    'abc123': 333,
                    'def456': 333
                }
            }, 'metricName1'), 111);
        });
    });

    describe('#findSmallestAndBiggestMetricValueByMetricName(elements, metricName)', function () {
        it('should throw an error when data is not valid', function () {
            assert.throws(() => {
                ElementAnalyzer.findSmallestAndBiggestMetricValueByMetricName(null, 'coderadar:javaLoc');
            });

            assert.throws(() => {
                ElementAnalyzer.findSmallestAndBiggestMetricValueByMetricName(42, 'coderadar:javaLoc');
            });
        });

        it('should return default values when element list is empty', function () {
            assert.deepEqual(ElementAnalyzer.findSmallestAndBiggestMetricValueByMetricName({}, 'coderadar:javaLoc'), {
                min: Number.MAX_VALUE,
                max: Number.MIN_VALUE
            });
        });

        it('should return the correct pair of biggest and smallest value', function () {
            var mergedData = require('./data/mergedData.json');
            assert.deepEqual(ElementAnalyzer.findSmallestAndBiggestMetricValueByMetricName(mergedData, 'coderadar:javaLoc'), {
                min: 100,
                max: 1500
            });
        });
    });
});