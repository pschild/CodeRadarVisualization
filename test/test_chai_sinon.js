var assert = require('assert');

import {Drawer} from '../js/Drawer';
import {ElementAnalyzer} from '../js/ElementAnalyzer';
import chai from 'chai';
import sinon from 'sinon';

import packers from 'binpacking';

var mergedData = require('./data/mergedData.json');

var firstDrawer;
var secondDrawer;

// https://nicolas.perriault.net/code/2013/testing-frontend-javascript-code-using-mocha-chai-and-sinon/
// http://sinonjs.org/

describe('Drawer', function () {
    describe('#calculate and draw methods', function () {

        beforeEach(function() {
            Drawer.prototype._getPacker = sinon.stub().returns(packers.GrowingPacker.prototype);
            Drawer.prototype._getColor = sinon.stub().returns('some color');
            Drawer.prototype.drawBlock = sinon.stub().returns('nothing interesting');

            ElementAnalyzer.getMaxMetricValueByMetricName = sinon.stub().returns('nothing interesting');

            firstDrawer = new Drawer(null, 'abc123');
            secondDrawer = new Drawer(null, 'def456');
        });

        it('should create one packer for each drawer', function () {
            firstDrawer.calculateGroundAreas(mergedData);

            // _getPacker is called for each drawer, so twice:
            sinon.assert.callCount(Drawer.prototype._getPacker, 2);
        });

        // it('should get max metricValue for each file', function () {
        //     secondDrawer.calculateGroundAreas(mergedData);
        //
        //     // we have 10 files in mergedData.json:
        //     sinon.assert.callCount(ElementAnalyzer.getMaxMetricValueByMetricName, 10);
        // });

        it('should draw the expected amount of elements for first drawer', function () {
            firstDrawer.drawElements(mergedData);

            // the first drawer needs to draw 17 blocks (normal + helper):
            sinon.assert.callCount(firstDrawer.drawBlock, 17);
        });

        // it('should draw the expected amount of elements for second drawer', function () {
        //     secondDrawer.drawElements(mergedData);
        //
        //     // the first drawer needs to draw 6 blocks (normal + helper):
        //     sinon.assert.callCount(secondDrawer.drawBlock, 6);
        // });
    });
});