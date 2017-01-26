import {config} from '../Config';

export class CoderadarCommitService {

    constructor() {
        this.URL = config.BASE_URL + '/projects/1/commits?page=0&size=999';
    }

    // override
    load(callbackFn) {
        var params = {};

        return axios.get(this.URL, params)
            .then(function (response) {
                callbackFn(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}