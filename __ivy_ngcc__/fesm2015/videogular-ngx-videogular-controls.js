import { Component, ViewEncapsulation, ElementRef, HostBinding, Input, ViewChild, HostListener, Pipe, EventEmitter, Output, ChangeDetectorRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fromEvent } from 'rxjs';
import { VgStates, VgApiService, VgControlsHiddenService, VgFullscreenApiService, VgCoreModule } from '@videogular/ngx-videogular/core';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@videogular/ngx-videogular/core';
import * as ɵngcc2 from '@angular/common';

const _c0 = ["*"];
const _c1 = ["volumeBar"];
const _c2 = function (a0) { return { dragging: a0 }; };
function VgTrackSelectorComponent_option_4_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "option", 4);
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const track_r1 = ctx.$implicit;
    ɵngcc0.ɵɵproperty("value", track_r1.id)("selected", track_r1.selected === true);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate1(" ", track_r1.label, " ");
} }
function VgTimeDisplayComponent_span_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "span");
    ɵngcc0.ɵɵtext(1, "LIVE");
    ɵngcc0.ɵɵelementEnd();
} }
function VgTimeDisplayComponent_span_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "span");
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵpipe(2, "vgUtc");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(ɵngcc0.ɵɵpipeBind2(2, 1, ctx_r1.getTime(), ctx_r1.vgFormat));
} }
function VgQualitySelectorComponent_option_4_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "option", 4);
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const bitrate_r1 = ctx.$implicit;
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("value", bitrate_r1.qualityIndex)("selected", bitrate_r1.qualityIndex === (ctx_r0.bitrateSelected == null ? null : ctx_r0.bitrateSelected.qualityIndex));
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate1(" ", bitrate_r1.label, " ");
} }
function VgScrubBarCuePointsComponent_span_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "span", 2);
} if (rf & 2) {
    const cp_r1 = ctx.$implicit;
    ɵngcc0.ɵɵstyleProp("width", cp_r1.$$style == null ? null : cp_r1.$$style.width)("left", cp_r1.$$style == null ? null : cp_r1.$$style.left);
} }
function VgScrubBarCurrentTimeComponent_span_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "span", 2);
} }
class VgControlsComponent {
    // @ts-ignore
    constructor(API, ref, hidden) {
        this.API = API;
        this.hidden = hidden;
        this.isAdsPlaying = 'initial';
        this.hideControls = false;
        this.vgAutohide = false;
        this.vgAutohideTime = 3;
        this.subscriptions = [];
        this.elem = ref.nativeElement;
    }
    ngOnInit() {
        this.mouseMove$ = fromEvent(this.API.videogularElement, 'mousemove');
        this.subscriptions.push(this.mouseMove$.subscribe(this.show.bind(this)));
        this.touchStart$ = fromEvent(this.API.videogularElement, 'touchstart');
        this.subscriptions.push(this.touchStart$.subscribe(this.show.bind(this)));
        this.mouseClick$ = fromEvent(this.API.videogularElement, 'click');
        this.subscriptions.push(this.mouseClick$.subscribe(this.show.bind(this)));
        if (this.API.isPlayerReady) {
            this.onPlayerReady();
        }
        else {
            this.subscriptions.push(this.API.playerReadyEvent.subscribe(() => this.onPlayerReady()));
        }
    }
    onPlayerReady() {
        this.target = this.API.getMediaById(this.vgFor);
        this.subscriptions.push(this.target.subscriptions.play.subscribe(this.onPlay.bind(this)));
        this.subscriptions.push(this.target.subscriptions.pause.subscribe(this.onPause.bind(this)));
        this.subscriptions.push(this.target.subscriptions.startAds.subscribe(this.onStartAds.bind(this)));
        this.subscriptions.push(this.target.subscriptions.endAds.subscribe(this.onEndAds.bind(this)));
    }
    ngAfterViewInit() {
        if (this.vgAutohide) {
            this.hide();
        }
        else {
            this.show();
        }
    }
    onPlay() {
        if (this.vgAutohide) {
            this.hide();
        }
    }
    onPause() {
        clearTimeout(this.timer);
        this.hideControls = false;
        this.hidden.state(false);
    }
    onStartAds() {
        this.isAdsPlaying = 'none';
    }
    onEndAds() {
        this.isAdsPlaying = 'initial';
    }
    hide() {
        if (this.vgAutohide) {
            clearTimeout(this.timer);
            this.hideAsync();
        }
    }
    show() {
        clearTimeout(this.timer);
        this.hideControls = false;
        this.hidden.state(false);
        if (this.vgAutohide) {
            this.hideAsync();
        }
    }
    hideAsync() {
        if (this.API.state === VgStates.VG_PLAYING) {
            this.timer = setTimeout(() => {
                this.hideControls = true;
                this.hidden.state(true);
            }, this.vgAutohideTime * 1000);
        }
    }
    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }
}
VgControlsComponent.ɵfac = function VgControlsComponent_Factory(t) { return new (t || VgControlsComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc1.VgApiService), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.VgControlsHiddenService)); };
VgControlsComponent.ɵcmp = /*@__PURE__*/ ɵngcc0.ɵɵdefineComponent({ type: VgControlsComponent, selectors: [["vg-controls"]], hostVars: 4, hostBindings: function VgControlsComponent_HostBindings(rf, ctx) { if (rf & 2) {
        ɵngcc0.ɵɵstyleProp("pointer-events", ctx.isAdsPlaying);
        ɵngcc0.ɵɵclassProp("hide", ctx.hideControls);
    } }, inputs: { vgAutohide: "vgAutohide", vgAutohideTime: "vgAutohideTime", vgFor: "vgFor" }, ngContentSelectors: _c0, decls: 1, vars: 0, template: function VgControlsComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵprojection(0);
    } }, styles: ["\n      vg-controls {\n        position: absolute;\n        display: flex;\n        width: 100%;\n        height: 50px;\n        z-index: 300;\n        bottom: 0;\n        background-color: rgba(0, 0, 0, 0.5);\n        -webkit-transition: bottom 1s;\n        -khtml-transition: bottom 1s;\n        -moz-transition: bottom 1s;\n        -ms-transition: bottom 1s;\n        transition: bottom 1s;\n      }\n      vg-controls.hide {\n        bottom: -50px;\n      }\n    "], encapsulation: 2 });
/** @nocollapse */
VgControlsComponent.ctorParameters = () => [
    { type: VgApiService },
    { type: ElementRef },
    { type: VgControlsHiddenService }
];
VgControlsComponent.propDecorators = {
    isAdsPlaying: [{ type: HostBinding, args: ['style.pointer-events',] }],
    hideControls: [{ type: HostBinding, args: ['class.hide',] }],
    vgFor: [{ type: Input }],
    vgAutohide: [{ type: Input }],
    vgAutohideTime: [{ type: Input }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(VgControlsComponent, [{
        type: Component,
        args: [{
                selector: 'vg-controls',
                encapsulation: ViewEncapsulation.None,
                template: `<ng-content></ng-content>`,
                styles: [`
      vg-controls {
        position: absolute;
        display: flex;
        width: 100%;
        height: 50px;
        z-index: 300;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        -webkit-transition: bottom 1s;
        -khtml-transition: bottom 1s;
        -moz-transition: bottom 1s;
        -ms-transition: bottom 1s;
        transition: bottom 1s;
      }
      vg-controls.hide {
        bottom: -50px;
      }
    `]
            }]
    }], function () { return [{ type: ɵngcc1.VgApiService }, { type: ɵngcc0.ElementRef }, { type: ɵngcc1.VgControlsHiddenService }]; }, { isAdsPlaying: [{
            type: HostBinding,
            args: ['style.pointer-events']
        }], hideControls: [{
            type: HostBinding,
            args: ['class.hide']
        }], vgAutohide: [{
            type: Input
        }], vgAutohideTime: [{
            type: Input
        }], vgFor: [{
            type: Input
        }] }); })();

