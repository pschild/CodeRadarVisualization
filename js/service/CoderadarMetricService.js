import {config} from '../Config';

export class CoderadarMetricService {

    constructor() {
        this.URL = config.BASE_URL + '/projects/1/metricvalues/deltaTree';
    }

    loadByCommitId(commitId) {
        var params = {
            'commit': commitId,
            'metrics': [config.HEIGHT_METRIC_NAME, config.GROUND_AREA_METRIC_NAME, config.COLOR_METRIC_NAME]
        };

        return axios.post(this.URL, params);
    }

    loadDeltaTree(commit1Id, commit2Id) {
        var params = {
            'commit1': commit1Id,
            'commit2': commit2Id,
            'metrics': [config.HEIGHT_METRIC_NAME, config.GROUND_AREA_METRIC_NAME, config.COLOR_METRIC_NAME]
        };

        return axios.post(this.URL, params);
    }

    // deprecated
    loadTwoCommits(firstCommitId, secondCommitId, callbackFn) {
        axios.all([this.loadByCommitId(firstCommitId), this.loadByCommitId(secondCommitId)])
            .then(axios.spread(function (firstCommitResult, secondCommitResult) {
                callbackFn(firstCommitResult.data, secondCommitResult.data);
            }));
    }
}