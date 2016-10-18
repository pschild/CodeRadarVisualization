import {Application} from './Application.js';
import {Block} from './Block.js';

(function () {
    var application = new Application();
    const BLOCK_SPACING = 50;

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