import { Component, ElementRef, HostListener, ViewEncapsulation, } from '@angular/core';
import { VgApiService, VgFullscreenApiService } from '@videogular/ngx-videogular/core';
export class VgFullscreenComponent {
    constructor(ref, API, fsAPI) {
        this.API = API;
        this.fsAPI = fsAPI;
        this.isFullscreen = false;
        this.subscriptions = [];
        this.ariaValue = 'normal mode';
        this.elem = ref.nativeElement;
        this.subscriptions.push(this.fsAPI.onChangeFullscreen.subscribe(this.onChangeFullscreen.bind(this)));
    }
    ngOnInit() {
        if (this.API.isPlayerReady) {
            this.onPlayerReady();
        }
        else {
            this.subscriptions.push(this.API.playerReadyEvent.subscribe(() => this.onPlayerReady()));
        }
    }
    onPlayerReady() {
        this.target = this.API.getMediaById(this.vgFor);
    }
    onChangeFullscreen(fsState) {
        this.ariaValue = fsState ? 'fullscreen mode' : 'normal mode';
        this.isFullscreen = fsState;
    }
    onClick() {
        this.changeFullscreenState();
    }
    onKeyDown(event) {
        // On press Enter (13) or Space (32)
        if (event.keyCode === 13 || event.keyCode === 32) {
            event.preventDefault();
            this.changeFullscreenState();
        }
    }
    changeFullscreenState() {
        let element = this.target;
        if (this.target instanceof VgApiService) {
            element = null;
        }
        this.fsAPI.toggleFullscreen(element);
    }
    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }
}
VgFullscreenComponent.decorators = [
    { type: Component, args: [{
                selector: 'vg-fullscreen',
                encapsulation: ViewEncapsulation.None,
                template: ` <div
    class="icon"
    [class.vg-icon-fullscreen]="!isFullscreen"
    [class.vg-icon-fullscreen_exit]="isFullscreen"
    tabindex="0"
    role="button"
    aria-label="fullscreen button"
    [attr.aria-valuetext]="ariaValue"
  ></div>`,
                styles: [`
      vg-fullscreen {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        display: flex;
        justify-content: center;
        height: 50px;
        width: 50px;
        cursor: pointer;
        color: white;
        line-height: 50px;
      }
      vg-fullscreen .icon {
        pointer-events: none;
      }
    `]
            },] }
];
/** @nocollapse */
VgFullscreenComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: VgApiService },
    { type: VgFullscreenApiService }
];
VgFullscreenComponent.propDecorators = {
    onClick: [{ type: HostListener, args: ['click',] }],
    onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};
//# sourceMappingURL=vg-fullscreen.component.js.map