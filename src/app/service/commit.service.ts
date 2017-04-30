import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {ICommitsGetResponse} from "../interfaces/ICommitsGetResponse";
import {Observable} from "rxjs";
import {AppConfig} from "../AppConfig";

@Injectable()
export class CommitService {

    constructor(private http: Http) {
    }

    loadCommits(): Observable<ICommitsGetResponse> {
        // Temporary: use this code block for querying a running coderadar server
        /*return this.http.get(`${AppConfig.BASE_URL}/projects/1/commits?page=0&size=999`)
            .map(res => <ICommitsGetResponse>res.json());*/

        // Temporary: use this code block for querying a dummy json file
        return this.http.get('http://localhost:4200/assets/json/commits.json')
            .map(res => <ICommitsGetResponse>res.json());
    }

}
