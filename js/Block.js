export class Block extends THREE.Mesh {
    constructor(color) {
        var color = color || Math.random() * 0xffffff;

        var geometry = new THREE.BoxGeometry(1, 1, 1);

        // move local coordinate system to scale the block properly
        geometry.translate(0.5, 0.5, 0.5);

        var material = new THREE.MeshLambertMaterial({color: color});

        super(geometry, material);
    }
}