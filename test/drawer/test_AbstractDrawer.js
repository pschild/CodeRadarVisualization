var assert = require('assert');

import {MergedDrawer} from '../../js/drawer/MergedDrawer';
import sinon from 'sinon';
import packers from 'binpacking';

// mock GrowingPacker because it's imported with script-tag
MergedDrawer.prototype._getPacker = sinon.stub().returns(packers.GrowingPacker.prototype);

// initialize a MergedDrawer because AbstractDrawer cannot be initialized
var drawer = new MergedDrawer(null, 'left');

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

describe('AbstractDrawer', function () {
    describe('_hasChildrenForCurrentCommit', function () {
        it('should return true when children are found', function () {
            assert.equal(drawer._hasChildrenForCurrentCommit(validJsonContainingCommitId), true);
        });

        it('should return false when no children are found', function () {
            assert.equal(drawer._hasChildrenForCurrentCommit(validJsonNotContainingCommitId), false);
        });
    });

    describe('_hasMetricValuesForCurrentCommit', function () {
        it('should return true when current commit is found', function () {
            assert.equal(drawer._hasMetricValuesForCurrentCommit(exampleElement), true);
        });

        it('should return false when current commit is not found', function () {
            assert.equal(drawer._hasMetricValuesForCurrentCommit(exampleElementWithoutFirstCommitData), false);
        });
    });

    describe('_getMetricValueOfElementAndCurrentCommit', function () {
        it('should return metricValue when metric is found for current commit', function () {
            assert.equal(drawer._getMetricValueOfElementAndCommitType(exampleElement, 'coderadar:size:loc:java', 'current'), 1);
        });

        it('should return metricValue when metric is found for other commit', function () {
            assert.equal(drawer._getMetricValueOfElementAndCommitType(exampleElement, 'coderadar:size:loc:java', 'other'), 4);
        });
    });
});