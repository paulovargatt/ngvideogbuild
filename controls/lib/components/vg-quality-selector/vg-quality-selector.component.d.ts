import { ElementRef, OnInit, OnDestroy, SimpleChanges, OnChanges, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { VgApiService, BitrateOptions } from '@videogular/ngx-videogular/core';
import * as ɵngcc0 from '@angular/core';
export declare class VgQualitySelectorComponent implements OnInit, OnChanges, OnDestroy {
    API: VgApiService;
    bitrates: BitrateOptions[];
    onBitrateChange: EventEmitter<BitrateOptions>;
    bitrateSelected: BitrateOptions;
    elem: HTMLElement;
    target: any;
    subscriptions: Subscription[];
    ariaValue: string;
    constructor(ref: ElementRef, API: VgApiService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    selectBitrate(index: number): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<VgQualitySelectorComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDeclaration<VgQualitySelectorComponent, "vg-quality-selector", never, { "bitrates": "bitrates"; }, { "onBitrateChange": "onBitrateChange"; }, never, never>;
}

//# sourceMappingURL=vg-quality-selector.component.d.ts.map