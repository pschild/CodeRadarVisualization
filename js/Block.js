import {Mesh} from 'three/build/three.min';

var GEO = new THREE.BoxGeometry(1, 1, 1);
// move local coordinate system to scale the block properly
GEO.translate(0.5, 0.5, 0.5);

export class Block extends Mesh {
    constructor(color, name) {
        var material = new THREE.MeshLambertMaterial({color: color});
        super(GEO, material);

        this.name = name;
    }
}