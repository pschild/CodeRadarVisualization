import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {ICommitsGetResponse} from "../../interfaces/ICommitsGetResponse";
import {Observable} from "rxjs";

@Injectable()
export class CommitMockService {

    constructor(private http: Http) {
    }

    loadCommits(): Observable<ICommitsGetResponse> {
        return this.http.get('api/commits')
            .map((res) => {
                let mockedResponse: ICommitsGetResponse = {
                    _embedded: {
                        commitResourceList: res.json().data
                    }
                };
                return mockedResponse;
            });
    }

}
