import { OnInit, OnChanges, OnDestroy, EventEmitter, ElementRef, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { IHLSConfig, BitrateOptions, VgApiService } from '@videogular/ngx-videogular/core';
import * as ɵngcc0 from '@angular/core';
export declare class VgHlsDirective implements OnInit, OnChanges, OnDestroy {
    private ref;
    API: VgApiService;
    vgHls: string;
    vgHlsHeaders: {
        [key: string]: string;
    };
    onGetBitrates: EventEmitter<BitrateOptions[]>;
    vgFor: string;
    target: any;
    hls: any;
    preload: boolean;
    crossorigin: string;
    config: IHLSConfig;
    subscriptions: Subscription[];
    constructor(ref: ElementRef, API: VgApiService);
    ngOnInit(): void;
    onPlayerReady(): void;
    ngOnChanges(changes: SimpleChanges): void;
    createPlayer(): void;
    setBitrate(bitrate: BitrateOptions): void;
    destroyPlayer(): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<VgHlsDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDeclaration<VgHlsDirective, "[vgHls]", ["vgHls"], { "vgHlsHeaders": "vgHlsHeaders"; "vgHls": "vgHls"; }, { "onGetBitrates": "onGetBitrates"; }, never>;
}

//# sourceMappingURL=vg-hls.directive.d.ts.map