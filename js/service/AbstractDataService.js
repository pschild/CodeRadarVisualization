export class AbstractDataService {

    constructor() {
        if (new.target === AbstractDataService) {
            throw new TypeError('Instantiating AbstractDataService not allowed.');
        }

        this.CONTENT_TYPE = 'application/json';
    }

    load(callbackFn) {}
}