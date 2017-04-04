import {BrowserXhr, ResponseOptions, XHRBackend, XSRFStrategy} from "@angular/http";
import {MockData} from "./mocks/mock-data";
import {InMemoryBackendService} from "angular-in-memory-web-api";
import {environment} from "../environments/environment";
import {Injector} from "@angular/core";

export function XHRBackendFactory(injector: Injector, browser: BrowserXhr, xsrf: XSRFStrategy, options: ResponseOptions) {
    if (environment.demo) {
        return new InMemoryBackendService(injector, new MockData(), {
            // This is the configuration options
        });
    } else {
        return new XHRBackend(browser, options, xsrf);
    }
}