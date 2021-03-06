import { EventEmitter, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';
import { VgMediaDirective } from '../../directives/vg-media/vg-media.directive';
import * as ɵngcc0 from '@angular/core';
export declare class VgFullscreenApiService {
    polyfill: any;
    onchange: string;
    onerror: string;
    nativeFullscreen: boolean;
    isFullscreen: boolean;
    isAvailable: boolean;
    videogularElement: HTMLElement;
    medias: QueryList<VgMediaDirective>;
    fsChangeSubscription: Subscription;
    onChangeFullscreen: EventEmitter<any>;
    constructor();
    init(elem: HTMLElement, medias: QueryList<VgMediaDirective>): void;
    onFullscreenChange(): void;
    toggleFullscreen(element?: any): void;
    request(elem: any): void;
    enterElementInFullScreen(elem: any): void;
    exit(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<VgFullscreenApiService, never>;
}

//# sourceMappingURL=vg-fullscreen-api.service.d.ts.map