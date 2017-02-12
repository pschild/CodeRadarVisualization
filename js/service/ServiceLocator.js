const singleton = Symbol();
const singletonEnforcer = Symbol();

export class ServiceLocator {

    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) {
            throw new Error('Instantiating is not allowed. Use ServiceLocator.getInstance() instead.');
        }

        this._serviceIntances = {};
    }

    static getInstance() {
        if (!this[singleton]) {
            this[singleton] = new ServiceLocator(singletonEnforcer);
        }

        return this[singleton];
    }

    get(name) {
        return this._serviceIntances[name];
    }

    register(name, serviceInstance) {
        this._serviceIntances[name] = serviceInstance;
    }
}