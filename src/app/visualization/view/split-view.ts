import {AbstractView} from "./abstract-view";
import {Block} from "../../geometry/block";
import Object3D = THREE.Object3D;
import {INode} from "../../domain/INode";
import {IPackerElement} from "../../domain/IPackerElement";

export class SplitView extends AbstractView {

    calculateElements(nodes: INode[], parent: INode, bottom: number) {
        throw new Error('Method not implemented.');
    }

    createBlock(element: IPackerElement, parent: IPackerElement, color: any, currentCommitSize: any, bottom: number, height: number, isTransparent: boolean, metrics: any) {
        let block = new Block(0xff0000, 'test');
        block.position.x = -2.5;
        block.position.y = -2.5;
        block.position.z = -40;

        block.scale.x = 5;
        block.scale.y = 5;
        block.scale.z = 5;

        this.blockElements.push(block);
    }

}
