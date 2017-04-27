import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {IDeltaTreeGetResponse} from "../../interfaces/IDeltaTreeGetResponse";
import {ICommit} from "../../interfaces/ICommit";
import {IMetricMapping} from "../../interfaces/IMetricMapping";

@Injectable()
export class MetricMockService {

    constructor(private http: Http) {
    }

    loadDeltaTree(leftCommit: ICommit, rightCommit: ICommit, metricMapping: IMetricMapping): Observable<IDeltaTreeGetResponse> {
        return this.http.get('api/metrics')
            .map((res) => {
                let mockedResponse: IDeltaTreeGetResponse = {
                    rootNode: res.json().data
                };
                return mockedResponse;
            });
    }

}
