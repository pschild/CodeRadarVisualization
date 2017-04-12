import {TestBed, inject} from '@angular/core/testing';

import {ScreenshotService} from './screenshot.service';

describe('ScreenshotService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ScreenshotService]
        });
    });

    it('should ...', inject([ScreenshotService], (service: ScreenshotService) => {
        expect(service).toBeTruthy();
    }));
});
