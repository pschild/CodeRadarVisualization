import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IDeltaTreeGetResponse} from '../interfaces/IDeltaTreeGetResponse';
import {ICommit} from '../interfaces/ICommit';
import {INode} from '../interfaces/INode';
import {IMetricMapping} from '../interfaces/IMetricMapping';
import {AppConfig} from '../AppConfig';
import {delay, map} from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable()
export class MetricService {

    constructor(private http: HttpClient) {
    }

    loadDeltaTree(leftCommit: ICommit, rightCommit: ICommit, metricMapping: IMetricMapping): Observable<IDeltaTreeGetResponse> {
        if (environment.useCoderadarEndpoint) {
            const body = {
                'commit1': leftCommit.name,
                'commit2': rightCommit.name,
                'metrics': [metricMapping.heightMetricName, metricMapping.groundAreaMetricName, metricMapping.colorMetricName]
            };

            return this.http.post<INode>(`${AppConfig.BASE_URL}/projects/1/metricvalues/deltaTree`, body)
                .pipe(
                    map((res) => {
                        return {
                            rootNode: res
                        };
                    })
                );
        } else {
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

            return this.http.get<INode>(`http://localhost:4200/assets/json/deltaTree${id}.json`)
                .pipe(
                    delay(1500),
                    map((res) => {
                        return {
                            rootNode: res
                        };
                    })
                );
        }
    }

}
