import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class VgControlsHiddenService {
    constructor() {
        this.isHiddenSubject = new Subject();
        this.isHidden = this.isHiddenSubject.asObservable();
    }
    state(hidden) {
        this.isHiddenSubject.next(hidden);
    }
}
/** @nocollapse */ VgControlsHiddenService.ɵprov = i0.ɵɵdefineInjectable({ factory: function VgControlsHiddenService_Factory() { return new VgControlsHiddenService(); }, token: VgControlsHiddenService, providedIn: "root" });
VgControlsHiddenService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
/** @nocollapse */
VgControlsHiddenService.ctorParameters = () => [];
//# sourceMappingURL=vg-controls-hidden.service.js.map