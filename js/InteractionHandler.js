import {config} from './Config';
import * as PubSub from 'pubsub-js';

export class InteractionHandler {

    constructor(scene, renderer, position) {
        this._enabled = false;

        this._scene = scene;
        this._renderer = renderer;
        this._position = position;

        this._raycaster = new THREE.Raycaster();
        this._mouse = new THREE.Vector2();
        this._mouseForRaycaster = new THREE.Vector2();

        this.bindEvents();
    }

    setEnabled(enabled) {
        this._enabled = enabled;
    }

    update(camera) {
        if (!this._enabled) {
            return;
        }

        this._raycaster.setFromCamera(this._mouseForRaycaster, camera);

        var intersects = this._raycaster.intersectObjects(this._scene.children);
        if (intersects.length > 0) {
            $('#tooltip')
                .css({
                    left: this._mouse.x + 5,
                    top: this._mouse.y + 5,
                })
                .html(intersects[0].object.userData.tooltipLabel)
                .fadeIn();
        } else {
            $('#tooltip').fadeOut();
        }
    }

    _onDocumentMouseMove() {
        if (!this._enabled) {
            return;
        }

        this._mouse.x = event.clientX;
        this._mouse.y = event.clientY;

        var screenOffset = this._position == 'left' ? 0 : window.innerWidth / 2 - config.SCREEN_PADDING;

        this._mouseForRaycaster.x = ((event.clientX - screenOffset) / (window.innerWidth / 2 - config.SCREEN_PADDING)) * 2 - 1;
        this._mouseForRaycaster.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    _onDocumentMouseDown() {
    }

    _onDocumentMouseUp() {
        if (!this._enabled) {
            return;
        }

        var intersects = this._raycaster.intersectObjects(this._scene.children);
        if (intersects.length > 0) {
            PubSub.publish('elementClicked', { name: intersects[0].object.name });
        }
    }

    bindEvents() {
        this._renderer.domElement.addEventListener('mousemove', this._onDocumentMouseMove.bind(this), false);
        this._renderer.domElement.addEventListener('mousedown', this._onDocumentMouseDown.bind(this), false);
        this._renderer.domElement.addEventListener('mouseup', this._onDocumentMouseUp.bind(this), false);
    }
}