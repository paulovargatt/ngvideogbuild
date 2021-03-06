import { Component, ViewEncapsulation, ElementRef, Input, HostBinding, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VgApiService, VgCoreModule } from '@videogular/ngx-videogular/core';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@videogular/ngx-videogular/core';
class VgBufferingComponent {
    constructor(ref, API) {
        this.API = API;
        this.checkInterval = 50;
        this.currentPlayPos = 0;
        this.lastPlayPos = 0;
        this.subscriptions = [];
        this.isBuffering = false;
        this.elem = ref.nativeElement;
    }
    ngOnInit() {
        if (this.API.isPlayerReady) {
            this.onPlayerReady();
        }
        else {
            this.subscriptions.push(this.API.playerReadyEvent.subscribe(() => this.onPlayerReady()));
        }
    }
    onPlayerReady() {
        this.target = this.API.getMediaById(this.vgFor);
        this.subscriptions.push(this.target.subscriptions.bufferDetected.subscribe((isBuffering) => this.onUpdateBuffer(isBuffering)));
    }
    onUpdateBuffer(isBuffering) {
        this.isBuffering = isBuffering;
    }
    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }
}
VgBufferingComponent.ɵfac = function VgBufferingComponent_Factory(t) { return new (t || VgBufferingComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.VgApiService)); };
VgBufferingComponent.ɵcmp = /*@__PURE__*/ ɵngcc0.ɵɵdefineComponent({ type: VgBufferingComponent, selectors: [["vg-buffering"]], hostVars: 2, hostBindings: function VgBufferingComponent_HostBindings(rf, ctx) { if (rf & 2) {
        ɵngcc0.ɵɵclassProp("is-buffering", ctx.isBuffering);
    } }, inputs: { vgFor: "vgFor" }, decls: 3, vars: 0, consts: [[1, "vg-buffering"], [1, "bufferingContainer"], [1, "loadingSpinner"]], template: function VgBufferingComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵelementStart(1, "div", 1);
        ɵngcc0.ɵɵelement(2, "div", 2);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } }, styles: ["\n      vg-buffering {\n        display: none;\n        z-index: 201;\n      }\n      vg-buffering.is-buffering {\n        display: block;\n      }\n\n      .vg-buffering {\n        position: absolute;\n        display: block;\n        width: 100%;\n        height: 100%;\n      }\n      .vg-buffering .bufferingContainer {\n        width: 100%;\n        position: absolute;\n        cursor: pointer;\n        top: 50%;\n        margin-top: -50px;\n        zoom: 1;\n        filter: alpha(opacity=60);\n        opacity: 0.6;\n      }\n      /* Loading Spinner\n        * http://www.alessioatzeni.com/blog/css3-loading-animation-loop/\n        */\n      .vg-buffering .loadingSpinner {\n        background-color: rgba(0, 0, 0, 0);\n        border: 5px solid rgba(255, 255, 255, 1);\n        opacity: 0.9;\n        border-top: 5px solid rgba(0, 0, 0, 0);\n        border-left: 5px solid rgba(0, 0, 0, 0);\n        border-radius: 50px;\n        box-shadow: 0 0 35px #ffffff;\n        width: 50px;\n        height: 50px;\n        margin: 0 auto;\n        -moz-animation: spin 0.5s infinite linear;\n        -webkit-animation: spin 0.5s infinite linear;\n      }\n      .vg-buffering .loadingSpinner .stop {\n        -webkit-animation-play-state: paused;\n        -moz-animation-play-state: paused;\n      }\n      @-moz-keyframes spin {\n        0% {\n          -moz-transform: rotate(0deg);\n        }\n        100% {\n          -moz-transform: rotate(360deg);\n        }\n      }\n      @-moz-keyframes spinoff {\n        0% {\n          -moz-transform: rotate(0deg);\n        }\n        100% {\n          -moz-transform: rotate(-360deg);\n        }\n      }\n      @-webkit-keyframes spin {\n        0% {\n          -webkit-transform: rotate(0deg);\n        }\n        100% {\n          -webkit-transform: rotate(360deg);\n        }\n      }\n      @-webkit-keyframes spinoff {\n        0% {\n          -webkit-transform: rotate(0deg);\n        }\n        100% {\n          -webkit-transform: rotate(-360deg);\n        }\n      }\n    "], encapsulation: 2 });
