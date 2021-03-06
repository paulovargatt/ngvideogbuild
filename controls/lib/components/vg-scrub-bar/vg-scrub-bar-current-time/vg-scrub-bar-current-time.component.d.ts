import { ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { VgApiService } from '@videogular/ngx-videogular/core';
import * as ɵngcc0 from '@angular/core';
export declare class VgScrubBarCurrentTimeComponent implements OnInit, OnDestroy {
    API: VgApiService;
    vgFor: string;
    vgSlider: boolean;
    elem: HTMLElement;
    target: any;
    subscriptions: Subscription[];
    constructor(ref: ElementRef, API: VgApiService);
    ngOnInit(): void;
    onPlayerReady(): void;
    getPercentage(): string;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<VgScrubBarCurrentTimeComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDeclaration<VgScrubBarCurrentTimeComponent, "vg-scrub-bar-current-time", never, { "vgSlider": "vgSlider"; "vgFor": "vgFor"; }, {}, never, never>;
}

//# sourceMappingURL=vg-scrub-bar-current-time.component.d.ts.map