(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@videogular/ngx-videogular/modulo', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.videogular = global.videogular || {}, global.videogular['ngx-videogular'] = global.videogular['ngx-videogular'] || {}, global.videogular['ngx-videogular'].modulo = {}), global.ng.core, global.ng.common));
}(this, (function (exports, core, common) { 'use strict';

    var AudioContext = window["AudioContext"] || window["webkitAudioContext"];
    var Gondolo = /** @class */ (function () {
        function Gondolo(audio, ctx, opts) {
            if (!(this instanceof Gondolo)) {
                return new Gondolo(audio, ctx, opts);
            }
            if (!(ctx instanceof AudioContext)) {
                (opts = ctx), (ctx = null);
            }
            opts = opts || {};
            this.ctx = ctx = ctx || new AudioContext();
            if (!(audio instanceof AudioNode)) {
                audio =
                    audio instanceof Audio || audio instanceof HTMLAudioElement
                        ? ctx.createMediaElementSource(audio)
                        : ctx.createMediaStreamSource(audio);
            }
            this.audioConfigStateResolver(ctx, opts, audio);
            this.audioConfigStateParser(ctx);
        }
        Gondolo.prototype.waveform = function (output, channel) {
            if (!output) {
                output =
                    this.wavedata ||
                        (this.wavedata = new Uint8Array((this.analyser[0] || this.analyser).frequencyBinCount));
            }
            var analyser = this.stereo ? this.analyser[channel || 0] : this.analyser;
            analyser.getByteTimeDomainData(output);
            return output;
        };
        Gondolo.prototype.frequencies = function (output, channel) {
            if (!output) {
                output =
                    this.freqdata ||
                        (this.freqdata = new Uint8Array((this.analyser[0] || this.analyser).frequencyBinCount));
            }
            var analyser = this.stereo ? this.analyser[channel || 0] : this.analyser;
            analyser.getByteFrequencyData(output);
            return output;
        };
        Gondolo.prototype.audioConfigStateResolver = function (ctx, opts, audio) {
            this.analyser = ctx.createAnalyser();
            this.stereo = !!opts.stereo;
            this.audible = opts.audible !== false;
            this.wavedata = null;
            this.freqdata = null;
            this.splitter = null;
            this.merger = null;
            this.source = audio;
        };
        Gondolo.prototype.audioConfigStateParser = function (ctx) {
            if (!this.stereo) {
                this.output = this.source;
                this.source.connect(this.analyser[0] || this.analyser);
                if (this.audible) {
                    (this.analyser[0] || this.analyser).connect(ctx.destination);
                }
            }
            else {
                this.analyser = [this.analyser[0] || this.analyser];
                this.analyser.push(ctx.createAnalyser());
                this.splitter = ctx.createChannelSplitter(2);
                this.merger = ctx.createChannelMerger(2);
                this.output = this.merger;
                this.source.connect(this.splitter);
                for (var i = 0; i < 2; i++) {
                    this.splitter.connect(this.analyser[i], i, 0);
                    this.analyser[i].connect(this.merger, 0, i);
                }
                if (this.audible) {
                    this.merger.connect(ctx.destination);
                }
            }
        };
        return Gondolo;
    }());

    var VgModuloComponent = /** @class */ (function () {
        function VgModuloComponent() {
        }
        VgModuloComponent.prototype.startVisualizer = function () {
            if (!this._audioAnalyser) {
                this._audioAnalyser = new Gondolo(this.audioElement);
                var _a = this.moduloConfig.dimensions, width = _a.width, height = _a.height;
                var canvasElement = this.waveCanvas.nativeElement;
                this._ctx = canvasElement.getContext("2d");
                canvasElement.width = width;
                canvasElement.height = height;
            }
            this.update();
        };
        VgModuloComponent.prototype.update = function () {
            var _this = this;
            var audioFreq = this._audioAnalyser.waveform();
            var _a = this.moduloConfig, fillStyle = _a.fillStyle, strokeStyle = _a.strokeStyle, lineWidth = _a.lineWidth, scaleFactor = _a.scaleFactor;
            var _b = this.waveCanvas.nativeElement, width = _b.width, height = _b.height;
            // Clear canvas
            this._ctx.fillStyle = fillStyle;
            this._ctx.fillRect(0, 0, width, height);
            this._ctx.strokeStyle = strokeStyle;
            this._ctx.lineWidth = lineWidth;
            // Draw frequency lines
            this._ctx.beginPath();
            this._ctx.moveTo(0, height / 2 - audioFreq[0] * scaleFactor);
            for (var i = 0; i < audioFreq.length; i++) {
                this._ctx.lineTo((width / audioFreq.length) * i, height / 2 - audioFreq[i] * scaleFactor);
            }
            this._ctx.moveTo(0, height / 2 + audioFreq[0] * scaleFactor);
            for (var i = 0; i < audioFreq.length; i++) {
                this._ctx.lineTo((width / audioFreq.length) * i, height / 2 + audioFreq[i] * scaleFactor);
            }
            this._ctx.stroke();
            window.requestAnimationFrame(function () { return _this.update(); });
        };
        return VgModuloComponent;
    }());
    VgModuloComponent.decorators = [
        { type: core.Component, args: [{
                    selector: "vg-modulo",
                    template: "<canvas #waveCanvas></canvas>\n"
                },] }
    ];
    VgModuloComponent.propDecorators = {
        moduloConfig: [{ type: core.Input }],
        audioElement: [{ type: core.Input }],
        waveCanvas: [{ type: core.ViewChild, args: ["waveCanvas", { static: false },] }]
    };

    var VgModuloModule = /** @class */ (function () {
        function VgModuloModule() {
        }
        return VgModuloModule;
    }());
    VgModuloModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule
                    ],
                    declarations: [VgModuloComponent],
                    exports: [VgModuloComponent],
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Gondolo = Gondolo;
    exports.VgModuloComponent = VgModuloComponent;
    exports.VgModuloModule = VgModuloModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=videogular-ngx-videogular-modulo.umd.js.map
