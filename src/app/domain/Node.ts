import {INode} from "./INode";
import {NodeType} from "../enum/NodeType";

export class Node implements INode {
    private _name: string;
    private _type: NodeType;
    private _commit1Metrics: any;
    private _commit2Metrics: any;
    private _renamedFrom: any;
    private _renamedTo: any;
    private _changes: any;
    private _children: INode[];

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get type(): NodeType {
        return this._type;
    }

    set type(value: NodeType) {
        this._type = value;
    }

    get commit1Metrics(): any {
        return this._commit1Metrics;
    }

    set commit1Metrics(value: any) {
        this._commit1Metrics = value;
    }

    get commit2Metrics(): any {
        return this._commit2Metrics;
    }

    set commit2Metrics(value: any) {
        this._commit2Metrics = value;
    }

    get renamedFrom(): any {
        return this._renamedFrom;
    }

    set renamedFrom(value: any) {
        this._renamedFrom = value;
    }

    get renamedTo(): any {
        return this._renamedTo;
    }

    set renamedTo(value: any) {
        this._renamedTo = value;
    }

    get changes(): any {
        return this._changes;
    }

    set changes(value: any) {
        this._changes = value;
    }

    get children(): INode[] {
        return this._children;
    }

    set children(value: INode[]) {
        this._children = value;
    }
}
