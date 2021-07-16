import { IMediaElement } from '../../interfaces/i-media-element.interface';
import { AudioTrackList, VideoTrackList } from '../../interfaces/deprecated-tracks-types.interface';
import { MSMediaKeyNeededEvent } from '../../interfaces/deprecated-event-types.interface';
export declare class VgMediaElement implements IMediaElement {
    id: string;
    elem: any;
    get audioTracks(): AudioTrackList;
    autoplay: boolean;
    buffered: TimeRanges;
    controls: boolean;
    crossOrigin: string | any;
    currentSrc: string;
    currentTime: number;
    defaultMuted: boolean;
    defaultPlaybackRate: number;
    duration: number;
    ended: boolean;
    error: MediaError;
    loop: boolean;
    mediaKeys: MediaKeys | any;
    msAudioCategory: string;
    msAudioDeviceType: string;
    msGraphicsTrustStatus: MSGraphicsTrust;
    msKeys: MSMediaKeys;
    msPlayToDisabled: boolean;
    msPlayToPreferredSourceUri: string;
    msPlayToPrimary: boolean;
    msPlayToSource: any;
    msRealTime: boolean;
    muted: boolean;
    networkState: number;
    onencrypted: (ev: MediaEncryptedEvent) => any;
    onmsneedkey: (ev: MSMediaKeyNeededEvent) => any;
    paused: boolean;
    playbackRate: number;
    played: TimeRanges;
    preload: string;
    readyState: number;
    seekable: TimeRanges;
    seeking: boolean;
    src: string;
    srcObject: MediaStream | any;
    textTracks: TextTrackList;
    videoTracks: VideoTrackList;
    volume: number;
    HAVE_CURRENT_DATA: number;
    HAVE_ENOUGH_DATA: number;
    HAVE_FUTURE_DATA: number;
    HAVE_METADATA: number;
    HAVE_NOTHING: number;
    NETWORK_EMPTY: number;
    NETWORK_IDLE: number;
    NETWORK_LOADING: number;
    NETWORK_NO_SOURCE: number;
    addTextTrack(kind: string, label?: string, language?: string): TextTrack;
    canPlayType(type: string): string;
    load(): void;
    msClearEffects(): void;
    msGetAsCastingSource(): any;
    msInsertAudioEffect(_activatableClassId: string, _effectRequired: boolean, _config?: any): void;
    msSetMediaKeys(mediaKeys: MSMediaKeys): void;
    msSetMediaProtectionManager(mediaProtectionManager?: any): void;
    pause(): void;
    play(): Promise<any>;
    setMediaKeys(mediaKeys: MediaKeys | any): Promise<void>;
    addEventListener(_type: string, _listener: EventListenerOrEventListenerObject, _useCapture?: boolean): void;
}