class VgVolumeComponent {
    constructor(ref, API) {
        this.API = API;
        this.subscriptions = [];
        this.elem = ref.nativeElement;
        this.isDragging = false;
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
        this.ariaValue = this.getVolume() * 100;
    }
    onClick(event) {
        this.setVolume(this.calculateVolume(event.clientX));
    }
    onMouseDown(event) {
        this.mouseDownPosX = event.clientX;
        this.isDragging = true;
    }
    onDrag(event) {
        if (this.isDragging) {
            this.setVolume(this.calculateVolume(event.clientX));
        }
    }
    onStopDrag(event) {
        if (this.isDragging) {
            this.isDragging = false;
            if (this.mouseDownPosX === event.clientX) {
                this.setVolume(this.calculateVolume(event.clientX));
            }
        }
    }
    arrowAdjustVolume(event) {
        if (event.keyCode === 38 || event.keyCode === 39) {
            event.preventDefault();
            this.setVolume(Math.max(0, Math.min(100, this.getVolume() * 100 + 10)));
        }
        else if (event.keyCode === 37 || event.keyCode === 40) {
            event.preventDefault();
            this.setVolume(Math.max(0, Math.min(100, this.getVolume() * 100 - 10)));
        }
    }
    calculateVolume(mousePosX) {
        const recObj = this.volumeBarRef.nativeElement.getBoundingClientRect();
        const volumeBarOffsetLeft = recObj.left;
        const volumeBarWidth = recObj.width;
        return ((mousePosX - volumeBarOffsetLeft) / volumeBarWidth) * 100;
    }
    setVolume(vol) {
        this.target.volume = Math.max(0, Math.min(1, vol / 100));
        this.ariaValue = this.target.volume * 100;
    }
    getVolume() {
        return this.target ? this.target.volume : 0;
    }
    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }
}
VgVolumeComponent.ɵfac = function VgVolumeComponent_Factory(t) { return new (t || VgVolumeComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.VgApiService)); };
VgVolumeComponent.ɵcmp = /*@__PURE__*/ ɵngcc0.ɵɵdefineComponent({ type: VgVolumeComponent, selectors: [["vg-volume"]], viewQuery: function VgVolumeComponent_Query(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵviewQuery(_c1, 7);
    } if (rf & 2) {
        let _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.volumeBarRef = _t.first);
    } }, hostBindings: function VgVolumeComponent_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("mousemove", function VgVolumeComponent_mousemove_HostBindingHandler($event) { return ctx.onDrag($event); }, false, ɵngcc0.ɵɵresolveDocument)("mouseup", function VgVolumeComponent_mouseup_HostBindingHandler($event) { return ctx.onStopDrag($event); }, false, ɵngcc0.ɵɵresolveDocument)("keydown", function VgVolumeComponent_keydown_HostBindingHandler($event) { return ctx.arrowAdjustVolume($event); });
    } }, inputs: { vgFor: "vgFor" }, decls: 5, vars: 9, consts: [["tabindex", "0", "role", "slider", "aria-label", "volume level", "aria-level", "polite", "aria-valuemin", "0", "aria-valuemax", "100", "aria-orientation", "horizontal", 1, "volumeBar", 3, "click", "mousedown"], ["volumeBar", ""], [1, "volumeBackground", 3, "ngClass"], [1, "volumeValue"], [1, "volumeKnob"]], template: function VgVolumeComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0, 1);
        ɵngcc0.ɵɵlistener("click", function VgVolumeComponent_Template_div_click_0_listener($event) { return ctx.onClick($event); })("mousedown", function VgVolumeComponent_Template_div_mousedown_0_listener($event) { return ctx.onMouseDown($event); });
        ɵngcc0.ɵɵelementStart(2, "div", 2);
        ɵngcc0.ɵɵelement(3, "div", 3);
        ɵngcc0.ɵɵelement(4, "div", 4);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵattribute("aria-valuenow", ctx.ariaValue)("aria-valuetext", ctx.ariaValue + "%");
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction1(7, _c2, ctx.isDragging));
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵstyleProp("width", ctx.getVolume() * (100 - 15) + "%");
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵstyleProp("left", ctx.getVolume() * (100 - 15) + "%");
    } }, directives: [ɵngcc2.NgClass], styles: ["\n      vg-volume {\n        -webkit-touch-callout: none;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n        display: flex;\n        justify-content: center;\n        height: 50px;\n        width: 100px;\n        cursor: pointer;\n        color: white;\n        line-height: 50px;\n      }\n      vg-volume .volumeBar {\n        position: relative;\n        display: flex;\n        flex-grow: 1;\n        align-items: center;\n      }\n      vg-volume .volumeBackground {\n        display: flex;\n        flex-grow: 1;\n        height: 5px;\n        pointer-events: none;\n        background-color: #333;\n      }\n      vg-volume .volumeValue {\n        display: flex;\n        height: 5px;\n        pointer-events: none;\n        background-color: #fff;\n        transition: all 0.2s ease-out;\n      }\n      vg-volume .volumeKnob {\n        position: absolute;\n        width: 15px;\n        height: 15px;\n        left: 0;\n        top: 50%;\n        transform: translateY(-50%);\n        border-radius: 15px;\n        pointer-events: none;\n        background-color: #fff;\n        transition: all 0.2s ease-out;\n      }\n      vg-volume .volumeBackground.dragging .volumeValue,\n      vg-volume .volumeBackground.dragging .volumeKnob {\n        transition: none;\n      }\n    "], encapsulation: 2 });
/** @nocollapse */
VgVolumeComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: VgApiService }
];
VgVolumeComponent.propDecorators = {
    vgFor: [{ type: Input }],
    volumeBarRef: [{ type: ViewChild, args: ['volumeBar', { static: true },] }],
    onDrag: [{ type: HostListener, args: ['document:mousemove', ['$event'],] }],
    onStopDrag: [{ type: HostListener, args: ['document:mouseup', ['$event'],] }],
    arrowAdjustVolume: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(VgVolumeComponent, [{
        type: Component,
        args: [{
                selector: 'vg-volume',
                encapsulation: ViewEncapsulation.None,
                template: `
    <div
      #volumeBar
      class="volumeBar"
      tabindex="0"
      role="slider"
      aria-label="volume level"
      aria-level="polite"
      [attr.aria-valuenow]="ariaValue"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-orientation="horizontal"
      [attr.aria-valuetext]="ariaValue + '%'"
      (click)="onClick($event)"
      (mousedown)="onMouseDown($event)"
    >
      <div class="volumeBackground" [ngClass]="{ dragging: isDragging }">
        <div
          class="volumeValue"
          [style.width]="getVolume() * (100 - 15) + '%'"
        ></div>
        <div
          class="volumeKnob"
          [style.left]="getVolume() * (100 - 15) + '%'"
        ></div>
      </div>
    </div>
  `,
                styles: [`
      vg-volume {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        display: flex;
        justify-content: center;
        height: 50px;
        width: 100px;
        cursor: pointer;
        color: white;
        line-height: 50px;
      }
      vg-volume .volumeBar {
        position: relative;
        display: flex;
        flex-grow: 1;
        align-items: center;
      }
      vg-volume .volumeBackground {
        display: flex;
        flex-grow: 1;
        height: 5px;
        pointer-events: none;
        background-color: #333;
      }
      vg-volume .volumeValue {
        display: flex;
        height: 5px;
        pointer-events: none;
        background-color: #fff;
        transition: all 0.2s ease-out;
      }
      vg-volume .volumeKnob {
        position: absolute;
        width: 15px;
        height: 15px;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 15px;
        pointer-events: none;
        background-color: #fff;
        transition: all 0.2s ease-out;
      }
      vg-volume .volumeBackground.dragging .volumeValue,
      vg-volume .volumeBackground.dragging .volumeKnob {
        transition: none;
      }
    `]
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc1.VgApiService }]; }, { onDrag: [{
            type: HostListener,
            args: ['document:mousemove', ['$event']]
        }], onStopDrag: [{
            type: HostListener,
            args: ['document:mouseup', ['$event']]
        }], arrowAdjustVolume: [{
            type: HostListener,
            args: ['keydown', ['$event']]
        }], vgFor: [{
            type: Input
        }], volumeBarRef: [{
            type: ViewChild,
            args: ['volumeBar', { static: true }]
        }] }); })();

class VgTrackSelectorComponent {
    constructor(ref, API) {
        this.API = API;
        this.subscriptions = [];
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
        const subs = Array.from(this.API.getMasterMedia().elem.children)
            .filter((item) => item.tagName === 'TRACK')
            .filter((item) => item.kind === 'subtitles')
            .map((item) => ({
            label: item.label,
            selected: item.default === true,
            id: item.srclang,
        }));
        this.tracks = [
            ...subs,
            {
                id: null,
                label: 'Off',
                selected: subs.every((item) => item.selected === false),
            },
        ];
        const track = this.tracks.filter((item) => item.selected === true)[0];
        this.trackSelected = track.id;
        this.ariaValue = track.label;
    }
    selectTrack(trackId) {
        this.trackSelected = trackId === 'null' ? null : trackId;
        this.ariaValue = 'No track selected';
        Array.from(this.API.getMasterMedia().elem.textTracks).forEach((item) => {
            if (item.language === trackId) {
                this.ariaValue = item.label;
                item.mode = 'showing';
            }
            else {
                item.mode = 'hidden';
            }
        });
    }
    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }
}
VgTrackSelectorComponent.ɵfac = function VgTrackSelectorComponent_Factory(t) { return new (t || VgTrackSelectorComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.VgApiService)); };
VgTrackSelectorComponent.ɵcmp = /*@__PURE__*/ ɵngcc0.ɵɵdefineComponent({ type: VgTrackSelectorComponent, selectors: [["vg-track-selector"]], inputs: { vgFor: "vgFor" }, decls: 5, vars: 5, consts: [[1, "container"], [1, "track-selected"], ["tabindex", "0", "aria-label", "track selector", 1, "trackSelector", 3, "change"], [3, "value", "selected", 4, "ngFor", "ngForOf"], [3, "value", "selected"]], template: function VgTrackSelectorComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵelementStart(1, "div", 1);
        ɵngcc0.ɵɵtext(2);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(3, "select", 2);
        ɵngcc0.ɵɵlistener("change", function VgTrackSelectorComponent_Template_select_change_3_listener($event) { return ctx.selectTrack($event.target.value); });
        ɵngcc0.ɵɵtemplate(4, VgTrackSelectorComponent_option_4_Template, 2, 3, "option", 3);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵclassProp("vg-icon-closed_caption", !ctx.trackSelected);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵtextInterpolate1(" ", ctx.trackSelected || "", " ");
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵattribute("aria-valuetext", ctx.ariaValue);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.tracks);
    } }, directives: [ɵngcc2.NgForOf], styles: ["\n      vg-track-selector {\n        -webkit-touch-callout: none;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n        display: flex;\n        justify-content: center;\n        width: 50px;\n        height: 50px;\n        cursor: pointer;\n        color: white;\n        line-height: 50px;\n      }\n      vg-track-selector .container {\n        position: relative;\n        display: flex;\n        flex-grow: 1;\n        align-items: center;\n        padding: 0;\n        margin: 5px;\n      }\n      vg-track-selector select.trackSelector {\n        width: 50px;\n        padding: 5px 8px;\n        border: none;\n        background: none;\n        -webkit-appearance: none;\n        -moz-appearance: none;\n        appearance: none;\n        color: transparent;\n        font-size: 16px;\n      }\n      vg-track-selector select.trackSelector::-ms-expand {\n        display: none;\n      }\n      vg-track-selector select.trackSelector option {\n        color: #000;\n      }\n      vg-track-selector .track-selected {\n        position: absolute;\n        width: 100%;\n        height: 50px;\n        top: -6px;\n        text-align: center;\n        text-transform: uppercase;\n        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;\n        padding-top: 2px;\n        pointer-events: none;\n      }\n      vg-track-selector .vg-icon-closed_caption:before {\n        width: 100%;\n      }\n    "], encapsulation: 2 });
