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

    calculateElements(nodes: INode[], parent: INode, bottom: number) {
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

                myHeight = heightMetric * AppConfig.HEIGHT_FACTOR + AppConfig.GLOBAL_MIN_HEIGHT;

                let myGA = groundAreaMetric * AppConfig.GROUND_AREA_FACTOR + AppConfig.GLOBAL_MIN_GROUND_AREA;
                let otherGA = ElementAnalyzer.getMetricValueOfElementAndCommitReferenceType(node, this.metricMapping.groundAreaMetricName, CommitReferenceType.OTHER, this.screenType) * AppConfig.GROUND_AREA_FACTOR + AppConfig.GLOBAL_MIN_GROUND_AREA;

                let myColor = ColorHelper.getColorByMetricValue(colorMetric, this.maxColorMetricValue, this.minColorMetricValue);

                if (myGA < otherGA) {
                    node.packerInfo.fit.x += (otherGA - myGA) / 2;
                    node.packerInfo.fit.y += (otherGA - myGA) / 2;
                }
                this.createBlock(node, parent, myColor, myGA, bottom, myHeight, false, metrics);

            } else {
                if (bottom > this.maxBottomValue) {
                    this.maxBottomValue = bottom;
                }

                myHeight = AppConfig.DEFAULT_BLOCK_HEIGHT;
                this.createBlock(node, parent, AppConfig.COLOR_HIERARCHY_RANGE[0], undefined, bottom, myHeight, false, metrics);
            }

            // recursion
            if (node.children && node.children.length > 0) {
                this.calculateElements(node.children, node, bottom + myHeight);
            }
        });
    }

}
