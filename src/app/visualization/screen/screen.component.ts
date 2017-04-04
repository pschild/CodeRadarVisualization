import {Component, Input, OnInit} from '@angular/core';
import {ScreenType} from "../../enum/ScreenType";
import {WebGLRenderer, Scene, AmbientLight, DirectionalLight} from "three";
import {Block} from "../../geometry/block";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../shared/reducers";
import {ViewType} from "../../enum/ViewType";

@Component({
    selector: 'app-screen',
    templateUrl: './screen.component.html',
    styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {

    @Input() screenType: ScreenType;

    subscription: Subscription;

    private isMergedView: boolean = false;
    private requestAnimationFrameId: number;

    renderer: WebGLRenderer;
    scene: Scene = new Scene();

    // use THREE.PerspectiveCamera instead of importing PerspectiveCamera to avoid warning for panning and zooming are disabled (see https://github.com/nicolaspanel/three-orbitcontrols-ts/issues/1)
    camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(45, (this.getScreenWidth() - 0) / window.innerHeight, 0.1, 10000);
    controls: THREE.OrbitControls;

    constructor(private store: Store<AppState>) {
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

        this.createCamera();
        this.createLight();
        this.createRenderer();

        this.controls = new THREE.OrbitControls(this.camera, <HTMLElement>document.querySelector('#stage'));

        this.initializeEventListeners();

        this.render();

        this.subscription = this.store.select(state => state.settingsState)
            .subscribe((settingsState) => {
                this.isMergedView = settingsState.activeViewType === ViewType.MERGED;
                this.handleViewChanged();

                if (this.isMergedView) {
                    document.querySelector('#stage').classList.remove('split');
                } else {
                    document.querySelector('#stage').classList.add('split');
                }
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    createRenderer() {
        this.renderer = new WebGLRenderer({antialias: true, preserveDrawingBuffer: true});
        this.renderer.setClearColor(0xf0f0f0);
        this.renderer.setSize(this.getScreenWidth() - 0, window.innerHeight);

        document.querySelector('#stage').appendChild(this.renderer.domElement);
    }

    updateRenderer() {
        this.renderer.setSize(this.getScreenWidth() - 0, window.innerHeight);
    }

    createLight() {
        let ambientLight = new AmbientLight(0xcccccc, 0.5);
        this.scene.add(ambientLight);

        let directionalLight = new DirectionalLight(0xffffff, 0.4);
        directionalLight.position.set(0, 1, 0);
        this.scene.add(directionalLight);
    }

    createCamera() {
        this.camera.position.z = 100;
        this.scene.add(this.camera);
    }

    updateCamera() {
        this.camera.aspect = (this.getScreenWidth() - 0) / window.innerHeight;
        this.camera.updateProjectionMatrix();
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

    private initializeEventListeners() {
        window.addEventListener('resize', this.handleViewChanged.bind(this), false);
    }

    private handleViewChanged() {
        this.updateCamera();
        this.updateRenderer();
    }

}
