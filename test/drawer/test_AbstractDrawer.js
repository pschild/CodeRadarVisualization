var assert = require('assert');

import {MergedDrawer} from '../../js/drawer/MergedDrawer';
import sinon from 'sinon';
import packers from 'binpacking';

// mock GrowingPacker because it's imported with script-tag
MergedDrawer.prototype._getPacker = sinon.stub().returns(packers.GrowingPacker.prototype);

// initialize a MergedDrawer because AbstractDrawer cannot be initialized
var drawer = new MergedDrawer(null, 'left');

describe('AbstractDrawer', function () {

});