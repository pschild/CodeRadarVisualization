import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {IDeltaTreeGetResponse} from "../domain/IDeltaTreeGetResponse";
import {Commit} from "../domain/Commit";

@Injectable()
export class MetricService {

    constructor(private http: Http) {
    }

    loadDeltaTree(leftCommit: Commit, rightCommit: Commit): Observable<IDeltaTreeGetResponse> {
        let body = {
            'commit1': leftCommit.name,
            'commit2': rightCommit.name,
            'metrics': ['metric1', 'metric2', 'metric3'] // TODO
        };

        // TODO: this.http.post('http://localhost:4200/assets/json/deltaTree.json', body)
        return this.http.get('http://localhost:4200/assets/json/deltaTree1.json')
            .map(res => <IDeltaTreeGetResponse>res.json());
    }

}
