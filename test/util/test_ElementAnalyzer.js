var assert = require('assert');

import {ElementAnalyzer} from '../../js/util/ElementAnalyzer';
import * as Constants from '../../js/Constants';

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

var validJsonContainingCommitId = {
    type: 'MODULE',
    children: [
        {
            type: 'FILE',
            'commit1Metrics': null,
            'commit2Metrics': {
                'coderadar:size:loc:java': 9,
                'coderadar:size:eloc:java': 3,
                'coderadar:size:sloc:java': 5
            },
            children: []
        },
        {
            type: 'MODULE',
            children: [
                {
                    type: 'FILE',
                    'commit1Metrics': {
                        'coderadar:size:loc:java': 9,
                        'coderadar:size:eloc:java': 3,
                        'coderadar:size:sloc:java': 5
                    },
                    'commit2Metrics': {
                        'coderadar:size:loc:java': 9,
                        'coderadar:size:eloc:java': 3,
                        'coderadar:size:sloc:java': 5
                    },
                    children: []
                }
            ]
        }
    ]
};
var validJsonNotContainingCommitId = {
    type: 'MODULE',
    children: [
        {
            type: 'FILE',
            'commit1Metrics': null,
            'commit2Metrics': {
                'coderadar:size:loc:java': 9,
                'coderadar:size:eloc:java': 3,
                'coderadar:size:sloc:java': 5
            },
            children: []
        },
        {
            type: 'MODULE',
            children: [
                {
                    type: 'FILE',
                    'commit1Metrics': null,
                    'commit2Metrics': {
                        'coderadar:size:loc:java': 9,
                        'coderadar:size:eloc:java': 3,
                        'coderadar:size:sloc:java': 5
                    },
                    children: []
                }
            ]
        }
    ]
};
var exampleElement = {
    'type': 'FILE',
    'commit1Metrics': {
        'coderadar:size:loc:java': 1,
        'coderadar:size:eloc:java': 2,
        'coderadar:size:sloc:java': 3
    },
    'commit2Metrics': {
        'coderadar:size:loc:java': 4,
        'coderadar:size:eloc:java': 5,
        'coderadar:size:sloc:java': 6
    }
};
var exampleElementWithoutFirstCommitData = {
    'type': 'FILE',
    'commit1Metrics': null,
    'commit2Metrics': {
        'coderadar:size:loc:java': 4,
        'coderadar:size:eloc:java': 5,
        'coderadar:size:sloc:java': 6
    }
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
        var deltaTree = require('./../data/deltaTree.json');
        it('should return smallest and biggest metric value of given delta tree', function () {
            assert.deepEqual(
                ElementAnalyzer.findSmallestAndBiggestMetricValueByMetricName(deltaTree, 'coderadar:size:loc:java'),
                {
                    min: 2,
                    max: 200
                }
            );
        });
    });

    describe('hasChildrenForCurrentCommit', function () {
        it('should return true when children are found', function () {
            assert.equal(ElementAnalyzer.hasChildrenForCurrentCommit(validJsonContainingCommitId, false, Constants.LEFT_SCREEN), true);
            assert.equal(ElementAnalyzer.hasChildrenForCurrentCommit(validJsonContainingCommitId, false, Constants.RIGHT_SCREEN), true);
        });

        it('should return false when no children are found', function () {
            assert.equal(ElementAnalyzer.hasChildrenForCurrentCommit(validJsonNotContainingCommitId, false, Constants.LEFT_SCREEN), false);
        });
    });

    describe('hasMetricValuesForCurrentCommit', function () {
        it('should return true when current commit is found', function () {
            assert.equal(ElementAnalyzer.hasMetricValuesForCurrentCommit(exampleElement, false, Constants.LEFT_SCREEN), true);
            assert.equal(ElementAnalyzer.hasMetricValuesForCurrentCommit(exampleElement, false, Constants.RIGHT_SCREEN), true);
        });

        it('should return false when current commit is not found', function () {
            assert.equal(ElementAnalyzer.hasMetricValuesForCurrentCommit(exampleElementWithoutFirstCommitData, false, Constants.LEFT_SCREEN), false);
        });
    });

    describe('getMetricValueOfElementAndCurrentCommit', function () {
        it('should return metricValue when metric is found for current commit', function () {
            assert.equal(ElementAnalyzer.getMetricValueOfElementAndCommitType(exampleElement, 'coderadar:size:loc:java', Constants.COMMIT_TYPE_CURRENT, Constants.LEFT_SCREEN), 1);
        });

        it('should return metricValue when metric is found for other commit', function () {
            assert.equal(ElementAnalyzer.getMetricValueOfElementAndCommitType(exampleElement, 'coderadar:size:loc:java', Constants.COMMIT_TYPE_OTHER, Constants.LEFT_SCREEN), 4);
        });

        it('should return undefined when an empty element is given', function () {
            assert.equal(ElementAnalyzer.getMetricValueOfElementAndCommitType({}, 'coderadar:size:loc:java', Constants.COMMIT_TYPE_CURRENT, Constants.LEFT_SCREEN), undefined);
        });

        it('should return undefined when metric is not found', function () {
            assert.equal(ElementAnalyzer.getMetricValueOfElementAndCommitType(exampleElement, 'unknown', Constants.COMMIT_TYPE_CURRENT, Constants.LEFT_SCREEN), undefined);
        });

        it('should throw an error when unknown commit type is given', function () {
            assert.throws(() => {
                ElementAnalyzer.getMetricValueOfElementAndCommitType(exampleElement, 'coderadar:size:loc:java', 'unknown', Constants.LEFT_SCREEN);
            });
        });

        it('should throw an error when unknown screen position is given', function () {
            assert.throws(() => {
                ElementAnalyzer.getMetricValueOfElementAndCommitType(exampleElement, 'coderadar:size:loc:java', Constants.COMMIT_TYPE_OTHER, 'unknown');
            });
        });
    });
});