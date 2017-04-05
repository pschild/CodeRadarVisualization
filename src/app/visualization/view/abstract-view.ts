import Object3D = THREE.Object3D;
import {Block} from "../../geometry/block";
import {INode} from "../../domain/INode";
import {NodeType} from "app/enum/NodeType";
import {IPackerElement} from "../../domain/IPackerElement";
declare var GrowingPacker: any;

export abstract class AbstractView {

    rootNode: INode;
    blockElements: Block[] = [];
    packer = new GrowingPacker();

    constructor() {

    }

    setMetricTree(root: INode) {
        this.rootNode = root;
    }

    recalculate() {
        if (!this.rootNode) {
            throw new Error(`rootNode is not defined!`);
        }

        this.calculateGroundAreas([this.rootNode]);
        this.calculateElements([this.rootNode], null, 0);
    }

    calculateGroundAreas(nodes: INode[]) {
        if (!Array.isArray(nodes)) {
            nodes = [nodes];
        }

        for (let node of nodes) {
            let element: IPackerElement = { w: 0, h: 0 };

            if (node.type === NodeType.FILE) {
                // let groundArea = this._getValueForGroundArea(node.commit1Metrics, node.commit2Metrics);
                let groundArea = 10;
                if (!groundArea) {
                    element.w = element.h = 0;
                } else {
                    element.w = groundArea * 0.1 + 1 + 5;
                    element.h = groundArea * 0.1 + 1 + 5;
                }
            }

            // recursion
            if (node.children && node.children.length > 0) {
                let result = this.calculateGroundAreas(node.children);
                element.w = result.w + 5 * 3;
                element.h = result.h + 5 * 3;
            }

            node.packerInfo = element;
        }

        nodes.sort(function (a, b) {
            return b.packerInfo.w - a.packerInfo.w;
        });

        this.packer.fit(nodes.map(node => node.packerInfo));
        return {
            packer: this.packer.root,
            w: this.packer.root.w,
            h: this.packer.root.h
        };
    }

    abstract calculateElements(nodes: INode[], parent: INode, bottom: number);

    getBlockElements(): Block[] {
        return this.blockElements;
    }

    traverseNodes(nodes: INode[], workerFn: Function, params: Object = null): void {
        nodes.forEach((node) => {
            workerFn(node);

            // recursion
            if (node.children && node.children.length > 0) {
                this.traverseNodes(node.children, workerFn, params);
            }
        });
    }
}
