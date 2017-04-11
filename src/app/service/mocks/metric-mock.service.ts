import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {IDeltaTreeGetResponse} from "../../domain/IDeltaTreeGetResponse";
import {Commit} from "../../domain/Commit";
import {IMetricMapping} from "../../domain/IMetricMapping";

@Injectable()
export class MetricMockService {

    constructor(private http: Http) {
    }

    loadDeltaTree(leftCommit: Commit, rightCommit: Commit, metricMapping: IMetricMapping): Observable<IDeltaTreeGetResponse> {
        return this.http.get('api/metrics')
            .map((res) => {
                let mockedResponse: IDeltaTreeGetResponse = {
                    rootNode: res.json().data
                };
                return mockedResponse;
            });
    }

}
