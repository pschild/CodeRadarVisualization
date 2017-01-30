import * as THREE from 'three';
window.THREE = THREE; // to make THREE available for OrbitControls
require('three/examples/js/controls/OrbitControls.js'); // require instead if import, because OrbitControls is not a ES6 module

import {InteractionHandler} from './ui/InteractionHandler';
import {config} from './Config';
import * as Constants from './Constants';
import * as PubSub from 'pubsub-js';

export class Screen {

    constructor(position) {
        this.position = position;
        this.commitId = undefined;

        // color and visibility states, configurable in the GUI, are saved here and given to the drawers after re-drawing the screens.
        this._colorMode = 'metric';
        this._visibilityStates = {};

        this._isFullscreen = false;
        this._cameraStartPosition = {
            x: 100, y: 100, z: 100
        };
        this._centralPosition = {
            x: 0, y: 0, z: 0
        };

        this._highlightedElement = undefined;
        this._animationDuration = 1500;
        this._animationEasing = TWEEN.Easing.Sinusoidal.InOut;

        this._requestAnimationFrameId = undefined;

        this.createScene();
        this.createCamera();
        this.createRenderer();
        this.createControls();
        this.createLight();

        this.addFog();

        this.interactionHandler = new InteractionHandler(this.scene, this.renderer, this.position);

        this._initializeEventListeners();

        if (config.DEBUG_MODE_ENABLED) {
            this.stats = new Stats();
            document.body.appendChild(this.stats.dom);
            this.stats.dom.style.left = 'initial';
            this.stats.dom.style.top = 'initial';
            this.stats.dom.style.right = '0px';
            this.stats.dom.style.bottom = '0px';
        }
    }

    getScene() {
        return this.scene;
    }

    _getScreenWidth() {
        if (this._isFullscreen) {
            return window.innerWidth;
        }
        return window.innerWidth / 2;
    }

    setData(data, minMaxPairOfColorMetric) {
        this.data = data;
        this.minMaxPairOfColorMetric = minMaxPairOfColorMetric;
    }

    setDrawer(drawerClazz) {
        if (typeof drawerClazz != 'function') {
            throw new Error(`Drawer must be a class/function. Got ${typeof drawerClazz} instead.`);
        }

        console.time('drawing time ' + this.position);
        var drawer = new drawerClazz(this.scene, this.position, this.minMaxPairOfColorMetric);
        drawer.calculateGroundAreas(this.data);
        drawer.drawElements(this.data);
        drawer.colorizeModules();
        if (this._isFullscreen) {
            drawer.drawBlockConnections();
        }
        // apply color state so that state does not get lost by re-drawing
        drawer.setColorization(this._colorMode);

        for (var i = this.scene.children.length - 1; i >= 0; i--) {
            var child = this.scene.children[i];

            if (child.userData && (child.userData.type == Constants.ELEMENT_TYPE_FILE || child.userData.type == Constants.ELEMENT_TYPE_CONNECTION)) {
                child.visible = true;
                if (this._isFullscreen) {
                    this.applyElementVisibilityStates(child);
                }
            }
        }

        console.timeEnd('drawing time ' + this.position);
    }

    setCommitId(commitId) {
        this.commitId = commitId;
    }

    getCommitId() {
        return this.commitId;
    }

    setFullscreen() {
        this._isFullscreen = true;
        this.getInteractionHandler().setFullscreen();

        this.updateCamera();
        this.camera.position.x = this._cameraStartPosition.x;
        this.camera.position.y = this._cameraStartPosition.y;
        this.camera.position.z = this._cameraStartPosition.z;

        this.updateRenderer();
    }

    setSplitscreen() {
        this._isFullscreen = false;
        this.getInteractionHandler().setSplitscreen();

        this.updateCamera();
        this.camera.position.x = this._cameraStartPosition.x;
        this.camera.position.y = this._cameraStartPosition.y;
        this.camera.position.z = this._cameraStartPosition.z;

        this.updateRenderer();
    }