/** @nocollapse */
VgTrackSelectorComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: VgApiService }
];
VgTrackSelectorComponent.propDecorators = {
    vgFor: [{ type: Input }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(VgTrackSelectorComponent, [{
        type: Component,
        args: [{
                selector: 'vg-track-selector',
                encapsulation: ViewEncapsulation.None,
                template: `
    <div class="container">
      <div
        class="track-selected"
        [class.vg-icon-closed_caption]="!trackSelected"
      >
        {{ trackSelected || '' }}
      </div>
      <select
        class="trackSelector"
        (change)="selectTrack($event.target.value)"
        tabindex="0"
        aria-label="track selector"
        [attr.aria-valuetext]="ariaValue"
      >
        <option
          *ngFor="let track of tracks"
          [value]="track.id"
          [selected]="track.selected === true"
        >
          {{ track.label }}
        </option>
      </select>
    </div>
  `,
                styles: [`
      vg-track-selector {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        display: flex;
        justify-content: center;
        width: 50px;
        height: 50px;
        cursor: pointer;
        color: white;
        line-height: 50px;
      }
      vg-track-selector .container {
        position: relative;
        display: flex;
        flex-grow: 1;
        align-items: center;
        padding: 0;
        margin: 5px;
      }
      vg-track-selector select.trackSelector {
        width: 50px;
        padding: 5px 8px;
        border: none;
        background: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        color: transparent;
        font-size: 16px;
      }
      vg-track-selector select.trackSelector::-ms-expand {
        display: none;
      }
      vg-track-selector select.trackSelector option {
        color: #000;
      }
      vg-track-selector .track-selected {
        position: absolute;
        width: 100%;
        height: 50px;
        top: -6px;
        text-align: center;
        text-transform: uppercase;
        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
        padding-top: 2px;
        pointer-events: none;
      }
      vg-track-selector .vg-icon-closed_caption:before {
        width: 100%;
      }
    `]
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc1.VgApiService }]; }, { vgFor: [{
            type: Input
        }] }); })();

// Workaround until we can use UTC with Angular Date Pipe
class VgUtcPipe {
    transform(value, format) {
        let date = new Date(value);
        let result = format;
        let ss = date.getUTCSeconds();
        let mm = date.getUTCMinutes();
        let hh = date.getUTCHours();
        if (ss < 10) {
            ss = '0' + ss;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        if (hh < 10) {
            hh = '0' + hh;
        }
        result = result.replace(/ss/g, ss);
        result = result.replace(/mm/g, mm);
        result = result.replace(/hh/g, hh);
        return result;
    }
}
VgUtcPipe.ɵfac = function VgUtcPipe_Factory(t) { return new (t || VgUtcPipe)(); };
VgUtcPipe.ɵpipe = /*@__PURE__*/ ɵngcc0.ɵɵdefinePipe({ name: "vgUtc", type: VgUtcPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(VgUtcPipe, [{
        type: Pipe,
        args: [{ name: 'vgUtc' }]
    }], null, null); })();
class VgTimeDisplayComponent {
    constructor(ref, API) {
        this.API = API;
        this.vgProperty = 'current';
        this.vgFormat = 'mm:ss';
        this.subscriptions = [];
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
    }
    getTime() {
        let t = 0;
        if (this.target) {
            t = Math.round(this.target.time[this.vgProperty]);
            t = isNaN(t) || this.target.isLive ? 0 : t;
        }
        return t;
    }
    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }
}
VgTimeDisplayComponent.ɵfac = function VgTimeDisplayComponent_Factory(t) { return new (t || VgTimeDisplayComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.VgApiService)); };
VgTimeDisplayComponent.ɵcmp = /*@__PURE__*/ ɵngcc0.ɵɵdefineComponent({ type: VgTimeDisplayComponent, selectors: [["vg-time-display"]], inputs: { vgProperty: "vgProperty", vgFormat: "vgFormat", vgFor: "vgFor" }, ngContentSelectors: _c0, decls: 3, vars: 2, consts: [[4, "ngIf"]], template: function VgTimeDisplayComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵtemplate(0, VgTimeDisplayComponent_span_0_Template, 2, 0, "span", 0);
        ɵngcc0.ɵɵtemplate(1, VgTimeDisplayComponent_span_1_Template, 3, 4, "span", 0);
        ɵngcc0.ɵɵprojection(2);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", ctx.target == null ? null : ctx.target.isLive);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", !(ctx.target == null ? null : ctx.target.isLive));
    } }, directives: [ɵngcc2.NgIf], pipes: [VgUtcPipe], styles: ["\n      vg-time-display {\n        -webkit-touch-callout: none;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n        display: flex;\n        justify-content: center;\n        height: 50px;\n        width: 60px;\n        cursor: pointer;\n        color: white;\n        line-height: 50px;\n        pointer-events: none;\n        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;\n      }\n    "], encapsulation: 2 });
