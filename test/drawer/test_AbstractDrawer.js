var assert = require('assert');

import {AbstractDrawer} from '../../js/drawer/AbstractDrawer';
import {MergedDrawer} from '../../js/drawer/MergedDrawer';
import * as Constants from '../../js/Constants';
import sinon from 'sinon';
import packers from 'binpacking';

// mock GrowingPacker because it's imported with script-tag
MergedDrawer.prototype._getPacker = sinon.stub().returns(packers.GrowingPacker.prototype);

// initialize a MergedDrawer because AbstractDrawer cannot be initialized
var drawer = new MergedDrawer(null, Constants.LEFT_SCREEN);

describe('AbstractDrawer', function () {
    it('should calculate ground areas for each file', function () {
        var elements = require('../data/deltaTree.json');

        // stubbing
        AbstractDrawer.prototype._getValueForGroundArea = sinon.stub().returns('yalla yalla');

        var result = drawer.calculateGroundAreas(elements);
        assert.equal(typeof result, 'object');
        assert.equal(Object.keys(result)[0], 'packer');

        sinon.assert.callCount(drawer._getValueForGroundArea, 7); // there are 7 files
    });
});