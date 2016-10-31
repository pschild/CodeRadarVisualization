import {Application} from './Application';
import {CoderadarDataService} from './service/CoderadarDataService';
import {DummyDataService} from './service/DummyDataService';
import {CommitMerger} from './CommitMerger';
import {Drawer} from './Drawer';

(function () {
    var application = new Application();
    application.setCurrentCommitId('abc123');
    // application.setCurrentCommitId('def456');

    var drawer = new Drawer(application);

    let dataService = new DummyDataService();

    dataService.loadTwoCommits((firstCommitResult, secondCommitResult) => {
        var result = CommitMerger.merge(firstCommitResult, secondCommitResult);
        console.log('result', result);

        drawer.calculateGroundAreas(result);
        drawer.drawElements(result);
    });

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
})();