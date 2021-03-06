import { ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { VgControlsHiddenService, VgApiService } from '@videogular/ngx-videogular/core';
import * as ɵngcc0 from '@angular/core';
export declare class VgScrubBarComponent implements OnInit, OnDestroy {
    API: VgApiService;
    hideScrubBar: boolean;
    vgFor: string;
    vgSlider: boolean;
    elem: HTMLElement;
    target: any;
    isSeeking: boolean;
    wasPlaying: boolean;
    subscriptions: Subscription[];
    constructor(ref: ElementRef, API: VgApiService, vgControlsHiddenState: VgControlsHiddenService);
    ngOnInit(): void;
    onPlayerReady(): void;
    protected seekStart(): void;
    protected seekMove(offset: number): void;
    protected seekEnd(offset: number): void;
    protected touchEnd(): void;
    protected getTouchOffset(event: any): number;
    onMouseDownScrubBar($event: any): void;
    onMouseMoveScrubBar($event: any): void;
    onMouseUpScrubBar($event: any): void;
    onTouchStartScrubBar($event: any): void;
    onTouchMoveScrubBar($event: any): void;
    onTouchCancelScrubBar(_$event: any): void;
    onTouchEndScrubBar(_$event: any): void;
    arrowAdjustVolume(event: KeyboardEvent): void;
    getPercentage(): string;
    onHideScrubBar(hide: boolean): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<VgScrubBarComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDeclaration<VgScrubBarComponent, "vg-scrub-bar", never, { "vgSlider": "vgSlider"; "vgFor": "vgFor"; }, {}, never, ["*"]>;
}

//# sourceMappingURL=vg-scrub-bar.component.d.ts.map