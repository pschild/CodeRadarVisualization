var assert = require('assert');

import {ElementAnalyzer} from '../js/ElementAnalyzer';

var commit1Metrics = {
    "coderadar:size:loc:java": 111,
    "coderadar:size:eloc:java": 222,
    "coderadar:size:sloc:java": 333
};

var commit2Metrics = {
    "coderadar:size:loc:java": 444,
    "coderadar:size:eloc:java": 555,
    "coderadar:size:sloc:java": 666
};

describe('ElementAnalyzer', function () {
    describe('#getMaxMetricValueByMetricName', function () {
        it('max', function () {
            assert.equal(ElementAnalyzer.getMaxMetricValueByMetricName(commit1Metrics, null, 'coderadar:size:loc:java'), 111);
            assert.equal(ElementAnalyzer.getMaxMetricValueByMetricName(null, commit2Metrics, 'coderadar:size:loc:java'), 444);
            assert.equal(ElementAnalyzer.getMaxMetricValueByMetricName(commit1Metrics, commit2Metrics, 'coderadar:size:loc:java'), 444);

            assert.equal(ElementAnalyzer.getMaxMetricValueByMetricName(commit1Metrics, commit2Metrics, 'unknown'), undefined);
            assert.throws(() => {
                ElementAnalyzer.getMaxMetricValueByMetricName(null, null, 'coderadar:size:loc:java');
            });
        });
    });

    describe('#getMinMetricValueByMetricName', function () {
        it('min', function () {
            assert.equal(ElementAnalyzer.getMinMetricValueByMetricName(commit1Metrics, null, 'coderadar:size:loc:java'), 111);
            assert.equal(ElementAnalyzer.getMinMetricValueByMetricName(null, commit2Metrics, 'coderadar:size:loc:java'), 444);
            assert.equal(ElementAnalyzer.getMinMetricValueByMetricName(commit1Metrics, commit2Metrics, 'coderadar:size:loc:java'), 111);

            assert.equal(ElementAnalyzer.getMinMetricValueByMetricName(commit1Metrics, commit2Metrics, 'unknown'), undefined);
            assert.throws(() => {
                ElementAnalyzer.getMinMetricValueByMetricName(null, null, 'coderadar:size:loc:java');
            });
        });
    });

    describe('#findSmallestAndBiggestMetricValueByMetricName', function () {
        it('global minAndMax', function () {
            var mergedData = require('./data/mergedData_new.json');
            assert.deepEqual(ElementAnalyzer.findSmallestAndBiggestMetricValueByMetricName(mergedData, 'coderadar:size:loc:java'), {
                min: 2,
                max: 201
            });
        });
    });
});