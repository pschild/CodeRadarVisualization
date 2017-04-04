import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {IDeltaTreeGetResponse} from "../domain/IDeltaTreeGetResponse";
import {Commit} from "../domain/Commit";

@Injectable()
export class MetricMockService {

    constructor(private http: Http) {
    }

    loadDeltaTree(leftCommit: Commit, rightCommit: Commit): Observable<IDeltaTreeGetResponse> {
        return this.http.get('api/metrics')
            .map((res) => {
                let mockedResponse: IDeltaTreeGetResponse = {
                    nodes: res.json().data
                };
                return mockedResponse;
            });
    }

}
