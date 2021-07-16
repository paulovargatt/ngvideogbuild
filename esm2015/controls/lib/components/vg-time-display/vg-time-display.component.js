import { Component, Input, ElementRef, ViewEncapsulation, Pipe, } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';
// Workaround until we can use UTC with Angular Date Pipe
export class VgUtcPipe {
    transform(value, format) {
        let date = new Date(value);
        let result = format;
        let ss = date.getUTCSeconds();
        let mm = date.getUTCMinutes();
        let hh = date.getUTCHours();
        if (ss < 10) {
            ss = '0' + ss;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        if (hh < 10) {
            hh = '0' + hh;
        }
        result = result.replace(/ss/g, ss);
        result = result.replace(/mm/g, mm);
        result = result.replace(/hh/g, hh);
        return result;
    }
}
VgUtcPipe.decorators = [
    { type: Pipe, args: [{ name: 'vgUtc' },] }
];
export class VgTimeDisplayComponent {
    constructor(ref, API) {
        this.API = API;
        this.vgProperty = 'current';
        this.vgFormat = 'mm:ss';
        this.subscriptions = [];
        this.elem = ref.nativeElement;
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
    getTime() {
        let t = 0;
        if (this.target) {
            t = Math.round(this.target.time[this.vgProperty]);
            t = isNaN(t) || this.target.isLive ? 0 : t;
        }
        return t;
    }
    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }
}
VgTimeDisplayComponent.decorators = [
    { type: Component, args: [{
                selector: 'vg-time-display',
                encapsulation: ViewEncapsulation.None,
                template: `
    <span *ngIf="target?.isLive">LIVE</span>
    <span *ngIf="!target?.isLive">{{ getTime() | vgUtc: vgFormat }}</span>
    <ng-content></ng-content>
  `,
                styles: [`
      vg-time-display {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        display: flex;
        justify-content: center;
        height: 50px;
        width: 60px;
        cursor: pointer;
        color: white;
        line-height: 50px;
        pointer-events: none;
        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
      }
    `]
            },] }
];
/** @nocollapse */
VgTimeDisplayComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: VgApiService }
];
VgTimeDisplayComponent.propDecorators = {
    vgFor: [{ type: Input }],
    vgProperty: [{ type: Input }],
    vgFormat: [{ type: Input }]
};
//# sourceMappingURL=vg-time-display.component.js.map