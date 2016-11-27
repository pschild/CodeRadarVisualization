var assert = require('assert');

import {SingleDrawer} from '../../js/drawer/SingleDrawer';
import sinon from 'sinon';
import packers from 'binpacking';

// mock GrowingPacker because it's imported with script-tag
SingleDrawer.prototype._getPacker = sinon.stub().returns(packers.GrowingPacker.prototype);

var leftDrawer = new SingleDrawer(null, 'abc123');
var rightDrawer = new SingleDrawer(null, 'def456');

var mergedData = require('./../data/mergedData.json');

describe('MergedDrawer', function () {
    beforeEach(function() {
        SingleDrawer.prototype.drawBlock = sinon.stub().returns('nothing interesting');
    });

    describe('#drawElements', function () {
        it('should draw the expected amount of elements for first drawer', function () {
            leftDrawer.drawElements(mergedData);
            sinon.assert.callCount(leftDrawer.drawBlock, 16);
        });
    });

    describe('#drawElements', function () {
        it('should draw the expected amount of elements for second drawer', function () {
            rightDrawer.drawElements(mergedData);
            sinon.assert.callCount(rightDrawer.drawBlock, 6);
        });
    });
});