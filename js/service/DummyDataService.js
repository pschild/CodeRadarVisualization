import {AbstractDataService} from './AbstractDataService';

export class DummyDataService extends AbstractDataService {

    // override
    load(callbackFn) {
        axios.get('data/metrics.json')
            .then(function (response) {
                callbackFn(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    loadByCommitId(commitId) {
        return axios.get('data/metrics_' + commitId + '.json');
    }

    loadTwoCommits(firstCommitId, secondCommitId, callbackFn) {
        axios.all([this.loadByCommitId(firstCommitId), this.loadByCommitId(secondCommitId)])
            .then(axios.spread(function (firstCommitResult, secondCommitResult) {
                callbackFn(firstCommitResult.data, secondCommitResult.data);
            }));
    }
}