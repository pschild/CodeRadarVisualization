import {Scene, WebGLRenderer, Raycaster, Vector2, PerspectiveCamera, Intersection, Object3D} from "three";
import {ScreenType} from "../../enum/ScreenType";
import {focusElement} from "../visualization.actions";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../shared/reducers";

export class InteractionHandler {

    store: Store<fromRoot.AppState>;

    enabled: boolean = false;

    scene: Scene;
    renderer: WebGLRenderer;
    screenType: ScreenType;
    isMergedView: boolean;

    raycaster: Raycaster = new Raycaster();
    mouse: Vector2 = new Vector2();
    mouseForRaycaster: Vector2 = new Vector2();

    tooltipElement = <HTMLElement>document.querySelector('#tooltip');
    hoveredElementUuid = undefined;
    clickedElementUuid = undefined;

    startingPosition: {x?: number, y?: number} = {};

    constructor(scene: Scene, renderer: WebGLRenderer, screenType: ScreenType, isMergedView: boolean, store: Store<fromRoot.AppState>) {
        this.scene = scene;
        this.renderer = renderer;
        this.screenType = screenType;
        this.isMergedView = isMergedView;

        // no dependency injection as the view class are constructed with "new" instead with Angular
        this.store = store;

        this.bindEvents();
    }

    setIsMergedView(isMergedView: boolean) {
        this.isMergedView = isMergedView;
    }

    update(camera: PerspectiveCamera) {
        if (!this.enabled) {
            return;
        }

        this.raycaster.setFromCamera(this.mouseForRaycaster, camera);
        let intersects = this.raycaster.intersectObjects(this.scene.children);
        let target = this.findFirstNonHelperBlock(intersects);

        this.updateTooltip(target);
    }

    private findFirstNonHelperBlock(intersections: Intersection[]): Object3D {
        if (intersections.length > 0) {
            for (let i = 0; i < intersections.length; i++) {
                // find the first block that is not a helper block
                // this lets the clicks go through the helper blocks
                if (!intersections[i].object.userData.isHelper) {
                    return intersections[i].object;
                }
            }
        }

        return undefined;
    }

    updateTooltip(target: Object3D) {
        if (target) {
            if (target.uuid != this.hoveredElementUuid) {
                this.tooltipElement.innerHTML = target.userData.tooltipLabel;
                this.hoveredElementUuid = target.uuid;
            }

            if (!this.tooltipElement.classList.contains('visible')) {
                this.tooltipElement.classList.add('visible');
            }

            this.tooltipElement.style.left = this.mouse.x + 15 + 'px';
            this.tooltipElement.style.top = this.mouse.y + 15 + 'px';
        } else {
            if (this.tooltipElement.classList.contains('visible')) {
                this.hideTooltip();
            }
        }
    }

    hideTooltip() {
        this.tooltipElement.classList.remove('visible');
        this.tooltipElement.style.left = '-1000px';
        this.tooltipElement.style.top = '-1000px';
    }

    onDocumentMouseOver() {
        this.enabled = true;
    }

    onDocumentMouseOut() {
        this.enabled = false;
        this.hideTooltip();
    }

    onDocumentMouseMove(event) {
        if (!this.enabled) {
            return;
        }

        this.mouse.x = event.clientX;
        this.mouse.y = event.clientY;

        let screenOffset = this.screenType === ScreenType.LEFT ? 0 : this.getScreenWidth();

        this.mouseForRaycaster.x = ((event.clientX - screenOffset) / this.getScreenWidth()) * 2 - 1;
        this.mouseForRaycaster.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    onDocumentMouseDown(event) {
        this.renderer.domElement.style.cursor = '-webkit-grabbing';

        this.startingPosition = {
            x: event.clientX,
            y: event.clientY
        };
    }

    onDocumentMouseUp(event) {
        this.renderer.domElement.style.cursor = '-webkit-grab';

        if (!this.enabled) {
            return;
        }

        if (Math.abs(event.clientX - this.startingPosition.x) > 0 || Math.abs(event.clientY - this.startingPosition.y) > 0) {
            return;
        }

        let intersects = this.raycaster.intersectObjects(this.scene.children);
        let target = this.findFirstNonHelperBlock(intersects);
        if (target) {
            if (event.which == 1) { // left mouse button
                if (target.uuid != this.clickedElementUuid) {
                    this.clickedElementUuid = target.uuid;
                } else {
                    this.clickedElementUuid = undefined;
                }

                this.store.dispatch(focusElement(target.name));
            }
        }
    }

    private bindEvents() {
        this.renderer.domElement.addEventListener('mouseover', this.onDocumentMouseOver.bind(this), false);
        this.renderer.domElement.addEventListener('mouseout', this.onDocumentMouseOut.bind(this), false);
        this.renderer.domElement.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false);
        this.renderer.domElement.addEventListener('mousedown', this.onDocumentMouseDown.bind(this), false);
        this.renderer.domElement.addEventListener('mouseup', this.onDocumentMouseUp.bind(this), false);
    }

    private getScreenWidth() {
        if (this.isMergedView) {
            return window.innerWidth;
        }
        return window.innerWidth / 2;
    }

}