import {AbstractView} from "./abstract-view";
import {INode} from "../../interfaces/INode";
import {ElementAnalyzer} from "../../helper/element-analyzer";
import {AppConfig} from "../../AppConfig";
import {NodeType} from "../../enum/NodeType";
import {ColorHelper} from "../../helper/color-helper";
import {CommitReferenceType} from "../../enum/CommitReferenceType";
import {ScreenType} from "../../enum/ScreenType";
import {BlockConnection} from "app/geometry/block-connection";
import {Scene} from "three";

export class MergedView extends AbstractView {

    movedElements: any[] = [];
    connections: BlockConnection[] = [];

    constructor(screenType: ScreenType) {
        super(screenType);
    }

    calculateElements(nodes: INode[], parent: INode, bottom: number) {
        if (!Array.isArray(nodes)) {
            nodes = [nodes];
        }

        nodes.forEach((node) => {
            if (!node.packerInfo.fit) {
                console.warn(`node ${node.name} at position ${this.screenType} has no fit!`);
                return;
            }

            let blueHeight;

            // FILE
            if (node.type === NodeType.FILE) {
                let blueHeightMetric = ElementAnalyzer.getMetricValueOfElementAndCommitReferenceType(node, AppConfig.HEIGHT_METRIC_NAME, CommitReferenceType.THIS, this.screenType);
                let orangeHeightMetric = ElementAnalyzer.getMetricValueOfElementAndCommitReferenceType(node, AppConfig.HEIGHT_METRIC_NAME, CommitReferenceType.OTHER, this.screenType);

                let blueGroundAreaMetric = ElementAnalyzer.getMetricValueOfElementAndCommitReferenceType(node, AppConfig.GROUND_AREA_METRIC_NAME, CommitReferenceType.THIS, this.screenType);
                let orangeGroundAreaMetric = ElementAnalyzer.getMetricValueOfElementAndCommitReferenceType(node, AppConfig.GROUND_AREA_METRIC_NAME, CommitReferenceType.OTHER, this.screenType);

                let blueColorMetric = ElementAnalyzer.getMetricValueOfElementAndCommitReferenceType(node, AppConfig.COLOR_METRIC_NAME, CommitReferenceType.THIS, this.screenType);
                let orangeColorMetric = ElementAnalyzer.getMetricValueOfElementAndCommitReferenceType(node, AppConfig.COLOR_METRIC_NAME, CommitReferenceType.OTHER, this.screenType);

                let blueMetrics = {
                    [AppConfig.HEIGHT_METRIC_NAME]: blueHeightMetric,
                    [AppConfig.GROUND_AREA_METRIC_NAME]: blueGroundAreaMetric,
                    [AppConfig.COLOR_METRIC_NAME]: blueColorMetric
                };

                let orangeMetrics = {
                    [AppConfig.HEIGHT_METRIC_NAME]: orangeHeightMetric,
                    [AppConfig.GROUND_AREA_METRIC_NAME]: orangeGroundAreaMetric,
                    [AppConfig.COLOR_METRIC_NAME]: orangeColorMetric
                };

                blueHeight = blueHeightMetric * AppConfig.HEIGHT_FACTOR + AppConfig.GLOBAL_MIN_HEIGHT;
                let orangeHeight = orangeHeightMetric * AppConfig.HEIGHT_FACTOR + AppConfig.GLOBAL_MIN_HEIGHT;

                let blueGA = blueGroundAreaMetric * AppConfig.GROUND_AREA_FACTOR + AppConfig.GLOBAL_MIN_GROUND_AREA;
                let orangeGA = orangeGroundAreaMetric * AppConfig.GROUND_AREA_FACTOR + AppConfig.GLOBAL_MIN_GROUND_AREA;

                let blueColor = ColorHelper.getColorByPosition(this.screenType);
                let orangeColor = ColorHelper.getContraryColorByColor(blueColor);

                let blueTransparency = blueHeight >= orangeHeight && blueGA >= orangeGA;
                let orangeTransparency = orangeHeight >= blueHeight && orangeGA >= blueGA;

                if (!isNaN(blueGA) && !isNaN(orangeGA)) {
                    // both blocks
                    if (blueGA < orangeGA) {
                        // draw the bigger block ...
                        this.createBlock(node, parent, orangeColor, orangeGA, bottom, orangeHeight, orangeTransparency, orangeMetrics, CommitReferenceType.OTHER, { modified: true });

                        // ... calculate the center position for the smaller block ...
                        node.packerInfo.fit.x += (orangeGA - blueGA) / 2;
                        node.packerInfo.fit.y += (orangeGA - blueGA) / 2;

                        // ... draw the smaller block
                        this.createBlock(node, parent, blueColor, blueGA, bottom, blueHeight, blueTransparency, blueMetrics, CommitReferenceType.THIS, { modified: true });
                    } else if (blueGA > orangeGA) {
                        // draw the bigger block ...
                        this.createBlock(node, parent, blueColor, blueGA, bottom, blueHeight, blueTransparency, blueMetrics, CommitReferenceType.THIS, { modified: true });

                        // ... calculate the center position for the smaller block ...
                        node.packerInfo.fit.x += (blueGA - orangeGA) / 2;
                        node.packerInfo.fit.y += (blueGA - orangeGA) / 2;

                        // ... draw the smaller block
                        this.createBlock(node, parent, orangeColor, orangeGA, bottom, orangeHeight, orangeTransparency, orangeMetrics, CommitReferenceType.OTHER, { modified: true });
                    } else {
                        // ground areas are the same
                        if (blueHeight != orangeHeight) {
                            // heights are different, so draw both blocks
                            this.createBlock(node, parent, blueColor, blueGA, bottom, blueHeight, blueTransparency, blueMetrics, CommitReferenceType.THIS, { modified: true });
                            this.createBlock(node, parent, orangeColor, orangeGA, bottom, orangeHeight, orangeTransparency, orangeMetrics, CommitReferenceType.OTHER, { modified: true });
                        } else {
                            // heights are the same, so the file has not changed
                            this.createBlock(node, parent, AppConfig.COLOR_UNCHANGED_FILE, orangeGA, bottom, orangeHeight, false, orangeMetrics, undefined, { modified: false });
                        }
                    }

                } else if (isNaN(orangeGA)) {
                    // only blue block

                    let changeTypes = { added: false, deleted: true, moved: false };
                    // cache element to draw connections
                    if (this.isNodeMoved(node)) {
                        this.movedElements.push({
                            fromElementName: node.name,
                            toElementName: node.renamedTo
                        });

                        changeTypes.moved = true;
                    }

                    this.createBlock(node, parent, AppConfig.COLOR_DELETED_FILE, blueGA, bottom, blueHeight, false, blueMetrics, CommitReferenceType.THIS, changeTypes);

                } else if (isNaN(blueGA)) {
                    // only orange block

                    let changeTypes = { added: true, deleted: false, moved: false };
                    if (this.isNodeMoved(node)) {
                        changeTypes.moved = true;
                    }

                    this.createBlock(node, parent, AppConfig.COLOR_ADDED_FILE, orangeGA, bottom, orangeHeight, false, orangeMetrics, CommitReferenceType.OTHER, changeTypes);
                }

                // MODULE
            } else {
                // don't draw empty modules
                if (ElementAnalyzer.hasChildrenForCurrentCommit(node, true, this.screenType)) {
                    if (bottom > this.maxBottomValue) {
                        this.maxBottomValue = bottom;
                    }

                    blueHeight = AppConfig.DEFAULT_BLOCK_HEIGHT;
                    this.createBlock(node, parent, AppConfig.COLOR_HIERARCHY_RANGE[0], undefined, bottom, blueHeight, false);
                }
            }

            // recursion
            if (node.children && node.children.length > 0) {
                this.calculateElements(node.children, node, bottom + blueHeight);
            }
        });
    }

    calculateConnections(scene: Scene) {
        for (let movedElementPair of this.movedElements) {
            let fromElement = scene.getObjectByName(movedElementPair.fromElementName);
            let toElement = scene.getObjectByName(movedElementPair.toElementName);

            if (fromElement && toElement) {
                this.connections.push(new BlockConnection(fromElement, toElement));
            } else {
                console.warn(`A connection could not be drawn because at least one element could not be found in the scene.`);
            }
        }
    }

    getConnections(): BlockConnection[] {
        return this.connections;
    }

    private isNodeMoved(node: INode) {
        return node.renamedTo != null || node.renamedFrom != null;
    }
}
