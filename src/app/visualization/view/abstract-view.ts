import {Block} from "../../geometry/block";
import {INode} from "../../interfaces/INode";
import {NodeType} from "app/enum/NodeType";
import {IPackerElement} from "../../interfaces/IPackerElement";
import {AppConfig} from "../../AppConfig";
import {ElementAnalyzer} from "../../helper/element-analyzer";
import {ScreenType} from "../../enum/ScreenType";
import {CommitReferenceType} from "../../enum/CommitReferenceType";
import {MetricNameHelper} from "../../helper/metric-name-helper";
declare var GrowingPacker: any;

export abstract class AbstractView {

    rootNode: INode;
    blockElements: Block[] = [];
    packer = new GrowingPacker();

    minBottomValue: number = 0;
    maxBottomValue: number = Number.MIN_VALUE;

    screenType: ScreenType;

    constructor(screenType: ScreenType) {
        this.screenType = screenType;
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
                    element.w = groundArea * AppConfig.GROUND_AREA_FACTOR + AppConfig.GLOBAL_MIN_GROUND_AREA + 2 * AppConfig.BLOCK_SPACING;
                    element.h = groundArea * AppConfig.GROUND_AREA_FACTOR + AppConfig.GLOBAL_MIN_GROUND_AREA + 2 * AppConfig.BLOCK_SPACING;
                }
            }

            // recursion
            if (node.children && node.children.length > 0) {
                let result = this.calculateGroundAreas(node.children);
                element.w = result.w + 2 * AppConfig.BLOCK_SPACING;
                element.h = result.h + 2 * AppConfig.BLOCK_SPACING;
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

    createBlock(node: INode, parent: INode, color: any, currentCommitSize: any, bottom: number, height: number, isTransparent: boolean, metrics?: any, commitType?: CommitReferenceType, changeTypes?: any) {
        let finalX, finalY, finalZ;
        let finalWidth, finalHeight, finalDepth;

        let cube = new Block(color, node.name);
        finalX = node.packerInfo.fit.x + (parent ? parent.packerInfo.renderedX : 0) + AppConfig.BLOCK_SPACING;
        finalY = bottom;
        finalZ = node.packerInfo.fit.y + (parent ? parent.packerInfo.renderedY : 0) + AppConfig.BLOCK_SPACING;

        // save the rendered positions to draw children relative to their parent
        node.packerInfo.renderedX = finalX;
        node.packerInfo.renderedY = finalZ;

        finalWidth = node.type === NodeType.FILE ? currentCommitSize : node.packerInfo.w - 2 * AppConfig.BLOCK_SPACING;
        finalHeight = height;
        finalDepth = node.type === NodeType.FILE ? currentCommitSize : node.packerInfo.h - 2 * AppConfig.BLOCK_SPACING;

        if (isTransparent) {
            cube.material.transparent = true;
            cube.material.opacity = 0.4;
        }

        cube.position.x = finalX;
        cube.position.y = finalY;
        cube.position.z = finalZ;

        cube.scale.x = finalWidth;
        cube.scale.y = finalHeight;
        cube.scale.z = finalDepth;

        cube.userData = this.createUserData(node, parent, bottom, isTransparent, metrics, commitType, changeTypes);

        this.blockElements.push(cube);
    }

    createUserData(node: INode, parent: INode, bottom: number, isTransparent: boolean, metrics: any, commitType?: CommitReferenceType, changeTypes?: any) {
        return {
            parentName: parent ? parent.name : undefined,
            bottom: bottom,
            metrics: metrics,
            type: node.type,
            elementName: node.name,
            isHelper: isTransparent,
            commitType: commitType,
            changeTypes: changeTypes
        };
    }

    getBlockElements(): Block[] {
        return this.blockElements;
    }

    private getValueForGroundArea(commit1Metrics: any, commit2Metrics: any): number {
        return ElementAnalyzer.getMaxMetricValueByMetricName(commit1Metrics, commit2Metrics, AppConfig.GROUND_AREA_METRIC_NAME);
    }
}
