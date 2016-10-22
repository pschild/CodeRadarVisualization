import {AbstractDataService} from './AbstractDataService';

export class DummyDataService extends AbstractDataService {

    // override
    load(callbackFn) {
        d3.json('data/metrics.json', (error, data) => {
            callbackFn(data, error);
        });
    }
}