import { Component, ViewEncapsulation, ElementRef, HostBinding, Input, ViewChild, HostListener, Pipe, EventEmitter, Output, ChangeDetectorRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fromEvent } from 'rxjs';
import { VgStates, VgApiService, VgControlsHiddenService, VgFullscreenApiService, VgCoreModule } from '@videogular/ngx-videogular/core';

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
VgControlsComponent.decorators = [
    { type: Component, args: [{
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
            },] }
];
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
VgVolumeComponent.decorators = [
    { type: Component, args: [{
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
            },] }
];
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
VgTrackSelectorComponent.decorators = [
    { type: Component, args: [{
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
            },] }
];
/** @nocollapse */
VgTrackSelectorComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: VgApiService }
];
VgTrackSelectorComponent.propDecorators = {
    vgFor: [{ type: Input }]
};

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
VgUtcPipe.decorators = [
    { type: Pipe, args: [{ name: 'vgUtc' },] }
];
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
VgTimeDisplayComponent.decorators = [
    { type: Component, args: [{
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
            },] }
];
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
VgScrubBarComponent.decorators = [
    { type: Component, args: [{
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
            },] }
];
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
VgQualitySelectorComponent.decorators = [
    { type: Component, args: [{
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
            },] }
];
/** @nocollapse */
VgQualitySelectorComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: VgApiService }
];
VgQualitySelectorComponent.propDecorators = {
    bitrates: [{ type: Input }],
    onBitrateChange: [{ type: Output }]
};

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
VgPlaybackButtonComponent.decorators = [
    { type: Component, args: [{
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
            },] }
];
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
VgPlayPauseComponent.decorators = [
    { type: Component, args: [{
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
            },] }
];
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
VgMuteComponent.decorators = [
    { type: Component, args: [{
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
            },] }
];
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
VgFullscreenComponent.decorators = [
    { type: Component, args: [{
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
            },] }
];
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
VgScrubBarBufferingTimeComponent.decorators = [
    { type: Component, args: [{
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
            },] }
];
/** @nocollapse */
VgScrubBarBufferingTimeComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: VgApiService }
];
VgScrubBarBufferingTimeComponent.propDecorators = {
    vgFor: [{ type: Input }]
};

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
VgScrubBarCuePointsComponent.decorators = [
    { type: Component, args: [{
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
            },] }
];
/** @nocollapse */
VgScrubBarCuePointsComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: VgApiService }
];
VgScrubBarCuePointsComponent.propDecorators = {
    vgCuePoints: [{ type: Input }],
    vgFor: [{ type: Input }]
};

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
VgScrubBarCurrentTimeComponent.decorators = [
    { type: Component, args: [{
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
            },] }
];
/** @nocollapse */
VgScrubBarCurrentTimeComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: VgApiService }
];
VgScrubBarCurrentTimeComponent.propDecorators = {
    vgFor: [{ type: Input }],
    vgSlider: [{ type: Input }]
};

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
VgControlsModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, VgCoreModule],
                declarations: [...components],
                exports: [...components],
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { VgControlsComponent, VgControlsModule, VgFullscreenComponent, VgMuteComponent, VgPlayPauseComponent, VgPlaybackButtonComponent, VgQualitySelectorComponent, VgScrubBarBufferingTimeComponent, VgScrubBarComponent, VgScrubBarCuePointsComponent, VgScrubBarCurrentTimeComponent, VgTimeDisplayComponent, VgTrackSelectorComponent, VgUtcPipe, VgVolumeComponent };
//# sourceMappingURL=videogular-ngx-videogular-controls.js.map
