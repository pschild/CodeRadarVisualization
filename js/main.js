import {Application} from './Application.js';
import {Block} from './Block.js';

(function () {
    var application = new Application();
    const BLOCK_SPACING = 50;
    const DEFAULT_BLOCK_HEIGHT = 100;

    d3.json('data/metrics.json', (error, data) => {
        calculateDimensions(data.children);
        drawElements(data.children);
    });

    function drawElements(elements, parent) {
        elements.forEach((element) => {
            // don't draw empty modules
            if (element.type == 'MODULE' && (!element.children || element.children.length == 0)) {
                return;
            }

            var color = getRandomColor();

            var cube = new Block(color);
            cube.position.x = element.fit.x + (parent ? parent.fit.x : 0);
            cube.position.y = element.bottom;
            cube.position.z = element.fit.y + (parent ? parent.fit.y : 0);

            cube.scale.x = element.w - BLOCK_SPACING;
            cube.scale.y = element.height;
            cube.scale.z = element.h - BLOCK_SPACING;

            application.getScene().add(cube);

            if (element.children && element.children.length > 0) {
                drawElements(element.children, element);
            }
        });
    }

    function calculateDimensions(elements, bottom = 0) {
        elements.forEach((element) => {
            element.w = 0;
            element.h = 0;
            element.height = DEFAULT_BLOCK_HEIGHT;
            element.bottom = bottom;

            if (element.type == 'FILE') {
                element.w = element.metrics.moc * 10;
                element.h = element.metrics.moc * 10;
                element.height = element.metrics.loc * 10;
            }

            if (element.children && element.children.length > 0) {
                var result = calculateDimensions(element.children, bottom + element.height);
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

    /*
    d3.json('data/test.json', function (error, data) {
        var packer = new GrowingPacker();

        data.forEach(function (element) {
            element.w = element.metrics.moc * 100;
            element.h = element.metrics.moc * 100;
        });

        data.sort(function (a, b) {
            return (b.w > a.w);
        });
        packer.fit(data);

        for (var n = 0; n < data.length; n++) {
            var block = data[n];
            if (block.fit) {
                console.log('DrawCube', block.fit.x, block.fit.y, block.w, block.h);

                var color = getRandomColor();

                drawPreviewElement(block, color);

                var cube = new Block(color);
                cube.position.x = block.fit.x;
                cube.position.y = 0;
                cube.position.z = block.fit.y;

                cube.scale.x = block.w - BLOCK_SPACING;
                cube.scale.y = block.metrics.loc * 10;
                cube.scale.z = block.h - BLOCK_SPACING;

                application.getScene().add(cube);
            } else {
                console.warn('Block does not fit!', block);
            }
        }

        var floor = new Block('#cccccc');
        floor.position.x = -50;
        floor.position.y = 0;
        floor.position.z = -50;
        floor.scale.x = packer.root.w + 50;
        floor.scale.y = -50;
        floor.scale.z = packer.root.h + 50;
        application.getScene().add(floor);
    });
    */

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