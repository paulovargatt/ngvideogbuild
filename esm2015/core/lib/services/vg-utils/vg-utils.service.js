import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class VgUtilsService {
    /**
     * Inspired by Paul Irish
     * https://gist.github.com/paulirish/211209
     */
    static getZIndex() {
        let zIndex = 1;
        let elementZIndex;
        const tags = document.getElementsByTagName('*');
        for (let i = 0, l = tags.length; i < l; i++) {
            elementZIndex = parseInt(window.getComputedStyle(tags[i])['z-index'], 10);
            if (elementZIndex > zIndex) {
                zIndex = elementZIndex + 1;
            }
        }
        return zIndex;
    }
    // Very simple mobile detection, not 100% reliable
    static isMobileDevice() {
        // return (
        //   typeof window.screen.orientation !== 'undefined' ||
        //   navigator.userAgent.indexOf('IEMobile') !== -1
        // );
        // window.orientation is deprecated and we should use window.screen.orientation
        return (typeof window.orientation !== 'undefined' ||
            navigator.userAgent.indexOf('IEMobile') !== -1);
    }
    static isiOSDevice() {
        return (navigator.userAgent.match(/ip(hone|ad|od)/i) &&
            !navigator.userAgent.match(/(iemobile)[\/\s]?([\w\.]*)/i));
    }
    static isCordova() {
        return (document.URL.indexOf('http://') === -1 &&
            document.URL.indexOf('https://') === -1);
    }
}
/** @nocollapse */ VgUtilsService.ɵprov = i0.ɵɵdefineInjectable({ factory: function VgUtilsService_Factory() { return new VgUtilsService(); }, token: VgUtilsService, providedIn: "root" });
VgUtilsService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
//# sourceMappingURL=vg-utils.service.js.map