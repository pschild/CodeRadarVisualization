import {Mesh} from 'three/build/three.min';

export class Block extends Mesh {
    constructor(color, name) {
        var geometry = new THREE.BoxGeometry(1, 1, 1);

        // move local coordinate system to scale the block properly
        geometry.translate(0.5, 0.5, 0.5);

        var material = new THREE.MeshLambertMaterial({color: color});

        super(geometry, material);

        this.name = name;
    }
}