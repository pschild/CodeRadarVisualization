import {Commit} from "./Commit";

export interface ICommitsGetResponse {
    _embedded: {
        commitResourceList: Commit[]
    };
}
