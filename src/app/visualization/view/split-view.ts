import {AbstractView} from "./abstract-view";
import {Block} from "../../geometry/block";
import Object3D = THREE.Object3D;
import {INode} from "../../domain/INode";
import {NodeType} from "../../enum/NodeType";
import {AppConfig} from "../../AppConfig";
import {CommitReferenceType} from "../../enum/CommitReferenceType";
import {ColorHelper} from "../../helper/color-helper";
import {ElementAnalyzer} from "../../helper/element-analyzer";
import {ScreenType} from "../../enum/ScreenType";
import {AppState} from "../../shared/reducers";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";

export class SplitView extends AbstractView {

    screenType: ScreenType;
    store: Store<AppState>;

    minColorMetricValue: number;
    maxColorMetricValue: number;

    subscription: Subscription;

    constructor(screenType: ScreenType, store: Store<AppState>) {
        super(screenType);

        // no dependency injection as the view class are constructed with "new" instead with Angular
        this.store = store;

        this.subscription = this.store.select(state => state.visualizationState)
            .subscribe((visualizationState) => {
                if (!visualizationState.metricsLoading && visualizationState.metricTree) {
                    this.minColorMetricValue = visualizationState.minColorMetricValue;
                    this.maxColorMetricValue = visualizationState.maxColorMetricValue;
                }
            });
    }

    calculateElements(nodes: INode[], parent: INode, bottom: number) {
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

            let heightMetric = ElementAnalyzer.getMetricValueOfElementAndCommitReferenceType(node, AppConfig.HEIGHT_METRIC_NAME, CommitReferenceType.THIS, this.screenType);
            let groundAreaMetric = ElementAnalyzer.getMetricValueOfElementAndCommitReferenceType(node, AppConfig.GROUND_AREA_METRIC_NAME, CommitReferenceType.THIS, this.screenType);
            let colorMetric = ElementAnalyzer.getMetricValueOfElementAndCommitReferenceType(node, AppConfig.COLOR_METRIC_NAME, CommitReferenceType.THIS, this.screenType);

            let metrics = {
                [AppConfig.HEIGHT_METRIC_NAME]: heightMetric,
                [AppConfig.GROUND_AREA_METRIC_NAME]: groundAreaMetric,
                [AppConfig.COLOR_METRIC_NAME]: colorMetric
            };

            let myHeight;
            if (node.type === NodeType.FILE ) {
                if (!heightMetric || !groundAreaMetric) {
                    return;
                }

                myHeight = heightMetric * AppConfig.HEIGHT_FACTOR + AppConfig.GLOBAL_MIN_HEIGHT;

                let myGA = groundAreaMetric * AppConfig.GROUND_AREA_FACTOR + AppConfig.GLOBAL_MIN_GROUND_AREA + AppConfig.BLOCK_SPACING;
                let otherGA = ElementAnalyzer.getMetricValueOfElementAndCommitReferenceType(node, AppConfig.GROUND_AREA_METRIC_NAME, CommitReferenceType.OTHER, this.screenType) * AppConfig.GROUND_AREA_FACTOR + AppConfig.GLOBAL_MIN_GROUND_AREA + AppConfig.BLOCK_SPACING;

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
