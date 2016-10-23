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

    loadTwoCommits(callbackFn) {
        function getFirstCommit() {
            return axios.get('data/metrics_1.json');
        }

        function getSecondCommit() {
            return axios.get('data/metrics_50.json');
        }

        axios.all([getFirstCommit(), getSecondCommit()])
            .then(axios.spread(function (firstCommitResult, secondCommitResult) {
                callbackFn(firstCommitResult.data, secondCommitResult.data);
            }));
    }
}