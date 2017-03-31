import {ICommit} from "./ICommit";

export class Commit implements ICommit {
    private _name: string;
    private _author: string;
    private _timestamp: number;
    private _analyzed: boolean;


    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get author(): string {
        return this._author;
    }

    set author(value: string) {
        this._author = value;
    }

    get timestamp(): number {
        return this._timestamp;
    }

    set timestamp(value: number) {
        this._timestamp = value;
    }

    get analyzed(): boolean {
        return this._analyzed;
    }

    set analyzed(value: boolean) {
        this._analyzed = value;
    }
}
