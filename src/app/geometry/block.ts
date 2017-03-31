import {Mesh, BoxGeometry, MeshLambertMaterial} from "three";

const geometry = new BoxGeometry(1, 1, 1);
// move local coordinate system to scale the block properly
geometry.translate(0.5, 0.5, 0.5);

export class Block extends Mesh {
    constructor(color, name) {
        let material = new MeshLambertMaterial({color: color});
        super(geometry, material);

        this.name = name;
    }
}
