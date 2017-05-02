import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {INode} from "app/interfaces/INode";

@Injectable()
export class ComparisonPanelService {

    private showComparisonPanelSource = new Subject<{elementName: string, foundElement: INode}>();
    private hideComparisonPanelSource = new Subject();

    showComparisonPanel$ = this.showComparisonPanelSource.asObservable();
    hideComparisonPanel$ = this.hideComparisonPanelSource.asObservable();

    constructor() {
    }

    hide() {
        this.hideComparisonPanelSource.next();
    }

    show(params: {elementName: string, foundElement: INode}) {
        this.showComparisonPanelSource.next(params);
    }

}
