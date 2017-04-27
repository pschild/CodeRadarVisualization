import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ScreenType} from "../../enum/ScreenType";
import {WebGLRenderer, Scene, AmbientLight, DirectionalLight} from "three";
import {Subscription} from "rxjs";
import {ViewType} from "../../enum/ViewType";
import {AbstractView} from "../view/abstract-view";
import {SplitView} from "../view/split-view";
import {MergedView} from "../view/merged-view";
import {BlockConnection} from "../../geometry/block-connection";
import {IFilter} from "../../interfaces/IFilter";
import {NodeType} from "../../enum/NodeType";
import {InteractionHandler} from "../interaction-handler/interaction-handler";
import {AppConfig} from "../../AppConfig";
import {INode} from "../../interfaces/INode";
import {ScreenShotService} from "../../service/screenshot.service";
import {FocusService} from "../../service/focus.service";
declare var TWEEN: any;
declare var THREE: any;

@Component({
    selector: 'app-screen',
    templateUrl: './screen.component.html',
    styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit, OnChanges {

    @Input() screenType: ScreenType;
    @Input() activeViewType: ViewType;
    @Input() activeFilter: IFilter;
    @Input() metricTree: INode;

    subscriptions: Subscription[] = [];

    private isMergedView: boolean = false;
    private requestAnimationFrameId: number;
    private renderingIsPaused: boolean = false;

    renderer: WebGLRenderer;
    scene: Scene = new Scene();

    // use THREE.PerspectiveCamera instead of importing PerspectiveCamera to avoid warning for panning and zooming are disabled (see https://github.com/nicolaspanel/three-orbitcontrols-ts/issues/1)
    camera: THREE.PerspectiveCamera;
    controls: THREE.OrbitControls;

    interactionHandler: InteractionHandler;

    view: AbstractView;

    constructor(private screenShotService: ScreenShotService, private focusService: FocusService) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.activeViewType !== null && this.metricTree !== null && this.activeFilter !== null) {
            this.isMergedView = this.activeViewType === ViewType.MERGED;
            this.interactionHandler.setIsMergedView(this.isMergedView);

            if (this.isMergedView) {
                this.view = new MergedView(this.screenType);
                if (this.screenType === ScreenType.RIGHT) {
                    this.pauseRendering();
                }
                document.querySelector('#stage').classList.remove('split');

            } else {
                this.view = new SplitView(this.screenType);
                if (this.screenType === ScreenType.RIGHT) {
                    this.resumeRendering();
                }
                document.querySelector('#stage').classList.add('split');
            }

            this.resetScene();
            this.prepareView(this.metricTree);
            this.applyFilter(this.activeFilter);
            this.handleViewChanged();
        }

        if (changes.metricTree && changes.metricTree.currentValue) {
            this.resetCameraAndControls();
        }
    }

    ngOnInit() {
        this.view = new SplitView(this.screenType);

        this.createCamera();
        this.createControls();
        this.createLight();
        this.createRenderer();
        this.createInteractionHandler();

        this.initializeEventListeners();

        this.render();

        this.subscriptions.push(
            this.focusService.elementFocussed$.subscribe((elementName) => {
                this.focusElementByName(elementName);
            })
        );

        this.subscriptions.push(
            this.screenShotService.screenShotRequested$.subscribe(() => {
                let imgFromCanvas = this.renderer.domElement.toDataURL('image/png');
                let pngFile = imgFromCanvas.replace(/^data:image\/png/, 'data:application/octet-stream');
                this.screenShotService.addScreenShot({
                    screenType: this.screenType,
                    file: pngFile
                });
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
        this.camera = new THREE.PerspectiveCamera(45, (this.getScreenWidth() - 0) / window.innerHeight, AppConfig.CAMERA_NEAR, AppConfig.CAMERA_FAR);
        this.scene.add(this.camera);
    }

    updateCamera() {
        this.camera.aspect = (this.getScreenWidth() - 0) / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }

    createControls() {
        this.controls = new THREE.OrbitControls(this.camera, <HTMLElement>document.querySelector('#stage'));
    }

    resetCameraAndControls() {
        this.camera.position.x = AppConfig.CAMERA_START_POSITION.x;
        this.camera.position.y = AppConfig.CAMERA_START_POSITION.y;
        this.camera.position.z = AppConfig.CAMERA_START_POSITION.z;

        let centralCoordinates = this.getCentralCoordinates();
        this.controls.target.x = centralCoordinates.x;
        this.controls.target.y = centralCoordinates.y;
        this.controls.target.z = centralCoordinates.z;
    }

    render() {
        this.requestAnimationFrameId = requestAnimationFrame(() => {
            this.render();
        });

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        this.interactionHandler.update(this.camera);
        TWEEN.update();
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

    createInteractionHandler() {
        this.interactionHandler = new InteractionHandler(this.scene, this.renderer, this.screenType, this.isMergedView, this.focusService);
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

    focusElementByName(elementName) {
        let element = this.scene.getObjectByName(elementName);
        if (!element) {
            return;
        }

        new TWEEN.Tween(this.camera.position)
            .to({
                x: element.position.x + AppConfig.CAMERA_DISTANCE_TO_FOCUSSED_ELEMENT,
                y: element.position.y + AppConfig.CAMERA_DISTANCE_TO_FOCUSSED_ELEMENT,
                z: element.position.z + AppConfig.CAMERA_DISTANCE_TO_FOCUSSED_ELEMENT
            }, AppConfig.CAMERA_ANIMATION_DURATION)
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .start();

        new TWEEN.Tween(this.controls.target)
            .to({
                x: element.position.x + element.scale.x / 2,
                y: element.position.y,
                z: element.position.z + element.scale.z / 2
            }, AppConfig.CAMERA_ANIMATION_DURATION)
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .start();
    }

    private getCentralCoordinates() {
        let root = this.scene.getObjectByName('root');
        if (!root) {
            console.warn(`no root found in screen #${this.screenType}`);
            return;
        }

        return {
            x: root.scale.x / 2,
            y: AppConfig.CAMERA_START_POSITION.y,
            z: root.scale.z / 2
        };
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
