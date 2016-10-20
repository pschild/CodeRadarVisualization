export class Application {
    constructor() {
        this.createScene();
        this.createCamera();
        this.createRenderer();
        this.createControls();
        this.createLight();

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
        this.camera.position.y = 500;
        this.camera.position.z = 800;
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
        var light = new THREE.AmbientLight(0xcccccc);
        this.scene.add(light);
    }

    render() {
        requestAnimationFrame(() => {
            this.render();
        });

        this.renderer.render(this.scene, this.camera);
        this.controls.update();
    }
}