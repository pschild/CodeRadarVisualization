var assert = require('assert');

import {ElementAnalyzer} from '../js/ElementAnalyzer';

var commit1Metrics = {
    "metric1Name": 111,
    "metric2Name": 222,
    "metric3Name": 333
};

var commit2Metrics = {
    "metric1Name": 444,
    "metric2Name": 555,
    "metric3Name": 666
};

describe('ElementAnalyzer', function () {
    describe('generateUniqueElementList', function () {
        var elements = [
            { name: 'a', children: [] },
            { name: 'b', children: [] },
            { name: 'c', children: [] },
            { name: 'a', children: [
                { name: 'd', children: [] },
                { name: 'b', children: [] }
            ] }
        ];

        it('should return empty array when no elements are given', function () {
            assert.deepEqual(
                ElementAnalyzer.generateUniqueElementList([]),
                []
            );
        });

        it('should return unique elements', function () {
            assert.deepEqual(
                ElementAnalyzer.generateUniqueElementList(elements),
                ['a', 'b', 'c', 'd']
            );
        });
    });

    describe('getMinMetricValueByMetricName', function () {
        it('should return the minimum value', function () {
            assert.equal(
                ElementAnalyzer.getMinMetricValueByMetricName(commit1Metrics, commit2Metrics, 'metric1Name'),
                111
            );
        });

        it('should return undefined when an unknown metric name is given', function () {
            assert.equal(
                ElementAnalyzer.getMinMetricValueByMetricName(commit1Metrics, commit2Metrics, 'unknown'),
                undefined
            );
        });

        it('should return results of first commit metrics if second commit metrics are null', function () {
            assert.equal(
                ElementAnalyzer.getMinMetricValueByMetricName(commit1Metrics, null, 'metric1Name'),
                111
            );
        });

        it('should return results of second commit metrics if first commit metrics are null', function () {
            assert.equal(
                ElementAnalyzer.getMinMetricValueByMetricName(null, commit2Metrics, 'metric1Name'),
                444
            );
        });

        it('should throw an error if both commit metrics are null', function () {
            assert.throws(() => {
                ElementAnalyzer.getMinMetricValueByMetricName(null, null, 'metric1Name');
            });
        });
    });

    describe('getMaxMetricValueByMetricName', function () {
        it('should return the maximum value', function () {
            assert.equal(
                ElementAnalyzer.getMaxMetricValueByMetricName(commit1Metrics, commit2Metrics, 'metric1Name'),
                444
            );
        });

        it('should return undefined when an unknown metric name is given', function () {
            assert.equal(
                ElementAnalyzer.getMaxMetricValueByMetricName(commit1Metrics, commit2Metrics, 'unknown'),
                undefined
            );
        });

        it('should return results of first commit metrics if second commit metrics are null', function () {
            assert.equal(
                ElementAnalyzer.getMaxMetricValueByMetricName(commit1Metrics, null, 'metric1Name'),
                111
            );
        });

        it('should return results of second commit metrics if first commit metrics are null', function () {
            assert.equal(
                ElementAnalyzer.getMaxMetricValueByMetricName(null, commit2Metrics, 'metric1Name'),
                444
            );
        });

        it('should throw an error if both commit metrics are null', function () {
            assert.throws(() => {
                ElementAnalyzer.getMaxMetricValueByMetricName(null, null, 'metric1Name');
            });
        });
    });

    describe('findSmallestAndBiggestMetricValueByMetricName', function () {
        var deltaTree = require('./data/deltaTree.json');
        it('should return smallest and biggest metric value of given delta tree', function () {
            assert.deepEqual(
                ElementAnalyzer.findSmallestAndBiggestMetricValueByMetricName(deltaTree, 'coderadar:size:loc:java'),
                {
                    min: 2,
                    max: 201
                }
            );
        });
    });
});