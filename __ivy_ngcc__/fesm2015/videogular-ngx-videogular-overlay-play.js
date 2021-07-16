import { Component, ViewEncapsulation, ElementRef, Input, HostBinding, HostListener, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VgStates, VgApiService, VgFullscreenApiService, VgControlsHiddenService, VgCoreModule } from '@videogular/ngx-videogular/core';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@videogular/ngx-videogular/core';
class VgOverlayPlayComponent {
    constructor(ref, API, fsAPI, controlsHidden) {
        this.API = API;
        this.fsAPI = fsAPI;
        this.controlsHidden = controlsHidden;
        this.vgSkipIfControlsHidden = false;
        this.vgSkipIfControlsHiddenDelay = 0.5;
        this.isNativeFullscreen = false;
        this.areControlsHidden = false;
        this.areControlsHiddenChangeTime = 0;
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
        this.subscriptions.push(this.fsAPI.onChangeFullscreen.subscribe(this.onChangeFullscreen.bind(this)));
        this.subscriptions.push(this.controlsHidden.isHidden.subscribe(this.onHideControls.bind(this)));
        this.subscriptions.push(this.target.subscriptions.bufferDetected.subscribe((isBuffering) => this.onUpdateBuffer(isBuffering)));
    }
    onUpdateBuffer(isBuffering) {
        this.isBuffering = isBuffering;
    }
    onChangeFullscreen(fsState) {
        if (this.fsAPI.nativeFullscreen) {
            this.isNativeFullscreen = fsState;
        }
    }
    onHideControls(hidden) {
        if (this.vgSkipIfControlsHidden && this.areControlsHidden != hidden) {
            this.areControlsHiddenChangeTime = Date.now();
        }
        this.areControlsHidden = hidden;
    }
    onClick() {
        if (this.vgSkipIfControlsHidden && (this.areControlsHidden || (Date.now() - this.areControlsHiddenChangeTime) < this.vgSkipIfControlsHiddenDelay * 1000)) {
            return;
        }
        const state = this.getState();
        switch (state) {
            case VgStates.VG_PLAYING:
                this.target.pause();
                break;
            case VgStates.VG_PAUSED:
            case VgStates.VG_ENDED:
                this.target.play();
                break;
        }
    }
    getState() {
        let state = VgStates.VG_PAUSED;
        if (this.target) {
            if (this.target.state instanceof Array) {
                for (let i = 0, l = this.target.state.length; i < l; i++) {
                    if (this.target.state[i] === VgStates.VG_PLAYING) {
                        state = VgStates.VG_PLAYING;
                        break;
                    }
                }
            }
            else {
                state = this.target.state;
            }
        }
        return state;
    }
    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }
}
VgOverlayPlayComponent.ɵfac = function VgOverlayPlayComponent_Factory(t) { return new (t || VgOverlayPlayComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.VgApiService), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.VgFullscreenApiService), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.VgControlsHiddenService)); };
VgOverlayPlayComponent.ɵcmp = /*@__PURE__*/ ɵngcc0.ɵɵdefineComponent({ type: VgOverlayPlayComponent, selectors: [["vg-overlay-play"]], hostVars: 2, hostBindings: function VgOverlayPlayComponent_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("click", function VgOverlayPlayComponent_click_HostBindingHandler() { return ctx.onClick(); });
    } if (rf & 2) {
        ɵngcc0.ɵɵclassProp("is-buffering", ctx.isBuffering);
    } }, inputs: { vgSkipIfControlsHidden: "vgSkipIfControlsHidden", vgSkipIfControlsHiddenDelay: "vgSkipIfControlsHiddenDelay", vgFor: "vgFor" }, decls: 2, vars: 6, consts: [[1, "vg-overlay-play"], [1, "overlay-play-container"]], template: function VgOverlayPlayComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵelement(1, "div", 1);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵclassProp("native-fullscreen", ctx.isNativeFullscreen)("controls-hidden", ctx.areControlsHidden);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵclassProp("vg-icon-play_arrow", ctx.getState() !== "playing");
    } }, styles: ["\n      vg-overlay-play {\n        z-index: 200;\n      }\n      vg-overlay-play.is-buffering {\n        display: none;\n      }\n      vg-overlay-play .vg-overlay-play {\n        transition: all 0.5s;\n        cursor: pointer;\n        position: absolute;\n        display: block;\n        color: white;\n        width: 100%;\n        height: 100%;\n        font-size: 80px;\n        filter: alpha(opacity=60);\n        opacity: 0.6;\n      }\n      vg-overlay-play .vg-overlay-play.native-fullscreen.controls-hidden {\n        cursor: none;\n      }\n      vg-overlay-play\n        .vg-overlay-play\n        .overlay-play-container.vg-icon-play_arrow {\n        pointer-events: none;\n        width: 100%;\n        height: 100%;\n        position: absolute;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        font-size: 80px;\n      }\n      vg-overlay-play .vg-overlay-play:hover {\n        filter: alpha(opacity=100);\n        opacity: 1;\n      }\n      vg-overlay-play\n        .vg-overlay-play:hover\n        .overlay-play-container.vg-icon-play_arrow:before {\n        transform: scale(1.2);\n      }\n    "], encapsulation: 2 });
