import {Interface} from './interface/Interface';
import {InteractionHandler} from './InteractionHandler';
import * as PubSub from 'pubsub-js';

export class Application {
    constructor() {
        this.createInterface();
        this.createScene();
        this.createCamera();
        this.createRenderer();
        this.createControls();
        this.createLight();

        this.interactionHandler = new InteractionHandler(this.scene, this.renderer);

        this.initializeEventListeners();

        this.render();

        this.currentCommitId = undefined;
    }

    getCurrentCommitId() {
        return this.currentCommitId;
    }

    setCurrentCommitId(commitId) {
        this.currentCommitId = commitId;
    }

    getScene() {
        return this.scene;
    }

    createInterface() {
        this.interface = new Interface();
    }

    createScene() {
        this.scene = new THREE.Scene();

        // expose scene to global window object to be able to work with inspector plugins
        window.scene = this.scene;
    }

    createCamera() {
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000);
        this.camera.position.x = 10000;
        this.camera.position.y = 10000;
        this.camera.position.z = 10000;
    }

    createControls() {
        this.controls = new THREE.OrbitControls(this.camera);
    }

    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setClearColor(0xf0f0f0);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this.renderer.domElement);
    }

    createLight() {
        var ambientLight = new THREE.AmbientLight(0xcccccc, 0.5);
        this.scene.add(ambientLight);

        var directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
        directionalLight.position.set(0, 1, 0);
        this.scene.add(directionalLight);
    }

    render() {
        requestAnimationFrame(() => {
            this.render();
        });

        this.interactionHandler.update(this.camera);

        this.renderer.render(this.scene, this.camera);
        this.controls.update();
    }

    initializeEventListeners() {
        window.addEventListener('resize', this.onWindowResize.bind(this), false);

        PubSub.subscribe('commitChange', (eventName, args) => {
            console.log(args);
        });
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}