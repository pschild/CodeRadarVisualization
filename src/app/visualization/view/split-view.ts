import {AbstractView} from "./abstract-view";
import {INode} from "../../interfaces/INode";
import {NodeType} from "../../enum/NodeType";
import {AppConfig} from "../../AppConfig";
import {CommitReferenceType} from "../../enum/CommitReferenceType";
import {ColorHelper} from "../../helper/color-helper";
import {ElementAnalyzer} from "../../helper/element-analyzer";
import {ScreenType} from "../../enum/ScreenType";
import {IMetricMapping} from "../../interfaces/IMetricMapping";

export class SplitView extends AbstractView {

    minColorMetricValue: number;
    maxColorMetricValue: number;

    constructor(screenType: ScreenType, metricMapping: IMetricMapping) {
        super(screenType, metricMapping);
    }

    calculateElements(nodes: INode[], parent: INode, bottom: number, level: number = 1) {
        let minMaxColorValuePair = ElementAnalyzer.findSmallestAndBiggestMetricValueByMetricName(this.rootNode.children, this.metricMapping.colorMetricName);
        this.minColorMetricValue = minMaxColorValuePair.min;
        this.maxColorMetricValue = minMaxColorValuePair.max;

        if (!Array.isArray(nodes)) {
            nodes = [nodes];
        }

        nodes.forEach((node) => {
            // don't draw empty modules
            if (node.type == NodeType.MODULE && !ElementAnalyzer.hasChildrenForCurrentCommit(node, false, this.screenType)) {
                return;
            }

            if (!node.packerInfo.fit) {
                console.info(`node ${node.name} at position ${this.screenType} has no fit!`);
                return;
            }

            let heightMetric = ElementAnalyzer.getMetricValueOfElementAndCommitReferenceType(node, this.metricMapping.heightMetricName, CommitReferenceType.THIS, this.screenType);
            let groundAreaMetric = ElementAnalyzer.getMetricValueOfElementAndCommitReferenceType(node, this.metricMapping.groundAreaMetricName, CommitReferenceType.THIS, this.screenType);
            let colorMetric = ElementAnalyzer.getMetricValueOfElementAndCommitReferenceType(node, this.metricMapping.colorMetricName, CommitReferenceType.THIS, this.screenType);

            let metrics = {
                [this.metricMapping.heightMetricName]: heightMetric,
                [this.metricMapping.groundAreaMetricName]: groundAreaMetric,
                [this.metricMapping.colorMetricName]: colorMetric
            };

            let myHeight;
            if (node.type === NodeType.FILE ) {
                if (!heightMetric || !groundAreaMetric) {
                    return;
                }

                myHeight = heightMetric * AppConfig.HEIGHT_FACTOR;

                let myEdgeLength = Math.sqrt(groundAreaMetric) * AppConfig.EDGE_LENGTH_FACTOR;
                let otherEdgeLength = Math.sqrt(ElementAnalyzer.getMetricValueOfElementAndCommitReferenceType(node, this.metricMapping.groundAreaMetricName, CommitReferenceType.OTHER, this.screenType)) * AppConfig.EDGE_LENGTH_FACTOR;

                let myColor = ColorHelper.getColorByMetricValue(colorMetric, this.maxColorMetricValue, this.minColorMetricValue);

                if (myEdgeLength < otherEdgeLength) {
                    node.packerInfo.fit.x += (otherEdgeLength - myEdgeLength) / 2;
                    node.packerInfo.fit.y += (otherEdgeLength - myEdgeLength) / 2;
                }
                this.createBlock(node, parent, myColor, myEdgeLength, bottom, myHeight, false, metrics);

            } else {
                myHeight = AppConfig.MODULE_BLOCK_HEIGHT;
                let moduleColor = ColorHelper.getColorByLevelValue(level, this.minModuleLevel, this.maxModuleLevel);
                this.createBlock(node, parent, moduleColor, undefined, bottom, myHeight, false, metrics);
            }

            // recursion
            if (node.children && node.children.length > 0) {
                this.calculateElements(node.children, node, bottom + myHeight, level + 1);
            }
        });
    }

}
