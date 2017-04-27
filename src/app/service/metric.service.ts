import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {IDeltaTreeGetResponse} from "../interfaces/IDeltaTreeGetResponse";
import {ICommit} from "../interfaces/ICommit";
import {IMetricMapping} from "../interfaces/IMetricMapping";

@Injectable()
export class MetricService {

    constructor(private http: Http) {
    }

    loadDeltaTree(leftCommit: ICommit, rightCommit: ICommit, metricMapping: IMetricMapping): Observable<IDeltaTreeGetResponse> {
        let body = {
            'commit1': leftCommit.name,
            'commit2': rightCommit.name,
            'metrics': [metricMapping.heightMetricName, metricMapping.groundAreaMetricName, metricMapping.colorMetricName]
        };

        // TODO: this.http.post('http://localhost:4200/assets/json/deltaTree.json', body)
        return this.http.get('http://localhost:4200/assets/json/deltaTree.json')
            .map((res) => {
                return {
                    rootNode: res.json()
                };
            });
    }

}
