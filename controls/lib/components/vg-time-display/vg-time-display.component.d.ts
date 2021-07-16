import { ElementRef, OnInit, OnDestroy, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';
import { VgApiService } from '@videogular/ngx-videogular/core';
import * as ɵngcc0 from '@angular/core';
export declare class VgUtcPipe implements PipeTransform {
    transform(value: number, format: string): string;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<VgUtcPipe, never>;
    static ɵpipe: ɵngcc0.ɵɵPipeDeclaration<VgUtcPipe, "vgUtc">;
}
export declare class VgTimeDisplayComponent implements OnInit, OnDestroy {
    API: VgApiService;
    vgFor: string;
    vgProperty: string;
    vgFormat: string;
    elem: HTMLElement;
    target: any;
    subscriptions: Subscription[];
    constructor(ref: ElementRef, API: VgApiService);
    ngOnInit(): void;
    onPlayerReady(): void;
    getTime(): number;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<VgTimeDisplayComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDeclaration<VgTimeDisplayComponent, "vg-time-display", never, { "vgProperty": "vgProperty"; "vgFormat": "vgFormat"; "vgFor": "vgFor"; }, {}, never, ["*"]>;
}

//# sourceMappingURL=vg-time-display.component.d.ts.map