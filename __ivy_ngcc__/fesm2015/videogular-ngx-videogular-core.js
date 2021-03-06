import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Directive, ElementRef, Output, ChangeDetectorRef, Input, Component, ViewEncapsulation, HostBinding, ContentChildren, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, fromEvent, Observable, combineLatest, timer } from 'rxjs';
import { map } from 'rxjs/operators';

import * as ɵngcc0 from '@angular/core';

const _c0 = ["*"];
class VgStates {
}
VgStates.ɵfac = function VgStates_Factory(t) { return new (t || VgStates)(); };
VgStates.VG_ENDED = 'ended';
VgStates.VG_PAUSED = 'paused';
VgStates.VG_PLAYING = 'playing';
VgStates.VG_LOADING = 'waiting';
/** @nocollapse */ VgStates.ɵprov = i0.ɵɵdefineInjectable({ factory: function VgStates_Factory() { return new VgStates(); }, token: VgStates, providedIn: "root" });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(VgStates, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();

class VgApiService {
    constructor() {
        this.medias = {}; // TODO: refactor to Set<IPlayable>
        this.playerReadyEvent = new EventEmitter(true);
        this.isPlayerReady = false;
    }
    onPlayerReady(fsAPI) {
        this.fsAPI = fsAPI;
        this.isPlayerReady = true;
        this.playerReadyEvent.emit(this);
    }
    getDefaultMedia() {
        for (const item in this.medias) {
            if (this.medias[item]) {
                return this.medias[item];
            }
        }
    }
    getMasterMedia() {
        let master;
        for (const id in this.medias) {
            if (this.medias[id].vgMaster === 'true' ||
                this.medias[id].vgMaster === true) {
                master = this.medias[id];
                break;
            }
        }
        return master || this.getDefaultMedia();
    }
    isMasterDefined() {
        let result = false;
        for (const id in this.medias) {
            if (this.medias[id].vgMaster === 'true' ||
                this.medias[id].vgMaster === true) {
                result = true;
                break;
            }
        }
        return result;
    }
    getMediaById(id = null) {
        let media = this.medias[id];
        if (!id || id === '*') {
            media = this;
        }
        return media;
    }
    play() {
        for (const id in this.medias) {
            if (this.medias[id]) {
                this.medias[id].play();
            }
        }
    }
    pause() {
        for (const id in this.medias) {
            if (this.medias[id]) {
                this.medias[id].pause();
            }
        }
    }
    get duration() {
        return this.$$getAllProperties('duration');
    }
    set currentTime(seconds) {
        this.$$setAllProperties('currentTime', seconds);
    }
    get currentTime() {
        return this.$$getAllProperties('currentTime');
    }
    set state(state) {
        this.$$setAllProperties('state', state);
    }
    get state() {
        return this.$$getAllProperties('state');
    }
    set volume(volume) {
        this.$$setAllProperties('volume', volume);
    }
    get volume() {
        return this.$$getAllProperties('volume');
    }
    set playbackRate(rate) {
        this.$$setAllProperties('playbackRate', rate);
    }
    get playbackRate() {
        return this.$$getAllProperties('playbackRate');
    }
    get canPlay() {
        return this.$$getAllProperties('canPlay');
    }
    get canPlayThrough() {
        return this.$$getAllProperties('canPlayThrough');
    }
    get isMetadataLoaded() {
        return this.$$getAllProperties('isMetadataLoaded');
    }
    get isWaiting() {
        return this.$$getAllProperties('isWaiting');
    }
    get isCompleted() {
        return this.$$getAllProperties('isCompleted');
    }
    get isLive() {
        return this.$$getAllProperties('isLive');
    }
    get isMaster() {
        return this.$$getAllProperties('isMaster');
    }
    get time() {
        return this.$$getAllProperties('time');
    }
    get buffer() {
        return this.$$getAllProperties('buffer');
    }
    get buffered() {
        return this.$$getAllProperties('buffered');
    }
    get subscriptions() {
        return this.$$getAllProperties('subscriptions');
    }
    get textTracks() {
        return this.$$getAllProperties('textTracks');
    }
    seekTime(value, byPercent = false) {
        for (const id in this.medias) {
            if (this.medias[id]) {
                this.$$seek(this.medias[id], value, byPercent);
            }
        }
    }
    $$seek(media, value, byPercent = false) {
        let second;
        let duration = media.duration;
        if (byPercent) {
            if (this.isMasterDefined()) {
                duration = this.getMasterMedia().duration;
            }
            second = (value * duration) / 100;
        }
        else {
            second = value;
        }
        media.currentTime = second;
    }
    addTextTrack(type, label, language) {
        for (const id in this.medias) {
            if (this.medias[id]) {
                this.$$addTextTrack(this.medias[id], type, label, language);
            }
        }
    }
    $$addTextTrack(media, type, label, language) {
        media.addTextTrack(type, label, language);
    }
    $$getAllProperties(property) {
        const medias = {};
        let result;
        for (const id in this.medias) {
            if (this.medias[id]) {
                medias[id] = this.medias[id];
            }
        }
        const nMedias = Object.keys(medias).length;
        switch (nMedias) {
            case 0:
                // Return default values until vgMedia is initialized
                switch (property) {
                    case 'state':
                        result = VgStates.VG_PAUSED;
                        break;
                    case 'playbackRate':
                    case 'volume':
                        result = 1;
                        break;
                    case 'time':
                        result = { current: 0, total: 0, left: 0 };
                        break;
                }
                break;
            case 1:
                // If there's only one media element then return the plain value
                const firstMediaId = Object.keys(medias)[0];
                result = medias[firstMediaId][property];
                break;
            default:
                // TODO: return 'master' value
                const master = this.getMasterMedia();
                result = medias[master.id][property];
        }
        return result;
    }
    $$setAllProperties(property, value) {
        for (const id in this.medias) {
            if (this.medias[id]) {
                this.medias[id][property] = value;
            }
        }
    }
    registerElement(elem) {
        this.videogularElement = elem;
    }
    registerMedia(media) {
        this.medias[media.id] = media;
    }
    unregisterMedia(media) {
        delete this.medias[media.id];
    }
}
VgApiService.ɵfac = function VgApiService_Factory(t) { return new (t || VgApiService)(); };
/** @nocollapse */ VgApiService.ɵprov = i0.ɵɵdefineInjectable({ factory: function VgApiService_Factory() { return new VgApiService(); }, token: VgApiService, providedIn: "root" });
/** @nocollapse */
VgApiService.ctorParameters = () => [];
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(VgApiService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();

class VgControlsHiddenService {
    constructor() {
        this.isHiddenSubject = new Subject();
        this.isHidden = this.isHiddenSubject.asObservable();
    }
    state(hidden) {
        this.isHiddenSubject.next(hidden);
    }
}
VgControlsHiddenService.ɵfac = function VgControlsHiddenService_Factory(t) { return new (t || VgControlsHiddenService)(); };
/** @nocollapse */ VgControlsHiddenService.ɵprov = i0.ɵɵdefineInjectable({ factory: function VgControlsHiddenService_Factory() { return new VgControlsHiddenService(); }, token: VgControlsHiddenService, providedIn: "root" });
/** @nocollapse */
VgControlsHiddenService.ctorParameters = () => [];
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(VgControlsHiddenService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();

class VgUtilsService {
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
VgUtilsService.ɵfac = function VgUtilsService_Factory(t) { return new (t || VgUtilsService)(); };
/** @nocollapse */ VgUtilsService.ɵprov = i0.ɵɵdefineInjectable({ factory: function VgUtilsService_Factory() { return new VgUtilsService(); }, token: VgUtilsService, providedIn: "root" });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(VgUtilsService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();

class VgFullscreenApiService {
    constructor() {
        this.nativeFullscreen = true;
        this.isFullscreen = false;
        this.onChangeFullscreen = new EventEmitter();
    }
    init(elem, medias) {
        this.videogularElement = elem;
        this.medias = medias;
        const APIs = {
            w3: {
                enabled: 'fullscreenEnabled',
                element: 'fullscreenElement',
                request: 'requestFullscreen',
                exit: 'exitFullscreen',
                onchange: 'fullscreenchange',
                onerror: 'fullscreenerror',
            },
            newWebkit: {
                enabled: 'webkitFullscreenEnabled',
                element: 'webkitFullscreenElement',
                request: 'webkitRequestFullscreen',
                exit: 'webkitExitFullscreen',
                onchange: 'webkitfullscreenchange',
                onerror: 'webkitfullscreenerror',
            },
            oldWebkit: {
                enabled: 'webkitIsFullScreen',
                element: 'webkitCurrentFullScreenElement',
                request: 'webkitRequestFullScreen',
                exit: 'webkitCancelFullScreen',
                onchange: 'webkitfullscreenchange',
                onerror: 'webkitfullscreenerror',
            },
            moz: {
                enabled: 'mozFullScreen',
                element: 'mozFullScreenElement',
                request: 'mozRequestFullScreen',
                exit: 'mozCancelFullScreen',
                onchange: 'mozfullscreenchange',
                onerror: 'mozfullscreenerror',
            },
            ios: {
                enabled: 'webkitFullscreenEnabled',
                element: 'webkitFullscreenElement',
                request: 'webkitRequestFullscreen',
                exit: 'webkitExitFullscreen',
                onchange: 'webkitendfullscreen',
                onerror: 'webkitfullscreenerror',
            },
            ms: {
                enabled: 'msFullscreenEnabled',
                element: 'msFullscreenElement',
                request: 'msRequestFullscreen',
                exit: 'msExitFullscreen',
                onchange: 'MSFullscreenChange',
                onerror: 'MSFullscreenError',
            },
        };
        for (const browser in APIs) {
            if (APIs[browser].enabled in document) {
                this.polyfill = APIs[browser];
                break;
            }
        }
        if (VgUtilsService.isiOSDevice()) {
            this.polyfill = APIs.ios;
        }
        this.isAvailable = this.polyfill != null;
        if (this.polyfill == null) {
            return;
        }
        let fsElemDispatcher;
        switch (this.polyfill.onchange) {
            // Mozilla dispatches the fullscreen change event from document, not the element
            // See: https://bugzilla.mozilla.org/show_bug.cgi?id=724816#c3
            case 'mozfullscreenchange':
                fsElemDispatcher = document;
                break;
            // iOS dispatches the fullscreen change event from video element
            case 'webkitendfullscreen':
                fsElemDispatcher = elem;
                break;
            // HTML5 implementation dispatches the fullscreen change event from the element
            default:
                fsElemDispatcher = elem;
        }
        this.fsChangeSubscription = fromEvent(fsElemDispatcher, this.polyfill.onchange).subscribe(() => {
            this.onFullscreenChange();
        });
    }
    onFullscreenChange() {
        this.isFullscreen = !!document[this.polyfill.element];
        this.onChangeFullscreen.emit(this.isFullscreen);
    }
    toggleFullscreen(element = null) {
        if (this.isFullscreen) {
            this.exit();
        }
        else {
            this.request(element);
        }
    }
    request(elem) {
        if (!elem) {
            elem = this.videogularElement;
        }
        this.isFullscreen = true;
        this.onChangeFullscreen.emit(true);
        // Perform native full screen support
        if (this.isAvailable && this.nativeFullscreen) {
            // Fullscreen for mobile devices
            if (VgUtilsService.isMobileDevice()) {
                // We should make fullscreen the video object if it doesn't have native fullscreen support
                // Fallback! We can't set vg-player on fullscreen, only video/audio objects
                if ((!this.polyfill.enabled && elem === this.videogularElement) ||
                    VgUtilsService.isiOSDevice()) {
                    elem = elem;
                }
                this.enterElementInFullScreen(elem);
            }
            else {
                this.enterElementInFullScreen(this.videogularElement);
            }
        }
    }
    enterElementInFullScreen(elem) {
        elem[this.polyfill.request]();
    }
    exit() {
        this.isFullscreen = false;
        this.onChangeFullscreen.emit(false);
        // Exit from native fullscreen
        if (this.isAvailable && this.nativeFullscreen) {
            document[this.polyfill.exit]();
        }
    }
}
VgFullscreenApiService.ɵfac = function VgFullscreenApiService_Factory(t) { return new (t || VgFullscreenApiService)(); };
/** @nocollapse */ VgFullscreenApiService.ɵprov = i0.ɵɵdefineInjectable({ factory: function VgFullscreenApiService_Factory() { return new VgFullscreenApiService(); }, token: VgFullscreenApiService, providedIn: "root" });
/** @nocollapse */
VgFullscreenApiService.ctorParameters = () => [];
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(VgFullscreenApiService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();

class VgEvents {
}
VgEvents.ɵfac = function VgEvents_Factory(t) { return new (t || VgEvents)(); };
VgEvents.VG_ABORT = 'abort';
VgEvents.VG_CAN_PLAY = 'canplay';
VgEvents.VG_CAN_PLAY_THROUGH = 'canplaythrough';
VgEvents.VG_DURATION_CHANGE = 'durationchange';
VgEvents.VG_EMPTIED = 'emptied';
VgEvents.VG_ENCRYPTED = 'encrypted';
VgEvents.VG_ENDED = 'ended';
VgEvents.VG_ERROR = 'error';
VgEvents.VG_LOADED_DATA = 'loadeddata';
VgEvents.VG_LOADED_METADATA = 'loadedmetadata';
VgEvents.VG_LOAD_START = 'loadstart';
VgEvents.VG_PAUSE = 'pause';
VgEvents.VG_PLAY = 'play';
VgEvents.VG_PLAYING = 'playing';
VgEvents.VG_PROGRESS = 'progress';
VgEvents.VG_RATE_CHANGE = 'ratechange';
VgEvents.VG_SEEK = 'seek';
VgEvents.VG_SEEKED = 'seeked';
VgEvents.VG_SEEKING = 'seeking';
VgEvents.VG_STALLED = 'stalled';
VgEvents.VG_SUSPEND = 'suspend';
VgEvents.VG_TIME_UPDATE = 'timeupdate';
VgEvents.VG_VOLUME_CHANGE = 'volumechange';
VgEvents.VG_WAITING = 'waiting';
VgEvents.VG_LOAD = 'load';
VgEvents.VG_ENTER = 'enter';
VgEvents.VG_EXIT = 'exit';
VgEvents.VG_START_ADS = 'startads';
VgEvents.VG_END_ADS = 'endads';
/** @nocollapse */ VgEvents.ɵprov = i0.ɵɵdefineInjectable({ factory: function VgEvents_Factory() { return new VgEvents(); }, token: VgEvents, providedIn: "root" });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(VgEvents, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();

class VgCuePointsDirective {
    constructor(ref) {
        this.ref = ref;
        this.onEnterCuePoint = new EventEmitter();
        this.onUpdateCuePoint = new EventEmitter();
        this.onExitCuePoint = new EventEmitter();
        this.onCompleteCuePoint = new EventEmitter();
        this.subscriptions = [];
        this.cuesSubscriptions = [];
        this.totalCues = 0;
    }
    ngOnInit() {
        this.onLoad$ = fromEvent(this.ref.nativeElement, VgEvents.VG_LOAD);
        this.subscriptions.push(this.onLoad$.subscribe(this.onLoad.bind(this)));
    }
    onLoad(event) {
        const cues = event.target.track.cues;
        this.ref.nativeElement.cues = cues;
        this.updateCuePoints(cues);
    }
    updateCuePoints(cues) {
        this.cuesSubscriptions.forEach((s) => s.unsubscribe());
        for (let i = 0, l = cues.length; i < l; i++) {
            this.onEnter$ = fromEvent(cues[i], VgEvents.VG_ENTER);
            this.cuesSubscriptions.push(this.onEnter$.subscribe(this.onEnter.bind(this)));
            this.onExit$ = fromEvent(cues[i], VgEvents.VG_EXIT);
            this.cuesSubscriptions.push(this.onExit$.subscribe(this.onExit.bind(this)));
        }
    }
    onEnter(event) {
        this.onEnterCuePoint.emit(event.target);
    }
    onExit(event) {
        this.onExitCuePoint.emit(event.target);
    }
    ngDoCheck() {
        if (this.ref.nativeElement.track && this.ref.nativeElement.track.cues) {
            const changes = this.totalCues !== this.ref.nativeElement.track.cues.length;
            if (changes) {
                this.totalCues = this.ref.nativeElement.track.cues.length;
                this.ref.nativeElement.cues = this.ref.nativeElement.track.cues;
                this.updateCuePoints(this.ref.nativeElement.track.cues);
            }
        }
    }
    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }
}
VgCuePointsDirective.ɵfac = function VgCuePointsDirective_Factory(t) { return new (t || VgCuePointsDirective)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef)); };
VgCuePointsDirective.ɵdir = /*@__PURE__*/ ɵngcc0.ɵɵdefineDirective({ type: VgCuePointsDirective, selectors: [["", "vgCuePoints", ""]], outputs: { onEnterCuePoint: "onEnterCuePoint", onUpdateCuePoint: "onUpdateCuePoint", onExitCuePoint: "onExitCuePoint", onCompleteCuePoint: "onCompleteCuePoint" } });
/** @nocollapse */
VgCuePointsDirective.ctorParameters = () => [
    { type: ElementRef }
];
VgCuePointsDirective.propDecorators = {
    onEnterCuePoint: [{ type: Output }],
    onUpdateCuePoint: [{ type: Output }],
    onExitCuePoint: [{ type: Output }],
    onCompleteCuePoint: [{ type: Output }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(VgCuePointsDirective, [{
        type: Directive,
        args: [{
                selector: '[vgCuePoints]'
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }]; }, { onEnterCuePoint: [{
            type: Output
        }], onUpdateCuePoint: [{
            type: Output
        }], onExitCuePoint: [{
            type: Output
        }], onCompleteCuePoint: [{
            type: Output
        }] }); })();

class VgMediaDirective {
    constructor(api, ref) {
        this.api = api;
        this.ref = ref;
        this.state = VgStates.VG_PAUSED;
        this.time = { current: 0, total: 0, left: 0 };
        this.buffer = { end: 0 };
        this.canPlay = false;
        this.canPlayThrough = false;
        this.isMetadataLoaded = false;
        this.isWaiting = false;
        this.isCompleted = false;
        this.isLive = false;
        this.isBufferDetected = false;
        this.checkInterval = 200;
        this.currentPlayPos = 0;
        this.lastPlayPos = 0;
        this.playAtferSync = false;
        this.bufferDetected = new Subject();
    }
    ngOnInit() {
        if (this.vgMedia.nodeName) {
            // It's a native element
            this.elem = this.vgMedia;
        }
        else {
            // It's an Angular Class
            this.elem = this.vgMedia.elem;
        }
        // Just in case we're creating this vgMedia dynamically register again into API
        this.api.registerMedia(this);
        this.subscriptions = {
            // Native events
            abort: fromEvent(this.elem, VgEvents.VG_ABORT),
            canPlay: fromEvent(this.elem, VgEvents.VG_CAN_PLAY),
            canPlayThrough: fromEvent(this.elem, VgEvents.VG_CAN_PLAY_THROUGH),
            durationChange: fromEvent(this.elem, VgEvents.VG_DURATION_CHANGE),
            emptied: fromEvent(this.elem, VgEvents.VG_EMPTIED),
            encrypted: fromEvent(this.elem, VgEvents.VG_ENCRYPTED),
            ended: fromEvent(this.elem, VgEvents.VG_ENDED),
            error: fromEvent(this.elem, VgEvents.VG_ERROR),
            loadedData: fromEvent(this.elem, VgEvents.VG_LOADED_DATA),
            loadedMetadata: fromEvent(this.elem, VgEvents.VG_LOADED_METADATA),
            loadStart: fromEvent(this.elem, VgEvents.VG_LOAD_START),
            pause: fromEvent(this.elem, VgEvents.VG_PAUSE),
            play: fromEvent(this.elem, VgEvents.VG_PLAY),
            playing: fromEvent(this.elem, VgEvents.VG_PLAYING),
            progress: fromEvent(this.elem, VgEvents.VG_PROGRESS),
            rateChange: fromEvent(this.elem, VgEvents.VG_RATE_CHANGE),
            seeked: fromEvent(this.elem, VgEvents.VG_SEEKED),
            seeking: fromEvent(this.elem, VgEvents.VG_SEEKING),
            stalled: fromEvent(this.elem, VgEvents.VG_STALLED),
            suspend: fromEvent(this.elem, VgEvents.VG_SUSPEND),
            timeUpdate: fromEvent(this.elem, VgEvents.VG_TIME_UPDATE),
            volumeChange: fromEvent(this.elem, VgEvents.VG_VOLUME_CHANGE),
            waiting: fromEvent(this.elem, VgEvents.VG_WAITING),
            // Advertisement only events
            startAds: fromEvent(window, VgEvents.VG_START_ADS),
            endAds: fromEvent(window, VgEvents.VG_END_ADS),
            // See changes on <source> child elements to reload the video file
            mutation: new Observable((observer) => {
                const domObs = new MutationObserver((mutations) => {
                    observer.next(mutations);
                });
                domObs.observe(this.elem, { childList: true, attributes: true });
                return () => {
                    domObs.disconnect();
                };
            }),
            // Custom buffering detection
            bufferDetected: this.bufferDetected,
        };
        this.mutationObs = this.subscriptions.mutation.subscribe(this.onMutation.bind(this));
        this.canPlayObs = this.subscriptions.canPlay.subscribe(this.onCanPlay.bind(this));
        this.canPlayThroughObs = this.subscriptions.canPlayThrough.subscribe(this.onCanPlayThrough.bind(this));
        this.loadedMetadataObs = this.subscriptions.loadedMetadata.subscribe(this.onLoadMetadata.bind(this));
        this.waitingObs = this.subscriptions.waiting.subscribe(this.onWait.bind(this));
        this.progressObs = this.subscriptions.progress.subscribe(this.onProgress.bind(this));
        this.endedObs = this.subscriptions.ended.subscribe(this.onComplete.bind(this));
        this.playingObs = this.subscriptions.playing.subscribe(this.onStartPlaying.bind(this));
        this.playObs = this.subscriptions.play.subscribe(this.onPlay.bind(this));
        this.pauseObs = this.subscriptions.pause.subscribe(this.onPause.bind(this));
        this.timeUpdateObs = this.subscriptions.timeUpdate.subscribe(this.onTimeUpdate.bind(this));
        this.volumeChangeObs = this.subscriptions.volumeChange.subscribe(this.onVolumeChange.bind(this));
        this.errorObs = this.subscriptions.error.subscribe(this.onError.bind(this));
        if (this.vgMaster) {
            this.api.playerReadyEvent.subscribe(() => {
                this.prepareSync();
            });
        }
    }
    prepareSync() {
        const canPlayAll = [];
        for (const media in this.api.medias) {
            if (this.api.medias[media]) {
                canPlayAll.push(this.api.medias[media].subscriptions.canPlay);
            }
        }
        this.canPlayAllSubscription = combineLatest(canPlayAll)
            .pipe(map((...params) => {
            const checkReadyState = (event) => {
                if (!(event === null || event === void 0 ? void 0 : event.target)) {
                    return false;
                }
                return event.target.readyState === 4;
            };
            const allReady = params.some(checkReadyState);
            if (allReady && !this.syncSubscription) {
                this.startSync();
                this.syncSubscription.unsubscribe();
            }
        }))
            .subscribe();
    }
    startSync() {
        this.syncSubscription = timer(0, 1000).subscribe(() => {
            for (const media in this.api.medias) {
                if (this.api.medias[media] !== this) {
                    const diff = this.api.medias[media].currentTime - this.currentTime;
                    if (diff < -0.3 || diff > 0.3) {
                        this.playAtferSync = this.state === VgStates.VG_PLAYING;
                        this.pause();
                        this.api.medias[media].pause();
                        this.api.medias[media].currentTime = this.currentTime;
                    }
                    else {
                        if (this.playAtferSync) {
                            this.play();
                            this.api.medias[media].play();
                            this.playAtferSync = false;
                        }
                    }
                }
            }
        });
    }
    onMutation(mutations) {
        // Detect changes only for source elements or src attribute
        for (let i = 0, l = mutations.length; i < l; i++) {
            const mut = mutations[i];
            if (mut.type === 'attributes' && mut.attributeName === 'src') {
                // Only load src file if it's not a blob (for DASH / HLS sources)
                if (mut.target.src &&
                    mut.target.src.length > 0 &&
                    mut.target.src.indexOf('blob:') < 0) {
                    this.loadMedia();
                    break;
                }
            }
            else if (mut.type === 'childList' &&
                mut.removedNodes.length &&
                mut.removedNodes[0].nodeName.toLowerCase() === 'source') {
                this.loadMedia();
                break;
            }
        }
    }
    loadMedia() {
        this.vgMedia.pause();
        this.vgMedia.currentTime = 0;
        // Start buffering until we can play the media file
        this.stopBufferCheck();
        this.isBufferDetected = true;
        this.bufferDetected.next(this.isBufferDetected);
        // TODO: This is ugly, we should find something cleaner. For some reason a TimerObservable doesn't works.
        setTimeout(() => this.vgMedia.load(), 10);
    }
    play() {
        // short-circuit if already playing
        if (this.playPromise ||
            (this.state !== VgStates.VG_PAUSED && this.state !== VgStates.VG_ENDED)) {
            return;
        }
        this.playPromise = this.vgMedia.play();
        // browser has async play promise
        if (this.playPromise && this.playPromise.then && this.playPromise.catch) {
            this.playPromise
                .then(() => {
                this.playPromise = null;
            })
                .catch(() => {
                this.playPromise = null;
                // deliberately empty for the sake of eating console noise
            });
        }
        return this.playPromise;
    }
    pause() {
        // browser has async play promise
        if (this.playPromise) {
            this.playPromise.then(() => {
                this.vgMedia.pause();
            });
        }
        else {
            this.vgMedia.pause();
        }
    }
    get id() {
        // We should return undefined if vgMedia still doesn't exist
        let result;
        if (this.vgMedia) {
            result = this.vgMedia.id;
        }
        return result;
    }
    get duration() {
        return this.vgMedia.duration === Infinity
            ? this.specifiedDuration
            : this.vgMedia.duration;
    }
    set currentTime(seconds) {
        this.vgMedia.currentTime = seconds;
        // this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_SEEK));
    }
    get currentTime() {
        return this.vgMedia.currentTime;
    }
    set volume(volume) {
        this.vgMedia.volume = volume;
    }
    get volume() {
        return this.vgMedia.volume;
    }
    set playbackRate(rate) {
        this.vgMedia.playbackRate = rate;
    }
    get playbackRate() {
        return this.vgMedia.playbackRate;
    }
    get buffered() {
        return this.vgMedia.buffered;
    }
    get textTracks() {
        return this.vgMedia.textTracks;
    }
    // @ts-ignore
    onCanPlay(event) {
        this.isBufferDetected = false;
        this.bufferDetected.next(this.isBufferDetected);
        this.canPlay = true;
        this.ref.detectChanges();
    }
    // @ts-ignore
    onCanPlayThrough(event) {
        this.isBufferDetected = false;
        this.bufferDetected.next(this.isBufferDetected);
        this.canPlayThrough = true;
        this.ref.detectChanges();
    }
    // @ts-ignore
    onLoadMetadata(event) {
        this.isMetadataLoaded = true;
        this.time = {
            current: 0,
            left: 0,
            total: this.duration * 1000,
        };
        this.state = VgStates.VG_PAUSED;
        // Live streaming check
        const t = Math.round(this.time.total);
        this.isLive = t === Infinity;
        this.ref.detectChanges();
    }
    // @ts-ignore
    onWait(event) {
        this.isWaiting = true;
        this.ref.detectChanges();
    }
    // @ts-ignore
    onComplete(event) {
        this.isCompleted = true;
        this.state = VgStates.VG_ENDED;
        this.ref.detectChanges();
    }
    // @ts-ignore
    onStartPlaying(event) {
        this.state = VgStates.VG_PLAYING;
        this.ref.detectChanges();
    }
    // @ts-ignore
    onPlay(event) {
        this.state = VgStates.VG_PLAYING;
        if (this.vgMaster) {
            if (!this.syncSubscription || this.syncSubscription.closed) {
                this.startSync();
            }
        }
        this.startBufferCheck();
        this.ref.detectChanges();
    }
    // @ts-ignore
    onPause(event) {
        this.state = VgStates.VG_PAUSED;
        if (this.vgMaster) {
            if (!this.playAtferSync) {
                this.syncSubscription.unsubscribe();
            }
        }
        this.stopBufferCheck();
        this.ref.detectChanges();
    }
    // @ts-ignore
    onTimeUpdate(event) {
        const end = this.buffered.length - 1;
        this.time = {
            current: this.currentTime * 1000,
            total: this.time.total,
            left: (this.duration - this.currentTime) * 1000,
        };
        if (end >= 0) {
            this.buffer = { end: this.buffered.end(end) * 1000 };
        }
        this.ref.detectChanges();
    }
    // @ts-ignore
    onProgress(event) {
        const end = this.buffered.length - 1;
        if (end >= 0) {
            this.buffer = { end: this.buffered.end(end) * 1000 };
        }
        this.ref.detectChanges();
    }
    // @ts-ignore
    onVolumeChange(event) {
        // TODO: Save to localstorage the current volume
        this.ref.detectChanges();
    }
    // @ts-ignore
    onError(event) {
        // TODO: Handle error messages
        this.ref.detectChanges();
    }
    // http://stackoverflow.com/a/23828241/779529
    bufferCheck() {
        const offset = 1 / this.checkInterval;
        this.currentPlayPos = this.currentTime;
        if (!this.isBufferDetected &&
            this.currentPlayPos < this.lastPlayPos + offset) {
            this.isBufferDetected = true;
        }
        if (this.isBufferDetected &&
            this.currentPlayPos > this.lastPlayPos + offset) {
            this.isBufferDetected = false;
        }
        // Prevent calls to bufferCheck after ngOnDestroy have been called
        if (!this.bufferDetected.closed) {
            this.bufferDetected.next(this.isBufferDetected);
        }
        this.lastPlayPos = this.currentPlayPos;
    }
    startBufferCheck() {
        this.checkBufferSubscription = timer(0, this.checkInterval).subscribe(() => {
            this.bufferCheck();
        });
    }
    stopBufferCheck() {
        if (this.checkBufferSubscription) {
            this.checkBufferSubscription.unsubscribe();
        }
        this.isBufferDetected = false;
        this.bufferDetected.next(this.isBufferDetected);
    }
    seekTime(value, byPercent = false) {
        let second;
        const duration = this.duration;
        if (byPercent) {
            second = (value * duration) / 100;
        }
        else {
            second = value;
        }
        this.currentTime = second;
    }
    addTextTrack(type, label, language, mode) {
        const newTrack = this.vgMedia.addTextTrack(type, label, language);
        if (mode) {
            newTrack.mode = mode;
        }
        return newTrack;
    }
    ngOnDestroy() {
        this.vgMedia.src = '';
        this.mutationObs.unsubscribe();
        this.canPlayObs.unsubscribe();
        this.canPlayThroughObs.unsubscribe();
        this.loadedMetadataObs.unsubscribe();
        this.waitingObs.unsubscribe();
        this.progressObs.unsubscribe();
        this.endedObs.unsubscribe();
        this.playingObs.unsubscribe();
        this.playObs.unsubscribe();
        this.pauseObs.unsubscribe();
        this.timeUpdateObs.unsubscribe();
        this.volumeChangeObs.unsubscribe();
        this.errorObs.unsubscribe();
        if (this.checkBufferSubscription) {
            this.checkBufferSubscription.unsubscribe();
        }
        if (this.syncSubscription) {
            this.syncSubscription.unsubscribe();
        }
        this.bufferDetected.complete();
        this.bufferDetected.unsubscribe();
        this.api.unregisterMedia(this);
    }
}
VgMediaDirective.ɵfac = function VgMediaDirective_Factory(t) { return new (t || VgMediaDirective)(ɵngcc0.ɵɵdirectiveInject(VgApiService), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ChangeDetectorRef)); };
VgMediaDirective.ɵdir = /*@__PURE__*/ ɵngcc0.ɵɵdefineDirective({ type: VgMediaDirective, selectors: [["", "vgMedia", ""]], inputs: { vgMedia: "vgMedia", vgMaster: "vgMaster" } });
/** @nocollapse */
VgMediaDirective.ctorParameters = () => [
    { type: VgApiService },
    { type: ChangeDetectorRef }
];
VgMediaDirective.propDecorators = {
    vgMedia: [{ type: Input }],
    vgMaster: [{ type: Input }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(VgMediaDirective, [{
        type: Directive,
        args: [{
                selector: '[vgMedia]'
            }]
    }], function () { return [{ type: VgApiService }, { type: ɵngcc0.ChangeDetectorRef }]; }, { vgMedia: [{
            type: Input
        }], vgMaster: [{
            type: Input
        }] }); })();

class VgPlayerComponent {
    constructor(ref, api, fsAPI, controlsHidden) {
        this.api = api;
        this.fsAPI = fsAPI;
        this.controlsHidden = controlsHidden;
        this.isFullscreen = false;
        this.isNativeFullscreen = false;
        this.areControlsHidden = false;
        this.onPlayerReady = new EventEmitter();
        this.onMediaReady = new EventEmitter();
        this.subscriptions = [];
        this.elem = ref.nativeElement;
        this.api.registerElement(this.elem);
    }
    ngAfterContentInit() {
        this.medias.toArray().forEach((media) => {
            this.api.registerMedia(media);
        });
        this.fsAPI.init(this.elem, this.medias);
        this.subscriptions.push(this.fsAPI.onChangeFullscreen.subscribe(this.onChangeFullscreen.bind(this)));
        this.subscriptions.push(this.controlsHidden.isHidden.subscribe(this.onHideControls.bind(this)));
        this.api.onPlayerReady(this.fsAPI);
        this.onPlayerReady.emit(this.api);
    }
    onChangeFullscreen(fsState) {
        if (!this.fsAPI.nativeFullscreen) {
            this.isFullscreen = fsState;
            this.zIndex = fsState ? VgUtilsService.getZIndex().toString() : 'auto';
        }
        else {
            this.isNativeFullscreen = fsState;
        }
    }
    onHideControls(hidden) {
        this.areControlsHidden = hidden;
    }
    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }
}
VgPlayerComponent.ɵfac = function VgPlayerComponent_Factory(t) { return new (t || VgPlayerComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(VgApiService), ɵngcc0.ɵɵdirectiveInject(VgFullscreenApiService), ɵngcc0.ɵɵdirectiveInject(VgControlsHiddenService)); };
VgPlayerComponent.ɵcmp = /*@__PURE__*/ ɵngcc0.ɵɵdefineComponent({ type: VgPlayerComponent, selectors: [["vg-player"]], contentQueries: function VgPlayerComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵngcc0.ɵɵcontentQuery(dirIndex, VgMediaDirective, 4);
    } if (rf & 2) {
        let _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.medias = _t);
    } }, hostVars: 8, hostBindings: function VgPlayerComponent_HostBindings(rf, ctx) { if (rf & 2) {
        ɵngcc0.ɵɵstyleProp("z-index", ctx.zIndex);
        ɵngcc0.ɵɵclassProp("fullscreen", ctx.isFullscreen)("native-fullscreen", ctx.isNativeFullscreen)("controls-hidden", ctx.areControlsHidden);
    } }, outputs: { onPlayerReady: "onPlayerReady", onMediaReady: "onMediaReady" }, features: [ɵngcc0.ɵɵProvidersFeature([VgApiService, VgFullscreenApiService, VgControlsHiddenService])], ngContentSelectors: _c0, decls: 1, vars: 0, template: function VgPlayerComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵprojection(0);
    } }, styles: ["\n      vg-player {\n        font-family: 'videogular';\n        position: relative;\n        display: flex;\n        width: 100%;\n        height: 100%;\n        overflow: hidden;\n        background-color: black;\n      }\n      vg-player.fullscreen {\n        position: fixed;\n        left: 0;\n        top: 0;\n      }\n      vg-player.native-fullscreen.controls-hidden {\n        cursor: none;\n      }\n    "], encapsulation: 2 });
