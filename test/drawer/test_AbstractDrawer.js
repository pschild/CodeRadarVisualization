var assert = require('assert');

import {AbstractDrawer} from '../../js/drawer/AbstractDrawer';
import {MergedDrawer} from '../../js/drawer/MergedDrawer';
import * as Constants from '../../js/Constants';
import {config} from '../../js/Config';
import sinon from 'sinon';
import packers from 'binpacking';

// mock GrowingPacker because it's imported with script-tag
MergedDrawer.prototype._getPacker = sinon.stub().returns(packers.GrowingPacker.prototype);

// initialize a MergedDrawer because AbstractDrawer cannot be initialized
var drawer = new MergedDrawer(null, Constants.LEFT_SCREEN);

describe('AbstractDrawer', function () {
    it('should calculate ground areas for each file', sinon.test(function () {
        var elements = require('../data/deltaTree.json');

        // stubbing
        this.stub(AbstractDrawer.prototype, '_getValueForGroundArea');

        var result = drawer.calculateGroundAreas(elements);
        assert.equal(typeof result, 'object');
        assert.equal(Object.keys(result)[0], 'packer');

        sinon.assert.callCount(drawer._getValueForGroundArea, 7); // there are 7 files
    }));

    it('should calculate the ground areas correctly with bin packing', function () {
        var elements = {
            "name": "root",
            "type": "MODULE",
            "children": [
                {
                    "name": "ModuleA",
                    "type": "MODULE",
                    "children": [
                        {
                            "name": "ClassA",
                            "type": "FILE",
                            "children": [],
                            "commit1Metrics": {
                                "coderadar:size:loc:java": 100,
                                "coderadar:size:sloc:java": 100,
                                "coderadar:size:eloc:java": 100
                            },
                            "commit2Metrics": null,
                            "changes": {
                                "renamed": true,
                                "modified": true,
                                "added": false,
                                "deleted": false
                            },
                            "renamedFrom": null,
                            "renamedTo": null
                        },
                        {
                            "name": "ClassB",
                            "type": "FILE",
                            "children": [],
                            "commit1Metrics": {
                                "coderadar:size:loc:java": 200,
                                "coderadar:size:sloc:java": 200,
                                "coderadar:size:eloc:java": 200
                            },
                            "commit2Metrics": null,
                            "changes": {
                                "renamed": false,
                                "modified": true,
                                "added": true,
                                "deleted": true
                            },
                            "renamedFrom": null,
                            "renamedTo": null
                        },
                        {
                            "name": "ClassC",
                            "type": "FILE",
                            "children": [],
                            "commit1Metrics": {
                                "coderadar:size:loc:java": 300,
                                "coderadar:size:sloc:java": 300,
                                "coderadar:size:eloc:java": 300
                            },
                            "commit2Metrics": null,
                            "changes": {
                                "renamed": false,
                                "modified": true,
                                "added": true,
                                "deleted": true
                            },
                            "renamedFrom": null,
                            "renamedTo": null
                        }
                    ]
                }
            ]
        };

        // overwrite config values for the test
        config.GROUND_AREA_FACTOR = 1;
        config.BLOCK_SPACING = 0;
        config.GLOBAL_MIN_GROUND_AREA = 0;

        var result = drawer.calculateGroundAreas(elements);

        var root = findChildElementByName(elements, 'root');
        assert.equal(root.w, 500);
        assert.equal(root.h, 300);

        var moduleA = findChildElementByName(elements, 'ModuleA');
        assert.equal(moduleA.w, 500);
        assert.equal(moduleA.h, 300);

        var classA = findChildElementByName(elements, 'ClassA');
        assert.equal(classA.fit.x, 300);
        assert.equal(classA.fit.y, 200);

        var classB = findChildElementByName(elements, 'ClassB');
        assert.equal(classB.fit.x, 300);
        assert.equal(classB.fit.y, 0);

        var classC = findChildElementByName(elements, 'ClassC');
        assert.equal(classC.fit.x, 0);
        assert.equal(classC.fit.y, 0);
    });
});

function findChildElementByName(elements, name) {
    if (!Array.isArray(elements)) {
        elements = [elements];
    }

    for (let element of elements) {
        if (element.name == name) {
            return element;
        }

        // recursion
        if (element.children && element.children.length > 0) {
            return findChildElementByName(element.children, name);
        }
    }
}