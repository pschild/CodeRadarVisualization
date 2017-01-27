import {config} from './Config';

export class BlockConnection {
    constructor(fromElement, toElement) {
        var from = fromElement.position.clone();
        from.x += fromElement.scale.x / 2;
        from.y += fromElement.scale.y;
        from.z += fromElement.scale.z / 2;

        var to = toElement.position.clone();
        to.x += toElement.scale.x / 2;
        to.y += toElement.scale.y;
        to.z += toElement.scale.z / 2;

        var distance = from.distanceTo(to);

        var via = new THREE.Vector3((from.x + to.x) / 2, this._getHeightByDistance(distance), (from.z + to.z) / 2);

        var curve = new THREE.QuadraticBezierCurve3(from, via, to);

        var geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(50);
        var material = new THREE.LineBasicMaterial({ color: config.COLOR_CONNECTION });
        this.curveObject = new THREE.Line(geometry, material);

        this.curveObject.userData = {
            type: 'CONNECTION',
            changeTypes: {
                moved: true
            }
        };
    }

    getCurve() {
        return this.curveObject;
    }

    _getHeightByDistance(distance) {
        return 0.0001 * Math.pow(distance, 2) + 0.8 * distance + 30;
    }
}