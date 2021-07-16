import { Injectable, EventEmitter } from '@angular/core';
import { VgStates } from '../states/vg-states.service';
import * as i0 from "@angular/core";
export class VgApiService {
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
/** @nocollapse */ VgApiService.ɵprov = i0.ɵɵdefineInjectable({ factory: function VgApiService_Factory() { return new VgApiService(); }, token: VgApiService, providedIn: "root" });
VgApiService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
/** @nocollapse */
VgApiService.ctorParameters = () => [];
//# sourceMappingURL=vg-api.service.js.map