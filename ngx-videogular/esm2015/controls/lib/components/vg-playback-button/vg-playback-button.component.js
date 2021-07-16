import { Component, Input, ElementRef, HostListener, ViewEncapsulation, ChangeDetectorRef, } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';
export class VgPlaybackButtonComponent {
    constructor(ref, API, cdr) {
        this.API = API;
        this.cdr = cdr;
        this.subscriptions = [];
        this.ariaValue = 1;
        this.elem = ref.nativeElement;
        this.playbackValues = ['0.5', '1.0', '1.5', '2.0'];
        this.playbackIndex = 1;
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
    onClick() {
        this.updatePlaybackSpeed();
    }
    onKeyDown(event) {
        // On press Enter (13) or Space (32)
        if (event.keyCode === 13 || event.keyCode === 32) {
            event.preventDefault();
            this.updatePlaybackSpeed();
        }
    }
    updatePlaybackSpeed() {
        this.playbackIndex = ++this.playbackIndex % this.playbackValues.length;
        if (this.target instanceof VgApiService) {
            this.target.playbackRate = this.playbackValues[this.playbackIndex];
        }
        else {
            this.target.playbackRate[this.vgFor] = this.playbackValues[this.playbackIndex];
        }
        this.detectChanges();
    }
    getPlaybackRate() {
        this.ariaValue = this.target ? this.target.playbackRate : 1.0;
        return this.ariaValue;
    }
    detectChanges() {
        try {
            this.cdr.detectChanges();
        }
        catch (e) {
            console.warn(e);
        }
    }
    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }
}
VgPlaybackButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'vg-playback-button',
                encapsulation: ViewEncapsulation.None,
                template: ` <span
    class="button"
    tabindex="0"
    role="button"
    aria-label="playback speed button"
    [attr.aria-valuetext]="ariaValue"
  >
    {{ getPlaybackRate() }}x
  </span>`,
                styles: [`
      vg-playback-button {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
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
        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
      }
      vg-playback-button .button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
      }
    `]
            },] }
];
/** @nocollapse */
VgPlaybackButtonComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: VgApiService },
    { type: ChangeDetectorRef }
];
VgPlaybackButtonComponent.propDecorators = {
    vgFor: [{ type: Input }],
    playbackValues: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['click',] }],
    onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};
//# sourceMappingURL=vg-playback-button.component.js.map