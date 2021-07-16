import { Directive, Input, ChangeDetectorRef, } from '@angular/core';
import { Observable, Subject, fromEvent, timer, combineLatest, } from 'rxjs';
import { map } from 'rxjs/operators';
import { VgApiService } from '../../services/vg-api/vg-api.service';
import { VgStates } from '../../services/states/vg-states.service';
import { VgEvents } from '../../services/events/vg-events.service';
export class VgMediaDirective {
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
VgMediaDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vgMedia]',
            },] }
];
/** @nocollapse */
VgMediaDirective.ctorParameters = () => [
    { type: VgApiService },
    { type: ChangeDetectorRef }
];
VgMediaDirective.propDecorators = {
    vgMedia: [{ type: Input }],
    vgMaster: [{ type: Input }]
};
//# sourceMappingURL=vg-media.directive.js.map