/** @nocollapse */
VgTimeDisplayComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: VgApiService }
];
VgTimeDisplayComponent.propDecorators = {
    vgFor: [{ type: Input }],
    vgProperty: [{ type: Input }],
    vgFormat: [{ type: Input }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(VgTimeDisplayComponent, [{
        type: Component,
        args: [{
                selector: 'vg-time-display',
                encapsulation: ViewEncapsulation.None,
                template: `
    <span *ngIf="target?.isLive">LIVE</span>
    <span *ngIf="!target?.isLive">{{ getTime() | vgUtc: vgFormat }}</span>
    <ng-content></ng-content>
  `,
                styles: [`
      vg-time-display {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        display: flex;
        justify-content: center;
        height: 50px;
        width: 60px;
        cursor: pointer;
        color: white;
        line-height: 50px;
        pointer-events: none;
        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
      }
    `]
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc1.VgApiService }]; }, { vgProperty: [{
            type: Input
        }], vgFormat: [{
            type: Input
        }], vgFor: [{
            type: Input
        }] }); })();

class VgScrubBarComponent {
    constructor(ref, API, vgControlsHiddenState) {
        this.API = API;
        this.hideScrubBar = false;
        this.vgSlider = true;
        this.isSeeking = false;
        this.wasPlaying = false;
        this.subscriptions = [];
        this.elem = ref.nativeElement;
        this.subscriptions.push(vgControlsHiddenState.isHidden.subscribe((hide) => this.onHideScrubBar(hide)));
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
    }
    seekStart() {
        if (this.target.canPlay) {
            this.isSeeking = true;
            if (this.target.state === VgStates.VG_PLAYING) {
                this.wasPlaying = true;
            }
            this.target.pause();
        }
    }
    seekMove(offset) {
        if (this.isSeeking) {
            const percentage = Math.max(Math.min((offset * 100) / this.elem.scrollWidth, 99.9), 0);
            this.target.time.current = (percentage * this.target.time.total) / 100;
            this.target.seekTime(percentage, true);
        }
    }
    seekEnd(offset) {
        this.isSeeking = false;
        if (this.target.canPlay) {
            const percentage = Math.max(Math.min((offset * 100) / this.elem.scrollWidth, 99.9), 0);
            this.target.seekTime(percentage, true);
            if (this.wasPlaying) {
                this.wasPlaying = false;
                this.target.play();
            }
        }
    }
    touchEnd() {
        this.isSeeking = false;
        if (this.wasPlaying) {
            this.wasPlaying = false;
            this.target.play();
        }
    }
    getTouchOffset(event) {
        let offsetLeft = 0;
        let element = event.target;
        while (element) {
            offsetLeft += element.offsetLeft;
            element = element.offsetParent;
        }
        return event.touches[0].pageX - offsetLeft;
    }
    onMouseDownScrubBar($event) {
        if (this.target) {
            if (!this.target.isLive) {
                if (!this.vgSlider) {
                    this.seekEnd($event.offsetX);
                }
                else {
                    this.seekStart();
                }
            }
        }
    }
    onMouseMoveScrubBar($event) {
        if (this.target) {
            if (!this.target.isLive && this.vgSlider && this.isSeeking) {
                this.seekMove($event.offsetX);
            }
        }
    }
    onMouseUpScrubBar($event) {
        if (this.target) {
            if (!this.target.isLive && this.vgSlider && this.isSeeking) {
                this.seekEnd($event.offsetX);
            }
        }
    }
    onTouchStartScrubBar($event) {
        if (this.target) {
            if (!this.target.isLive) {
                if (!this.vgSlider) {
                    this.seekEnd(this.getTouchOffset($event));
                }
                else {
                    this.seekStart();
                }
            }
        }
    }
    onTouchMoveScrubBar($event) {
        if (this.target) {
            if (!this.target.isLive && this.vgSlider && this.isSeeking) {
                this.seekMove(this.getTouchOffset($event));
            }
        }
    }
    // @ts-ignore
    onTouchCancelScrubBar(_$event) {
        if (this.target) {
            if (!this.target.isLive && this.vgSlider && this.isSeeking) {
                this.touchEnd();
            }
        }
    }
    // @ts-ignore
    onTouchEndScrubBar(_$event) {
        if (this.target) {
            if (!this.target.isLive && this.vgSlider && this.isSeeking) {
                this.touchEnd();
            }
        }
    }
    arrowAdjustVolume(event) {
        if (this.target) {
            if (event.keyCode === 38 || event.keyCode === 39) {
                event.preventDefault();
                this.target.seekTime((this.target.time.current + 5000) / 1000, false);
            }
            else if (event.keyCode === 37 || event.keyCode === 40) {
                event.preventDefault();
                this.target.seekTime((this.target.time.current - 5000) / 1000, false);
            }
        }
    }
    getPercentage() {
        return this.target
            ? Math.round((this.target.time.current * 100) / this.target.time.total) + '%'
            : '0%';
    }
    onHideScrubBar(hide) {
        this.hideScrubBar = hide;
    }
    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }
}
VgScrubBarComponent.ɵfac = function VgScrubBarComponent_Factory(t) { return new (t || VgScrubBarComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.VgApiService), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.VgControlsHiddenService)); };
VgScrubBarComponent.ɵcmp = /*@__PURE__*/ ɵngcc0.ɵɵdefineComponent({ type: VgScrubBarComponent, selectors: [["vg-scrub-bar"]], hostVars: 2, hostBindings: function VgScrubBarComponent_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("mousedown", function VgScrubBarComponent_mousedown_HostBindingHandler($event) { return ctx.onMouseDownScrubBar($event); })("mousemove", function VgScrubBarComponent_mousemove_HostBindingHandler($event) { return ctx.onMouseMoveScrubBar($event); }, false, ɵngcc0.ɵɵresolveDocument)("mouseup", function VgScrubBarComponent_mouseup_HostBindingHandler($event) { return ctx.onMouseUpScrubBar($event); }, false, ɵngcc0.ɵɵresolveDocument)("touchstart", function VgScrubBarComponent_touchstart_HostBindingHandler($event) { return ctx.onTouchStartScrubBar($event); })("touchmove", function VgScrubBarComponent_touchmove_HostBindingHandler($event) { return ctx.onTouchMoveScrubBar($event); }, false, ɵngcc0.ɵɵresolveDocument)("touchcancel", function VgScrubBarComponent_touchcancel_HostBindingHandler($event) { return ctx.onTouchCancelScrubBar($event); }, false, ɵngcc0.ɵɵresolveDocument)("touchend", function VgScrubBarComponent_touchend_HostBindingHandler($event) { return ctx.onTouchEndScrubBar($event); }, false, ɵngcc0.ɵɵresolveDocument)("keydown", function VgScrubBarComponent_keydown_HostBindingHandler($event) { return ctx.arrowAdjustVolume($event); });
    } if (rf & 2) {
        ɵngcc0.ɵɵclassProp("hide", ctx.hideScrubBar);
    } }, inputs: { vgSlider: "vgSlider", vgFor: "vgFor" }, ngContentSelectors: _c0, decls: 2, vars: 2, consts: [["tabindex", "0", "role", "slider", "aria-label", "scrub bar", "aria-level", "polite", "aria-valuemin", "0", "aria-valuemax", "100", 1, "scrubBar"]], template: function VgScrubBarComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵprojection(1);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵattribute("aria-valuenow", ctx.getPercentage())("aria-valuetext", ctx.getPercentage());
    } }, styles: ["\n      vg-scrub-bar {\n        -webkit-touch-callout: none;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n        position: absolute;\n        width: 100%;\n        height: 5px;\n        bottom: 50px;\n        margin: 0;\n        cursor: pointer;\n        align-items: center;\n        background: rgba(0, 0, 0, 0.75);\n        z-index: 250;\n        -webkit-transition: bottom 1s, opacity 0.5s;\n        -khtml-transition: bottom 1s, opacity 0.5s;\n        -moz-transition: bottom 1s, opacity 0.5s;\n        -ms-transition: bottom 1s, opacity 0.5s;\n        transition: bottom 1s, opacity 0.5s;\n      }\n      vg-scrub-bar .scrubBar {\n        position: relative;\n        display: flex;\n        flex-grow: 1;\n        align-items: center;\n        height: 100%;\n      }\n      vg-controls vg-scrub-bar {\n        position: relative;\n        bottom: 0;\n        background: transparent;\n        height: 50px;\n        flex-grow: 1;\n        flex-basis: 0;\n        margin: 0 10px;\n        -webkit-transition: initial;\n        -khtml-transition: initial;\n        -moz-transition: initial;\n        -ms-transition: initial;\n        transition: initial;\n      }\n      vg-scrub-bar.hide {\n        bottom: 0;\n        opacity: 0;\n      }\n      vg-controls vg-scrub-bar.hide {\n        bottom: initial;\n        opacity: initial;\n      }\n    "], encapsulation: 2 });
/** @nocollapse */
VgScrubBarComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: VgApiService },
    { type: VgControlsHiddenService }
];
VgScrubBarComponent.propDecorators = {
    hideScrubBar: [{ type: HostBinding, args: ['class.hide',] }],
    vgFor: [{ type: Input }],
    vgSlider: [{ type: Input }],
    onMouseDownScrubBar: [{ type: HostListener, args: ['mousedown', ['$event'],] }],
    onMouseMoveScrubBar: [{ type: HostListener, args: ['document:mousemove', ['$event'],] }],
    onMouseUpScrubBar: [{ type: HostListener, args: ['document:mouseup', ['$event'],] }],
    onTouchStartScrubBar: [{ type: HostListener, args: ['touchstart', ['$event'],] }],
    onTouchMoveScrubBar: [{ type: HostListener, args: ['document:touchmove', ['$event'],] }],
    onTouchCancelScrubBar: [{ type: HostListener, args: ['document:touchcancel', ['$event'],] }],
    onTouchEndScrubBar: [{ type: HostListener, args: ['document:touchend', ['$event'],] }],
    arrowAdjustVolume: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(VgScrubBarComponent, [{
        type: Component,
        args: [{
                selector: 'vg-scrub-bar',
                encapsulation: ViewEncapsulation.None,
                template: `
    <div
      class="scrubBar"
      tabindex="0"
      role="slider"
      aria-label="scrub bar"
      aria-level="polite"
      [attr.aria-valuenow]="getPercentage()"
      aria-valuemin="0"
      aria-valuemax="100"
      [attr.aria-valuetext]="getPercentage()"
    >
      <ng-content></ng-content>
    </div>
  `,
                styles: [`
      vg-scrub-bar {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        position: absolute;
        width: 100%;
        height: 5px;
        bottom: 50px;
        margin: 0;
        cursor: pointer;
        align-items: center;
        background: rgba(0, 0, 0, 0.75);
        z-index: 250;
        -webkit-transition: bottom 1s, opacity 0.5s;
        -khtml-transition: bottom 1s, opacity 0.5s;
        -moz-transition: bottom 1s, opacity 0.5s;
        -ms-transition: bottom 1s, opacity 0.5s;
        transition: bottom 1s, opacity 0.5s;
      }
      vg-scrub-bar .scrubBar {
        position: relative;
        display: flex;
        flex-grow: 1;
        align-items: center;
        height: 100%;
      }
      vg-controls vg-scrub-bar {
        position: relative;
        bottom: 0;
        background: transparent;
        height: 50px;
        flex-grow: 1;
        flex-basis: 0;
        margin: 0 10px;
        -webkit-transition: initial;
        -khtml-transition: initial;
        -moz-transition: initial;
        -ms-transition: initial;
        transition: initial;
      }
      vg-scrub-bar.hide {
        bottom: 0;
        opacity: 0;
      }
      vg-controls vg-scrub-bar.hide {
        bottom: initial;
        opacity: initial;
      }
    `]
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc1.VgApiService }, { type: ɵngcc1.VgControlsHiddenService }]; }, { hideScrubBar: [{
            type: HostBinding,
            args: ['class.hide']
        }], vgSlider: [{
            type: Input
        }], onMouseDownScrubBar: [{
            type: HostListener,
            args: ['mousedown', ['$event']]
        }], onMouseMoveScrubBar: [{
            type: HostListener,
            args: ['document:mousemove', ['$event']]
        }], onMouseUpScrubBar: [{
            type: HostListener,
            args: ['document:mouseup', ['$event']]
        }], onTouchStartScrubBar: [{
            type: HostListener,
            args: ['touchstart', ['$event']]
        }], onTouchMoveScrubBar: [{
            type: HostListener,
            args: ['document:touchmove', ['$event']]
        }], 
    // @ts-ignore
    onTouchCancelScrubBar: [{
            type: HostListener,
            args: ['document:touchcancel', ['$event']]
        }], 
    // @ts-ignore
    onTouchEndScrubBar: [{
            type: HostListener,
            args: ['document:touchend', ['$event']]
        }], arrowAdjustVolume: [{
            type: HostListener,
            args: ['keydown', ['$event']]
        }], vgFor: [{
            type: Input
        }] }); })();

