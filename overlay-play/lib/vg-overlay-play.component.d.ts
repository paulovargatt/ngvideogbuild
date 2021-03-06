import { OnInit, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { VgApiService, VgFullscreenApiService, VgControlsHiddenService } from '@videogular/ngx-videogular/core';
import * as ɵngcc0 from '@angular/core';
export declare class VgOverlayPlayComponent implements OnInit, OnDestroy {
    API: VgApiService;
    fsAPI: VgFullscreenApiService;
    private controlsHidden;
    vgFor: string;
    vgSkipIfControlsHidden: boolean;
    vgSkipIfControlsHiddenDelay: number;
    elem: HTMLElement;
    target: any;
    isNativeFullscreen: boolean;
    areControlsHidden: boolean;
    areControlsHiddenChangeTime: number;
    subscriptions: Subscription[];
    isBuffering: boolean;
    constructor(ref: ElementRef, API: VgApiService, fsAPI: VgFullscreenApiService, controlsHidden: VgControlsHiddenService);
    ngOnInit(): void;
    onPlayerReady(): void;
    onUpdateBuffer(isBuffering: any): void;
    onChangeFullscreen(fsState: boolean): void;
    onHideControls(hidden: boolean): void;
    onClick(): void;
    getState(): string;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<VgOverlayPlayComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDeclaration<VgOverlayPlayComponent, "vg-overlay-play", never, { "vgSkipIfControlsHidden": "vgSkipIfControlsHidden"; "vgSkipIfControlsHiddenDelay": "vgSkipIfControlsHiddenDelay"; "vgFor": "vgFor"; }, {}, never, never>;
}

//# sourceMappingURL=vg-overlay-play.component.d.ts.map