/** @nocollapse */
VgOverlayPlayComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: VgApiService },
    { type: VgFullscreenApiService },
    { type: VgControlsHiddenService }
];
VgOverlayPlayComponent.propDecorators = {
    vgFor: [{ type: Input }],
    vgSkipIfControlsHidden: [{ type: Input }],
    vgSkipIfControlsHiddenDelay: [{ type: Input }],
    isBuffering: [{ type: HostBinding, args: ['class.is-buffering',] }],
    onClick: [{ type: HostListener, args: ['click',] }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(VgOverlayPlayComponent, [{
        type: Component,
        args: [{
                selector: 'vg-overlay-play',
                encapsulation: ViewEncapsulation.None,
                template: `<div
    class="vg-overlay-play"
    [class.native-fullscreen]="isNativeFullscreen"
    [class.controls-hidden]="areControlsHidden"
  >
    <div
      class="overlay-play-container"
      [class.vg-icon-play_arrow]="getState() !== 'playing'"
    ></div>
  </div>`,
                styles: [`
      vg-overlay-play {
        z-index: 200;
      }
      vg-overlay-play.is-buffering {
        display: none;
      }
      vg-overlay-play .vg-overlay-play {
        transition: all 0.5s;
        cursor: pointer;
        position: absolute;
        display: block;
        color: white;
        width: 100%;
        height: 100%;
        font-size: 80px;
        filter: alpha(opacity=60);
        opacity: 0.6;
      }
      vg-overlay-play .vg-overlay-play.native-fullscreen.controls-hidden {
        cursor: none;
      }
      vg-overlay-play
        .vg-overlay-play
        .overlay-play-container.vg-icon-play_arrow {
        pointer-events: none;
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 80px;
      }
      vg-overlay-play .vg-overlay-play:hover {
        filter: alpha(opacity=100);
        opacity: 1;
      }
      vg-overlay-play
        .vg-overlay-play:hover
        .overlay-play-container.vg-icon-play_arrow:before {
        transform: scale(1.2);
      }
    `]
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc1.VgApiService }, { type: ɵngcc1.VgFullscreenApiService }, { type: ɵngcc1.VgControlsHiddenService }]; }, { vgSkipIfControlsHidden: [{
            type: Input
        }], vgSkipIfControlsHiddenDelay: [{
            type: Input
        }], isBuffering: [{
            type: HostBinding,
            args: ['class.is-buffering']
        }], onClick: [{
            type: HostListener,
            args: ['click']
        }], vgFor: [{
            type: Input
        }] }); })();

class VgOverlayPlayModule {
}
VgOverlayPlayModule.ɵfac = function VgOverlayPlayModule_Factory(t) { return new (t || VgOverlayPlayModule)(); };
VgOverlayPlayModule.ɵmod = /*@__PURE__*/ ɵngcc0.ɵɵdefineNgModule({ type: VgOverlayPlayModule });
VgOverlayPlayModule.ɵinj = /*@__PURE__*/ ɵngcc0.ɵɵdefineInjector({ imports: [[CommonModule, VgCoreModule]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(VgOverlayPlayModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, VgCoreModule],
                declarations: [VgOverlayPlayComponent],
                exports: [VgOverlayPlayComponent]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(VgOverlayPlayModule, { declarations: function () { return [VgOverlayPlayComponent]; }, imports: function () { return [CommonModule, VgCoreModule]; }, exports: function () { return [VgOverlayPlayComponent]; } }); })();

/**
 * Generated bundle index. Do not edit.
 */

export { VgOverlayPlayComponent, VgOverlayPlayModule };

//# sourceMappingURL=videogular-ngx-videogular-overlay-play.js.map