class VgQualitySelectorComponent {
    constructor(ref, API) {
        this.API = API;
        this.onBitrateChange = new EventEmitter();
        this.subscriptions = [];
        this.elem = ref.nativeElement;
    }
    ngOnInit() { }
    ngOnChanges(changes) {
        if (changes.bitrates.currentValue && changes.bitrates.currentValue.length) {
            this.bitrates.forEach((item) => (item.label =
                item.label || Math.round(item.bitrate / 1000).toString()));
        }
    }
    selectBitrate(index) {
        this.bitrateSelected = this.bitrates[index];
        this.onBitrateChange.emit(this.bitrates[index]);
    }
    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }
}
VgQualitySelectorComponent.ɵfac = function VgQualitySelectorComponent_Factory(t) { return new (t || VgQualitySelectorComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.VgApiService)); };
VgQualitySelectorComponent.ɵcmp = /*@__PURE__*/ ɵngcc0.ɵɵdefineComponent({ type: VgQualitySelectorComponent, selectors: [["vg-quality-selector"]], inputs: { bitrates: "bitrates" }, outputs: { onBitrateChange: "onBitrateChange" }, features: [ɵngcc0.ɵɵNgOnChangesFeature], decls: 5, vars: 5, consts: [[1, "container"], [1, "quality-selected"], ["tabindex", "0", "aria-label", "quality selector", 1, "quality-selector", 3, "change"], [3, "value", "selected", 4, "ngFor", "ngForOf"], [3, "value", "selected"]], template: function VgQualitySelectorComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵelementStart(1, "div", 1);
        ɵngcc0.ɵɵtext(2);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(3, "select", 2);
        ɵngcc0.ɵɵlistener("change", function VgQualitySelectorComponent_Template_select_change_3_listener($event) { return ctx.selectBitrate($event.target.value); });
        ɵngcc0.ɵɵtemplate(4, VgQualitySelectorComponent_option_4_Template, 2, 3, "option", 3);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵclassProp("vg-icon-hd", !ctx.bitrateSelected);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵtextInterpolate1(" ", ctx.bitrateSelected == null ? null : ctx.bitrateSelected.label, " ");
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵattribute("aria-valuetext", ctx.ariaValue);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.bitrates);
    } }, directives: [ɵngcc2.NgForOf], styles: ["\n      vg-quality-selector {\n        -webkit-touch-callout: none;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n        display: flex;\n        justify-content: center;\n        width: 50px;\n        height: 50px;\n        cursor: pointer;\n        color: white;\n        line-height: 50px;\n      }\n      vg-quality-selector .container {\n        position: relative;\n        display: flex;\n        flex-grow: 1;\n        align-items: center;\n        padding: 0;\n        margin: 5px;\n      }\n      vg-quality-selector select.quality-selector {\n        width: 50px;\n        padding: 5px 8px;\n        border: none;\n        background: none;\n        -webkit-appearance: none;\n        -moz-appearance: none;\n        appearance: none;\n        color: transparent;\n        font-size: 16px;\n      }\n      vg-quality-selector select.quality-selector::-ms-expand {\n        display: none;\n      }\n      vg-quality-selector select.quality-selector option {\n        color: #000;\n      }\n      vg-quality-selector .quality-selected {\n        position: absolute;\n        width: 100%;\n        height: 50px;\n        top: -6px;\n        text-align: center;\n        text-transform: uppercase;\n        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;\n        padding-top: 2px;\n        pointer-events: none;\n      }\n      vg-quality-selector .vg-icon-closed_caption:before {\n        width: 100%;\n      }\n    "], encapsulation: 2 });
/** @nocollapse */
VgQualitySelectorComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: VgApiService }
];
VgQualitySelectorComponent.propDecorators = {
    bitrates: [{ type: Input }],
    onBitrateChange: [{ type: Output }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(VgQualitySelectorComponent, [{
        type: Component,
        args: [{
                selector: 'vg-quality-selector',
                encapsulation: ViewEncapsulation.None,
                template: `
    <div class="container">
      <div class="quality-selected" [class.vg-icon-hd]="!bitrateSelected">
        {{ bitrateSelected?.label }}
      </div>
      <select
        class="quality-selector"
        (change)="selectBitrate($event.target.value)"
        tabindex="0"
        aria-label="quality selector"
        [attr.aria-valuetext]="ariaValue"
      >
        <option
          *ngFor="let bitrate of bitrates"
          [value]="bitrate.qualityIndex"
          [selected]="bitrate.qualityIndex === bitrateSelected?.qualityIndex"
        >
          {{ bitrate.label }}
        </option>
      </select>
    </div>
  `,
                styles: [`
      vg-quality-selector {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        display: flex;
        justify-content: center;
        width: 50px;
        height: 50px;
        cursor: pointer;
        color: white;
        line-height: 50px;
      }
      vg-quality-selector .container {
        position: relative;
        display: flex;
        flex-grow: 1;
        align-items: center;
        padding: 0;
        margin: 5px;
      }
      vg-quality-selector select.quality-selector {
        width: 50px;
        padding: 5px 8px;
        border: none;
        background: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        color: transparent;
        font-size: 16px;
      }
      vg-quality-selector select.quality-selector::-ms-expand {
        display: none;
      }
      vg-quality-selector select.quality-selector option {
        color: #000;
      }
      vg-quality-selector .quality-selected {
        position: absolute;
        width: 100%;
        height: 50px;
        top: -6px;
        text-align: center;
        text-transform: uppercase;
        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
        padding-top: 2px;
        pointer-events: none;
      }
      vg-quality-selector .vg-icon-closed_caption:before {
        width: 100%;
      }
    `]
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc1.VgApiService }]; }, { onBitrateChange: [{
            type: Output
        }], bitrates: [{
            type: Input
        }] }); })();

class VgPlaybackButtonComponent {
    constructor(ref, API, cdr) {
        this.API = API;
        this.cdr = cdr;
        this.subscriptions = [];
        this.ariaValue = 1;
        this.elem = ref.nativeElement;
        this.playbackValues = ['0.5', '1.0', '1.5', '2.0'];
        this.playbackIndex = 1;
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
    }
    onClick() {
        this.updatePlaybackSpeed();
    }
    onKeyDown(event) {
        // On press Enter (13) or Space (32)
        if (event.keyCode === 13 || event.keyCode === 32) {
            event.preventDefault();
            this.updatePlaybackSpeed();
        }
    }
    updatePlaybackSpeed() {
        this.playbackIndex = ++this.playbackIndex % this.playbackValues.length;
        if (this.target instanceof VgApiService) {
            this.target.playbackRate = this.playbackValues[this.playbackIndex];
        }
        else {
            this.target.playbackRate[this.vgFor] = this.playbackValues[this.playbackIndex];
        }
        this.detectChanges();
    }
    getPlaybackRate() {
        this.ariaValue = this.target ? this.target.playbackRate : 1.0;
        return this.ariaValue;
    }
    detectChanges() {
        try {
            this.cdr.detectChanges();
        }
        catch (e) {
            console.warn(e);
        }
    }
    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }
}
VgPlaybackButtonComponent.ɵfac = function VgPlaybackButtonComponent_Factory(t) { return new (t || VgPlaybackButtonComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.VgApiService), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ChangeDetectorRef)); };
VgPlaybackButtonComponent.ɵcmp = /*@__PURE__*/ ɵngcc0.ɵɵdefineComponent({ type: VgPlaybackButtonComponent, selectors: [["vg-playback-button"]], hostBindings: function VgPlaybackButtonComponent_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("click", function VgPlaybackButtonComponent_click_HostBindingHandler() { return ctx.onClick(); })("keydown", function VgPlaybackButtonComponent_keydown_HostBindingHandler($event) { return ctx.onKeyDown($event); });
    } }, inputs: { playbackValues: "playbackValues", vgFor: "vgFor" }, decls: 2, vars: 2, consts: [["tabindex", "0", "role", "button", "aria-label", "playback speed button", 1, "button"]], template: function VgPlaybackButtonComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "span", 0);
        ɵngcc0.ɵɵtext(1);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵattribute("aria-valuetext", ctx.ariaValue);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵtextInterpolate1(" ", ctx.getPlaybackRate(), "x ");
    } }, styles: ["\n      vg-playback-button {\n        -webkit-touch-callout: none;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n        display: flex;\n        justify-content: center;\n        height: 50px;\n        width: 50px;\n        cursor: pointer;\n        color: white;\n        line-height: 50px;\n        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;\n      }\n      vg-playback-button .button {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        width: 50px;\n      }\n    "], encapsulation: 2 });
