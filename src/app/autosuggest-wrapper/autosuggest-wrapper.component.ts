import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
    selector: 'app-autosuggest-wrapper',
    templateUrl: './autosuggest-wrapper.component.html',
    styleUrls: ['./autosuggest-wrapper.component.scss']
})
export class AutosuggestWrapperComponent implements OnInit {

    @ViewChild('inputElement') inputElement;

    @Input() model: any;
    @Input() source: any;
    @Input() placeholder: string;
    @Input() noMatchFoundText: string;
    @Input() matchFormatted: boolean;
    @Input() valuePropertyName: string;
    @Input() displayPropertyName: string;
    @Input() valueFormatter: any;
    @Input() listFormatter: any;
    @Input() isDisabled: boolean;

    @Output() valueChanged = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    handleClearInputClicked() {
        this.model = null;
        this.inputElement.nativeElement.focus();
    }

    handleValueChanged(chosenModel: any) {
        this.valueChanged.emit(chosenModel);
    }

}
