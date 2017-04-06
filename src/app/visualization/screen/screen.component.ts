import {Component, Input, OnInit} from '@angular/core';
import {ScreenType} from "../../enum/ScreenType";
import {WebGLRenderer, Scene, AmbientLight, DirectionalLight} from "three";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../shared/reducers";
import {ViewType} from "../../enum/ViewType";
import {AbstractView} from "../view/abstract-view";
import {SplitView} from "../view/split-view";
import {MergedView} from "../view/merged-view";

@Component({
    selector: 'app-screen',
    templateUrl: './screen.component.html',
    styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {

    @Input() screenType: ScreenType;

    subscriptions: Subscription[] = [];

    private isMergedView: boolean = false;
    private requestAnimationFrameId: number;

    renderer: WebGLRenderer;
    scene: Scene = new Scene();

    // use THREE.PerspectiveCamera instead of importing PerspectiveCamera to avoid warning for panning and zooming are disabled (see https://github.com/nicolaspanel/three-orbitcontrols-ts/issues/1)
    camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(45, (this.getScreenWidth() - 0) / window.innerHeight, 0.1, 10000);
    controls: THREE.OrbitControls;

    view: AbstractView;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.view = new SplitView(this.screenType, this.store);

        this.createCamera();
        this.createLight();
        this.createRenderer();

        this.controls = new THREE.OrbitControls(this.camera, <HTMLElement>document.querySelector('#stage'));

        this.initializeEventListeners();

        this.render();

        // combine visualization state and settings state as we need information from both at the same time
        let states = Observable.combineLatest(this.store.select(state => state.visualizationState), this.store.select(state => state.settingsState), (visualizationState, settingsState) => {
            return {
                visualizationState: visualizationState,
                settingsState: settingsState
            };
        });

        this.subscriptions.push(
            states.subscribe((result) => {
                this.isMergedView = result.settingsState.activeViewType === ViewType.MERGED;

                if (this.isMergedView) {
                    this.view = new MergedView(this.screenType);
                    document.querySelector('#stage').classList.remove('split');
                } else {
                    this.view = new SplitView(this.screenType, this.store);
                    document.querySelector('#stage').classList.add('split');
                }

                if (!result.visualizationState.metricsLoading && result.visualizationState.metricTree) {
                    this.view.setMetricTree(result.visualizationState.metricTree);
                    this.view.recalculate();
                    this.resetScene();
                    this.view.getBlockElements().forEach((element) => {
                        this.scene.add(element);
                    });

                    this.handleViewChanged();
                }
            })
        );
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
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

    resetScene() {
        for (let i = this.scene.children.length - 1; i >= 0; i--) {
            let child = this.scene.children[i];

            // only remove Blocks and Lines. Don't remove lights, cameras etc.
            if (child.type === 'Mesh' || child.type === 'Line') {
                this.scene.remove(child);
            }
        }
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