    reset() {
        for (var i = this.scene.children.length - 1; i >= 0; i--) {
            var child = this.scene.children[i];

            // only remove Blocks. Don't remove lights, cameras etc.
            if (child.type == 'Mesh' || child.type == 'Line') {
                this.scene.remove(child);
            }
        }

        if (this._requestAnimationFrameId) {
            cancelAnimationFrame(this._requestAnimationFrameId);
        }
    }

    createScene() {
        this.scene = new THREE.Scene();
    }

    addFog() {
        this.scene.fog = new THREE.FogExp2(0xf0f0f0, 0.0004);
    }

    createCamera() {
        this.camera = new THREE.PerspectiveCamera(45, (this._getScreenWidth() - config.SCREEN_PADDING) / window.innerHeight, 0.1, 10000);
        this.camera.position.x = this._cameraStartPosition.x;
        this.camera.position.y = this._cameraStartPosition.y;
        this.camera.position.z = this._cameraStartPosition.z;
    }

    updateCamera() {
        this.camera.aspect = (this._getScreenWidth() - config.SCREEN_PADDING) / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }

    centerCamera() {
        var root = this.scene.getObjectByName('root');
        if (!root) {
            console.warn(`no root found in ${this.position} screen`);
            return;
        }

        this._centralPosition = {
            x: root.scale.x / 2,
            y: this._cameraStartPosition.y,
            z: root.scale.z / 2
        };

        this.resetCamera();
        this.resetControls();
    }

    resetCamera() {
        new TWEEN.Tween(this.camera.position)
            .to({
                x: this._cameraStartPosition.x,
                y: this._cameraStartPosition.y,
                z: this._cameraStartPosition.z
            }, this._animationDuration)
            .easing(this._animationEasing)
            .start();
    }

    createControls() {
        this.controls = new THREE.OrbitControls(this.camera, document.querySelector('#stage'));
    }

    getControls() {
        return this.controls;
    }

    resetControls() {
        new TWEEN.Tween(this.controls.target)
            .to({
                x: this._centralPosition.x,
                y: 0,
                z: this._centralPosition.z
            }, this._animationDuration)
            .easing(this._animationEasing)
            .start();
    }

    getInteractionHandler() {
        return this.interactionHandler;
    }

    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({antialias: true, preserveDrawingBuffer: true});
        this.renderer.setClearColor(0xf0f0f0);
        this.renderer.setSize(this._getScreenWidth() - config.SCREEN_PADDING, window.innerHeight);