/** @nocollapse */
VgPlaybackButtonComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: VgApiService },
    { type: ChangeDetectorRef }
];
VgPlaybackButtonComponent.propDecorators = {
    vgFor: [{ type: Input }],
    playbackValues: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['click',] }],
    onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(VgPlaybackButtonComponent, [{
        type: Component,
        args: [{
                selector: 'vg-playback-button',
                encapsulation: ViewEncapsulation.None,
                template: ` <span
    class="button"
    tabindex="0"
    role="button"
    aria-label="playback speed button"
    [attr.aria-valuetext]="ariaValue"
  >
    {{ getPlaybackRate() }}x
  </span>`,
                styles: [`
      vg-playback-button {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        display: flex;
        justify-content: center;
        height: 50px;
        width: 50px;
        cursor: pointer;
        color: white;
        line-height: 50px;
        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
      }
      vg-playback-button .button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
      }
    `]
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc1.VgApiService }, { type: ɵngcc0.ChangeDetectorRef }]; }, { playbackValues: [{
            type: Input
        }], onClick: [{
            type: HostListener,
            args: ['click']
        }], onKeyDown: [{
            type: HostListener,
            args: ['keydown', ['$event']]
        }], vgFor: [{
            type: Input
        }] }); })();

class VgPlayPauseComponent {
    constructor(ref, API) {
        this.API = API;
        this.subscriptions = [];
        this.ariaValue = VgStates.VG_PAUSED;
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
    }
    onClick() {
        this.playPause();
    }
    onKeyDown(event) {
        // On press Enter (13) or Space (32)
        if (event.keyCode === 13 || event.keyCode === 32) {
            event.preventDefault();
            this.playPause();
        }
    }
    playPause() {
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
        this.ariaValue = this.target ? this.target.state : VgStates.VG_PAUSED;
        return this.ariaValue;
    }
    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }
}
VgPlayPauseComponent.ɵfac = function VgPlayPauseComponent_Factory(t) { return new (t || VgPlayPauseComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.VgApiService)); };
VgPlayPauseComponent.ɵcmp = /*@__PURE__*/ ɵngcc0.ɵɵdefineComponent({ type: VgPlayPauseComponent, selectors: [["vg-play-pause"]], hostBindings: function VgPlayPauseComponent_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("click", function VgPlayPauseComponent_click_HostBindingHandler() { return ctx.onClick(); })("keydown", function VgPlayPauseComponent_keydown_HostBindingHandler($event) { return ctx.onKeyDown($event); });
    } }, inputs: { vgFor: "vgFor" }, decls: 1, vars: 6, consts: [["tabindex", "0", "role", "button", 1, "icon"]], template: function VgPlayPauseComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelement(0, "div", 0);
    } if (rf & 2) {
        ɵngcc0.ɵɵclassProp("vg-icon-pause", ctx.getState() === "playing")("vg-icon-play_arrow", ctx.getState() === "paused" || ctx.getState() === "ended");
        ɵngcc0.ɵɵattribute("aria-label", ctx.getState() === "paused" ? "play" : "pause")("aria-valuetext", ctx.ariaValue);
    } }, styles: ["\n      vg-play-pause {\n        -webkit-touch-callout: none;\n        -webkit-user-select: none;\n        -khtml-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n        display: flex;\n        justify-content: center;\n        height: 50px;\n        width: 50px;\n        cursor: pointer;\n        color: white;\n        line-height: 50px;\n      }\n      vg-play-pause .icon {\n        pointer-events: none;\n      }\n    "], encapsulation: 2 });
/** @nocollapse */
VgPlayPauseComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: VgApiService }
];
VgPlayPauseComponent.propDecorators = {
    vgFor: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['click',] }],
    onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(VgPlayPauseComponent, [{
        type: Component,
        args: [{
                selector: 'vg-play-pause',
                encapsulation: ViewEncapsulation.None,
                template: ` <div
    class="icon"
    [class.vg-icon-pause]="getState() === 'playing'"
    [class.vg-icon-play_arrow]="
      getState() === 'paused' || getState() === 'ended'
    "
    tabindex="0"
    role="button"
    [attr.aria-label]="getState() === 'paused' ? 'play' : 'pause'"
    [attr.aria-valuetext]="ariaValue"
  ></div>`,
                styles: [`
      vg-play-pause {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        display: flex;
        justify-content: center;
        height: 50px;
        width: 50px;
        cursor: pointer;
        color: white;
        line-height: 50px;
      }
      vg-play-pause .icon {
        pointer-events: none;
      }
    `]
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc1.VgApiService }]; }, { onClick: [{
            type: HostListener,
            args: ['click']
        }], onKeyDown: [{
            type: HostListener,
            args: ['keydown', ['$event']]
        }], vgFor: [{
            type: Input
        }] }); })();

class VgMuteComponent {
    constructor(ref, API) {
        this.API = API;
        this.subscriptions = [];
        this.ariaValue = 'unmuted';
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
        this.currentVolume = this.target.volume;
    }
    onClick() {
        this.changeMuteState();
    }
    onKeyDown(event) {
        // On press Enter (13) or Space (32)
        if (event.keyCode === 13 || event.keyCode === 32) {
            event.preventDefault();
            this.changeMuteState();
        }
    }
    changeMuteState() {
        const volume = this.getVolume();
        if (volume === 0) {
            if (this.target.volume === 0 && this.currentVolume === 0) {
                this.currentVolume = 1;
            }
            this.target.volume = this.currentVolume;
        }
        else {
            this.currentVolume = volume;
            this.target.volume = 0;
        }
    }
    getVolume() {
        const volume = this.target ? this.target.volume : 0;
        this.ariaValue = volume ? 'unmuted' : 'muted';
        return volume;
    }
    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }
}
VgMuteComponent.ɵfac = function VgMuteComponent_Factory(t) { return new (t || VgMuteComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.VgApiService)); };
VgMuteComponent.ɵcmp = /*@__PURE__*/ ɵngcc0.ɵɵdefineComponent({ type: VgMuteComponent, selectors: [["vg-mute"]], hostBindings: function VgMuteComponent_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("click", function VgMuteComponent_click_HostBindingHandler() { return ctx.onClick(); })("keydown", function VgMuteComponent_keydown_HostBindingHandler($event) { return ctx.onKeyDown($event); });
    } }, inputs: { vgFor: "vgFor" }, decls: 1, vars: 9, consts: [["tabindex", "0", "role", "button", "aria-label", "mute button", 1, "icon"]], template: function VgMuteComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelement(0, "div", 0);
    } if (rf & 2) {
        ɵngcc0.ɵɵclassProp("vg-icon-volume_up", ctx.getVolume() >= 0.75)("vg-icon-volume_down", ctx.getVolume() >= 0.25 && ctx.getVolume() < 0.75)("vg-icon-volume_mute", ctx.getVolume() > 0 && ctx.getVolume() < 0.25)("vg-icon-volume_off", ctx.getVolume() === 0);
        ɵngcc0.ɵɵattribute("aria-valuetext", ctx.ariaValue);
    } }, styles: ["\n      vg-mute {\n        -webkit-touch-callout: none;\n        -webkit-user-select: none;\n        -khtml-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n        display: flex;\n        justify-content: center;\n        height: 50px;\n        width: 50px;\n        cursor: pointer;\n        color: white;\n        line-height: 50px;\n      }\n      vg-mute .icon {\n        pointer-events: none;\n      }\n    "], encapsulation: 2 });
/** @nocollapse */
VgMuteComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: VgApiService }
];
VgMuteComponent.propDecorators = {
    vgFor: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['click',] }],
    onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(VgMuteComponent, [{
        type: Component,
        args: [{
                selector: 'vg-mute',
                encapsulation: ViewEncapsulation.None,
                template: ` <div
    class="icon"
    [class.vg-icon-volume_up]="getVolume() >= 0.75"
    [class.vg-icon-volume_down]="getVolume() >= 0.25 && getVolume() < 0.75"
    [class.vg-icon-volume_mute]="getVolume() > 0 && getVolume() < 0.25"
    [class.vg-icon-volume_off]="getVolume() === 0"
    tabindex="0"
    role="button"
    aria-label="mute button"
    [attr.aria-valuetext]="ariaValue"
  ></div>`,
                styles: [`
      vg-mute {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        display: flex;
        justify-content: center;
        height: 50px;
        width: 50px;
        cursor: pointer;
        color: white;
        line-height: 50px;
      }
      vg-mute .icon {
        pointer-events: none;
      }
    `]
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc1.VgApiService }]; }, { onClick: [{
            type: HostListener,
            args: ['click']
        }], onKeyDown: [{
            type: HostListener,
            args: ['keydown', ['$event']]
        }], vgFor: [{
            type: Input
        }] }); })();