/** @nocollapse */
VgBufferingComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: VgApiService }
];
VgBufferingComponent.propDecorators = {
    vgFor: [{ type: Input }],
    isBuffering: [{ type: HostBinding, args: ['class.is-buffering',] }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(VgBufferingComponent, [{
        type: Component,
        args: [{
                selector: 'vg-buffering',
                encapsulation: ViewEncapsulation.None,
                template: `<div class="vg-buffering">
    <div class="bufferingContainer">
      <div class="loadingSpinner"></div>
    </div>
  </div>`,
                styles: [`
      vg-buffering {
        display: none;
        z-index: 201;
      }
      vg-buffering.is-buffering {
        display: block;
      }

      .vg-buffering {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
      }
      .vg-buffering .bufferingContainer {
        width: 100%;
        position: absolute;
        cursor: pointer;
        top: 50%;
        margin-top: -50px;
        zoom: 1;
        filter: alpha(opacity=60);
        opacity: 0.6;
      }
      /* Loading Spinner
        * http://www.alessioatzeni.com/blog/css3-loading-animation-loop/
        */
      .vg-buffering .loadingSpinner {
        background-color: rgba(0, 0, 0, 0);
        border: 5px solid rgba(255, 255, 255, 1);
        opacity: 0.9;
        border-top: 5px solid rgba(0, 0, 0, 0);
        border-left: 5px solid rgba(0, 0, 0, 0);
        border-radius: 50px;
        box-shadow: 0 0 35px #ffffff;
        width: 50px;
        height: 50px;
        margin: 0 auto;
        -moz-animation: spin 0.5s infinite linear;
        -webkit-animation: spin 0.5s infinite linear;
      }
      .vg-buffering .loadingSpinner .stop {
        -webkit-animation-play-state: paused;
        -moz-animation-play-state: paused;
      }
      @-moz-keyframes spin {
        0% {
          -moz-transform: rotate(0deg);
        }
        100% {
          -moz-transform: rotate(360deg);
        }
      }
      @-moz-keyframes spinoff {
        0% {
          -moz-transform: rotate(0deg);
        }
        100% {
          -moz-transform: rotate(-360deg);
        }
      }
      @-webkit-keyframes spin {
        0% {
          -webkit-transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
        }
      }
      @-webkit-keyframes spinoff {
        0% {
          -webkit-transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(-360deg);
        }
      }
    `]
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc1.VgApiService }]; }, { isBuffering: [{
            type: HostBinding,
            args: ['class.is-buffering']
        }], vgFor: [{
            type: Input
        }] }); })();

class VgBufferingModule {
}
VgBufferingModule.ɵfac = function VgBufferingModule_Factory(t) { return new (t || VgBufferingModule)(); };
VgBufferingModule.ɵmod = /*@__PURE__*/ ɵngcc0.ɵɵdefineNgModule({ type: VgBufferingModule });
VgBufferingModule.ɵinj = /*@__PURE__*/ ɵngcc0.ɵɵdefineInjector({ imports: [[CommonModule, VgCoreModule]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(VgBufferingModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, VgCoreModule],
                declarations: [VgBufferingComponent],
                exports: [VgBufferingComponent]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(VgBufferingModule, { declarations: function () { return [VgBufferingComponent]; }, imports: function () { return [CommonModule, VgCoreModule]; }, exports: function () { return [VgBufferingComponent]; } }); })();

/**
 * Generated bundle index. Do not edit.
 */

export { VgBufferingComponent, VgBufferingModule };

//# sourceMappingURL=videogular-ngx-videogular-buffering.js.map