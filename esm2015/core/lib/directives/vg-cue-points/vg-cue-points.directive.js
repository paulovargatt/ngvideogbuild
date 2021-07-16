import { Directive, Output, EventEmitter, ElementRef, } from '@angular/core';
import { fromEvent } from 'rxjs';
import { VgEvents } from '../../services/events/vg-events.service';
export class VgCuePointsDirective {
    constructor(ref) {
        this.ref = ref;
        this.onEnterCuePoint = new EventEmitter();
        this.onUpdateCuePoint = new EventEmitter();
        this.onExitCuePoint = new EventEmitter();
        this.onCompleteCuePoint = new EventEmitter();
        this.subscriptions = [];
        this.cuesSubscriptions = [];
        this.totalCues = 0;
    }
    ngOnInit() {
        this.onLoad$ = fromEvent(this.ref.nativeElement, VgEvents.VG_LOAD);
        this.subscriptions.push(this.onLoad$.subscribe(this.onLoad.bind(this)));
    }
    onLoad(event) {
        const cues = event.target.track.cues;
        this.ref.nativeElement.cues = cues;
        this.updateCuePoints(cues);
    }
    updateCuePoints(cues) {
        this.cuesSubscriptions.forEach((s) => s.unsubscribe());
        for (let i = 0, l = cues.length; i < l; i++) {
            this.onEnter$ = fromEvent(cues[i], VgEvents.VG_ENTER);
            this.cuesSubscriptions.push(this.onEnter$.subscribe(this.onEnter.bind(this)));
            this.onExit$ = fromEvent(cues[i], VgEvents.VG_EXIT);
            this.cuesSubscriptions.push(this.onExit$.subscribe(this.onExit.bind(this)));
        }
    }
    onEnter(event) {
        this.onEnterCuePoint.emit(event.target);
    }
    onExit(event) {
        this.onExitCuePoint.emit(event.target);
    }
    ngDoCheck() {
        if (this.ref.nativeElement.track && this.ref.nativeElement.track.cues) {
            const changes = this.totalCues !== this.ref.nativeElement.track.cues.length;
            if (changes) {
                this.totalCues = this.ref.nativeElement.track.cues.length;
                this.ref.nativeElement.cues = this.ref.nativeElement.track.cues;
                this.updateCuePoints(this.ref.nativeElement.track.cues);
            }
        }
    }
    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }
}
VgCuePointsDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vgCuePoints]',
            },] }
];
/** @nocollapse */
VgCuePointsDirective.ctorParameters = () => [
    { type: ElementRef }
];
VgCuePointsDirective.propDecorators = {
    onEnterCuePoint: [{ type: Output }],
    onUpdateCuePoint: [{ type: Output }],
    onExitCuePoint: [{ type: Output }],
    onCompleteCuePoint: [{ type: Output }]
};
//# sourceMappingURL=vg-cue-points.directive.js.map