import { Component, Input, ElementRef, HostListener, ViewEncapsulation, ViewChild, } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';
export class VgVolumeComponent {
    constructor(ref, API) {
        this.API = API;
        this.subscriptions = [];
        this.elem = ref.nativeElement;
        this.isDragging = false;
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
        this.ariaValue = this.getVolume() * 100;
    }
    onClick(event) {
        this.setVolume(this.calculateVolume(event.clientX));
    }
    onMouseDown(event) {
        this.mouseDownPosX = event.clientX;
        this.isDragging = true;
    }
    onDrag(event) {
        if (this.isDragging) {
            this.setVolume(this.calculateVolume(event.clientX));
        }
    }
    onStopDrag(event) {
        if (this.isDragging) {
            this.isDragging = false;
            if (this.mouseDownPosX === event.clientX) {
                this.setVolume(this.calculateVolume(event.clientX));
            }
        }
    }
    arrowAdjustVolume(event) {
        if (event.keyCode === 38 || event.keyCode === 39) {
            event.preventDefault();
            this.setVolume(Math.max(0, Math.min(100, this.getVolume() * 100 + 10)));
        }
        else if (event.keyCode === 37 || event.keyCode === 40) {
            event.preventDefault();
            this.setVolume(Math.max(0, Math.min(100, this.getVolume() * 100 - 10)));
        }
    }
    calculateVolume(mousePosX) {
        const recObj = this.volumeBarRef.nativeElement.getBoundingClientRect();
        const volumeBarOffsetLeft = recObj.left;
        const volumeBarWidth = recObj.width;
        return ((mousePosX - volumeBarOffsetLeft) / volumeBarWidth) * 100;
    }
    setVolume(vol) {
        this.target.volume = Math.max(0, Math.min(1, vol / 100));
        this.ariaValue = this.target.volume * 100;
    }
    getVolume() {
        return this.target ? this.target.volume : 0;
    }
    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }
}
VgVolumeComponent.decorators = [
    { type: Component, args: [{
                selector: 'vg-volume',
                encapsulation: ViewEncapsulation.None,
                template: `
    <div
      #volumeBar
      class="volumeBar"
      tabindex="0"
      role="slider"
      aria-label="volume level"
      aria-level="polite"
      [attr.aria-valuenow]="ariaValue"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-orientation="horizontal"
      [attr.aria-valuetext]="ariaValue + '%'"
      (click)="onClick($event)"
      (mousedown)="onMouseDown($event)"
    >
      <div class="volumeBackground" [ngClass]="{ dragging: isDragging }">
        <div
          class="volumeValue"
          [style.width]="getVolume() * (100 - 15) + '%'"
        ></div>
        <div
          class="volumeKnob"
          [style.left]="getVolume() * (100 - 15) + '%'"
        ></div>
      </div>
    </div>
  `,
                styles: [`
      vg-volume {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        display: flex;
        justify-content: center;
        height: 50px;
        width: 100px;
        cursor: pointer;
        color: white;
        line-height: 50px;
      }
      vg-volume .volumeBar {
        position: relative;
        display: flex;
        flex-grow: 1;
        align-items: center;
      }
      vg-volume .volumeBackground {
        display: flex;
        flex-grow: 1;
        height: 5px;
        pointer-events: none;
        background-color: #333;
      }
      vg-volume .volumeValue {
        display: flex;
        height: 5px;
        pointer-events: none;
        background-color: #fff;
        transition: all 0.2s ease-out;
      }
      vg-volume .volumeKnob {
        position: absolute;
        width: 15px;
        height: 15px;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 15px;
        pointer-events: none;
        background-color: #fff;
        transition: all 0.2s ease-out;
      }
      vg-volume .volumeBackground.dragging .volumeValue,
      vg-volume .volumeBackground.dragging .volumeKnob {
        transition: none;
      }
    `]
            },] }
];
/** @nocollapse */
VgVolumeComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: VgApiService }
];
VgVolumeComponent.propDecorators = {
    vgFor: [{ type: Input }],
    volumeBarRef: [{ type: ViewChild, args: ['volumeBar', { static: true },] }],
    onDrag: [{ type: HostListener, args: ['document:mousemove', ['$event'],] }],
    onStopDrag: [{ type: HostListener, args: ['document:mouseup', ['$event'],] }],
    arrowAdjustVolume: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};
//# sourceMappingURL=vg-volume.component.js.map