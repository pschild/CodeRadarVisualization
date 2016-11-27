var assert = require('assert');

import {Drawer} from '../../js/drawer/Drawer';
import {config} from '../../js/Config';
import sinon from 'sinon';
import packers from 'binpacking';

// mock GrowingPacker because it's imported with script-tag
Drawer.prototype._getPacker = sinon.stub().returns(packers.GrowingPacker.prototype);

// change the metric names for the test data
config.HEIGHT_METRIC_NAME = 'metric1';
config.GROUND_AREA_METRIC_NAME = 'metric2';

const CURRENT_COMMIT = 'abc123';
var drawer = new Drawer(null, CURRENT_COMMIT);
var firstDrawer;
var secondDrawer;

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
var mergedData = require('./../data/mergedData.json');

describe('Drawer', function () {
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

    describe('#calculateGroundAreas', function () {

        beforeEach(function() {
            Drawer.prototype._getPacker = sinon.stub().returns(packers.GrowingPacker.prototype);
            Drawer.prototype._getColor = sinon.stub().returns('some color');
            Drawer.prototype.drawBlock = sinon.stub().returns('nothing interesting');

            firstDrawer = new Drawer(null, 'abc123');
            secondDrawer = new Drawer(null, 'def456');
        });

        it('should create one packer for each drawer', function () {
            firstDrawer.calculateGroundAreas(mergedData);

            // _getPacker is called for each drawer, so twice:
            sinon.assert.callCount(Drawer.prototype._getPacker, 2);
        });
    });

    describe('#calculateGroundAreas', function () {

        beforeEach(function() {
            Drawer.prototype._getPacker = sinon.stub().returns(packers.GrowingPacker.prototype);
            Drawer.prototype._getColor = sinon.stub().returns('some color');
            Drawer.prototype.drawBlock = sinon.stub().returns('nothing interesting');

            firstDrawer = new Drawer(null, 'abc123');
            secondDrawer = new Drawer(null, 'def456');
        });

        it('should draw the expected amount of elements for first drawer', function () {
            firstDrawer.drawElements(mergedData);

            // the first drawer needs to draw 17 blocks (normal + helper):
            sinon.assert.callCount(firstDrawer.drawBlock, 17);
        });

        it('should draw the expected amount of elements for second drawer', function () {
            secondDrawer.drawElements(mergedData);

            // the first drawer needs to draw 6 blocks (normal + helper):
            sinon.assert.callCount(secondDrawer.drawBlock, 6);
        });
    });
});