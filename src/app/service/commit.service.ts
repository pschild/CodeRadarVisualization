import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {ICommitsGetResponse} from "../domain/ICommitsGetResponse";
import {Observable} from "rxjs";

@Injectable()
export class CommitService {

    constructor(private http: Http) {
    }

    loadCommits(): Observable<ICommitsGetResponse> {
        return this.http.get('http://localhost:4200/assets/json/commits.json')
            .map(res => <ICommitsGetResponse>res.json());
    }

}
