import {config} from '../Config';
import * as Constants from '../Constants';
import * as PubSub from 'pubsub-js';

export class InteractionHandler {

    constructor(scene, renderer, position) {
        this._enabled = false;
        this._isFullscreen = false;

        this._scene = scene;
        this._renderer = renderer;
        this._position = position;

        this._raycaster = new THREE.Raycaster();
        this._mouse = new THREE.Vector2();
        this._mouseForRaycaster = new THREE.Vector2();

        this.tooltipElement = document.querySelector('#tooltip');
        this._hoveredElementUuid = undefined;
        this._clickedElementUuid = undefined;

        this._startingPosition = {};

        this.bindEvents();
    }

    setEnabled(enabled) {
        this._enabled = enabled;
    }

    setFullscreen() {
        this._isFullscreen = true;
    }

    setSplitscreen() {
        this._isFullscreen = false;
    }

    update(camera) {
        if (!this._enabled) {
            return;
        }

        this._raycaster.setFromCamera(this._mouseForRaycaster, camera);

        var intersects = this._raycaster.intersectObjects(this._scene.children);
        var target = this._findFirstNonHelperBlock(intersects);

        this._updateTooltip(target);
    }

    _updateTooltip(target) {
        if (target) {
            if (target.uuid != this._hoveredElementUuid) {
                this.tooltipElement.innerHTML = target.userData.tooltipLabel;
                this._hoveredElementUuid = target.uuid;
            }

            if (!this.tooltipElement.classList.contains('visible')) {
                this.tooltipElement.classList.add('visible');
            }

            // this.tooltipElement.style.left = this._mouse.x + 5 + 'px';
            // this.tooltipElement.style.top = this._mouse.y + 5 + 'px';
        } else {
            if (this.tooltipElement.classList.contains('visible')) {
                this.tooltipElement.classList.remove('visible')
            }
        }
    }

    _findFirstNonHelperBlock(intersects) {
        if (intersects.length > 0) {
            for (let i = 0; i < intersects.length; i++) {
                // find the first block that is not a helper block
                // this lets the clicks go through the helper blocks
                if (!intersects[i].object.userData.isHelper) {
                    return intersects[i].object;
                }
            }
        }

        return undefined;
    }

    _getScreenWidth() {
        if (this._isFullscreen) {
            return window.innerWidth - config.SCREEN_PADDING;
        }
        return window.innerWidth / 2 - config.SCREEN_PADDING;
    }

    _onDocumentMouseMove() {
        if (!this._enabled) {
            return;
        }

        this._mouse.x = event.clientX;
        this._mouse.y = event.clientY;

        var screenOffset = this._position == Constants.LEFT_SCREEN ? 0 : this._getScreenWidth();

        this._mouseForRaycaster.x = ((event.clientX - screenOffset) / this._getScreenWidth()) * 2 - 1;
        this._mouseForRaycaster.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    _onDocumentMouseDown() {
        this._renderer.domElement.style.cursor = '-webkit-grabbing';

        this._startingPosition = {
            x: event.clientX,
            y: event.clientY
        };
    }

    _onDocumentMouseUp(event) {
        this._renderer.domElement.style.cursor = '-webkit-grab';

        if (!this._enabled) {
            return;
        }

        if (Math.abs(event.clientX - this._startingPosition.x) > 0 || Math.abs(event.clientY - this._startingPosition.y) > 0) {
            return;
        }

        var intersects = this._raycaster.intersectObjects(this._scene.children);
        var target = this._findFirstNonHelperBlock(intersects);
        if (target) {
            if (event.which == 1) { // left mouse button
                var doReset;
                if (target.uuid != this._clickedElementUuid) {
                    doReset = false;
                    this._clickedElementUuid = target.uuid;
                } else {
                    doReset = true;
                    this._clickedElementUuid = undefined;
                }

                PubSub.publish('elementClicked', { elementName: target.name, doReset: doReset });

            } else if (event.which == 3) { // right mouse button
                if (target.userData && target.userData.type == Constants.ELEMENT_TYPE_MODULE) {
                    event.preventDefault();
                    PubSub.publish('elementRightClicked', { elementName: target.name, position: { x: event.clientX, y: event.clientY } });
                }
            }
        }
    }

    bindEvents() {
        this._renderer.domElement.addEventListener('mousemove', this._onDocumentMouseMove.bind(this), false);
        this._renderer.domElement.addEventListener('mousedown', this._onDocumentMouseDown.bind(this), false);
        this._renderer.domElement.addEventListener('mouseup', this._onDocumentMouseUp.bind(this), false);
    }
}