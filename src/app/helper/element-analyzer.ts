import {CommitReferenceType} from "../enum/CommitReferenceType";
import {INode} from "../domain/INode";
import {ScreenType} from "../enum/ScreenType";

export class ElementAnalyzer {

    static getMaxMetricValueByMetricName(commit1Metrics: any, commit2Metrics: any, metricName: string): number {
        if (commit1Metrics === null && commit2Metrics === null) {
            throw new Error(`No metric objects given`);
        }

        if (commit1Metrics === null) {
            return commit2Metrics[metricName];
        } else if (commit2Metrics === null) {
            return commit1Metrics[metricName];
        } else {
            return commit1Metrics[metricName] > commit2Metrics[metricName] ? commit1Metrics[metricName] : commit2Metrics[metricName];
        }
    }

    static hasChildrenForCurrentCommit(node: INode, isFullScreen: boolean, screenType: ScreenType): boolean {
        let found = false;

        for (let child of node.children) {
            if (this.hasMetricValuesForCurrentCommit(child, isFullScreen, screenType)) {
                found = true;
            }

            // recursion
            if (child.children && child.children.length > 0 && !found) {
                found = this.hasChildrenForCurrentCommit(child, isFullScreen, screenType);
            }
        }

        return found;
    }

    static hasMetricValuesForCurrentCommit(node: INode, isFullScreen: boolean, screenType: ScreenType) {
        // when in fullScreen mode, metrics for at least one commit should be present
        if (isFullScreen) {
            return node.commit1Metrics != null || node.commit2Metrics != null;
        }

        if (screenType == ScreenType.LEFT) {
            return node.commit1Metrics != null;
        } else if (screenType == ScreenType.RIGHT) {
            return node.commit2Metrics != null;
        } else {
            throw new Error(`Unknown screenType ${screenType}!`);
        }
    }

    static getMetricValueOfElementAndCommitReferenceType(node: INode, metricName: string, commitReferenceType: CommitReferenceType, screenType: ScreenType) {
        if (screenType == ScreenType.LEFT) {
            if (commitReferenceType == CommitReferenceType.THIS) {
                return node.commit1Metrics ? node.commit1Metrics[metricName] : undefined;
            } else if (commitReferenceType == CommitReferenceType.OTHER) {
                return node.commit2Metrics ? node.commit2Metrics[metricName] : undefined;
            } else {
                throw new Error(`Unknown commitReferenceType ${commitReferenceType}!`);
            }

        } else if (screenType == ScreenType.RIGHT) {
            if (commitReferenceType == CommitReferenceType.THIS) {
                return node.commit2Metrics ? node.commit2Metrics[metricName] : undefined;
            } else if (commitReferenceType == CommitReferenceType.OTHER) {
                return node.commit1Metrics ? node.commit1Metrics[metricName] : undefined;
            } else {
                throw new Error(`Unknown commitReferenceType ${commitReferenceType}!`);
            }

        } else {
            throw new Error(`Unknown screenType ${screenType}!`);
        }
    }

}
