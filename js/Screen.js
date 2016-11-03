import {InteractionHandler} from './InteractionHandler';
import {config} from './Config';
import {CoderadarDataService} from './service/CoderadarDataService';
import {DummyDataService} from './service/DummyDataService';
import {CommitMerger} from './CommitMerger';
import {Drawer} from './Drawer';
import * as PubSub from 'pubsub-js';

export class Screen {

    constructor(position, commitId) {
        this.position = position;
        this.commitId = commitId;

        this.createScene();
        this.createCamera();
        this.createRenderer();
        this.createControls();
        this.createLight();

        this.interactionHandler = new InteractionHandler(this.scene, this.renderer, this.position);

        this.initializeEventListeners();

        this.render();

        var drawer = new Drawer(this.scene, commitId);

        // TODO: dataService should only be called once, because data only needs to be loaded once.
        let dataService = new DummyDataService();
        dataService.loadTwoCommits('abc123', 'def456', (firstCommitResult, secondCommitResult) => {
            var result = CommitMerger.merge(firstCommitResult, secondCommitResult);
            console.log('result', result);

            drawer.calculateGroundAreas(result);
            drawer.drawElements(result);
        });
    }

    getScene() {
        return this.scene;
    }

    createScene() {
        this.scene = new THREE.Scene();

        // expose scene to global window object to be able to work with inspector plugins
        // window.scene = this.scene;
    }

    createCamera() {
        this.camera = new THREE.PerspectiveCamera(45, (window.innerWidth / 2 - config.SCREEN_PADDING) / window.innerHeight, 1, 100000);
        this.camera.position.x = 30000;
        this.camera.position.y = 30000;
        this.camera.position.z = 30000;
    }

    createControls() {
        this.controls = new THREE.OrbitControls(this.camera);
    }

    getControls() {
        return this.controls;
    }

    getInteractionHandler() {
        return this.interactionHandler;
    }

    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setClearColor(0xf0f0f0);
        this.renderer.setSize(window.innerWidth / 2 - config.SCREEN_PADDING, window.innerHeight);

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

        this.renderer.domElement.addEventListener('mousemove', () => {
            PubSub.publish('mouseMove', { screen: this.position });
        });

        PubSub.subscribe('elementClicked', (eventName, args) => {
            var block = this.scene.getObjectByName(args.name);
            if (block.userData.color) {
                block.material.color = block.userData.color;
                block.userData.color = undefined;
            } else {
                block.userData.color = block.material.color;
                block.material.color = new THREE.Color(0xff0000);
            }
        });
    }

    onWindowResize() {
        this.camera.aspect = (window.innerWidth / 2 - config.SCREEN_PADDING) / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth / 2 - config.SCREEN_PADDING, window.innerHeight);
    }
}