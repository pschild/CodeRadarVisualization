import {AbstractView} from "./abstract-view";
import Object3D = THREE.Object3D;
import {INode} from "../../domain/INode";

export class MergedView extends AbstractView {

    calculateElements(nodes: INode[], parent: INode, bottom: number) {
        throw new Error('Method not implemented.');
    }

}
