var assert = require('assert');

var commit1 = require('./../data/commit1_D_k1_k1k2.json');
var commit2 = require('./../data/commit2_D_k1_k1k2.json');

import {CommitMerger} from '../../js/CommitMerger';

describe('CommitMerger', function () {
    describe('#merge(commit1, commit2)', function () {
        commit1.commitId = 'abc123';
        commit2.commitId = 'def456';
        var result = CommitMerger.merge(commit1, commit2);

        it('should return an object with children', function () {
            assert.ok(typeof result == 'object' && result != null);
            assert.ok(Array.isArray(result.children));
        });

        it('should contain the correct amount of elements', function () {
            assert.equal(result.children.length, 1);
            assert.equal(result.children[0].children.length, 2);
        });

        it('should contain correct metricValues for first class', function() {
            var metricValues = result.children[0].children[0].metricValues;
            assert.equal(typeof metricValues, 'object');

            var metricNames = Object.keys(metricValues);
            for (var metricName of metricNames) {
                assert.equal(typeof metricValues[metricName], 'object');

                var commitIds = Object.keys(metricValues[metricName]);
                assert.ok(commitIds.indexOf('abc123') >= 0);
                assert.ok(commitIds.indexOf('def456') >= 0);

                assert.equal(typeof metricValues[metricName]['abc123'], 'number');
                assert.equal(typeof metricValues[metricName]['def456'], 'number');
            }
        });

        it('should contain correct metricValues for second class', function() {
            var metricValues = result.children[0].children[1].metricValues;
            assert.equal(typeof metricValues, 'object');

            var metricNames = Object.keys(metricValues);
            for (var metricName of metricNames) {
                assert.equal(typeof metricValues[metricName], 'object');

                var commitIds = Object.keys(metricValues[metricName]);
                assert.ok(commitIds.indexOf('abc123') < 0);
                assert.ok(commitIds.indexOf('def456') >= 0);

                assert.equal(typeof metricValues[metricName]['def456'], 'number');
            }
        });
    });
});