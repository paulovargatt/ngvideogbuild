import { ElementRef, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { VgApiService } from '@videogular/ngx-videogular/core';
import * as ɵngcc0 from '@angular/core';
export declare class VgPlaybackButtonComponent implements OnInit, OnDestroy {
    API: VgApiService;
    cdr: ChangeDetectorRef;
    vgFor: string;
    elem: HTMLElement;
    target: any;
    playbackValues: Array<string>;
    playbackIndex: number;
    subscriptions: Subscription[];
    ariaValue: number;
    constructor(ref: ElementRef, API: VgApiService, cdr: ChangeDetectorRef);
    ngOnInit(): void;
    onPlayerReady(): void;
    onClick(): void;
    onKeyDown(event: KeyboardEvent): void;
    updatePlaybackSpeed(): void;
    getPlaybackRate(): number;
    detectChanges(): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<VgPlaybackButtonComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDeclaration<VgPlaybackButtonComponent, "vg-playback-button", never, { "playbackValues": "playbackValues"; "vgFor": "vgFor"; }, {}, never, never>;
}

//# sourceMappingURL=vg-playback-button.component.d.ts.map