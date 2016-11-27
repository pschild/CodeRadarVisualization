var assert = require('assert');

import {MergedDrawer} from '../../js/drawer/MergedDrawer';
import sinon from 'sinon';
import packers from 'binpacking';

// mock GrowingPacker because it's imported with script-tag
MergedDrawer.prototype._getPacker = sinon.stub().returns(packers.GrowingPacker.prototype);

const CURRENT_COMMIT = 'abc123';
// initialize a MergedDrawer because AbstractDrawer cannot be initialized
var drawer = new MergedDrawer(null, CURRENT_COMMIT);

var invalidJson = {
    type: 'ROOT',
    children: [
        {
            type: 'FILE',
            metricValues: {
                'metricName1': 111,
                'metricName2': 222
            },
            children: []
        },
        {
            type: 'MODULE',
            children: [
                {
                    type: 'FILE',
                    metricValues: {
                        'metricName1': 333,
                        'metricName2': 444
                    },
                    children: []
                }
            ]
        }
    ]
};
var validJsonContainingCommitId = {
    type: 'ROOT',
    name: 'ROOT',
    children: [
        {
            type: 'FILE',
            name: 'A1.java',
            metricValues: {
                'metricName1': {
                    'def456': 111
                },
                'metricName2': {
                    'def456': 111
                }
            },
            children: []
        },
        {
            type: 'MODULE',
            name: 'Module B',
            children: [
                {
                    type: 'FILE',
                    name: 'B1.java',
                    metricValues: {
                        'metricName1': {
                            'abc123': 111,
                            'def456': 222
                        },
                        'metricName2': {
                            'abc123': 111,
                            'def456': 222
                        }
                    },
                    children: []
                }
            ]
        }
    ]
};
var validJsonNotContainingCommitId = {
    type: 'ROOT',
    children: [
        {
            type: 'FILE',
            metricValues: {
                'metricName1': {
                    'def456': 111
                },
                'metricName2': {
                    'def456': 111
                }
            },
            children: []
        },
        {
            type: 'MODULE',
            children: [
                {
                    type: 'FILE',
                    metricValues: {
                        'metricName1': {
                            'def456': 222
                        },
                        'metricName2': {
                            'def456': 222
                        }
                    },
                    children: []
                }
            ]
        }
    ]
};

describe('AbstractDrawer', function () {
    describe('#_hasChildrenForCurrentCommit(element)', function () {
        it('should throw an error when data is not valid', function () {
            assert.throws(() => {
                drawer._hasChildrenForCurrentCommit(invalidJson);
            });
        });

        it('should return true when children are found', function () {
            assert.equal(drawer._hasChildrenForCurrentCommit(validJsonContainingCommitId), true);
        });

        it('should return false when no children are found', function () {
            assert.equal(drawer._hasChildrenForCurrentCommit(validJsonNotContainingCommitId), false);
        });
    });

    describe('#_hasMetricValuesForCurrentCommit(element)', function () {
        it('should throw an error when data is not valid', function () {
            assert.throws(() => {
                drawer._hasMetricValuesForCurrentCommit({
                    type: 'FILE',
                    metricValues: {
                        'metricName1': 42
                    }
                });
            });
        });

        it('should return true when current commit is found', function () {
            assert.equal(drawer._hasMetricValuesForCurrentCommit({
                type: 'FILE',
                metricValues: {
                    'metricName1': {
                        'abc123': 42
                    }
                }
            }), true);
        });

        it('should return false when current commit is not found', function () {
            assert.equal(drawer._hasMetricValuesForCurrentCommit({
                type: 'FILE',
                metricValues: {
                    'metricName1': {
                        'def456': 42
                    }
                }
            }), false);
        });
    });

    describe('#_getMetricValueOfElementAndCurrentCommit(element, metricName)', function () {
        it('should throw an error when data is not valid', function () {
            assert.throws(() => {
                drawer._getMetricValueOfElementAndCommitType({
                    type: 'FILE',
                    metricValues: {
                        'metricName1': 42
                    }
                }, 'metricName1');
            });
        });

        it('should return metricValue when metric is found for current commit', function () {
            assert.equal(drawer._getMetricValueOfElementAndCommitType({
                type: 'FILE',
                metricValues: {
                    'metricName1': {
                        'abc123': 42
                    }
                }
            }, 'metricName1', 'current'), 42);
        });

        it('should throw an error when commitId for given commitType is not found', function () {
            assert.equal(drawer._getMetricValueOfElementAndCommitType({
                type: 'FILE',
                metricValues: {
                    'metricName1': {
                        'def456': 42
                    }
                }
            }, 'metricName1', 'current'), undefined);
        });

        it('should throw an error when metricName is not found', function () {
            assert.throws(() => {
                drawer._getMetricValueOfElementAndCommitType({
                    type: 'FILE',
                    metricValues: {
                        'metricName1': {
                            'abc123': 42
                        }
                    }
                }, 'metricName2', 'current');
            });
        });
    });
});