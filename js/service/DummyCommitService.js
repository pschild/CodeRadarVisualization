export class DummyCommitService {

    load(callbackFn) {
        axios.get('data/commits.json')
            .then(function (response) {
                callbackFn(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}