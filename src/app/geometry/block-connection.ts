import {Geometry, LineBasicMaterial, Line, Vector3, QuadraticBezierCurve3} from "three";
import {AppConfig} from "../AppConfig";
import {NodeType} from "../enum/NodeType";

export class BlockConnection {

    curveObject: Line;

    constructor(fromElement, toElement) {
        let from = fromElement.position.clone();
        from.x += fromElement.scale.x / 2;
        from.y += fromElement.scale.y;
        from.z += fromElement.scale.z / 2;

        let to = toElement.position.clone();
        to.x += toElement.scale.x / 2;
        to.y += toElement.scale.y;
        to.z += toElement.scale.z / 2;

        let distance = from.distanceTo(to);

        let via = new Vector3((from.x + to.x) / 2, this.getHeightByDistance(distance), (from.z + to.z) / 2);

        let curve = new QuadraticBezierCurve3(from, via, to);

        let geometry = new Geometry();
        geometry.vertices = curve.getPoints(50);
        let material = new LineBasicMaterial({ color: AppConfig.COLOR_CONNECTION });
        this.curveObject = new Line(geometry, material);

        this.curveObject.userData = {
            type: NodeType.CONNECTION,
            changeTypes: {
                moved: true
            }
        };
    }

    getCurve(): Line {
        return this.curveObject;
    }

    private getHeightByDistance(distance) {
        return 0.0001 * Math.pow(distance, 2) + 0.8 * distance + 30;
    }
}
