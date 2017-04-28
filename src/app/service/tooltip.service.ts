import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable()
export class TooltipService {

    private tooltipSource = new Subject<{elementName: string, metrics: any}>();

    tooltipContent$ = this.tooltipSource.asObservable();

    constructor() {
    }

    setContent(tooltipObject: {elementName: string, metrics: any}) {
        this.tooltipSource.next(tooltipObject);
    }

}
