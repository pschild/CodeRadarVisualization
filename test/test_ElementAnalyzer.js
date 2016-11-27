var assert = require('assert');

import {ElementAnalyzer} from '../js/ElementAnalyzer';

describe('ElementAnalyzer', function () {
    describe('#getMaxMetricValueByMetricName', function () {
        it('should throw an error when data is not valid', function () {
            assert.throws(() => {
                ElementAnalyzer.getMaxMetricValueByMetricName(null, 'metricName1');
            });

            assert.throws(() => {
                ElementAnalyzer.getMaxMetricValueByMetricName(42, 'metricName1');
            });
        });

        it('should return undefined when empty object is given', function () {
            assert.throws(() => {
                ElementAnalyzer.getMaxMetricValueByMetricName({}, 'metricName1');
            });
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

    describe('#getMinMetricValueByMetricName', function () {
        it('should throw an error when data is not valid', function () {
            assert.throws(() => {
                ElementAnalyzer.getMinMetricValueByMetricName(null, 'metricName1');
            });

            assert.throws(() => {
                ElementAnalyzer.getMinMetricValueByMetricName(42, 'metricName1');
            });
        });

        it('should return undefined when empty object is given', function () {
            assert.throws(() => {
                ElementAnalyzer.getMinMetricValueByMetricName({}, 'metricName1');
            });
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

    describe('#findSmallestAndBiggestMetricValueByMetricName', function () {
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

    describe('#generateUniqueElementList', function () {
        it('should generate a unique list', function () {
            var list = ElementAnalyzer.generateUniqueElementList({
                name: 'root',
                children: [
                    {
                        name: 'A'
                    },
                    {
                        name: 'B',
                        children: [
                            {
                                name: 'A'
                            }
                        ]
                    }
                ]
            });
            assert.deepEqual(list, ['root', 'A', 'B']);
        });
    });

    describe('#getMetricValuesByMetricName', function () {
        it('should throw an error when no metrics are given', function () {
            assert.throws(() => {
                ElementAnalyzer.getMetricValuesByMetricName();
            });
        });

        it('should throw an error when metric objects are empty', function () {
            assert.throws(() => {
                ElementAnalyzer.getMetricValuesByMetricName({
                    'metricName1': {},
                    'metricName2': {}
                }, 'metricName1');
            });
        });

        it('should throw an error when metrics for more than two commits are found', function () {
            assert.throws(() => {
                ElementAnalyzer.getMetricValuesByMetricName({
                    'metricName1': {
                        'abc123': 200,
                        'def456': 300,
                        'ghi789': 400
                    },
                    'metricName2': {
                        'abc123': 400,
                        'def456': 500,
                        'ghi789': 600
                    }
                }, 'metricName1');
            });
        });

        it('should return the correct metricValues', function () {
            var metricValues = ElementAnalyzer.getMetricValuesByMetricName({
                'metricName1': {
                    'abc123': 200,
                    'def456': 300
                },
                'metricName2': {
                    'abc123': 400,
                    'def456': 500
                }
            }, 'metricName1');

            assert.deepEqual(metricValues, [200, 300]);
        });

        it('should return the correct metricValue', function () {
            var metricValues = ElementAnalyzer.getMetricValuesByMetricName({
                'metricName1': {
                    'abc123': 200,
                },
                'metricName2': {
                    'abc123': 400,
                }
            }, 'metricName1');

            assert.deepEqual(metricValues, [200]);
        });
    });
});