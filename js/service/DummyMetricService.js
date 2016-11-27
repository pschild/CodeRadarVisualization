export class DummyMetricService {

    // override
    load(callbackFn) {}

    loadByCommitId(commitId) {
        return axios.get('data/' + commitId + '.json');
    }

    loadTwoCommits(firstCommitId, secondCommitId, callbackFn) {
        axios.all([this.loadByCommitId(firstCommitId), this.loadByCommitId(secondCommitId)])
            .then(axios.spread(function (firstCommitResult, secondCommitResult) {
                // TODO: remove in final version!
                setTimeout(() => {
                    callbackFn(firstCommitResult.data, secondCommitResult.data);
                }, 500);
            }));
    }
}