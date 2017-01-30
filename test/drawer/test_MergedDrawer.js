var assert = require('assert');

import {MergedDrawer} from '../../js/drawer/MergedDrawer';
import * as Constants from '../../js/Constants';
import sinon from 'sinon';
import packers from 'binpacking';

// mock GrowingPacker because it's imported with script-tag
MergedDrawer.prototype._getPacker = sinon.stub().returns(packers.GrowingPacker.prototype);

var drawer = new MergedDrawer(null, Constants.LEFT_SCREEN);

describe('MergedDrawer', function () {
    it('should draw the correct amount of elements', function () {
        var elements = require('../data/deltaTreeWithCalculatedGroundAreas.json');

        // stubbing
        MergedDrawer.prototype.drawBlock = sinon.stub().returns('yalla yalla');
        MergedDrawer.prototype.drawBlockConnection = sinon.stub().returns('yalla yalla');

        drawer.drawElements(elements);
        sinon.assert.callCount(drawer.drawBlock, 12); // 9 files + 3 modules

        assert.equal(drawer.movedElements.length, 1);
    });
});