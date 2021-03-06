import { ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { VgApiService } from '@videogular/ngx-videogular/core';
import * as ɵngcc0 from '@angular/core';
export interface Option {
    id: string;
    label: string;
    selected: boolean;
}
export declare class VgTrackSelectorComponent implements OnInit, OnDestroy {
    API: VgApiService;
    vgFor: string;
    elem: HTMLElement;
    target: any;
    tracks: Array<Option>;
    trackSelected: string;
    subscriptions: Subscription[];
    ariaValue: string;
    constructor(ref: ElementRef, API: VgApiService);
    ngOnInit(): void;
    onPlayerReady(): void;
    selectTrack(trackId: string): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<VgTrackSelectorComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDeclaration<VgTrackSelectorComponent, "vg-track-selector", never, { "vgFor": "vgFor"; }, {}, never, never>;
}

//# sourceMappingURL=vg-track-selector.component.d.ts.map