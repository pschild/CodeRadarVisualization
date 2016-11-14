import {Mesh, BoxGeometry, MeshLambertMaterial} from 'three';

export class Block extends Mesh {
    constructor(color, name) {
        var color = color || Math.random() * 0xffffff;

        var geometry = new BoxGeometry(1, 1, 1);

        // move local coordinate system to scale the block properly
        geometry.translate(0.5, 0.5, 0.5);

        var material = new MeshLambertMaterial({color: color});

        super(geometry, material);

        this.name = name;
    }
}