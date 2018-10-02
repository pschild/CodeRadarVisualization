import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ICommitsGetResponse} from '../interfaces/ICommitsGetResponse';
import {Observable} from 'rxjs';
import {AppConfig} from '../AppConfig';
import {environment} from 'environments/environment';

@Injectable()
export class CommitService {

    constructor(private http: HttpClient) {
    }

    loadCommits(): Observable<ICommitsGetResponse> {
        if (environment.useCoderadarEndpoint) {
            return this.http.get<ICommitsGetResponse>(`${AppConfig.BASE_URL}/projects/1/commits?page=0&size=999`);
        } else {
            return this.http.get<ICommitsGetResponse>('assets/json/commits.json');
        }
    }

}
