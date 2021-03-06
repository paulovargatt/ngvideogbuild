import { ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { VgApiService } from '@videogular/ngx-videogular/core';
import * as ɵngcc0 from '@angular/core';
export declare class VgMuteComponent implements OnInit, OnDestroy {
    API: VgApiService;
    vgFor: string;
    elem: HTMLElement;
    target: any;
    currentVolume: number;
    subscriptions: Subscription[];
    ariaValue: string;
    constructor(ref: ElementRef, API: VgApiService);
    ngOnInit(): void;
    onPlayerReady(): void;
    onClick(): void;
    onKeyDown(event: KeyboardEvent): void;
    changeMuteState(): void;
    getVolume(): any;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<VgMuteComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDeclaration<VgMuteComponent, "vg-mute", never, { "vgFor": "vgFor"; }, {}, never, never>;
}

//# sourceMappingURL=vg-mute.component.d.ts.map