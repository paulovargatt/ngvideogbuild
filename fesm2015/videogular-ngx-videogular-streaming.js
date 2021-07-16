import { EventEmitter, Directive, ElementRef, Input, Output, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VgApiService, VgCoreModule } from '@videogular/ngx-videogular/core';

class VgDashDirective {
    constructor(ref, API) {
        this.ref = ref;
        this.API = API;
        this.onGetBitrates = new EventEmitter();
        this.subscriptions = [];
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
        this.vgFor = this.ref.nativeElement.getAttribute('vgFor');
        this.target = this.API.getMediaById(this.vgFor);
        this.createPlayer();
    }
    ngOnChanges(changes) {
        var _a;
        ((_a = changes.vgDash) === null || _a === void 0 ? void 0 : _a.currentValue) ? this.createPlayer() : this.destroyPlayer();
    }
    createPlayer() {
        if (this.dash) {
            this.destroyPlayer();
        }
        // It's a DASH source
        if (this.vgDash &&
            (this.vgDash.indexOf('.mpd') > -1 ||
                this.vgDash.indexOf('mpd-time-csf') > -1)) {
            let drmOptions;
            if (this.vgDRMLicenseServer) {
                drmOptions = this.vgDRMLicenseServer;
                if (this.vgDRMToken) {
                    for (const drmServer in drmOptions) {
                        if (drmServer.hasOwnProperty(drmServer)) {
                            drmOptions[drmServer].httpRequestHeaders = {
                                Authorization: this.vgDRMToken,
                            };
                        }
                    }
                }
            }
            this.dash = dashjs.MediaPlayer().create();
            this.dash.updateSettings({ debug: { logLevel: dashjs.Debug.LOG_LEVEL_NONE } });
            this.dash.initialize(this.ref.nativeElement);
            this.dash.setAutoPlay(false);
            this.dash.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
                const audioList = this.dash.getBitrateInfoListFor('audio');
                const videoList = this.dash.getBitrateInfoListFor('video');
                if (audioList.length > 1) {
                    audioList.forEach((item) => (item.qualityIndex = ++item.qualityIndex));
                    audioList.unshift({
                        qualityIndex: 0,
                        width: 0,
                        height: 0,
                        bitrate: 0,
                        mediaType: 'video',
                        scanType: 'AUTO',
                    });
                    this.onGetBitrates.emit(audioList);
                }
                if (videoList.length > 1) {
                    videoList.forEach((item) => (item.qualityIndex = ++item.qualityIndex));
                    videoList.unshift({
                        qualityIndex: 0,
                        width: 0,
                        height: 0,
                        bitrate: 0,
                        mediaType: 'video',
                        scanType: 'AUTO',
                    });
                    this.onGetBitrates.emit(videoList);
                }
            });
            if (drmOptions) {
                this.dash.setProtectionData(drmOptions);
            }
            this.dash.attachSource(this.vgDash);
        }
        else {
            if (this.target) {
                this.target.pause();
                this.target.seekTime(0);
                this.ref.nativeElement.src = this.vgDash;
            }
        }
    }
    setBitrate({ mediaType, qualityIndex }) {
        if (this.dash) {
            if (qualityIndex > 0) {
                if (this.dash.getSettings()) {
                    this.dash.updateSettings({
                        streaming: {
                            abr: {
                                autoSwitchBitrate: {
                                    [mediaType]: false
                                }
                            }
                        }
                    });
                }
                const nextIndex = qualityIndex - 1;
                this.dash.setQualityFor(mediaType, nextIndex);
            }
            else {
                this.dash.updateSettings({
                    streaming: {
                        abr: {
                            autoSwitchBitrate: {
                                [mediaType]: true
                            }
                        }
                    }
                });
            }
        }
    }
    destroyPlayer() {
        if (this.dash) {
            this.dash.reset();
            this.dash = null;
        }
    }
    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
        this.destroyPlayer();
    }
}
VgDashDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vgDash]',
                exportAs: 'vgDash',
            },] }
];
/** @nocollapse */
VgDashDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: VgApiService }
];
VgDashDirective.propDecorators = {
    vgDash: [{ type: Input }],
    vgDRMToken: [{ type: Input }],
    vgDRMLicenseServer: [{ type: Input }],
    onGetBitrates: [{ type: Output }]
};