        document.querySelector('#stage').appendChild(this.renderer.domElement);
    }

    updateRenderer() {
        this.renderer.setSize(this._getScreenWidth() - config.SCREEN_PADDING, window.innerHeight);
    }

    getRenderer() {
        return this.renderer;
    }

    createLight() {
        var ambientLight = new THREE.AmbientLight(0xcccccc, 0.5);
        this.scene.add(ambientLight);

        var directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
        directionalLight.position.set(0, 1, 0);
        this.scene.add(directionalLight);
    }

    render() {
        this._requestAnimationFrameId = requestAnimationFrame(() => {
            this.render();
            if (config.DEBUG_MODE_ENABLED) {
                this.stats.update();
            }
        });

        this.interactionHandler.update(this.camera);
        this.renderer.render(this.scene, this.camera);
        this.controls.update();
        TWEEN.update();
    }

    _initializeEventListeners() {
        window.addEventListener('resize', this.onWindowResize.bind(this), false);

        this.renderer.domElement.addEventListener('mousemove', () => {
            PubSub.publish('mouseMove', { screen: this.position });
        });

        PubSub.subscribe('elementClicked', (eventName, args) => {
            var element = this.scene.getObjectByName(args.elementName);
            if (args.doReset) {
                this.centerCamera();
            } else {
                this._focusElement(element);
            }

            if (!this._isFullscreen) {
                this._highlightElementByTransparency(element, args.doReset);
            }
        });

        PubSub.subscribe('toggleChildElements', (eventName, args) => {
            var moduleName = args.elementName;
            for (var i = this.scene.children.length - 1; i >= 0; i--) {
                var child = this.scene.children[i];

                if (
                    child.userData &&
                    (
                        child.userData.type == Constants.ELEMENT_TYPE_FILE
                        || child.userData.type == Constants.ELEMENT_TYPE_CONNECTION
                    ) && child.userData.parentName == moduleName) {
                    child.visible = !child.visible;
                    if (this._isFullscreen) {
                        this.applyElementVisibilityStates(child);
                    }
                }
            }
        });

        PubSub.subscribe('searchEntryClicked', (eventName, args) => {
            var element = this.scene.getObjectByName(args.elementName);
            if (element) {
                this._focusElement(element);
                this.getInteractionHandler()._clickedElementUuid = element.uuid;
            }

            if (!this._isFullscreen) {
                this._highlightElementByTransparency(element, false);
            }
        });

        PubSub.subscribe('colorcodeChange', (eventName, args) => {
            this._colorMode = args.colorcode;
        });

        PubSub.subscribe('fileVisibilityChange', (eventName, args) => {
            this._visibilityStates[args.type] = args.enabled;

            for (var i = this.scene.children.length - 1; i >= 0; i--) {
                var child = this.scene.children[i];

                if (child.userData && (child.userData.type == Constants.ELEMENT_TYPE_FILE || child.userData.type == Constants.ELEMENT_TYPE_CONNECTION)) {
                    child.visible = true;
                    if (this._isFullscreen) {
                        this.applyElementVisibilityStates(child);
                    }
                }
            }
        });
    }

    applyElementVisibilityStates(element) {
        var states = this._visibilityStates;

        if (states.UNCHANGED == false && element.userData.changeTypes && element.userData.changeTypes.modified == false) {
            element.visible = false;
        }

        if (states.CHANGED == false && element.userData.changeTypes && element.userData.changeTypes.modified == true) {
            element.visible = false;
        }

        if (states.DELETED == false && element.userData.changeTypes && element.userData.changeTypes.deleted == true) {
            element.visible = false;
        }

        if (states.ADDED == false && element.userData.changeTypes && element.userData.changeTypes.added == true) {
            element.visible = false;
        }

        if (states.MOVED == false && element.userData.changeTypes && element.userData.changeTypes.moved == true) {
            element.visible = false;
        }
    }

    _highlightElementByTransparency(element, doReset) {
        for (var i = this.scene.children.length - 1; i >= 0; i--) {
            var child = this.scene.children[i];

            if (child.type == 'Mesh' && child.userData.type == Constants.ELEMENT_TYPE_FILE) {
                if (doReset) {
                    child.material.transparent = false;
                    continue;
                }

                if (!element) {
                    child.material.transparent = true;
                    child.material.opacity = 0.4;
                    continue;
                }

                if (child.name == element.name) {
                    child.material.transparent = false;
                } else {
                    child.material.transparent = true;
                    child.material.opacity = 0.4;
                }
            }
        }
    }

    _focusElement(element) {
        if (!element) {
            return;
        }

        new TWEEN.Tween(this.camera.position)
            .to({
                x: element.position.x + 20,
                y: element.position.y + 20,
                z: element.position.z + 20
            }, this._animationDuration)
            .easing(this._animationEasing)
            .start();

        new TWEEN.Tween(this.controls.target)
            .to({
                x: element.position.x + element.scale.x / 2,
                y: element.position.y,
                z: element.position.z + element.scale.z / 2
            }, this._animationDuration)
            .easing(this._animationEasing)
            .start();
    }

    onWindowResize() {
        this.updateCamera();
        this.updateRenderer();
    }
}