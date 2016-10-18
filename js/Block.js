export class Block extends THREE.Mesh {
    constructor(color) {
        var color = color || Math.random() * 0xffffff;

        var geometry = new THREE.BoxGeometry(1, 1, 1);
        geometry.translate(0.5, 0.5, 0.5); // lokales Koordinatensystem verschieben, damit richtig skaliert wird.
        var material = new THREE.MeshLambertMaterial({color: color});

        super(geometry, material);
    }
}