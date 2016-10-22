import {AbstractDataService} from './AbstractDataService';

export class CoderadarDataService extends AbstractDataService {

    constructor() {
        super();

        this.URL = 'http://localhost:8080/projects/1/metricvalues/tree';
    }

    // override
    load(callbackFn) {
        $.ajax({
            url: this.URL,
            type: 'POST',
            data: JSON.stringify({
                'commit': 'edf099c97575ec9e1001054886010fd8fe15b8b0',
                'metrics': ['coderadar:javaLoc']
            }),
            contentType: this.CONTENT_TYPE,
            success: (data) => {
                callbackFn(data);
            }
        });
    }
}