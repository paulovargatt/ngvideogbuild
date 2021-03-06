import { ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { VgApiService } from '@videogular/ngx-videogular/core';
import * as ɵngcc0 from '@angular/core';
export declare class VgPlayPauseComponent implements OnInit, OnDestroy {
    API: VgApiService;
    vgFor: string;
    elem: HTMLElement;
    target: any;
    subscriptions: Subscription[];
    ariaValue: string;
    constructor(ref: ElementRef, API: VgApiService);
    ngOnInit(): void;
    onPlayerReady(): void;
    onClick(): void;
    onKeyDown(event: KeyboardEvent): void;
    playPause(): void;
    getState(): string;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<VgPlayPauseComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDeclaration<VgPlayPauseComponent, "vg-play-pause", never, { "vgFor": "vgFor"; }, {}, never, never>;
}

//# sourceMappingURL=vg-play-pause.component.d.ts.map