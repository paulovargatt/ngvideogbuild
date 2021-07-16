import { Component, ElementRef, Input, HostListener, ViewEncapsulation, HostBinding, } from '@angular/core';
import { VgControlsHiddenService, VgApiService, VgStates } from '@videogular/ngx-videogular/core';
export class VgScrubBarComponent {
    constructor(ref, API, vgControlsHiddenState) {
        this.API = API;
        this.hideScrubBar = false;
        this.vgSlider = true;
        this.isSeeking = false;
        this.wasPlaying = false;
        this.subscriptions = [];
        this.elem = ref.nativeElement;
        this.subscriptions.push(vgControlsHiddenState.isHidden.subscribe((hide) => this.onHideScrubBar(hide)));
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
    seekStart() {
        if (this.target.canPlay) {
            this.isSeeking = true;
            if (this.target.state === VgStates.VG_PLAYING) {
                this.wasPlaying = true;
            }
            this.target.pause();
        }
    }
    seekMove(offset) {
        if (this.isSeeking) {
            const percentage = Math.max(Math.min((offset * 100) / this.elem.scrollWidth, 99.9), 0);
            this.target.time.current = (percentage * this.target.time.total) / 100;
            this.target.seekTime(percentage, true);
        }
    }
    seekEnd(offset) {
        this.isSeeking = false;
        if (this.target.canPlay) {
            const percentage = Math.max(Math.min((offset * 100) / this.elem.scrollWidth, 99.9), 0);
            this.target.seekTime(percentage, true);
            if (this.wasPlaying) {
                this.wasPlaying = false;
                this.target.play();
            }
        }
    }
    touchEnd() {
        this.isSeeking = false;
        if (this.wasPlaying) {
            this.wasPlaying = false;
            this.target.play();
        }
    }
    getTouchOffset(event) {
        let offsetLeft = 0;
        let element = event.target;
        while (element) {
            offsetLeft += element.offsetLeft;
            element = element.offsetParent;
        }
        return event.touches[0].pageX - offsetLeft;
    }
    onMouseDownScrubBar($event) {
        if (this.target) {
            if (!this.target.isLive) {
                if (!this.vgSlider) {
                    this.seekEnd($event.offsetX);
                }
                else {
                    this.seekStart();
                }
            }
        }
    }
    onMouseMoveScrubBar($event) {
        if (this.target) {
            if (!this.target.isLive && this.vgSlider && this.isSeeking) {
                this.seekMove($event.offsetX);
            }
        }
    }
    onMouseUpScrubBar($event) {
        if (this.target) {
            if (!this.target.isLive && this.vgSlider && this.isSeeking) {
                this.seekEnd($event.offsetX);
            }
        }
    }
    onTouchStartScrubBar($event) {
        if (this.target) {
            if (!this.target.isLive) {
                if (!this.vgSlider) {
                    this.seekEnd(this.getTouchOffset($event));
                }
                else {
                    this.seekStart();
                }
            }
        }
    }
    onTouchMoveScrubBar($event) {
        if (this.target) {
            if (!this.target.isLive && this.vgSlider && this.isSeeking) {
                this.seekMove(this.getTouchOffset($event));
            }
        }
    }
    // @ts-ignore
    onTouchCancelScrubBar(_$event) {
        if (this.target) {
            if (!this.target.isLive && this.vgSlider && this.isSeeking) {
                this.touchEnd();
            }
        }
    }
    // @ts-ignore
    onTouchEndScrubBar(_$event) {
        if (this.target) {
            if (!this.target.isLive && this.vgSlider && this.isSeeking) {
                this.touchEnd();
            }
        }
    }
    arrowAdjustVolume(event) {
        if (this.target) {
            if (event.keyCode === 38 || event.keyCode === 39) {
                event.preventDefault();
                this.target.seekTime((this.target.time.current + 5000) / 1000, false);
            }
            else if (event.keyCode === 37 || event.keyCode === 40) {
                event.preventDefault();
                this.target.seekTime((this.target.time.current - 5000) / 1000, false);
            }
        }
    }
    getPercentage() {
        return this.target
            ? Math.round((this.target.time.current * 100) / this.target.time.total) + '%'
            : '0%';
    }
    onHideScrubBar(hide) {
        this.hideScrubBar = hide;
    }
    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }
}
VgScrubBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'vg-scrub-bar',
                encapsulation: ViewEncapsulation.None,
                template: `
    <div
      class="scrubBar"
      tabindex="0"
      role="slider"
      aria-label="scrub bar"
      aria-level="polite"
      [attr.aria-valuenow]="getPercentage()"
      aria-valuemin="0"
      aria-valuemax="100"
      [attr.aria-valuetext]="getPercentage()"
    >
      <ng-content></ng-content>
    </div>
  `,
                styles: [`
      vg-scrub-bar {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        position: absolute;
        width: 100%;
        height: 5px;
        bottom: 50px;
        margin: 0;
        cursor: pointer;
        align-items: center;
        background: rgba(0, 0, 0, 0.75);
        z-index: 250;
        -webkit-transition: bottom 1s, opacity 0.5s;
        -khtml-transition: bottom 1s, opacity 0.5s;
        -moz-transition: bottom 1s, opacity 0.5s;
        -ms-transition: bottom 1s, opacity 0.5s;
        transition: bottom 1s, opacity 0.5s;
      }
      vg-scrub-bar .scrubBar {
        position: relative;
        display: flex;
        flex-grow: 1;
        align-items: center;
        height: 100%;
      }
      vg-controls vg-scrub-bar {
        position: relative;
        bottom: 0;
        background: transparent;
        height: 50px;
        flex-grow: 1;
        flex-basis: 0;
        margin: 0 10px;
        -webkit-transition: initial;
        -khtml-transition: initial;
        -moz-transition: initial;
        -ms-transition: initial;
        transition: initial;
      }
      vg-scrub-bar.hide {
        bottom: 0;
        opacity: 0;
      }
      vg-controls vg-scrub-bar.hide {
        bottom: initial;
        opacity: initial;
      }
    `]
            },] }
];
/** @nocollapse */
VgScrubBarComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: VgApiService },
    { type: VgControlsHiddenService }
];
VgScrubBarComponent.propDecorators = {
    hideScrubBar: [{ type: HostBinding, args: ['class.hide',] }],
    vgFor: [{ type: Input }],
    vgSlider: [{ type: Input }],
    onMouseDownScrubBar: [{ type: HostListener, args: ['mousedown', ['$event'],] }],
    onMouseMoveScrubBar: [{ type: HostListener, args: ['document:mousemove', ['$event'],] }],
    onMouseUpScrubBar: [{ type: HostListener, args: ['document:mouseup', ['$event'],] }],
    onTouchStartScrubBar: [{ type: HostListener, args: ['touchstart', ['$event'],] }],
    onTouchMoveScrubBar: [{ type: HostListener, args: ['document:touchmove', ['$event'],] }],
    onTouchCancelScrubBar: [{ type: HostListener, args: ['document:touchcancel', ['$event'],] }],
    onTouchEndScrubBar: [{ type: HostListener, args: ['document:touchend', ['$event'],] }],
    arrowAdjustVolume: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};
//# sourceMappingURL=vg-scrub-bar.component.js.map