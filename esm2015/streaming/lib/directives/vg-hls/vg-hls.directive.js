import { Directive, Input, Output, EventEmitter, ElementRef, } from '@angular/core';
import { VgApiService, } from '@videogular/ngx-videogular/core';
export class VgHlsDirective {
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
//# sourceMappingURL=vg-hls.directive.js.map