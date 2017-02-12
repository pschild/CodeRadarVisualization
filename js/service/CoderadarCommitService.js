import {config} from '../Config';
import {CommitMapper} from '../domain/CommitMapper';

export class CoderadarCommitService {

    constructor() {
        this.URL = config.BASE_URL + '/projects/1/commits?page=0&size=999';

        this._commits = [];
    }

    load() {
        return axios.get(this.URL)
            .then((response) => {
                var commitMapper = new CommitMapper(response.data);
                commitMapper.mapAll();

                this._commits = commitMapper.getAll();
                this._commits.sort(function(a, b) {
                    return b.timestamp - a.timestamp;
                });
            });
    }

    getCommits() {
        return this._commits;
    }

    getCommitByName(name) {
        for (let commit of this._commits) {
            if (commit.getName() == name) {
                return commit;
            }
        }

        return undefined;
    }
}