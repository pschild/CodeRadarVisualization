import {InteractionHandler} from './InteractionHandler';
import {config} from './Config';
import * as PubSub from 'pubsub-js';

export class Screen {

    constructor(position) {
        this.position = position;
        this.commitId = undefined;

        this._isFullscreen = false;
        this._cameraStartPosition = {
            x: 30000, y: 30000, z: 30000
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

        this.interactionHandler = new InteractionHandler(this.scene, this.renderer, this.position);

        this.initializeEventListeners();
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

    setData(data, minMaxPairOfHeight) {
        this.data = data;
        this.minMaxPairOfHeight = minMaxPairOfHeight;
    }

    setDrawer(drawerClazz) {
        if (typeof drawerClazz != 'function') {
            throw new Error(`Drawer must be a class/function. Got ${typeof drawerClazz} instead.`);
        }

        console.time('drawing time ' + this.position);
        var drawer = new drawerClazz(this.scene, this.commitId, this.position, this.minMaxPairOfHeight);
        drawer.calculateGroundAreas(this.data);
        drawer.drawElements(this.data);
        console.timeEnd('drawing time ' + this.position);
    }

    setCommitId(commitId) {
        this.commitId = commitId;
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
            if (child.type == 'Mesh') {
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

    createCamera() {
        this.camera = new THREE.PerspectiveCamera(45, (this._getScreenWidth() - config.SCREEN_PADDING) / window.innerHeight, 1, 100000);
        this.camera.position.x = this._cameraStartPosition.x;
        this.camera.position.y = this._cameraStartPosition.y;
        this.camera.position.z = this._cameraStartPosition.z;
    }

    updateCamera() {
        this.camera.aspect = (this._getScreenWidth() - config.SCREEN_PADDING) / window.innerHeight;
        this.camera.updateProjectionMatrix();
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
                x: 0,
                y: 0,
                z: 0
            }, this._animationDuration)
            .easing(this._animationEasing)
            .start();
    }

    getInteractionHandler() {
        return this.interactionHandler;
    }

    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setClearColor(0xf0f0f0);
        this.renderer.setSize(this._getScreenWidth() - config.SCREEN_PADDING, window.innerHeight);

        document.querySelector('#stage').appendChild(this.renderer.domElement);
    }

    updateRenderer() {
        this.renderer.setSize(this._getScreenWidth() - config.SCREEN_PADDING, window.innerHeight);
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
            window.renderCalls++;
            this.render();
        });

        this.interactionHandler.update(this.camera);
        this.renderer.render(this.scene, this.camera);
        this.controls.update();
        TWEEN.update();
    }

    initializeEventListeners() {
        window.addEventListener('resize', this.onWindowResize.bind(this), false);

        this.renderer.domElement.addEventListener('mousemove', () => {
            PubSub.publish('mouseMove', { screen: this.position });
        });

        PubSub.subscribe('elementClicked', (eventName, args) => {
            this._toggleHighlighting(args.name);
        });
    }

    _toggleHighlighting(elementName) {
        var element = this.scene.getObjectByName(elementName);

        var doHighlight;
        if (this._highlightedElement == elementName) {
            this._highlightedElement = undefined;
            doHighlight = false;
            this.resetCamera();
            this.resetControls();
        } else {
            this._highlightedElement = elementName;
            doHighlight = true;
            this._focusElement(element);
        }

        for (var i = this.scene.children.length - 1; i >= 0; i--) {
            var child = this.scene.children[i];

            if (child.type == 'Mesh' && child.userData.type == 'FILE') {
                if (child.name != this._highlightedElement) {
                    child.material.transparent = doHighlight;
                    child.material.opacity = 0.4;
                } else {
                    child.material.transparent = !doHighlight;
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
                x: this._cameraStartPosition.x,
                y: this._cameraStartPosition.y,
                z: this._cameraStartPosition.z
            }, this._animationDuration)
            .easing(this._animationEasing)
            .start();

        new TWEEN.Tween(this.controls.target)
            .to({
                x: element.position.x,
                y: element.position.y,
                z: element.position.z
            }, this._animationDuration)
            .easing(this._animationEasing)
            .start();
    }

    onWindowResize() {
        this.updateCamera();
        this.updateRenderer();
    }
}