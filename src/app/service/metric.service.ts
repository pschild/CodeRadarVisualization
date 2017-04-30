import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {IDeltaTreeGetResponse} from "../interfaces/IDeltaTreeGetResponse";
import {ICommit} from "../interfaces/ICommit";
import {IMetricMapping} from "../interfaces/IMetricMapping";
import {AppConfig} from "../AppConfig";

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

        // Temporary: use this code block for querying a running coderadar server
        /*return this.http.post(`${AppConfig.BASE_URL}/projects/1/metricvalues/deltaTree`, body)
            .map((res) => {
                return {
                    rootNode: res.json()
                };
            });*/

        // Temporary: use this code block for querying a dummy json file
        let id;
        switch (rightCommit.name) {
            case 'b152859ca8d73f5c974c2264107fd0092af310d0':
                id = 1;
                break;
            case '2beb1d1d720c1256cedfdf483331f65861079705':
                id = 2;
                break;
            case 'cbba0662f48f139da4973cc610bd4caa6213ed08':
                id = 3;
                break;
            case '6ffebfad9e79dfa4ddfa7d043d84eb424a28c0cd':
                id = 4;
                break;
        }

        return this.http.get(`http://localhost:4200/assets/json/deltaTree${id}.json`)
            .delay(1500)
            .map((res) => {
                return {
                    rootNode: res.json()
                };
            });
    }

}
