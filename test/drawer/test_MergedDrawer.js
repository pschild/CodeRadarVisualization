var assert = require('assert');

import {MergedDrawer} from '../../js/drawer/MergedDrawer';
import sinon from 'sinon';
import packers from 'binpacking';

// mock GrowingPacker because it's imported with script-tag
MergedDrawer.prototype._getPacker = sinon.stub().returns(packers.GrowingPacker.prototype);

const CURRENT_COMMIT = 'abc123';
var drawer = new MergedDrawer(null, CURRENT_COMMIT);

var mergedData = require('./../data/mergedData.json');

describe('MergedDrawer', function () {
    beforeEach(function() {
        MergedDrawer.prototype.drawBlock = sinon.stub().returns('nothing interesting');
    });

    describe('#drawElements', function () {
        it('should draw the expected amount of elements', function () {
            drawer.drawElements(mergedData);
            sinon.assert.callCount(drawer.drawBlock, 21);
        });
    });
});