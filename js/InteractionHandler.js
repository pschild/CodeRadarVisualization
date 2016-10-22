export class InteractionHandler {

    constructor(scene, renderer) {
        this._scene = scene;
        this._renderer = renderer;

        this._raycaster = new THREE.Raycaster();
        this._mouse = new THREE.Vector2();
        this._mouseForRaycaster = new THREE.Vector2();

        this.bindEvents();
    }

    update(camera) {
        this._raycaster.setFromCamera(this._mouseForRaycaster, camera);

        var intersects = this._raycaster.intersectObjects(this._scene.children);
        if (intersects.length > 0) {
            $('#tooltip')
                .css({
                    left: this._mouse.x + 5,
                    top: this._mouse.y + 5,
                })
                .html(intersects[0].object.name)
                .show();
        } else {
            $('#tooltip').hide();
        }
    }

    _onDocumentMouseMove() {
        this._mouse.x = event.clientX;
        this._mouse.y = event.clientY;

        this._mouseForRaycaster.x = (event.clientX / window.innerWidth) * 2 - 1;
        this._mouseForRaycaster.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    _onDocumentMouseDown() {
        var intersects = this._raycaster.intersectObjects(this._scene.children);
        if (intersects.length > 0) {
            intersects[0].object.material.transparent = !intersects[0].object.material.transparent;
            intersects[0].object.material.opacity = 0.2;
        }
    }

    _onDocumentMouseUp() {
    }

    bindEvents() {
        this._renderer.domElement.addEventListener('mousemove', this._onDocumentMouseMove.bind(this), false);
        this._renderer.domElement.addEventListener('mousedown', this._onDocumentMouseDown.bind(this), false);
        this._renderer.domElement.addEventListener('mouseup', this._onDocumentMouseUp.bind(this), false);
    }
}