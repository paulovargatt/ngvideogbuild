import { EventEmitter, Component, ViewEncapsulation, ElementRef, Input, Output, HostBinding, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VgEvents, VgApiService, VgFullscreenApiService, VgCoreModule } from '@videogular/ngx-videogular/core';

class VgImaAdsComponent {
    constructor(ref, API, fsAPI) {
        this.API = API;
        this.fsAPI = fsAPI;
        this.vgSkipButtonLocale = 'en';
        this.onAdStart = new EventEmitter();
        this.onAdStop = new EventEmitter();
        this.onSkipAd = new EventEmitter();
        this.isFullscreen = false;
        this.subscriptions = [];
        this.displayState = 'none';
        this.elem = ref.nativeElement;
        this.onContentEnded = this.onContentEnded.bind(this);
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
        if (typeof google === 'undefined') {
            this.onMissingGoogleImaLoader();
            return;
        }
        this.target = this.API.getMediaById(this.vgFor);
        this.initializations();
        this.subscriptions.push(this.target.subscriptions.ended.subscribe(this.onContentEnded.bind(this)));
        this.subscriptions.push(this.target.subscriptions.play.subscribe(this.onUpdateState.bind(this)));
        this.subscriptions.push(this.fsAPI.onChangeFullscreen.subscribe(this.onChangeFullscreen.bind(this)));
        this.ima.adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this.onAdsManagerLoaded.bind(this), false);
        this.ima.adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdError.bind(this), false);
        this.loadAds();
    }
    initializations() {
        this.ima = new Ima(this.elem, this.vgSkipButtonLocale);
        if (this.vgSkipButton) {
            this.skipButton = document.querySelector(this.vgSkipButton);
            this.skipButton.style.display = 'none';
            this.skipButton.addEventListener('click', this.onClickSkip.bind(this));
            this.elem.insertBefore(this.skipButton, this.elem.firstChild);
        }
        window.addEventListener('resize', () => {
            const w = this.API.videogularElement.offsetWidth;
            const h = this.API.videogularElement.offsetHeight;
            if (this.ima.adsManager) {
                if (this.isFullscreen) {
                    this.ima.adsManager.resize(w, h, google.ima.ViewMode.FULLSCREEN);
                }
                else {
                    this.ima.adsManager.resize(w, h, google.ima.ViewMode.NORMAL);
                }
            }
        });
    }
    loadAds() {
        if (this.vgCompanion) {
            googletag.cmd.push(() => {
                const adUnitPath = '/' + this.vgNetwork + '/' + this.vgUnitPath;
                const slot = googletag.defineSlot(adUnitPath, this.vgCompanionSize, this.vgCompanion);
                if (slot) {
                    slot.addService(googletag.companionAds());
                    slot.addService(googletag.pubads());
                    googletag.companionAds().setRefreshUnfilledSlots(true);
                    googletag.pubads().enableVideoAds();
                    googletag.enableServices();
                }
            });
        }
    }
    onUpdateState(event) {
        switch (event.type) {
            case VgEvents.VG_PLAY:
                if (!this.ima.adsLoaded) {
                    this.API.pause();
                    this.ima.adDisplayContainer.initialize();
                    this.requestAds(this.vgAdTagUrl);
                    this.ima.adsLoaded = true;
                }
                break;
        }
    }
    requestAds(adTagUrl) {
        // Show only to get computed style in pixels
        this.show();
        const adsRequest = new google.ima.AdsRequest();
        const computedStyle = window.getComputedStyle(this.elem);
        adsRequest.adTagUrl = adTagUrl;
        adsRequest.linearAdSlotWidth = parseInt(computedStyle.width, 10);
        adsRequest.linearAdSlotHeight = parseInt(computedStyle.height, 10);
        adsRequest.nonLinearAdSlotWidth = parseInt(computedStyle.width, 10);
        adsRequest.nonLinearAdSlotHeight = parseInt(computedStyle.height, 10);
        this.ima.adsLoader.requestAds(adsRequest);
    }
    onAdsManagerLoaded(evt) {
        this.show();
        this.ima.adsManager = evt.getAdsManager(this.target);
        this.processAdsManager(this.ima.adsManager);
    }
    // @ts-ignore
    processAdsManager(adsManager) {
        const w = this.API.videogularElement.offsetWidth;
        const h = this.API.videogularElement.offsetHeight;
        // Attach the pause/resume events.
        this.ima.adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, this.onContentPauseRequested.bind(this), false);
        this.ima.adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, this.onContentResumeRequested.bind(this), false);
        this.ima.adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED, this.onSkippableStateChanged.bind(this), false);
        this.ima.adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, this.onAllAdsComplete.bind(this), false);
        this.ima.adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, this.onAdComplete.bind(this), false);
        this.ima.adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdError.bind(this), false);
        this.ima.adsManager.init(w, h, google.ima.ViewMode.NORMAL);
        this.ima.adsManager.start();
    }
    onSkippableStateChanged() {
        const isSkippable = this.ima.adsManager.getAdSkippableState();
        if (isSkippable) {
            this.skipButton.style.display = 'block';
        }
        else {
            this.skipButton.style.display = 'none';
        }
    }
    onClickSkip() {
        this.ima.adsManager.skip();
        this.onSkipAd.emit(true);
    }
    onContentPauseRequested() {
        this.show();
        this.API.pause();
        this.onAdStop.emit(true);
    }
    onContentResumeRequested() {
        this.API.play();
        this.onAdStart.emit(true);
        this.hide();
    }
    // @ts-ignore
    onAdError(evt) {
        if (this.ima.adsManager) {
            this.ima.adsManager.destroy();
        }
        this.hide();
        this.API.play();
        this.onAdStop.emit(true);
    }
    onAllAdsComplete() {
        this.hide();
        // The last ad was a post-roll
        if (this.ima.adsManager.getCuePoints().join().indexOf('-1') >= 0) {
            this.API.pause(); // it was stop() in Videogular v1
            this.onAdStop.emit(true);
        }
    }
    onAdComplete() {
        // TODO: Update view with current ad count
        this.ima.currentAd++;
        this.onAdStop.emit(true);
    }
    show() {
        window.dispatchEvent(new CustomEvent(VgEvents.VG_START_ADS));
        this.displayState = 'block';
    }
    hide() {
        window.dispatchEvent(new CustomEvent(VgEvents.VG_END_ADS));
        this.displayState = 'none';
    }
    onContentEnded() {
        this.ima.adsLoader.contentComplete();
        this.onAdStop.emit(true);
    }
    onChangeFullscreen(fsState) {
        if (!this.fsAPI.nativeFullscreen) {
            this.isFullscreen = fsState;
        }
    }
    onMissingGoogleImaLoader() {
        this.hide();
        this.API.play();
    }
    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }
}
VgImaAdsComponent.decorators = [
    { type: Component, args: [{
                selector: 'vg-ima-ads',
                encapsulation: ViewEncapsulation.None,
                template: `<div class="vg-ima-ads"></div>`,
                styles: [`
      vg-ima-ads {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 300;
      }
      vg-ima-ads .vg-ima-ads {
        position: absolute;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }
    `]
            },] }
];
/** @nocollapse */
VgImaAdsComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: VgApiService },
    { type: VgFullscreenApiService }
];
VgImaAdsComponent.propDecorators = {
    vgFor: [{ type: Input }],
    vgNetwork: [{ type: Input }],
    vgUnitPath: [{ type: Input }],
    vgCompanion: [{ type: Input }],
    vgCompanionSize: [{ type: Input }],
    vgAdTagUrl: [{ type: Input }],
    vgSkipButton: [{ type: Input }],
    vgSkipButtonLocale: [{ type: Input }],
    onAdStart: [{ type: Output }],
    onAdStop: [{ type: Output }],
    onSkipAd: [{ type: Output }],
    displayState: [{ type: HostBinding, args: ['style.display',] }]
};
class Ima {
    constructor(imaAdsElement, imaSkipButtonLocale) {
        if (!!(google === null || google === void 0 ? void 0 : google.ima['settings']) && imaSkipButtonLocale) {
            google.ima['settings'].setLocale(imaSkipButtonLocale);
        }
        this.adDisplayContainer = new google.ima.AdDisplayContainer(imaAdsElement);
        this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);
        this.adsManager = null;
        this.adsLoaded = false;
        this.currentAd = 0;
    }
}

class VgImaAdsModule {
}
VgImaAdsModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, VgCoreModule],
                declarations: [VgImaAdsComponent],
                exports: [VgImaAdsComponent],
            },] }
];

// export './lib/google.ima';

/**
 * Generated bundle index. Do not edit.
 */

export { Ima, VgImaAdsComponent, VgImaAdsModule };
//# sourceMappingURL=videogular-ngx-videogular-ima-ads.js.map
