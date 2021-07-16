import { OnInit, OnChanges, OnDestroy, EventEmitter, ElementRef, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { IDRMLicenseServer, BitrateOptions, VgApiService } from '@videogular/ngx-videogular/core';
import * as ɵngcc0 from '@angular/core';
export declare class VgDashDirective implements OnInit, OnChanges, OnDestroy {
    private ref;
    API: VgApiService;
    vgDash: string;
    vgDRMToken: string;
    vgDRMLicenseServer: IDRMLicenseServer;
    onGetBitrates: EventEmitter<BitrateOptions[]>;
    vgFor: string;
    target: any;
    dash: any;
    subscriptions: Subscription[];
    constructor(ref: ElementRef, API: VgApiService);
    ngOnInit(): void;
    onPlayerReady(): void;
    ngOnChanges(changes: SimpleChanges): void;
    createPlayer(): void;
    setBitrate({ mediaType, qualityIndex }: BitrateOptions): void;
    destroyPlayer(): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<VgDashDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDeclaration<VgDashDirective, "[vgDash]", ["vgDash"], { "vgDash": "vgDash"; "vgDRMToken": "vgDRMToken"; "vgDRMLicenseServer": "vgDRMLicenseServer"; }, { "onGetBitrates": "onGetBitrates"; }, never>;
}

//# sourceMappingURL=vg-dash.directive.d.ts.map