class VgHlsDirective {
    constructor(ref, API) {
        this.ref = ref;
        this.API = API;
        this.vgHlsHeaders = {};
        this.onGetBitrates = new EventEmitter();
        this.subscriptions = [];
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
        this.crossorigin = this.ref.nativeElement.getAttribute('crossorigin');
        this.preload = this.ref.nativeElement.getAttribute('preload') !== 'none';
        this.vgFor = this.ref.nativeElement.getAttribute('vgFor');
        if (this.vgFor) {
            this.target = this.API.getMediaById(this.vgFor);
        }
        else {
            this.target = this.API.getDefaultMedia();
        }
        this.config = {
            autoStartLoad: this.preload,
        };
        // @ts-ignore
        this.config.xhrSetup = (xhr) => {
            // Send cookies
            if (this.crossorigin === 'use-credentials') {
                xhr.withCredentials = true;
            }
            for (const key of Object.keys(this.vgHlsHeaders)) {
                xhr.setRequestHeader(key, this.vgHlsHeaders[key]);
            }
        };
        this.createPlayer();
        if (!this.preload) {
            this.subscriptions.push(this.API.subscriptions.play.subscribe(() => {
                if (this.hls) {
                    this.hls.startLoad(0);
                }
            }));
        }
    }
    ngOnChanges(changes) {
        var _a;
        if ((_a = changes.vgHls) === null || _a === void 0 ? void 0 : _a.currentValue) {
            this.createPlayer();
        }
        else if (changes.vgHlsHeaders && changes.vgHlsHeaders.currentValue) {
            // Do nothing. We don't want to create a or destroy a player if the headers change.
        }
        else {
            this.destroyPlayer();
        }
    }
    createPlayer() {
        if (this.hls) {
            this.destroyPlayer();
        }
        // It's a HLS source
        if (this.vgHls &&
            this.vgHls.indexOf('m3u8') > -1 &&
            Hls.isSupported() &&
            this.API.isPlayerReady) {
            const video = this.ref.nativeElement;
            this.hls = new Hls(this.config);
            // @ts-ignore
            this.hls.on(Hls.Events.MANIFEST_PARSED, (_event, data) => {
                const videoList = [];
                videoList.push({
                    qualityIndex: 0,
                    width: 0,
                    height: 0,
                    bitrate: 0,
                    mediaType: 'video',
                    label: 'AUTO',
                });
                data.levels.forEach((item, index) => {
                    videoList.push({
                        qualityIndex: ++index,
                        width: item.width,
                        height: item.height,
                        bitrate: item.bitrate,
                        mediaType: 'video',
                        label: item.name,
                    });
                });
                this.onGetBitrates.emit(videoList);
            });
            // @ts-ignore
            this.hls.on(Hls.Events.LEVEL_LOADED, (_event, data) => {
                this.target.isLive = data.details.live;
            });
            this.hls.loadSource(this.vgHls);
            this.hls.attachMedia(video);
        }
        else {
            if (this.target && !!this.target.pause) {
                this.target.pause();
                this.target.seekTime(0);
                this.ref.nativeElement.src = this.vgHls;
            }
        }
    }
    setBitrate(bitrate) {
        if (this.hls) {
            this.hls.nextLevel = bitrate.qualityIndex - 1;
        }
    }
    destroyPlayer() {
        if (this.hls) {
            this.hls.destroy();
            this.hls = null;
        }
    }
    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
        this.destroyPlayer();
        delete this.hls;
    }
}
VgHlsDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vgHls]',
                exportAs: 'vgHls',
            },] }
];
/** @nocollapse */
VgHlsDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: VgApiService }
];
VgHlsDirective.propDecorators = {
    vgHls: [{ type: Input }],
    vgHlsHeaders: [{ type: Input }],
    onGetBitrates: [{ type: Output }]
};

class VgStreamingModule {
}
VgStreamingModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, VgCoreModule],
                declarations: [VgDashDirective, VgHlsDirective],
                exports: [VgDashDirective, VgHlsDirective]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { VgDashDirective, VgHlsDirective, VgStreamingModule };
//# sourceMappingURL=videogular-ngx-videogular-streaming.js.map
