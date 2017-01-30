var assert = require('assert');

import {SingleDrawer} from '../../js/drawer/SingleDrawer';
import * as Constants from '../../js/Constants';
import sinon from 'sinon';
import packers from 'binpacking';

// mock GrowingPacker because it's imported with script-tag
SingleDrawer.prototype._getPacker = sinon.stub().returns(packers.GrowingPacker.prototype);

var elements = require('../data/deltaTreeWithCalculatedGroundAreas.json');

describe('SingleDrawer', function () {
    it('should draw the correct amount of elements', function () {
        var drawer = new SingleDrawer(null, Constants.LEFT_SCREEN, {});

        // stubbing
        SingleDrawer.prototype.drawBlock = sinon.stub().returns('yalla yalla');

        drawer.drawElements(elements);
        sinon.assert.callCount(drawer.drawBlock, 8); // 5 files + 3 modules
    });

    it('should draw the correct amount of elements', function () {
        var drawer = new SingleDrawer(null, Constants.RIGHT_SCREEN, {});

        // stubbing
        SingleDrawer.prototype.drawBlock = sinon.stub().returns('yalla yalla');

        drawer.drawElements(elements);
        sinon.assert.callCount(drawer.drawBlock, 8); // 5 files + 3 modules
    });
});