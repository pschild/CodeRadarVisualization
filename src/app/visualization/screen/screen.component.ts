import {Component, Input, OnInit} from '@angular/core';
import {ScreenType} from "../../enum/ScreenType";
import {WebGLRenderer, Scene, PerspectiveCamera, AmbientLight, DirectionalLight} from "three";
import {Block} from "../../geometry/block";

@Component({
    selector: 'app-screen',
    templateUrl: './screen.component.html',
    styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {

    @Input() screenType: ScreenType;

    private isMergedView: boolean = false;
    private requestAnimationFrameId: number;

    renderer: WebGLRenderer;
    scene: Scene = new Scene();
    camera: PerspectiveCamera = new PerspectiveCamera(45, (this.getScreenWidth() - 0) / window.innerHeight, 0.1, 10000);
    controls: THREE.OrbitControls;

    constructor() {
    }

    ngOnInit() {
        let block = new Block(0xff0000, 'test');
        block.position.x = -2.5;
        block.position.y = -2.5;
        block.position.z = -40;

        block.scale.x = 5;
        block.scale.y = 5;
        block.scale.z = 5;

        this.scene.add(block);

        this.camera.position.z = 100;
        this.scene.add(this.camera);

        this.createLight();
        this.createRenderer();

        this.controls = new THREE.OrbitControls(this.camera, <HTMLElement>document.querySelector('#stage'));

        this.render();
    }

    createRenderer() {
        this.renderer = new WebGLRenderer({antialias: true, preserveDrawingBuffer: true});
        this.renderer.setClearColor(0xf0f0f0);
        this.renderer.setSize(this.getScreenWidth() - 0, window.innerHeight);

        document.querySelector('#stage').appendChild(this.renderer.domElement);
    }

    createLight() {
        let ambientLight = new AmbientLight(0xcccccc, 0.5);
        this.scene.add(ambientLight);

        let directionalLight = new DirectionalLight(0xffffff, 0.4);
        directionalLight.position.set(0, 1, 0);
        this.scene.add(directionalLight);
    }

    render() {
        this.requestAnimationFrameId = requestAnimationFrame(() => {
            this.render();
        });

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    private getScreenWidth() {
        if (this.isMergedView) {
            return window.innerWidth;
        }
        return window.innerWidth / 2;
    }

}
