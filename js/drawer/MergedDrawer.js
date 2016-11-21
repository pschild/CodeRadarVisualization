import {Block} from '../Block';
import {config} from '../Config';
import {AbstractDrawer} from './AbstractDrawer';
import {ElementAnalyzer} from '../ElementAnalyzer';

export class MergedDrawer extends AbstractDrawer {

    constructor(scene, currentCommitId, position) {
        super(scene, currentCommitId, position);
    }

    // override
    drawElements(elements, parent, bottom = 0) {
        elements.forEach((element) => {
            var blueHeight;
            if (element.type == 'FILE') {
                blueHeight = this._getMetricValueOfElementAndCommitType(element, config.HEIGHT_METRIC_NAME, this.COMMIT_TYPE_CURRENT) * config.HEIGHT_FACTOR;
                var orangeHeight = this._getMetricValueOfElementAndCommitType(element, config.HEIGHT_METRIC_NAME, this.COMMIT_TYPE_OTHER) * config.HEIGHT_FACTOR;

                var blueGA = this._getMetricValueOfElementAndCommitType(element, config.GROUND_AREA_METRIC_NAME, this.COMMIT_TYPE_CURRENT) * config.GROUND_AREA_FACTOR + config.BLOCK_SPACING;
                var orangeGA = this._getMetricValueOfElementAndCommitType(element, config.GROUND_AREA_METRIC_NAME, this.COMMIT_TYPE_OTHER) * config.GROUND_AREA_FACTOR + config.BLOCK_SPACING;

                var blueColor = this._getColorByPosition(this.position);
                var orangeColor = this._getContraryColorByColor(blueColor);

                var blueTransparency = blueHeight > orangeHeight && blueGA > orangeGA;
                var orangeTransparency = orangeHeight > blueHeight && orangeGA > blueGA;

                if (!isNaN(blueGA) && !isNaN(orangeGA)) {
                    // both blocks
                    if (blueGA < orangeGA) {
                        this.drawBlock(element, parent, orangeColor, orangeGA, bottom, orangeHeight, orangeTransparency);

                        element.fit.x += (orangeGA - blueGA) / 2;
                        element.fit.y += (orangeGA - blueGA) / 2;
                        this.drawBlock(element, parent, blueColor, blueGA, bottom, blueHeight, blueTransparency);
                    } else {
                        this.drawBlock(element, parent, blueColor, blueGA, bottom, blueHeight, blueTransparency);

                        element.fit.x += (blueGA - orangeGA) / 2;
                        element.fit.y += (blueGA - orangeGA) / 2;
                        this.drawBlock(element, parent, orangeColor, orangeGA, bottom, orangeHeight, orangeTransparency);
                    }

                } else if (isNaN(orangeGA)) {
                    // only blue block
                    this.drawBlock(element, parent, blueColor, blueGA, bottom, blueHeight, false);

                } else if (isNaN(blueGA)) {
                    // only orange block
                    this.drawBlock(element, parent, orangeColor, orangeGA, bottom, orangeHeight, false);
                }
            } else {
                blueHeight = config.DEFAULT_BLOCK_HEIGHT;

                this.drawBlock(element, parent, config.COLOR_MODULE, undefined, bottom, blueHeight);
            }

            // recursion
            if (element.children && element.children.length > 0) {
                this.drawElements(element.children, element, bottom + blueHeight);
            }
        });
    }

    // override
    drawBlock(element, parent, color, currentCommitSize, bottom, height, isTransparent) {
        var finalX, finalY, finalZ;
        var finalWidth, finalHeight, finalDepth;

        var cube = new Block(color, element.name);
        finalX = element.fit.x + (parent ? parent.renderedX : 0) + config.BLOCK_SPACING;
        finalY = bottom;
        finalZ = element.fit.y + (parent ? parent.renderedY : 0) + config.BLOCK_SPACING;

        // save the rendered positions to draw children relative to their parent
        element.renderedX = finalX;
        element.renderedY = finalZ;

        finalWidth = element.type == 'FILE' ? currentCommitSize - config.BLOCK_SPACING : element.w - config.BLOCK_SPACING * 2;
        finalHeight = height;
        finalDepth = element.type == 'FILE' ? currentCommitSize - config.BLOCK_SPACING : element.h - config.BLOCK_SPACING * 2;

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

        cube.userData = {
            tooltipLabel: element.name + '<br>height=' + finalHeight + '<br>size=' + finalWidth + 'x' + finalDepth,
            isHelper: isTransparent
        };

        this.scene.add(cube);
    }

    // override
    _getValueForGroundArea(metricValues) {
        var metricValueForGroundArea = ElementAnalyzer.getMetricValuesByMetricName(metricValues, config.GROUND_AREA_METRIC_NAME);
        if (metricValueForGroundArea.length == 1) {
            return metricValueForGroundArea[0];
        } else if (metricValueForGroundArea.length == 2) {
            return metricValueForGroundArea[0] > metricValueForGroundArea[1] ? metricValueForGroundArea[0] : metricValueForGroundArea[1];
        }
    }

}