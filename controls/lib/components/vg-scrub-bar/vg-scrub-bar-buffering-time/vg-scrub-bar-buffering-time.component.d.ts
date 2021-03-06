import { ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { VgApiService } from '@videogular/ngx-videogular/core';
import * as ɵngcc0 from '@angular/core';
export declare class VgScrubBarBufferingTimeComponent implements OnInit, OnDestroy {
    API: VgApiService;
    vgFor: string;
    elem: HTMLElement;
    target: any;
    subscriptions: Subscription[];
    constructor(ref: ElementRef, API: VgApiService);
    ngOnInit(): void;
    onPlayerReady(): void;
    getBufferTime(): string;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<VgScrubBarBufferingTimeComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDeclaration<VgScrubBarBufferingTimeComponent, "vg-scrub-bar-buffering-time", never, { "vgFor": "vgFor"; }, {}, never, never>;
}

//# sourceMappingURL=vg-scrub-bar-buffering-time.component.d.ts.map