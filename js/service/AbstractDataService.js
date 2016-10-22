export class AbstractDataService {

    constructor() {
        if (new.target === AbstractDataService) {
            throw new TypeError('Instantiating AbstractDataService not allowed.');
        }
    }

    load(callbackFn) {}
}