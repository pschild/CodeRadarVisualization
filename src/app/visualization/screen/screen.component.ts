import {Component, Input, OnInit} from '@angular/core';
import {ScreenType} from "../../enum/ScreenType";
import {WebGLRenderer, Scene, AmbientLight, DirectionalLight} from "three";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../shared/reducers";
import {ViewType} from "../../enum/ViewType";
import {AbstractView} from "../view/abstract-view";
import {SplitView} from "../view/split-view";
import {MergedView} from "../view/merged-view";
import {BlockConnection} from "../../geometry/block-connection";
import {IFilter} from "../../domain/IFilter";
import {NodeType} from "../../enum/NodeType";
import {ScreenshotService} from "../../service/screenshot.service";

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
    private renderingIsPaused: boolean = false;

    renderer: WebGLRenderer;
    scene: Scene = new Scene();

    // use THREE.PerspectiveCamera instead of importing PerspectiveCamera to avoid warning for panning and zooming are disabled (see https://github.com/nicolaspanel/three-orbitcontrols-ts/issues/1)
    camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(45, (this.getScreenWidth() - 0) / window.innerHeight, 0.1, 10000);
    controls: THREE.OrbitControls;

    view: AbstractView;

    constructor(private store: Store<fromRoot.AppState>, private screenshotService: ScreenshotService) {
        this.screenshotService.screenshotRequested$.subscribe(() => {
            let imgFromCanvas = this.renderer.domElement.toDataURL('image/png');
            let pngFile = imgFromCanvas.replace(/^data:image\/png/, 'data:application/octet-stream');
            this.screenshotService.add({
                screenType: this.screenType,
                file: pngFile
            });
        });
    }

    ngOnInit() {
        this.view = new SplitView(this.screenType, this.store);

        this.createCamera();
        this.createLight();
        this.createRenderer();

        this.controls = new THREE.OrbitControls(this.camera, <HTMLElement>document.querySelector('#stage'));

        this.initializeEventListeners();

        this.render();

        this.subscriptions.push(
            this.store.select(fromRoot.getViewChanged).subscribe((result) => {
                if (result) {
                    this.isMergedView = result.activeViewType === ViewType.MERGED;

                    if (this.isMergedView) {
                        this.view = new MergedView(this.screenType);
                        if (this.screenType === ScreenType.RIGHT) {
                            this.pauseRendering();
                        }
                        document.querySelector('#stage').classList.remove('split');

                    } else {
                        this.view = new SplitView(this.screenType, this.store);
                        if (this.screenType === ScreenType.RIGHT) {
                            this.resumeRendering();
                        }
                        document.querySelector('#stage').classList.add('split');
                    }

                    this.resetScene();
                    this.prepareView(result.isReadyForDrawing.metricTree);
                    this.applyFilter(result.activeFilter);
                    this.handleViewChanged();
                }
            })
        );

        this.subscriptions.push(
            this.store.select(fromRoot.getActiveFilter).subscribe((activeFilter) => {
                this.applyFilter(activeFilter);
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

    pauseRendering() {
        if (this.requestAnimationFrameId) {
            cancelAnimationFrame(this.requestAnimationFrameId);
            this.resetScene();
            this.renderingIsPaused = true;
        }
    }

    resumeRendering() {
        if (this.renderingIsPaused) {
            this.render();
            this.renderingIsPaused = false;
        }
    }

    prepareView(metricTree) {
        this.view.setMetricTree(metricTree);
        this.view.recalculate();
        this.view.getBlockElements().forEach((element) => {
            this.scene.add(element);
        });

        if (this.view instanceof MergedView) {
            this.view.calculateConnections(this.scene);
            this.view.getConnections().forEach((blockConnection: BlockConnection) => {
                this.scene.add(blockConnection.getCurve());
            });
        }
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

    private applyFilter(activeFilter: IFilter) {
        if (!this.isMergedView) {
            return;
        }

        for (let i = this.scene.children.length - 1; i >= 0; i--) {
            let node = this.scene.children[i];

            if (node.userData && (node.userData.type === NodeType.FILE || node.userData.type === NodeType.CONNECTION)) {
                node.visible = true;
                if (this.isMergedView) {
                    if (activeFilter.unchanged === false && node.userData.changeTypes && node.userData.changeTypes.modified == false) {
                        node.visible = false;
                    }

                    if (activeFilter.changed === false && node.userData.changeTypes && node.userData.changeTypes.modified == true) {
                        node.visible = false;
                    }

                    if (activeFilter.deleted === false && node.userData.changeTypes && node.userData.changeTypes.deleted == true) {
                        node.visible = false;
                    }

                    if (activeFilter.added === false && node.userData.changeTypes && node.userData.changeTypes.added == true) {
                        node.visible = false;
                    }

                    if (activeFilter.moved === false && node.userData.changeTypes && node.userData.changeTypes.moved == true) {
                        node.visible = false;
                    }
                }
            }
        }
    }
}
