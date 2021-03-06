import { OnInit, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { VgApiService, VgControlsHiddenService } from '@videogular/ngx-videogular/core';
import * as ɵngcc0 from '@angular/core';
export declare class VgControlsComponent implements OnInit, AfterViewInit, OnDestroy {
    private API;
    private hidden;
    elem: HTMLElement;
    target: any;
    isAdsPlaying: string;
    hideControls: boolean;
    vgFor: string;
    vgAutohide: boolean;
    vgAutohideTime: number;
    private timer;
    mouseMove$: Observable<any>;
    touchStart$: Observable<any>;
    mouseClick$: Observable<any>;
    subscriptions: Subscription[];
    constructor(API: VgApiService, ref: ElementRef, hidden: VgControlsHiddenService);
    ngOnInit(): void;
    onPlayerReady(): void;
    ngAfterViewInit(): void;
    onPlay(): void;
    onPause(): void;
    onStartAds(): void;
    onEndAds(): void;
    hide(): void;
    show(): void;
    private hideAsync;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<VgControlsComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDeclaration<VgControlsComponent, "vg-controls", never, { "vgAutohide": "vgAutohide"; "vgAutohideTime": "vgAutohideTime"; "vgFor": "vgFor"; }, {}, never, ["*"]>;
}

//# sourceMappingURL=vg-controls.component.d.ts.map