class VgFullscreenComponent {
    constructor(ref, API, fsAPI) {
        this.API = API;
        this.fsAPI = fsAPI;
        this.isFullscreen = false;
        this.subscriptions = [];
        this.ariaValue = 'normal mode';
        this.elem = ref.nativeElement;
        this.subscriptions.push(this.fsAPI.onChangeFullscreen.subscribe(this.onChangeFullscreen.bind(this)));
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
    }
    onChangeFullscreen(fsState) {
        this.ariaValue = fsState ? 'fullscreen mode' : 'normal mode';
        this.isFullscreen = fsState;
    }
    onClick() {
        this.changeFullscreenState();
    }
    onKeyDown(event) {
        // On press Enter (13) or Space (32)
        if (event.keyCode === 13 || event.keyCode === 32) {
            event.preventDefault();
            this.changeFullscreenState();
        }
    }
    changeFullscreenState() {
        let element = this.target;
        if (this.target instanceof VgApiService) {
            element = null;
        }
        this.fsAPI.toggleFullscreen(element);
    }
    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }
}
VgFullscreenComponent.ɵfac = function VgFullscreenComponent_Factory(t) { return new (t || VgFullscreenComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.VgApiService), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.VgFullscreenApiService)); };
VgFullscreenComponent.ɵcmp = /*@__PURE__*/ ɵngcc0.ɵɵdefineComponent({ type: VgFullscreenComponent, selectors: [["vg-fullscreen"]], hostBindings: function VgFullscreenComponent_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("click", function VgFullscreenComponent_click_HostBindingHandler() { return ctx.onClick(); })("keydown", function VgFullscreenComponent_keydown_HostBindingHandler($event) { return ctx.onKeyDown($event); });
    } }, decls: 1, vars: 5, consts: [["tabindex", "0", "role", "button", "aria-label", "fullscreen button", 1, "icon"]], template: function VgFullscreenComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelement(0, "div", 0);
    } if (rf & 2) {
        ɵngcc0.ɵɵclassProp("vg-icon-fullscreen", !ctx.isFullscreen)("vg-icon-fullscreen_exit", ctx.isFullscreen);
        ɵngcc0.ɵɵattribute("aria-valuetext", ctx.ariaValue);
    } }, styles: ["\n      vg-fullscreen {\n        -webkit-touch-callout: none;\n        -webkit-user-select: none;\n        -khtml-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n        display: flex;\n        justify-content: center;\n        height: 50px;\n        width: 50px;\n        cursor: pointer;\n        color: white;\n        line-height: 50px;\n      }\n      vg-fullscreen .icon {\n        pointer-events: none;\n      }\n    "], encapsulation: 2 });
/** @nocollapse */
VgFullscreenComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: VgApiService },
    { type: VgFullscreenApiService }
];
VgFullscreenComponent.propDecorators = {
    onClick: [{ type: HostListener, args: ['click',] }],
    onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(VgFullscreenComponent, [{
        type: Component,
        args: [{
                selector: 'vg-fullscreen',
                encapsulation: ViewEncapsulation.None,
                template: ` <div
    class="icon"
    [class.vg-icon-fullscreen]="!isFullscreen"
    [class.vg-icon-fullscreen_exit]="isFullscreen"
    tabindex="0"
    role="button"
    aria-label="fullscreen button"
    [attr.aria-valuetext]="ariaValue"
  ></div>`,
                styles: [`
      vg-fullscreen {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        display: flex;
        justify-content: center;
        height: 50px;
        width: 50px;
        cursor: pointer;
        color: white;
        line-height: 50px;
      }
      vg-fullscreen .icon {
        pointer-events: none;
      }
    `]
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc1.VgApiService }, { type: ɵngcc1.VgFullscreenApiService }]; }, { onClick: [{
            type: HostListener,
            args: ['click']
        }], onKeyDown: [{
            type: HostListener,
            args: ['keydown', ['$event']]
        }] }); })();

class VgScrubBarBufferingTimeComponent {
    constructor(ref, API) {
        this.API = API;
        this.subscriptions = [];
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
    }
    getBufferTime() {
        let bufferTime = '0%';
        if (this.target && this.target.buffer && this.target.buffered.length) {
            if (this.target.time.total === 0) {
                bufferTime = '0%';
            }
            else {
                bufferTime =
                    (this.target.buffer.end / this.target.time.total) * 100 + '%';
            }
        }
        return bufferTime;
    }
    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }
}
VgScrubBarBufferingTimeComponent.ɵfac = function VgScrubBarBufferingTimeComponent_Factory(t) { return new (t || VgScrubBarBufferingTimeComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.VgApiService)); };
VgScrubBarBufferingTimeComponent.ɵcmp = /*@__PURE__*/ ɵngcc0.ɵɵdefineComponent({ type: VgScrubBarBufferingTimeComponent, selectors: [["vg-scrub-bar-buffering-time"]], inputs: { vgFor: "vgFor" }, decls: 1, vars: 2, consts: [[1, "background"]], template: function VgScrubBarBufferingTimeComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelement(0, "div", 0);
    } if (rf & 2) {
        ɵngcc0.ɵɵstyleProp("width", ctx.getBufferTime());
    } }, styles: ["\n      vg-scrub-bar-buffering-time {\n        display: flex;\n        width: 100%;\n        height: 5px;\n        pointer-events: none;\n        position: absolute;\n      }\n      vg-scrub-bar-buffering-time .background {\n        background-color: rgba(255, 255, 255, 0.3);\n      }\n      vg-controls vg-scrub-bar-buffering-time {\n        position: absolute;\n        top: calc(50% - 3px);\n      }\n      vg-controls vg-scrub-bar-buffering-time .background {\n        -webkit-border-radius: 2px;\n        -moz-border-radius: 2px;\n        border-radius: 2px;\n      }\n    "], encapsulation: 2 });
/** @nocollapse */
VgScrubBarBufferingTimeComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: VgApiService }
];
VgScrubBarBufferingTimeComponent.propDecorators = {
    vgFor: [{ type: Input }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(VgScrubBarBufferingTimeComponent, [{
        type: Component,
        args: [{
                selector: 'vg-scrub-bar-buffering-time',
                encapsulation: ViewEncapsulation.None,
                template: `<div class="background" [style.width]="getBufferTime()"></div>`,
                styles: [`
      vg-scrub-bar-buffering-time {
        display: flex;
        width: 100%;
        height: 5px;
        pointer-events: none;
        position: absolute;
      }
      vg-scrub-bar-buffering-time .background {
        background-color: rgba(255, 255, 255, 0.3);
      }
      vg-controls vg-scrub-bar-buffering-time {
        position: absolute;
        top: calc(50% - 3px);
      }
      vg-controls vg-scrub-bar-buffering-time .background {
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
      }
    `]
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc1.VgApiService }]; }, { vgFor: [{
            type: Input
        }] }); })();

// tslint:disable-next-line: no-conflicting-lifecycle
class VgScrubBarCuePointsComponent {
    constructor(ref, API) {
        this.API = API;
        this.onLoadedMetadataCalled = false;
        this.cuePoints = [];
        this.subscriptions = [];
        this.totalCues = 0;
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
        const onTimeUpdate = this.target.subscriptions.loadedMetadata;
        this.subscriptions.push(onTimeUpdate.subscribe(this.onLoadedMetadata.bind(this)));
        if (this.onLoadedMetadataCalled) {
            this.onLoadedMetadata();
        }
    }
    onLoadedMetadata() {
        if (this.vgCuePoints) {
            // We need to transform the TextTrackCueList to Array or it doesn't work on IE11/Edge.
            // See: https://github.com/videogular/videogular2/issues/369
            this.cuePoints = [];
            for (let i = 0, l = this.vgCuePoints.length; i < l; i++) {
                const end = this.vgCuePoints[i].endTime >= 0
                    ? this.vgCuePoints[i].endTime
                    : this.vgCuePoints[i].startTime + 1;
                const cuePointDuration = (end - this.vgCuePoints[i].startTime) * 1000;
                let position = '0';
                let percentWidth = '0';
                if (typeof cuePointDuration === 'number' && this.target.time.total) {
                    percentWidth =
                        (cuePointDuration * 100) / this.target.time.total + '%';
                    position =
                        (this.vgCuePoints[i].startTime * 100) /
                            Math.round(this.target.time.total / 1000) +
                            '%';
                }
                this.vgCuePoints[i].$$style = {
                    width: percentWidth,
                    left: position,
                };
                this.cuePoints.push(this.vgCuePoints[i]);
            }
        }
    }
    updateCuePoints() {
        if (!this.target) {
            this.onLoadedMetadataCalled = true;
            return;
        }
        this.onLoadedMetadata();
    }
    ngOnChanges(changes) {
        if (changes.vgCuePoints.currentValue) {
            this.updateCuePoints();
        }
    }
    ngDoCheck() {
        if (this.vgCuePoints) {
            const changes = this.totalCues !== this.vgCuePoints.length;
            if (changes) {
                this.totalCues = this.vgCuePoints.length;
                this.updateCuePoints();
            }
        }
    }
    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }
}
VgScrubBarCuePointsComponent.ɵfac = function VgScrubBarCuePointsComponent_Factory(t) { return new (t || VgScrubBarCuePointsComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.VgApiService)); };
VgScrubBarCuePointsComponent.ɵcmp = /*@__PURE__*/ ɵngcc0.ɵɵdefineComponent({ type: VgScrubBarCuePointsComponent, selectors: [["vg-scrub-bar-cue-points"]], inputs: { vgCuePoints: "vgCuePoints", vgFor: "vgFor" }, features: [ɵngcc0.ɵɵNgOnChangesFeature], decls: 2, vars: 1, consts: [[1, "cue-point-container"], ["class", "cue-point", 3, "width", "left", 4, "ngFor", "ngForOf"], [1, "cue-point"]], template: function VgScrubBarCuePointsComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵtemplate(1, VgScrubBarCuePointsComponent_span_1_Template, 1, 4, "span", 1);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.cuePoints);
    } }, directives: [ɵngcc2.NgForOf], styles: ["\n      vg-scrub-bar-cue-points {\n        display: flex;\n        width: 100%;\n        height: 5px;\n        pointer-events: none;\n        position: absolute;\n      }\n      vg-scrub-bar-cue-points .cue-point-container .cue-point {\n        position: absolute;\n        height: 5px;\n        background-color: rgba(255, 204, 0, 0.7);\n      }\n      vg-controls vg-scrub-bar-cue-points {\n        position: absolute;\n        top: calc(50% - 3px);\n      }\n    "], encapsulation: 2 });
