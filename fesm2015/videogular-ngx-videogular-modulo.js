import { Component, Input, ViewChild, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const AudioContext = window["AudioContext"] || window["webkitAudioContext"];
class Gondolo {
    constructor(audio, ctx, opts) {
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
    waveform(output, channel) {
        if (!output) {
            output =
                this.wavedata ||
                    (this.wavedata = new Uint8Array((this.analyser[0] || this.analyser).frequencyBinCount));
        }
        const analyser = this.stereo ? this.analyser[channel || 0] : this.analyser;
        analyser.getByteTimeDomainData(output);
        return output;
    }
    frequencies(output, channel) {
        if (!output) {
            output =
                this.freqdata ||
                    (this.freqdata = new Uint8Array((this.analyser[0] || this.analyser).frequencyBinCount));
        }
        const analyser = this.stereo ? this.analyser[channel || 0] : this.analyser;
        analyser.getByteFrequencyData(output);
        return output;
    }
    audioConfigStateResolver(ctx, opts, audio) {
        this.analyser = ctx.createAnalyser();
        this.stereo = !!opts.stereo;
        this.audible = opts.audible !== false;
        this.wavedata = null;
        this.freqdata = null;
        this.splitter = null;
        this.merger = null;
        this.source = audio;
    }
    audioConfigStateParser(ctx) {
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
            for (let i = 0; i < 2; i++) {
                this.splitter.connect(this.analyser[i], i, 0);
                this.analyser[i].connect(this.merger, 0, i);
            }
            if (this.audible) {
                this.merger.connect(ctx.destination);
            }
        }
    }
}

class VgModuloComponent {
    startVisualizer() {
        if (!this._audioAnalyser) {
            this._audioAnalyser = new Gondolo(this.audioElement);
            const { width, height } = this.moduloConfig.dimensions;
            const canvasElement = this.waveCanvas.nativeElement;
            this._ctx = canvasElement.getContext("2d");
            canvasElement.width = width;
            canvasElement.height = height;
        }
        this.update();
    }
    update() {
        const audioFreq = this._audioAnalyser.waveform();
        const { fillStyle, strokeStyle, lineWidth, scaleFactor } = this.moduloConfig;
        const { width, height } = this.waveCanvas.nativeElement;
        // Clear canvas
        this._ctx.fillStyle = fillStyle;
        this._ctx.fillRect(0, 0, width, height);
        this._ctx.strokeStyle = strokeStyle;
        this._ctx.lineWidth = lineWidth;
        // Draw frequency lines
        this._ctx.beginPath();
        this._ctx.moveTo(0, height / 2 - audioFreq[0] * scaleFactor);
        for (let i = 0; i < audioFreq.length; i++) {
            this._ctx.lineTo((width / audioFreq.length) * i, height / 2 - audioFreq[i] * scaleFactor);
        }
        this._ctx.moveTo(0, height / 2 + audioFreq[0] * scaleFactor);
        for (let i = 0; i < audioFreq.length; i++) {
            this._ctx.lineTo((width / audioFreq.length) * i, height / 2 + audioFreq[i] * scaleFactor);
        }
        this._ctx.stroke();
        window.requestAnimationFrame(() => this.update());
    }
}
VgModuloComponent.decorators = [
    { type: Component, args: [{
                selector: "vg-modulo",
                template: "<canvas #waveCanvas></canvas>\n"
            },] }
];
VgModuloComponent.propDecorators = {
    moduloConfig: [{ type: Input }],
    audioElement: [{ type: Input }],
    waveCanvas: [{ type: ViewChild, args: ["waveCanvas", { static: false },] }]
};

class VgModuloModule {
}
VgModuloModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [VgModuloComponent],
                exports: [VgModuloComponent],
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { Gondolo, VgModuloComponent, VgModuloModule };
//# sourceMappingURL=videogular-ngx-videogular-modulo.js.map
