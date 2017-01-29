import {config} from '../Config';

export class CoderadarCommitService {

    constructor() {
        this.URL = config.BASE_URL + '/projects/1/commits?page=0&size=999';
    }

    load() {
        return axios.get(this.URL);
    }
}