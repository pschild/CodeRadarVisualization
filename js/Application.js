export class Application {
    constructor() {
        this.createScene();
        this.createCamera();
        this.createRenderer();
        this.createControls();
        this.createLight();

        this.initializeEventListeners();

        this.render();
    }

    getScene() {
        return this.scene;
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
        this.controls = new THREE.TrackballControls(this.camera);
        this.controls.rotateSpeed = 10.0;
        this.controls.zoomSpeed = 0.2;
    }

    createRenderer() {
        this.renderer = new THREE.WebGLRenderer();
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

        this.renderer.render(this.scene, this.camera);
        this.controls.update();
    }

    initializeEventListeners() {
        window.addEventListener('resize', this.onWindowResize.bind(this), false);

        this.renderer.domElement.addEventListener('mousemove', this.onDocumentMouseMove, false);
        this.renderer.domElement.addEventListener('mousedown', this.onDocumentMouseDown, false);
        this.renderer.domElement.addEventListener('mouseup', this.onDocumentMouseUp, false);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    onDocumentMouseMove() {
    }

    onDocumentMouseDown() {
    }

    onDocumentMouseUp() {
    }
}