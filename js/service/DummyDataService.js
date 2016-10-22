import {AbstractDataService} from './AbstractDataService';

export class DummyDataService extends AbstractDataService {

    // override
    load(callbackFn) {
        axios.get('data/metrics.json')
            .then(function (response) {
                callbackFn(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}