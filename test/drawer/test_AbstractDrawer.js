var assert = require('assert');

import {MergedDrawer} from '../../js/drawer/MergedDrawer';
import sinon from 'sinon';
import packers from 'binpacking';

// mock GrowingPacker because it's imported with script-tag
MergedDrawer.prototype._getPacker = sinon.stub().returns(packers.GrowingPacker.prototype);

// initialize a MergedDrawer because AbstractDrawer cannot be initialized
var drawer = new MergedDrawer(null, 'left');

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

describe('AbstractDrawer', function () {
    describe('_getMetricValueOfElementAndCurrentCommit', function () {
        it('should return metricValue when metric is found for current commit', function () {
            assert.equal(drawer._getMetricValueOfElementAndCommitType(exampleElement, 'coderadar:size:loc:java', 'current'), 1);
        });

        it('should return metricValue when metric is found for other commit', function () {
            assert.equal(drawer._getMetricValueOfElementAndCommitType(exampleElement, 'coderadar:size:loc:java', 'other'), 4);
        });
    });
});