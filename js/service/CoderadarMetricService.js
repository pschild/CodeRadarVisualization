import {config} from '../Config';

export class CoderadarMetricService {

    constructor() {
        this.URL = config.BASE_URL + '/projects/1/metricvalues/tree';
    }

    // override
    load(callbackFn) {}

    loadByCommitId(commitId) {
        var params = {
            'commit': commitId,
            'metrics': ['coderadar:size:loc:java', 'coderadar:size:sloc:java']
        };

        return axios.post(this.URL, params);
    }

    loadTwoCommits(firstCommitId, secondCommitId, callbackFn) {
        axios.all([this.loadByCommitId(firstCommitId), this.loadByCommitId(secondCommitId)])
            .then(axios.spread(function (firstCommitResult, secondCommitResult) {
                callbackFn(firstCommitResult.data, secondCommitResult.data);
            }));
    }
}