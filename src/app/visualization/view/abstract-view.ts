import Object3D = THREE.Object3D;
import {Block} from "../../geometry/block";
import {INode} from "../../domain/INode";
import {NodeType} from "app/enum/NodeType";
import {IPackerElement} from "../../domain/IPackerElement";
import {AppConfig} from "../../AppConfig";
import {ElementAnalyzer} from "../../helper/element-analyzer";
declare var GrowingPacker: any;

export abstract class AbstractView {

    rootNode: INode;
    blockElements: Block[] = [];
    packer = new GrowingPacker();

    minBottomValue: number = 0;
    maxBottomValue: number = Number.MIN_VALUE;

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
                let groundArea = this.getValueForGroundArea(node.commit1Metrics, node.commit2Metrics);
                if (!groundArea) {
                    element.w = element.h = 0;
                } else {
                    element.w = groundArea * AppConfig.GROUND_AREA_FACTOR + AppConfig.GLOBAL_MIN_GROUND_AREA + AppConfig.BLOCK_SPACING;
                    element.h = groundArea * AppConfig.GROUND_AREA_FACTOR + AppConfig.GLOBAL_MIN_GROUND_AREA + AppConfig.BLOCK_SPACING;
                }
            }

            // recursion
            if (node.children && node.children.length > 0) {
                let result = this.calculateGroundAreas(node.children);
                element.w = result.w + AppConfig.BLOCK_SPACING * 3;
                element.h = result.h + AppConfig.BLOCK_SPACING * 3;
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

    private getValueForGroundArea(commit1Metrics: any, commit2Metrics: any): number {
        return ElementAnalyzer.getMaxMetricValueByMetricName(commit1Metrics, commit2Metrics, AppConfig.GROUND_AREA_METRIC_NAME);
    }
}
