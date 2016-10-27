import {Application} from './Application';
import {Block} from './Block';
import {CoderadarDataService} from './service/CoderadarDataService';
import {DummyDataService} from './service/DummyDataService';
import {CommitMerger} from './CommitMerger';

(function () {
    var application = new Application();
    const BLOCK_SPACING = 200;
    const DEFAULT_BLOCK_HEIGHT = 200;
    const DEFAULT_BLOCK_DIMENSIONS = 100;

    const GROUND_AREA_METRIC_NAME = 'coderadar:javaMoc';
    const GROUND_AREA_FACTOR = 10;

    const HEIGHT_METRIC_NAME = 'coderadar:javaLoc';
    const HEIGHT_FACTOR = 10;

    var currentCommitId = 'def456';

    // let dataService = new CoderadarDataService();
    let dataService = new DummyDataService();
    // dataService.load((data) => {
    //     calculateDimensions(data.children);
    //     drawElements(data.children);
    // });
    dataService.loadTwoCommits((firstCommitResult, secondCommitResult) => {
        var result = CommitMerger.merge(firstCommitResult, secondCommitResult);
        console.log('result', result);
        calculateDimensions(result);
        drawElements(result);
    });

    function drawElements(elements, parent, bottom = 0) {
        elements.forEach((element) => {
            // don't draw empty modules
            if (element.type == 'MODULE' && (!element.children || element.children.length == 0)) {
                return;
            }

            var height, color;
            if (element.type == 'FILE') {
                color = '#00cc00';
                height = element.metricValues[HEIGHT_METRIC_NAME] * HEIGHT_FACTOR || 1000;
            } else {
                color = '#cccccc';
                height = DEFAULT_BLOCK_HEIGHT;
            }

            var greatestSize = element.w;
            var currentCommitSize = getMetricValueOfElementAndCurrentCommit(element, currentCommitId) * GROUND_AREA_FACTOR;

            if (!isNaN(currentCommitSize) && greatestSize != currentCommitSize) {
                // draw a helper cube
                var cube = new Block(color, element.name);
                cube.position.x = element.fit.x + (parent ? parent.fit.x : 0);
                cube.position.y = bottom;
                cube.position.z = element.fit.y + (parent ? parent.fit.y : 0);

                cube.scale.x = greatestSize - BLOCK_SPACING;
                cube.scale.y = 100;
                cube.scale.z = greatestSize - BLOCK_SPACING;

                cube.material.wireframe = true;

                application.getScene().add(cube);
            }

            var cube = new Block(color, element.name);
            cube.position.x = element.fit.x + (parent ? parent.fit.x : 0);
            cube.position.y = bottom;
            cube.position.z = element.fit.y + (parent ? parent.fit.y : 0);

            cube.scale.x = element.type == 'FILE' ? currentCommitSize - BLOCK_SPACING : element.w - BLOCK_SPACING;
            cube.scale.y = height;
            cube.scale.z = element.type == 'FILE' ? currentCommitSize - BLOCK_SPACING : element.w - BLOCK_SPACING;

            application.getScene().add(cube);

            if (element.children && element.children.length > 0) {
                drawElements(element.children, element, bottom + height);
            }
        });
    }

    function calculateDimensions(elements) {
        elements.forEach((element) => {
            element.w = 0;
            element.h = 0;

            if (element.type == 'FILE') {
                var greatestMetricValueForGroundArea = getGreatestMetricValueForGroundArea(element.metricValues);
                element.w = greatestMetricValueForGroundArea * GROUND_AREA_FACTOR;
                element.h = greatestMetricValueForGroundArea * GROUND_AREA_FACTOR;
            }

            if (element.children && element.children.length > 0) {
                var result = calculateDimensions(element.children);
                element.w = result.w;
                element.h = result.h;
            }
        });

        var packer = new GrowingPacker();

        elements.sort(function (a, b) {
            return (b.w > a.w);
        });

        packer.fit(elements);
        return {
            packer: packer.root,
            w: packer.root.w,
            h: packer.root.h
        };

    }

    function getGreatestMetricValueForGroundArea(metricValues) {
        if (typeof metricValues != 'object') {
            throw 'metricValues is not an object!';
        }

        for (let key in metricValues) {
            if (typeof metricValues[key] == 'object') {
                if (key == GROUND_AREA_METRIC_NAME) {
                    let maxValue = -1;
                    for (let commitId in metricValues[key]) {
                        var metricValue = metricValues[key][commitId];
                        if (maxValue < metricValue) {
                            maxValue = metricValue;
                        }
                    }
                    return maxValue;
                }
            } else if (typeof metricValues[key] == 'number') {
                if (key == GROUND_AREA_METRIC_NAME) {
                    return metricValues[key];
                }
            } else {
                throw 'unknown type!';
            }
        }
    }

    function getMetricValueOfElementAndCurrentCommit(element, commitId) {
        for (let key in element.metricValues) {
            if (typeof element.metricValues[key] == 'object') {
                return element.metricValues[GROUND_AREA_METRIC_NAME][commitId];
            } else if (typeof element.metricValues[key] == 'number') {
                if (key == GROUND_AREA_METRIC_NAME) {
                    return element.metricValues[key];
                }
            } else {
                throw 'unknown type!';
            }
        }
    }

    function drawPreviewElement(block, color) {
        var $div = $('<div/>');
        $div.css({
            left: block.fit.x,
            top: block.fit.y,
            width: block.w - BLOCK_SPACING,
            height: block.h - BLOCK_SPACING,
            background: color
        }).addClass('preview-element');

        $('#top-view').append($div);
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
})();