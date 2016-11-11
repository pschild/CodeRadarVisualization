import {Commit} from './Commit';

export class CommitMapper {

    constructor(data) {
        this.data = data['_embedded']['commitResourceList'];
        this.objects = [];
    }

    mapAll() {
        for (let element of this.data) {
            this.objects.push(this.map(element));
        }
    }
    
    map(data) {
        let commit = new Commit();
        commit.setName(data.name);
        commit.setAuthor(data.author);
        commit.setTimestamp(data.timestamp);
        commit.setAnalyzed(data.analyzed);
        
        return commit;
    }

    getAll() {
        return this.objects;
    }

}