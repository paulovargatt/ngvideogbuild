import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPlayable, VgApiService } from '@videogular/ngx-videogular/core';
import * as ɵngcc0 from '@angular/core';
export declare class VgBufferingComponent implements OnInit, OnDestroy {
    API: VgApiService;
    vgFor: string;
    elem: HTMLElement;
    target: IPlayable;
    checkInterval: number;
    currentPlayPos: number;
    lastPlayPos: number;
    subscriptions: Subscription[];
    isBuffering: boolean;
    constructor(ref: ElementRef, API: VgApiService);
    ngOnInit(): void;
    onPlayerReady(): void;
    onUpdateBuffer(isBuffering: any): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<VgBufferingComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDeclaration<VgBufferingComponent, "vg-buffering", never, { "vgFor": "vgFor"; }, {}, never, never>;
}

//# sourceMappingURL=vg-buffering.component.d.ts.map