/** @nocollapse */
VgPlayerComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: VgApiService },
    { type: VgFullscreenApiService },
    { type: VgControlsHiddenService }
];
VgPlayerComponent.propDecorators = {
    isFullscreen: [{ type: HostBinding, args: ['class.fullscreen',] }],
    isNativeFullscreen: [{ type: HostBinding, args: ['class.native-fullscreen',] }],
    areControlsHidden: [{ type: HostBinding, args: ['class.controls-hidden',] }],
    zIndex: [{ type: HostBinding, args: ['style.z-index',] }],
    onPlayerReady: [{ type: Output }],
    onMediaReady: [{ type: Output }],
    medias: [{ type: ContentChildren, args: [VgMediaDirective,] }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(VgPlayerComponent, [{
        type: Component,
        args: [{
                selector: 'vg-player',
                encapsulation: ViewEncapsulation.None,
                template: `<ng-content></ng-content>`,
                providers: [VgApiService, VgFullscreenApiService, VgControlsHiddenService],
                styles: [`
      vg-player {
        font-family: 'videogular';
        position: relative;
        display: flex;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: black;
      }
      vg-player.fullscreen {
        position: fixed;
        left: 0;
        top: 0;
      }
      vg-player.native-fullscreen.controls-hidden {
        cursor: none;
      }
    `]
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: VgApiService }, { type: VgFullscreenApiService }, { type: VgControlsHiddenService }]; }, { isFullscreen: [{
            type: HostBinding,
            args: ['class.fullscreen']
        }], isNativeFullscreen: [{
            type: HostBinding,
            args: ['class.native-fullscreen']
        }], areControlsHidden: [{
            type: HostBinding,
            args: ['class.controls-hidden']
        }], onPlayerReady: [{
            type: Output
        }], onMediaReady: [{
            type: Output
        }], zIndex: [{
            type: HostBinding,
            args: ['style.z-index']
        }], medias: [{
            type: ContentChildren,
            args: [VgMediaDirective]
        }] }); })();

const services = [
    VgApiService,
    VgControlsHiddenService,
    VgFullscreenApiService,
    VgUtilsService,
    VgEvents,
    VgStates
];
const directives = [
    VgCuePointsDirective,
    VgMediaDirective
];
class VgCoreModule {
}
VgCoreModule.ɵfac = function VgCoreModule_Factory(t) { return new (t || VgCoreModule)(); };
VgCoreModule.ɵmod = /*@__PURE__*/ ɵngcc0.ɵɵdefineNgModule({ type: VgCoreModule });
VgCoreModule.ɵinj = /*@__PURE__*/ ɵngcc0.ɵɵdefineInjector({ providers: [...services], imports: [[CommonModule]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(VgCoreModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                providers: [...services],
                declarations: [...directives, VgPlayerComponent],
                exports: [...directives, VgPlayerComponent]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(VgCoreModule, { declarations: function () { return [VgCuePointsDirective, VgMediaDirective, VgPlayerComponent]; }, imports: function () { return [CommonModule]; }, exports: function () { return [VgCuePointsDirective, VgMediaDirective, VgPlayerComponent]; } }); })();

class VgMediaElement {
    get audioTracks() {
        return null;
    }
    // @ts-ignore
    addTextTrack(kind, label, language) {
        return null;
    }
    // @ts-ignore
    canPlayType(type) {
        return null;
    }
    load() { }
    msClearEffects() { }
    msGetAsCastingSource() {
        return null;
    }
    // @ts-ignore
    msInsertAudioEffect(_activatableClassId, _effectRequired, _config) { }
    // @ts-ignore
    msSetMediaKeys(mediaKeys) { }
    // @ts-ignore
    msSetMediaProtectionManager(mediaProtectionManager) { }
    pause() { }
    play() {
        return null;
    }
    // @ts-ignore
    setMediaKeys(mediaKeys) {
        return null;
    }
    // @ts-ignore
    addEventListener(_type, _listener, _useCapture) { }
}

/**
 * Generated bundle index. Do not edit.
 */

export { VgApiService, VgControlsHiddenService, VgCoreModule, VgCuePointsDirective, VgEvents, VgFullscreenApiService, VgMediaDirective, VgMediaElement, VgPlayerComponent, VgStates, VgUtilsService };

//# sourceMappingURL=videogular-ngx-videogular-core.js.map
