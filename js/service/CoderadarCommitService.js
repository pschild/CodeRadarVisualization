import {AbstractDataService} from './AbstractDataService';

export class CoderadarCommitService extends AbstractDataService {

    constructor() {
        super();

        this.URL = 'http://localhost:8080/projects/1/commits?page=0&size=999';
    }

    // override
    load(callbackFn) {
        var params = {};

        axios.post(this.URL, params)
            .then(function (response) {
                callbackFn(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}