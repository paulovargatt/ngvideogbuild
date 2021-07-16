import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { VgApiService, VgFullscreenApiService } from '@videogular/ngx-videogular/core';
import * as ɵngcc0 from '@angular/core';
export declare class VgFullscreenComponent implements OnInit, OnDestroy {
    API: VgApiService;
    fsAPI: VgFullscreenApiService;
    elem: HTMLElement;
    vgFor: string;
    target: Object;
    isFullscreen: boolean;
    subscriptions: Subscription[];
    ariaValue: string;
    constructor(ref: ElementRef, API: VgApiService, fsAPI: VgFullscreenApiService);
    ngOnInit(): void;
    onPlayerReady(): void;
    onChangeFullscreen(fsState: boolean): void;
    onClick(): void;
    onKeyDown(event: KeyboardEvent): void;
    changeFullscreenState(): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<VgFullscreenComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDeclaration<VgFullscreenComponent, "vg-fullscreen", never, {}, {}, never, never>;
}

//# sourceMappingURL=vg-fullscreen.component.d.ts.map