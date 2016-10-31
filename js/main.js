import {Application} from './Application';

(function () {
    var application = new Application();
    application.createLeftScreen('abc123');
    application.createRightScreen('def456');

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
})();