/** @nocollapse */
VgScrubBarCuePointsComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: VgApiService }
];
VgScrubBarCuePointsComponent.propDecorators = {
    vgCuePoints: [{ type: Input }],
    vgFor: [{ type: Input }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(VgScrubBarCuePointsComponent, [{
        type: Component,
        args: [{
                selector: 'vg-scrub-bar-cue-points',
                encapsulation: ViewEncapsulation.None,
                template: `
    <div class="cue-point-container">
      <span
        *ngFor="let cp of cuePoints"
        [style.width]="cp.$$style?.width"
        [style.left]="cp.$$style?.left"
        class="cue-point"
      ></span>
    </div>
  `,
                styles: [`
      vg-scrub-bar-cue-points {
        display: flex;
        width: 100%;
        height: 5px;
        pointer-events: none;
        position: absolute;
      }
      vg-scrub-bar-cue-points .cue-point-container .cue-point {
        position: absolute;
        height: 5px;
        background-color: rgba(255, 204, 0, 0.7);
      }
      vg-controls vg-scrub-bar-cue-points {
        position: absolute;
        top: calc(50% - 3px);
      }
    `]
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc1.VgApiService }]; }, { vgCuePoints: [{
            type: Input
        }], vgFor: [{
            type: Input
        }] }); })();

class VgScrubBarCurrentTimeComponent {
    constructor(ref, API) {
        this.API = API;
        this.vgSlider = false;
        this.subscriptions = [];
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
    }
    getPercentage() {
        return this.target
            ? Math.round((this.target.time.current * 100) / this.target.time.total) +
                '%'
            : '0%';
    }
    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }
}
VgScrubBarCurrentTimeComponent.ɵfac = function VgScrubBarCurrentTimeComponent_Factory(t) { return new (t || VgScrubBarCurrentTimeComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.VgApiService)); };
VgScrubBarCurrentTimeComponent.ɵcmp = /*@__PURE__*/ ɵngcc0.ɵɵdefineComponent({ type: VgScrubBarCurrentTimeComponent, selectors: [["vg-scrub-bar-current-time"]], inputs: { vgSlider: "vgSlider", vgFor: "vgFor" }, decls: 2, vars: 3, consts: [[1, "background"], ["class", "slider", 4, "ngIf"], [1, "slider"]], template: function VgScrubBarCurrentTimeComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelement(0, "div", 0);
        ɵngcc0.ɵɵtemplate(1, VgScrubBarCurrentTimeComponent_span_1_Template, 1, 0, "span", 1);
    } if (rf & 2) {
        ɵngcc0.ɵɵstyleProp("width", ctx.getPercentage());
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.vgSlider);
    } }, directives: [ɵngcc2.NgIf], styles: ["\n      vg-scrub-bar-current-time {\n        display: flex;\n        width: 100%;\n        height: 5px;\n        pointer-events: none;\n        position: absolute;\n      }\n      vg-scrub-bar-current-time .background {\n        background-color: white;\n      }\n      vg-controls vg-scrub-bar-current-time {\n        position: absolute;\n        top: calc(50% - 3px);\n        -webkit-border-radius: 2px;\n        -moz-border-radius: 2px;\n        border-radius: 2px;\n      }\n      vg-controls vg-scrub-bar-current-time .background {\n        border: 1px solid white;\n        -webkit-border-radius: 2px;\n        -moz-border-radius: 2px;\n        border-radius: 2px;\n      }\n      vg-scrub-bar-current-time .slider {\n        background: white;\n        height: 15px;\n        width: 15px;\n        border-radius: 50%;\n        box-shadow: 0px 0px 10px black;\n        margin-top: -5px;\n        margin-left: -10px;\n      }\n    "], encapsulation: 2 });
/** @nocollapse */
VgScrubBarCurrentTimeComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: VgApiService }
];
VgScrubBarCurrentTimeComponent.propDecorators = {
    vgFor: [{ type: Input }],
    vgSlider: [{ type: Input }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(VgScrubBarCurrentTimeComponent, [{
        type: Component,
        args: [{
                selector: 'vg-scrub-bar-current-time',
                encapsulation: ViewEncapsulation.None,
                template: `<div class="background" [style.width]="getPercentage()"></div>
    <span class="slider" *ngIf="vgSlider"></span>`,
                styles: [`
      vg-scrub-bar-current-time {
        display: flex;
        width: 100%;
        height: 5px;
        pointer-events: none;
        position: absolute;
      }
      vg-scrub-bar-current-time .background {
        background-color: white;
      }
      vg-controls vg-scrub-bar-current-time {
        position: absolute;
        top: calc(50% - 3px);
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
      }
      vg-controls vg-scrub-bar-current-time .background {
        border: 1px solid white;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
      }
      vg-scrub-bar-current-time .slider {
        background: white;
        height: 15px;
        width: 15px;
        border-radius: 50%;
        box-shadow: 0px 0px 10px black;
        margin-top: -5px;
        margin-left: -10px;
      }
    `]
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc1.VgApiService }]; }, { vgSlider: [{
            type: Input
        }], vgFor: [{
            type: Input
        }] }); })();

const components = [
    VgControlsComponent,
    VgVolumeComponent,
    VgTrackSelectorComponent,
    VgTimeDisplayComponent,
    VgScrubBarComponent,
    VgQualitySelectorComponent,
    VgPlaybackButtonComponent,
    VgPlayPauseComponent,
    VgMuteComponent,
    VgFullscreenComponent,
    VgUtcPipe,
    VgScrubBarBufferingTimeComponent,
    VgScrubBarCuePointsComponent,
    VgScrubBarCurrentTimeComponent
];
class VgControlsModule {
}
VgControlsModule.ɵfac = function VgControlsModule_Factory(t) { return new (t || VgControlsModule)(); };
VgControlsModule.ɵmod = /*@__PURE__*/ ɵngcc0.ɵɵdefineNgModule({ type: VgControlsModule });
VgControlsModule.ɵinj = /*@__PURE__*/ ɵngcc0.ɵɵdefineInjector({ imports: [[CommonModule, VgCoreModule]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(VgControlsModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, VgCoreModule],
                declarations: [...components],
                exports: [...components]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(VgControlsModule, { declarations: function () { return [VgControlsComponent, VgVolumeComponent, VgTrackSelectorComponent, VgTimeDisplayComponent, VgScrubBarComponent, VgQualitySelectorComponent, VgPlaybackButtonComponent, VgPlayPauseComponent, VgMuteComponent, VgFullscreenComponent, VgUtcPipe, VgScrubBarBufferingTimeComponent, VgScrubBarCuePointsComponent, VgScrubBarCurrentTimeComponent]; }, imports: function () { return [CommonModule, VgCoreModule]; }, exports: function () { return [VgControlsComponent, VgVolumeComponent, VgTrackSelectorComponent, VgTimeDisplayComponent, VgScrubBarComponent, VgQualitySelectorComponent, VgPlaybackButtonComponent, VgPlayPauseComponent, VgMuteComponent, VgFullscreenComponent, VgUtcPipe, VgScrubBarBufferingTimeComponent, VgScrubBarCuePointsComponent, VgScrubBarCurrentTimeComponent]; } }); })();

/**
 * Generated bundle index. Do not edit.
 */

export { VgControlsComponent, VgControlsModule, VgFullscreenComponent, VgMuteComponent, VgPlayPauseComponent, VgPlaybackButtonComponent, VgQualitySelectorComponent, VgScrubBarBufferingTimeComponent, VgScrubBarComponent, VgScrubBarCuePointsComponent, VgScrubBarCurrentTimeComponent, VgTimeDisplayComponent, VgTrackSelectorComponent, VgUtcPipe, VgVolumeComponent };

//# sourceMappingURL=videogular-ngx-videogular-controls.js.map