(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs'), require('@videogular/ngx-videogular/core')) :
    typeof define === 'function' && define.amd ? define('@videogular/ngx-videogular/controls', ['exports', '@angular/core', '@angular/common', 'rxjs', '@videogular/ngx-videogular/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.videogular = global.videogular || {}, global.videogular['ngx-videogular'] = global.videogular['ngx-videogular'] || {}, global.videogular['ngx-videogular'].controls = {}), global.ng.core, global.ng.common, global.rxjs, global.videogular['ngx-videogular'].core));
}(this, (function (exports, core$1, common, rxjs, core) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || from);
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var VgControlsComponent = /** @class */ (function () {
        // @ts-ignore
        function VgControlsComponent(API, ref, hidden) {
            this.API = API;
            this.hidden = hidden;
            this.isAdsPlaying = 'initial';
            this.hideControls = false;
            this.vgAutohide = false;
            this.vgAutohideTime = 3;
            this.subscriptions = [];
            this.elem = ref.nativeElement;
        }
        VgControlsComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.mouseMove$ = rxjs.fromEvent(this.API.videogularElement, 'mousemove');
            this.subscriptions.push(this.mouseMove$.subscribe(this.show.bind(this)));
            this.touchStart$ = rxjs.fromEvent(this.API.videogularElement, 'touchstart');
            this.subscriptions.push(this.touchStart$.subscribe(this.show.bind(this)));
            this.mouseClick$ = rxjs.fromEvent(this.API.videogularElement, 'click');
            this.subscriptions.push(this.mouseClick$.subscribe(this.show.bind(this)));
            if (this.API.isPlayerReady) {
                this.onPlayerReady();
            }
            else {
                this.subscriptions.push(this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); }));
            }
        };
        VgControlsComponent.prototype.onPlayerReady = function () {
            this.target = this.API.getMediaById(this.vgFor);
            this.subscriptions.push(this.target.subscriptions.play.subscribe(this.onPlay.bind(this)));
            this.subscriptions.push(this.target.subscriptions.pause.subscribe(this.onPause.bind(this)));
            this.subscriptions.push(this.target.subscriptions.startAds.subscribe(this.onStartAds.bind(this)));
            this.subscriptions.push(this.target.subscriptions.endAds.subscribe(this.onEndAds.bind(this)));
        };
        VgControlsComponent.prototype.ngAfterViewInit = function () {
            if (this.vgAutohide) {
                this.hide();
            }
            else {
                this.show();
            }
        };
        VgControlsComponent.prototype.onPlay = function () {
            if (this.vgAutohide) {
                this.hide();
            }
        };
        VgControlsComponent.prototype.onPause = function () {
            clearTimeout(this.timer);
            this.hideControls = false;
            this.hidden.state(false);
        };
        VgControlsComponent.prototype.onStartAds = function () {
            this.isAdsPlaying = 'none';
        };
        VgControlsComponent.prototype.onEndAds = function () {
            this.isAdsPlaying = 'initial';
        };
        VgControlsComponent.prototype.hide = function () {
            if (this.vgAutohide) {
                clearTimeout(this.timer);
                this.hideAsync();
            }
        };
        VgControlsComponent.prototype.show = function () {
            clearTimeout(this.timer);
            this.hideControls = false;
            this.hidden.state(false);
            if (this.vgAutohide) {
                this.hideAsync();
            }
        };
        VgControlsComponent.prototype.hideAsync = function () {
            var _this = this;
            if (this.API.state === core.VgStates.VG_PLAYING) {
                this.timer = setTimeout(function () {
                    _this.hideControls = true;
                    _this.hidden.state(true);
                }, this.vgAutohideTime * 1000);
            }
        };
        VgControlsComponent.prototype.ngOnDestroy = function () {
            this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
        };
        return VgControlsComponent;
    }());
    VgControlsComponent.decorators = [
        { type: core$1.Component, args: [{
                    selector: 'vg-controls',
                    encapsulation: core$1.ViewEncapsulation.None,
                    template: "<ng-content></ng-content>",
                    styles: ["\n      vg-controls {\n        position: absolute;\n        display: flex;\n        width: 100%;\n        height: 50px;\n        z-index: 300;\n        bottom: 0;\n        background-color: rgba(0, 0, 0, 0.5);\n        -webkit-transition: bottom 1s;\n        -khtml-transition: bottom 1s;\n        -moz-transition: bottom 1s;\n        -ms-transition: bottom 1s;\n        transition: bottom 1s;\n      }\n      vg-controls.hide {\n        bottom: -50px;\n      }\n    "]
                },] }
    ];
    /** @nocollapse */
    VgControlsComponent.ctorParameters = function () { return [
        { type: core.VgApiService },
        { type: core$1.ElementRef },
        { type: core.VgControlsHiddenService }
    ]; };
    VgControlsComponent.propDecorators = {
        isAdsPlaying: [{ type: core$1.HostBinding, args: ['style.pointer-events',] }],
        hideControls: [{ type: core$1.HostBinding, args: ['class.hide',] }],
        vgFor: [{ type: core$1.Input }],
        vgAutohide: [{ type: core$1.Input }],
        vgAutohideTime: [{ type: core$1.Input }]
    };

    var VgVolumeComponent = /** @class */ (function () {
        function VgVolumeComponent(ref, API) {
            this.API = API;
            this.subscriptions = [];
            this.elem = ref.nativeElement;
            this.isDragging = false;
        }
        VgVolumeComponent.prototype.ngOnInit = function () {
            var _this = this;
            if (this.API.isPlayerReady) {
                this.onPlayerReady();
            }
            else {
                this.subscriptions.push(this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); }));
            }
        };
        VgVolumeComponent.prototype.onPlayerReady = function () {
            this.target = this.API.getMediaById(this.vgFor);
            this.ariaValue = this.getVolume() * 100;
        };
        VgVolumeComponent.prototype.onClick = function (event) {
            this.setVolume(this.calculateVolume(event.clientX));
        };
        VgVolumeComponent.prototype.onMouseDown = function (event) {
            this.mouseDownPosX = event.clientX;
            this.isDragging = true;
        };
        VgVolumeComponent.prototype.onDrag = function (event) {
            if (this.isDragging) {
                this.setVolume(this.calculateVolume(event.clientX));
            }
        };
        VgVolumeComponent.prototype.onStopDrag = function (event) {
            if (this.isDragging) {
                this.isDragging = false;
                if (this.mouseDownPosX === event.clientX) {
                    this.setVolume(this.calculateVolume(event.clientX));
                }
            }
        };
        VgVolumeComponent.prototype.arrowAdjustVolume = function (event) {
            if (event.keyCode === 38 || event.keyCode === 39) {
                event.preventDefault();
                this.setVolume(Math.max(0, Math.min(100, this.getVolume() * 100 + 10)));
            }
            else if (event.keyCode === 37 || event.keyCode === 40) {
                event.preventDefault();
                this.setVolume(Math.max(0, Math.min(100, this.getVolume() * 100 - 10)));
            }
        };
        VgVolumeComponent.prototype.calculateVolume = function (mousePosX) {
            var recObj = this.volumeBarRef.nativeElement.getBoundingClientRect();
            var volumeBarOffsetLeft = recObj.left;
            var volumeBarWidth = recObj.width;
            return ((mousePosX - volumeBarOffsetLeft) / volumeBarWidth) * 100;
        };
        VgVolumeComponent.prototype.setVolume = function (vol) {
            this.target.volume = Math.max(0, Math.min(1, vol / 100));
            this.ariaValue = this.target.volume * 100;
        };
        VgVolumeComponent.prototype.getVolume = function () {
            return this.target ? this.target.volume : 0;
        };
        VgVolumeComponent.prototype.ngOnDestroy = function () {
            this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
        };
        return VgVolumeComponent;
    }());
    VgVolumeComponent.decorators = [
        { type: core$1.Component, args: [{
                    selector: 'vg-volume',
                    encapsulation: core$1.ViewEncapsulation.None,
                    template: "\n    <div\n      #volumeBar\n      class=\"volumeBar\"\n      tabindex=\"0\"\n      role=\"slider\"\n      aria-label=\"volume level\"\n      aria-level=\"polite\"\n      [attr.aria-valuenow]=\"ariaValue\"\n      aria-valuemin=\"0\"\n      aria-valuemax=\"100\"\n      aria-orientation=\"horizontal\"\n      [attr.aria-valuetext]=\"ariaValue + '%'\"\n      (click)=\"onClick($event)\"\n      (mousedown)=\"onMouseDown($event)\"\n    >\n      <div class=\"volumeBackground\" [ngClass]=\"{ dragging: isDragging }\">\n        <div\n          class=\"volumeValue\"\n          [style.width]=\"getVolume() * (100 - 15) + '%'\"\n        ></div>\n        <div\n          class=\"volumeKnob\"\n          [style.left]=\"getVolume() * (100 - 15) + '%'\"\n        ></div>\n      </div>\n    </div>\n  ",
                    styles: ["\n      vg-volume {\n        -webkit-touch-callout: none;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n        display: flex;\n        justify-content: center;\n        height: 50px;\n        width: 100px;\n        cursor: pointer;\n        color: white;\n        line-height: 50px;\n      }\n      vg-volume .volumeBar {\n        position: relative;\n        display: flex;\n        flex-grow: 1;\n        align-items: center;\n      }\n      vg-volume .volumeBackground {\n        display: flex;\n        flex-grow: 1;\n        height: 5px;\n        pointer-events: none;\n        background-color: #333;\n      }\n      vg-volume .volumeValue {\n        display: flex;\n        height: 5px;\n        pointer-events: none;\n        background-color: #fff;\n        transition: all 0.2s ease-out;\n      }\n      vg-volume .volumeKnob {\n        position: absolute;\n        width: 15px;\n        height: 15px;\n        left: 0;\n        top: 50%;\n        transform: translateY(-50%);\n        border-radius: 15px;\n        pointer-events: none;\n        background-color: #fff;\n        transition: all 0.2s ease-out;\n      }\n      vg-volume .volumeBackground.dragging .volumeValue,\n      vg-volume .volumeBackground.dragging .volumeKnob {\n        transition: none;\n      }\n    "]
                },] }
    ];
    /** @nocollapse */
    VgVolumeComponent.ctorParameters = function () { return [
        { type: core$1.ElementRef },
        { type: core.VgApiService }
    ]; };
    VgVolumeComponent.propDecorators = {
        vgFor: [{ type: core$1.Input }],
        volumeBarRef: [{ type: core$1.ViewChild, args: ['volumeBar', { static: true },] }],
        onDrag: [{ type: core$1.HostListener, args: ['document:mousemove', ['$event'],] }],
        onStopDrag: [{ type: core$1.HostListener, args: ['document:mouseup', ['$event'],] }],
        arrowAdjustVolume: [{ type: core$1.HostListener, args: ['keydown', ['$event'],] }]
    };

    var VgTrackSelectorComponent = /** @class */ (function () {
        function VgTrackSelectorComponent(ref, API) {
            this.API = API;
            this.subscriptions = [];
            this.elem = ref.nativeElement;
        }
        VgTrackSelectorComponent.prototype.ngOnInit = function () {
            var _this = this;
            if (this.API.isPlayerReady) {
                this.onPlayerReady();
            }
            else {
                this.subscriptions.push(this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); }));
            }
        };
        VgTrackSelectorComponent.prototype.onPlayerReady = function () {
            this.target = this.API.getMediaById(this.vgFor);
            var subs = Array.from(this.API.getMasterMedia().elem.children)
                .filter(function (item) { return item.tagName === 'TRACK'; })
                .filter(function (item) { return item.kind === 'subtitles'; })
                .map(function (item) { return ({
                label: item.label,
                selected: item.default === true,
                id: item.srclang,
            }); });
            this.tracks = __spreadArray(__spreadArray([], __read(subs)), [
                {
                    id: null,
                    label: 'Off',
                    selected: subs.every(function (item) { return item.selected === false; }),
                },
            ]);
            var track = this.tracks.filter(function (item) { return item.selected === true; })[0];
            this.trackSelected = track.id;
            this.ariaValue = track.label;
        };
        VgTrackSelectorComponent.prototype.selectTrack = function (trackId) {
            var _this = this;
            this.trackSelected = trackId === 'null' ? null : trackId;
            this.ariaValue = 'No track selected';
            Array.from(this.API.getMasterMedia().elem.textTracks).forEach(function (item) {
                if (item.language === trackId) {
                    _this.ariaValue = item.label;
                    item.mode = 'showing';
                }
                else {
                    item.mode = 'hidden';
                }
            });
        };
        VgTrackSelectorComponent.prototype.ngOnDestroy = function () {
            this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
        };
        return VgTrackSelectorComponent;
    }());
    VgTrackSelectorComponent.decorators = [
        { type: core$1.Component, args: [{
                    selector: 'vg-track-selector',
                    encapsulation: core$1.ViewEncapsulation.None,
                    template: "\n    <div class=\"container\">\n      <div\n        class=\"track-selected\"\n        [class.vg-icon-closed_caption]=\"!trackSelected\"\n      >\n        {{ trackSelected || '' }}\n      </div>\n      <select\n        class=\"trackSelector\"\n        (change)=\"selectTrack($event.target.value)\"\n        tabindex=\"0\"\n        aria-label=\"track selector\"\n        [attr.aria-valuetext]=\"ariaValue\"\n      >\n        <option\n          *ngFor=\"let track of tracks\"\n          [value]=\"track.id\"\n          [selected]=\"track.selected === true\"\n        >\n          {{ track.label }}\n        </option>\n      </select>\n    </div>\n  ",
                    styles: ["\n      vg-track-selector {\n        -webkit-touch-callout: none;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n        display: flex;\n        justify-content: center;\n        width: 50px;\n        height: 50px;\n        cursor: pointer;\n        color: white;\n        line-height: 50px;\n      }\n      vg-track-selector .container {\n        position: relative;\n        display: flex;\n        flex-grow: 1;\n        align-items: center;\n        padding: 0;\n        margin: 5px;\n      }\n      vg-track-selector select.trackSelector {\n        width: 50px;\n        padding: 5px 8px;\n        border: none;\n        background: none;\n        -webkit-appearance: none;\n        -moz-appearance: none;\n        appearance: none;\n        color: transparent;\n        font-size: 16px;\n      }\n      vg-track-selector select.trackSelector::-ms-expand {\n        display: none;\n      }\n      vg-track-selector select.trackSelector option {\n        color: #000;\n      }\n      vg-track-selector .track-selected {\n        position: absolute;\n        width: 100%;\n        height: 50px;\n        top: -6px;\n        text-align: center;\n        text-transform: uppercase;\n        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;\n        padding-top: 2px;\n        pointer-events: none;\n      }\n      vg-track-selector .vg-icon-closed_caption:before {\n        width: 100%;\n      }\n    "]
                },] }
    ];
    /** @nocollapse */
    VgTrackSelectorComponent.ctorParameters = function () { return [
        { type: core$1.ElementRef },
        { type: core.VgApiService }
    ]; };
    VgTrackSelectorComponent.propDecorators = {
        vgFor: [{ type: core$1.Input }]
    };

    // Workaround until we can use UTC with Angular Date Pipe
    var VgUtcPipe = /** @class */ (function () {
        function VgUtcPipe() {
        }
        VgUtcPipe.prototype.transform = function (value, format) {
            var date = new Date(value);
            var result = format;
            var ss = date.getUTCSeconds();
            var mm = date.getUTCMinutes();
            var hh = date.getUTCHours();
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
        };
        return VgUtcPipe;
    }());
    VgUtcPipe.decorators = [
        { type: core$1.Pipe, args: [{ name: 'vgUtc' },] }
    ];
    var VgTimeDisplayComponent = /** @class */ (function () {
        function VgTimeDisplayComponent(ref, API) {
            this.API = API;
            this.vgProperty = 'current';
            this.vgFormat = 'mm:ss';
            this.subscriptions = [];
            this.elem = ref.nativeElement;
        }
        VgTimeDisplayComponent.prototype.ngOnInit = function () {
            var _this = this;
            if (this.API.isPlayerReady) {
                this.onPlayerReady();
            }
            else {
                this.subscriptions.push(this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); }));
            }
        };
        VgTimeDisplayComponent.prototype.onPlayerReady = function () {
            this.target = this.API.getMediaById(this.vgFor);
        };
        VgTimeDisplayComponent.prototype.getTime = function () {
            var t = 0;
            if (this.target) {
                t = Math.round(this.target.time[this.vgProperty]);
                t = isNaN(t) || this.target.isLive ? 0 : t;
            }
            return t;
        };
        VgTimeDisplayComponent.prototype.ngOnDestroy = function () {
            this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
        };
        return VgTimeDisplayComponent;
    }());
    VgTimeDisplayComponent.decorators = [
        { type: core$1.Component, args: [{
                    selector: 'vg-time-display',
                    encapsulation: core$1.ViewEncapsulation.None,
                    template: "\n    <span *ngIf=\"target?.isLive\">LIVE</span>\n    <span *ngIf=\"!target?.isLive\">{{ getTime() | vgUtc: vgFormat }}</span>\n    <ng-content></ng-content>\n  ",
                    styles: ["\n      vg-time-display {\n        -webkit-touch-callout: none;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n        display: flex;\n        justify-content: center;\n        height: 50px;\n        width: 60px;\n        cursor: pointer;\n        color: white;\n        line-height: 50px;\n        pointer-events: none;\n        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;\n      }\n    "]
                },] }
    ];
    /** @nocollapse */
    VgTimeDisplayComponent.ctorParameters = function () { return [
        { type: core$1.ElementRef },
        { type: core.VgApiService }
    ]; };
    VgTimeDisplayComponent.propDecorators = {
        vgFor: [{ type: core$1.Input }],
        vgProperty: [{ type: core$1.Input }],
        vgFormat: [{ type: core$1.Input }]
    };

    var VgScrubBarComponent = /** @class */ (function () {
        function VgScrubBarComponent(ref, API, vgControlsHiddenState) {
            var _this = this;
            this.API = API;
            this.hideScrubBar = false;
            this.vgSlider = true;
            this.isSeeking = false;
            this.wasPlaying = false;
            this.subscriptions = [];
            this.elem = ref.nativeElement;
            this.subscriptions.push(vgControlsHiddenState.isHidden.subscribe(function (hide) { return _this.onHideScrubBar(hide); }));
        }
        VgScrubBarComponent.prototype.ngOnInit = function () {
            var _this = this;
            if (this.API.isPlayerReady) {
                this.onPlayerReady();
            }
            else {
                this.subscriptions.push(this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); }));
            }
        };
        VgScrubBarComponent.prototype.onPlayerReady = function () {
            this.target = this.API.getMediaById(this.vgFor);
        };
        VgScrubBarComponent.prototype.seekStart = function () {
            if (this.target.canPlay) {
                this.isSeeking = true;
                if (this.target.state === core.VgStates.VG_PLAYING) {
                    this.wasPlaying = true;
                }
                this.target.pause();
            }
        };
        VgScrubBarComponent.prototype.seekMove = function (offset) {
            if (this.isSeeking) {
                var percentage = Math.max(Math.min((offset * 100) / this.elem.scrollWidth, 99.9), 0);
                this.target.time.current = (percentage * this.target.time.total) / 100;
                this.target.seekTime(percentage, true);
            }
        };
        VgScrubBarComponent.prototype.seekEnd = function (offset) {
            this.isSeeking = false;
            if (this.target.canPlay) {
                var percentage = Math.max(Math.min((offset * 100) / this.elem.scrollWidth, 99.9), 0);
                this.target.seekTime(percentage, true);
                if (this.wasPlaying) {
                    this.wasPlaying = false;
                    this.target.play();
                }
            }
        };
        VgScrubBarComponent.prototype.touchEnd = function () {
            this.isSeeking = false;
            if (this.wasPlaying) {
                this.wasPlaying = false;
                this.target.play();
            }
        };
        VgScrubBarComponent.prototype.getTouchOffset = function (event) {
            var offsetLeft = 0;
            var element = event.target;
            while (element) {
                offsetLeft += element.offsetLeft;
                element = element.offsetParent;
            }
            return event.touches[0].pageX - offsetLeft;
        };
        VgScrubBarComponent.prototype.onMouseDownScrubBar = function ($event) {
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
        };
        VgScrubBarComponent.prototype.onMouseMoveScrubBar = function ($event) {
            if (this.target) {
                if (!this.target.isLive && this.vgSlider && this.isSeeking) {
                    this.seekMove($event.offsetX);
                }
            }
        };
        VgScrubBarComponent.prototype.onMouseUpScrubBar = function ($event) {
            if (this.target) {
                if (!this.target.isLive && this.vgSlider && this.isSeeking) {
                    this.seekEnd($event.offsetX);
                }
            }
        };
        VgScrubBarComponent.prototype.onTouchStartScrubBar = function ($event) {
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
        };
        VgScrubBarComponent.prototype.onTouchMoveScrubBar = function ($event) {
            if (this.target) {
                if (!this.target.isLive && this.vgSlider && this.isSeeking) {
                    this.seekMove(this.getTouchOffset($event));
                }
            }
        };
        // @ts-ignore
        VgScrubBarComponent.prototype.onTouchCancelScrubBar = function (_$event) {
            if (this.target) {
                if (!this.target.isLive && this.vgSlider && this.isSeeking) {
                    this.touchEnd();
                }
            }
        };
        // @ts-ignore
        VgScrubBarComponent.prototype.onTouchEndScrubBar = function (_$event) {
            if (this.target) {
                if (!this.target.isLive && this.vgSlider && this.isSeeking) {
                    this.touchEnd();
                }
            }
        };
        VgScrubBarComponent.prototype.arrowAdjustVolume = function (event) {
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
        };
        VgScrubBarComponent.prototype.getPercentage = function () {
            return this.target
                ? Math.round((this.target.time.current * 100) / this.target.time.total) + '%'
                : '0%';
        };
        VgScrubBarComponent.prototype.onHideScrubBar = function (hide) {
            this.hideScrubBar = hide;
        };
        VgScrubBarComponent.prototype.ngOnDestroy = function () {
            this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
        };
        return VgScrubBarComponent;
    }());
    VgScrubBarComponent.decorators = [
        { type: core$1.Component, args: [{
                    selector: 'vg-scrub-bar',
                    encapsulation: core$1.ViewEncapsulation.None,
                    template: "\n    <div\n      class=\"scrubBar\"\n      tabindex=\"0\"\n      role=\"slider\"\n      aria-label=\"scrub bar\"\n      aria-level=\"polite\"\n      [attr.aria-valuenow]=\"getPercentage()\"\n      aria-valuemin=\"0\"\n      aria-valuemax=\"100\"\n      [attr.aria-valuetext]=\"getPercentage()\"\n    >\n      <ng-content></ng-content>\n    </div>\n  ",
                    styles: ["\n      vg-scrub-bar {\n        -webkit-touch-callout: none;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n        position: absolute;\n        width: 100%;\n        height: 5px;\n        bottom: 50px;\n        margin: 0;\n        cursor: pointer;\n        align-items: center;\n        background: rgba(0, 0, 0, 0.75);\n        z-index: 250;\n        -webkit-transition: bottom 1s, opacity 0.5s;\n        -khtml-transition: bottom 1s, opacity 0.5s;\n        -moz-transition: bottom 1s, opacity 0.5s;\n        -ms-transition: bottom 1s, opacity 0.5s;\n        transition: bottom 1s, opacity 0.5s;\n      }\n      vg-scrub-bar .scrubBar {\n        position: relative;\n        display: flex;\n        flex-grow: 1;\n        align-items: center;\n        height: 100%;\n      }\n      vg-controls vg-scrub-bar {\n        position: relative;\n        bottom: 0;\n        background: transparent;\n        height: 50px;\n        flex-grow: 1;\n        flex-basis: 0;\n        margin: 0 10px;\n        -webkit-transition: initial;\n        -khtml-transition: initial;\n        -moz-transition: initial;\n        -ms-transition: initial;\n        transition: initial;\n      }\n      vg-scrub-bar.hide {\n        bottom: 0;\n        opacity: 0;\n      }\n      vg-controls vg-scrub-bar.hide {\n        bottom: initial;\n        opacity: initial;\n      }\n    "]
                },] }
    ];
    /** @nocollapse */
    VgScrubBarComponent.ctorParameters = function () { return [
        { type: core$1.ElementRef },
        { type: core.VgApiService },
        { type: core.VgControlsHiddenService }
    ]; };
    VgScrubBarComponent.propDecorators = {
        hideScrubBar: [{ type: core$1.HostBinding, args: ['class.hide',] }],
        vgFor: [{ type: core$1.Input }],
        vgSlider: [{ type: core$1.Input }],
        onMouseDownScrubBar: [{ type: core$1.HostListener, args: ['mousedown', ['$event'],] }],
        onMouseMoveScrubBar: [{ type: core$1.HostListener, args: ['document:mousemove', ['$event'],] }],
        onMouseUpScrubBar: [{ type: core$1.HostListener, args: ['document:mouseup', ['$event'],] }],
        onTouchStartScrubBar: [{ type: core$1.HostListener, args: ['touchstart', ['$event'],] }],
        onTouchMoveScrubBar: [{ type: core$1.HostListener, args: ['document:touchmove', ['$event'],] }],
        onTouchCancelScrubBar: [{ type: core$1.HostListener, args: ['document:touchcancel', ['$event'],] }],
        onTouchEndScrubBar: [{ type: core$1.HostListener, args: ['document:touchend', ['$event'],] }],
        arrowAdjustVolume: [{ type: core$1.HostListener, args: ['keydown', ['$event'],] }]
    };

    var VgQualitySelectorComponent = /** @class */ (function () {
        function VgQualitySelectorComponent(ref, API) {
            this.API = API;
            this.onBitrateChange = new core$1.EventEmitter();
            this.subscriptions = [];
            this.elem = ref.nativeElement;
        }
        VgQualitySelectorComponent.prototype.ngOnInit = function () { };
        VgQualitySelectorComponent.prototype.ngOnChanges = function (changes) {
            if (changes.bitrates.currentValue && changes.bitrates.currentValue.length) {
                this.bitrates.forEach(function (item) { return (item.label =
                    item.label || Math.round(item.bitrate / 1000).toString()); });
            }
        };
        VgQualitySelectorComponent.prototype.selectBitrate = function (index) {
            this.bitrateSelected = this.bitrates[index];
            this.onBitrateChange.emit(this.bitrates[index]);
        };
        VgQualitySelectorComponent.prototype.ngOnDestroy = function () {
            this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
        };
        return VgQualitySelectorComponent;
    }());
    VgQualitySelectorComponent.decorators = [
        { type: core$1.Component, args: [{
                    selector: 'vg-quality-selector',
                    encapsulation: core$1.ViewEncapsulation.None,
                    template: "\n    <div class=\"container\">\n      <div class=\"quality-selected\" [class.vg-icon-hd]=\"!bitrateSelected\">\n        {{ bitrateSelected?.label }}\n      </div>\n      <select\n        class=\"quality-selector\"\n        (change)=\"selectBitrate($event.target.value)\"\n        tabindex=\"0\"\n        aria-label=\"quality selector\"\n        [attr.aria-valuetext]=\"ariaValue\"\n      >\n        <option\n          *ngFor=\"let bitrate of bitrates\"\n          [value]=\"bitrate.qualityIndex\"\n          [selected]=\"bitrate.qualityIndex === bitrateSelected?.qualityIndex\"\n        >\n          {{ bitrate.label }}\n        </option>\n      </select>\n    </div>\n  ",
                    styles: ["\n      vg-quality-selector {\n        -webkit-touch-callout: none;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n        display: flex;\n        justify-content: center;\n        width: 50px;\n        height: 50px;\n        cursor: pointer;\n        color: white;\n        line-height: 50px;\n      }\n      vg-quality-selector .container {\n        position: relative;\n        display: flex;\n        flex-grow: 1;\n        align-items: center;\n        padding: 0;\n        margin: 5px;\n      }\n      vg-quality-selector select.quality-selector {\n        width: 50px;\n        padding: 5px 8px;\n        border: none;\n        background: none;\n        -webkit-appearance: none;\n        -moz-appearance: none;\n        appearance: none;\n        color: transparent;\n        font-size: 16px;\n      }\n      vg-quality-selector select.quality-selector::-ms-expand {\n        display: none;\n      }\n      vg-quality-selector select.quality-selector option {\n        color: #000;\n      }\n      vg-quality-selector .quality-selected {\n        position: absolute;\n        width: 100%;\n        height: 50px;\n        top: -6px;\n        text-align: center;\n        text-transform: uppercase;\n        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;\n        padding-top: 2px;\n        pointer-events: none;\n      }\n      vg-quality-selector .vg-icon-closed_caption:before {\n        width: 100%;\n      }\n    "]
                },] }
    ];
    /** @nocollapse */
    VgQualitySelectorComponent.ctorParameters = function () { return [
        { type: core$1.ElementRef },
        { type: core.VgApiService }
    ]; };
    VgQualitySelectorComponent.propDecorators = {
        bitrates: [{ type: core$1.Input }],
        onBitrateChange: [{ type: core$1.Output }]
    };

    var VgPlaybackButtonComponent = /** @class */ (function () {
        function VgPlaybackButtonComponent(ref, API, cdr) {
            this.API = API;
            this.cdr = cdr;
            this.subscriptions = [];
            this.ariaValue = 1;
            this.elem = ref.nativeElement;
            this.playbackValues = ['0.5', '1.0', '1.5', '2.0'];
            this.playbackIndex = 1;
        }
        VgPlaybackButtonComponent.prototype.ngOnInit = function () {
            var _this = this;
            if (this.API.isPlayerReady) {
                this.onPlayerReady();
            }
            else {
                this.subscriptions.push(this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); }));
            }
        };
        VgPlaybackButtonComponent.prototype.onPlayerReady = function () {
            this.target = this.API.getMediaById(this.vgFor);
        };
        VgPlaybackButtonComponent.prototype.onClick = function () {
            this.updatePlaybackSpeed();
        };
        VgPlaybackButtonComponent.prototype.onKeyDown = function (event) {
            // On press Enter (13) or Space (32)
            if (event.keyCode === 13 || event.keyCode === 32) {
                event.preventDefault();
                this.updatePlaybackSpeed();
            }
        };
        VgPlaybackButtonComponent.prototype.updatePlaybackSpeed = function () {
            this.playbackIndex = ++this.playbackIndex % this.playbackValues.length;
            if (this.target instanceof core.VgApiService) {
                this.target.playbackRate = this.playbackValues[this.playbackIndex];
            }
            else {
                this.target.playbackRate[this.vgFor] = this.playbackValues[this.playbackIndex];
            }
            this.detectChanges();
        };
        VgPlaybackButtonComponent.prototype.getPlaybackRate = function () {
            this.ariaValue = this.target ? this.target.playbackRate : 1.0;
            return this.ariaValue;
        };
        VgPlaybackButtonComponent.prototype.detectChanges = function () {
            try {
                this.cdr.detectChanges();
            }
            catch (e) {
                console.warn(e);
            }
        };
        VgPlaybackButtonComponent.prototype.ngOnDestroy = function () {
            this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
        };
        return VgPlaybackButtonComponent;
    }());
    VgPlaybackButtonComponent.decorators = [
        { type: core$1.Component, args: [{
                    selector: 'vg-playback-button',
                    encapsulation: core$1.ViewEncapsulation.None,
                    template: " <span\n    class=\"button\"\n    tabindex=\"0\"\n    role=\"button\"\n    aria-label=\"playback speed button\"\n    [attr.aria-valuetext]=\"ariaValue\"\n  >\n    {{ getPlaybackRate() }}x\n  </span>",
                    styles: ["\n      vg-playback-button {\n        -webkit-touch-callout: none;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n        display: flex;\n        justify-content: center;\n        height: 50px;\n        width: 50px;\n        cursor: pointer;\n        color: white;\n        line-height: 50px;\n        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;\n      }\n      vg-playback-button .button {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        width: 50px;\n      }\n    "]
                },] }
    ];
    /** @nocollapse */
    VgPlaybackButtonComponent.ctorParameters = function () { return [
        { type: core$1.ElementRef },
        { type: core.VgApiService },
        { type: core$1.ChangeDetectorRef }
    ]; };
    VgPlaybackButtonComponent.propDecorators = {
        vgFor: [{ type: core$1.Input }],
        playbackValues: [{ type: core$1.Input }],
        onClick: [{ type: core$1.HostListener, args: ['click',] }],
        onKeyDown: [{ type: core$1.HostListener, args: ['keydown', ['$event'],] }]
    };

    var VgPlayPauseComponent = /** @class */ (function () {
        function VgPlayPauseComponent(ref, API) {
            this.API = API;
            this.subscriptions = [];
            this.ariaValue = core.VgStates.VG_PAUSED;
            this.elem = ref.nativeElement;
        }
        VgPlayPauseComponent.prototype.ngOnInit = function () {
            var _this = this;
            if (this.API.isPlayerReady) {
                this.onPlayerReady();
            }
            else {
                this.subscriptions.push(this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); }));
            }
        };
        VgPlayPauseComponent.prototype.onPlayerReady = function () {
            this.target = this.API.getMediaById(this.vgFor);
        };
        VgPlayPauseComponent.prototype.onClick = function () {
            this.playPause();
        };
        VgPlayPauseComponent.prototype.onKeyDown = function (event) {
            // On press Enter (13) or Space (32)
            if (event.keyCode === 13 || event.keyCode === 32) {
                event.preventDefault();
                this.playPause();
            }
        };
        VgPlayPauseComponent.prototype.playPause = function () {
            var state = this.getState();
            switch (state) {
                case core.VgStates.VG_PLAYING:
                    this.target.pause();
                    break;
                case core.VgStates.VG_PAUSED:
                case core.VgStates.VG_ENDED:
                    this.target.play();
                    break;
            }
        };
        VgPlayPauseComponent.prototype.getState = function () {
            this.ariaValue = this.target ? this.target.state : core.VgStates.VG_PAUSED;
            return this.ariaValue;
        };
        VgPlayPauseComponent.prototype.ngOnDestroy = function () {
            this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
        };
        return VgPlayPauseComponent;
    }());
    VgPlayPauseComponent.decorators = [
        { type: core$1.Component, args: [{
                    selector: 'vg-play-pause',
                    encapsulation: core$1.ViewEncapsulation.None,
                    template: " <div\n    class=\"icon\"\n    [class.vg-icon-pause]=\"getState() === 'playing'\"\n    [class.vg-icon-play_arrow]=\"\n      getState() === 'paused' || getState() === 'ended'\n    \"\n    tabindex=\"0\"\n    role=\"button\"\n    [attr.aria-label]=\"getState() === 'paused' ? 'play' : 'pause'\"\n    [attr.aria-valuetext]=\"ariaValue\"\n  ></div>",
                    styles: ["\n      vg-play-pause {\n        -webkit-touch-callout: none;\n        -webkit-user-select: none;\n        -khtml-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n        display: flex;\n        justify-content: center;\n        height: 50px;\n        width: 50px;\n        cursor: pointer;\n        color: white;\n        line-height: 50px;\n      }\n      vg-play-pause .icon {\n        pointer-events: none;\n      }\n    "]
                },] }
    ];
    /** @nocollapse */
    VgPlayPauseComponent.ctorParameters = function () { return [
        { type: core$1.ElementRef },
        { type: core.VgApiService }
    ]; };
    VgPlayPauseComponent.propDecorators = {
        vgFor: [{ type: core$1.Input }],
        onClick: [{ type: core$1.HostListener, args: ['click',] }],
        onKeyDown: [{ type: core$1.HostListener, args: ['keydown', ['$event'],] }]
    };

    var VgMuteComponent = /** @class */ (function () {
        function VgMuteComponent(ref, API) {
            this.API = API;
            this.subscriptions = [];
            this.ariaValue = 'unmuted';
            this.elem = ref.nativeElement;
        }
        VgMuteComponent.prototype.ngOnInit = function () {
            var _this = this;
            if (this.API.isPlayerReady) {
                this.onPlayerReady();
            }
            else {
                this.subscriptions.push(this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); }));
            }
        };
        VgMuteComponent.prototype.onPlayerReady = function () {
            this.target = this.API.getMediaById(this.vgFor);
            this.currentVolume = this.target.volume;
        };
        VgMuteComponent.prototype.onClick = function () {
            this.changeMuteState();
        };
        VgMuteComponent.prototype.onKeyDown = function (event) {
            // On press Enter (13) or Space (32)
            if (event.keyCode === 13 || event.keyCode === 32) {
                event.preventDefault();
                this.changeMuteState();
            }
        };
        VgMuteComponent.prototype.changeMuteState = function () {
            var volume = this.getVolume();
            if (volume === 0) {
                if (this.target.volume === 0 && this.currentVolume === 0) {
                    this.currentVolume = 1;
                }
                this.target.volume = this.currentVolume;
            }
            else {
                this.currentVolume = volume;
                this.target.volume = 0;
            }
        };
        VgMuteComponent.prototype.getVolume = function () {
            var volume = this.target ? this.target.volume : 0;
            this.ariaValue = volume ? 'unmuted' : 'muted';
            return volume;
        };
        VgMuteComponent.prototype.ngOnDestroy = function () {
            this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
        };
        return VgMuteComponent;
    }());
    VgMuteComponent.decorators = [
        { type: core$1.Component, args: [{
                    selector: 'vg-mute',
                    encapsulation: core$1.ViewEncapsulation.None,
                    template: " <div\n    class=\"icon\"\n    [class.vg-icon-volume_up]=\"getVolume() >= 0.75\"\n    [class.vg-icon-volume_down]=\"getVolume() >= 0.25 && getVolume() < 0.75\"\n    [class.vg-icon-volume_mute]=\"getVolume() > 0 && getVolume() < 0.25\"\n    [class.vg-icon-volume_off]=\"getVolume() === 0\"\n    tabindex=\"0\"\n    role=\"button\"\n    aria-label=\"mute button\"\n    [attr.aria-valuetext]=\"ariaValue\"\n  ></div>",
                    styles: ["\n      vg-mute {\n        -webkit-touch-callout: none;\n        -webkit-user-select: none;\n        -khtml-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n        display: flex;\n        justify-content: center;\n        height: 50px;\n        width: 50px;\n        cursor: pointer;\n        color: white;\n        line-height: 50px;\n      }\n      vg-mute .icon {\n        pointer-events: none;\n      }\n    "]
                },] }
    ];
    /** @nocollapse */
    VgMuteComponent.ctorParameters = function () { return [
        { type: core$1.ElementRef },
        { type: core.VgApiService }
    ]; };
    VgMuteComponent.propDecorators = {
        vgFor: [{ type: core$1.Input }],
        onClick: [{ type: core$1.HostListener, args: ['click',] }],
        onKeyDown: [{ type: core$1.HostListener, args: ['keydown', ['$event'],] }]
    };

    var VgFullscreenComponent = /** @class */ (function () {
        function VgFullscreenComponent(ref, API, fsAPI) {
            this.API = API;
            this.fsAPI = fsAPI;
            this.isFullscreen = false;
            this.subscriptions = [];
            this.ariaValue = 'normal mode';
            this.elem = ref.nativeElement;
            this.subscriptions.push(this.fsAPI.onChangeFullscreen.subscribe(this.onChangeFullscreen.bind(this)));
        }
        VgFullscreenComponent.prototype.ngOnInit = function () {
            var _this = this;
            if (this.API.isPlayerReady) {
                this.onPlayerReady();
            }
            else {
                this.subscriptions.push(this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); }));
            }
        };
        VgFullscreenComponent.prototype.onPlayerReady = function () {
            this.target = this.API.getMediaById(this.vgFor);
        };
        VgFullscreenComponent.prototype.onChangeFullscreen = function (fsState) {
            this.ariaValue = fsState ? 'fullscreen mode' : 'normal mode';
            this.isFullscreen = fsState;
        };
        VgFullscreenComponent.prototype.onClick = function () {
            this.changeFullscreenState();
        };
        VgFullscreenComponent.prototype.onKeyDown = function (event) {
            // On press Enter (13) or Space (32)
            if (event.keyCode === 13 || event.keyCode === 32) {
                event.preventDefault();
                this.changeFullscreenState();
            }
        };
        VgFullscreenComponent.prototype.changeFullscreenState = function () {
            var element = this.target;
            if (this.target instanceof core.VgApiService) {
                element = null;
            }
            this.fsAPI.toggleFullscreen(element);
        };
        VgFullscreenComponent.prototype.ngOnDestroy = function () {
            this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
        };
        return VgFullscreenComponent;
    }());
    VgFullscreenComponent.decorators = [
        { type: core$1.Component, args: [{
                    selector: 'vg-fullscreen',
                    encapsulation: core$1.ViewEncapsulation.None,
                    template: " <div\n    class=\"icon\"\n    [class.vg-icon-fullscreen]=\"!isFullscreen\"\n    [class.vg-icon-fullscreen_exit]=\"isFullscreen\"\n    tabindex=\"0\"\n    role=\"button\"\n    aria-label=\"fullscreen button\"\n    [attr.aria-valuetext]=\"ariaValue\"\n  ></div>",
                    styles: ["\n      vg-fullscreen {\n        -webkit-touch-callout: none;\n        -webkit-user-select: none;\n        -khtml-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n        display: flex;\n        justify-content: center;\n        height: 50px;\n        width: 50px;\n        cursor: pointer;\n        color: white;\n        line-height: 50px;\n      }\n      vg-fullscreen .icon {\n        pointer-events: none;\n      }\n    "]
                },] }
    ];
    /** @nocollapse */
    VgFullscreenComponent.ctorParameters = function () { return [
        { type: core$1.ElementRef },
        { type: core.VgApiService },
        { type: core.VgFullscreenApiService }
    ]; };
    VgFullscreenComponent.propDecorators = {
        onClick: [{ type: core$1.HostListener, args: ['click',] }],
        onKeyDown: [{ type: core$1.HostListener, args: ['keydown', ['$event'],] }]
    };

    var VgScrubBarBufferingTimeComponent = /** @class */ (function () {
        function VgScrubBarBufferingTimeComponent(ref, API) {
            this.API = API;
            this.subscriptions = [];
            this.elem = ref.nativeElement;
        }
        VgScrubBarBufferingTimeComponent.prototype.ngOnInit = function () {
            var _this = this;
            if (this.API.isPlayerReady) {
                this.onPlayerReady();
            }
            else {
                this.subscriptions.push(this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); }));
            }
        };
        VgScrubBarBufferingTimeComponent.prototype.onPlayerReady = function () {
            this.target = this.API.getMediaById(this.vgFor);
        };
        VgScrubBarBufferingTimeComponent.prototype.getBufferTime = function () {
            var bufferTime = '0%';
            if (this.target && this.target.buffer && this.target.buffered.length) {
                if (this.target.time.total === 0) {
                    bufferTime = '0%';
                }
                else {
                    bufferTime =
                        (this.target.buffer.end / this.target.time.total) * 100 + '%';
                }
            }
            return bufferTime;
        };
        VgScrubBarBufferingTimeComponent.prototype.ngOnDestroy = function () {
            this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
        };
        return VgScrubBarBufferingTimeComponent;
    }());
    VgScrubBarBufferingTimeComponent.decorators = [
        { type: core$1.Component, args: [{
                    selector: 'vg-scrub-bar-buffering-time',
                    encapsulation: core$1.ViewEncapsulation.None,
                    template: "<div class=\"background\" [style.width]=\"getBufferTime()\"></div>",
                    styles: ["\n      vg-scrub-bar-buffering-time {\n        display: flex;\n        width: 100%;\n        height: 5px;\n        pointer-events: none;\n        position: absolute;\n      }\n      vg-scrub-bar-buffering-time .background {\n        background-color: rgba(255, 255, 255, 0.3);\n      }\n      vg-controls vg-scrub-bar-buffering-time {\n        position: absolute;\n        top: calc(50% - 3px);\n      }\n      vg-controls vg-scrub-bar-buffering-time .background {\n        -webkit-border-radius: 2px;\n        -moz-border-radius: 2px;\n        border-radius: 2px;\n      }\n    "]
                },] }
    ];
    /** @nocollapse */
    VgScrubBarBufferingTimeComponent.ctorParameters = function () { return [
        { type: core$1.ElementRef },
        { type: core.VgApiService }
    ]; };
    VgScrubBarBufferingTimeComponent.propDecorators = {
        vgFor: [{ type: core$1.Input }]
    };

    // tslint:disable-next-line: no-conflicting-lifecycle
    var VgScrubBarCuePointsComponent = /** @class */ (function () {
        function VgScrubBarCuePointsComponent(ref, API) {
            this.API = API;
            this.onLoadedMetadataCalled = false;
            this.cuePoints = [];
            this.subscriptions = [];
            this.totalCues = 0;
            this.elem = ref.nativeElement;
        }
        VgScrubBarCuePointsComponent.prototype.ngOnInit = function () {
            var _this = this;
            if (this.API.isPlayerReady) {
                this.onPlayerReady();
            }
            else {
                this.subscriptions.push(this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); }));
            }
        };
        VgScrubBarCuePointsComponent.prototype.onPlayerReady = function () {
            this.target = this.API.getMediaById(this.vgFor);
            var onTimeUpdate = this.target.subscriptions.loadedMetadata;
            this.subscriptions.push(onTimeUpdate.subscribe(this.onLoadedMetadata.bind(this)));
            if (this.onLoadedMetadataCalled) {
                this.onLoadedMetadata();
            }
        };
        VgScrubBarCuePointsComponent.prototype.onLoadedMetadata = function () {
            if (this.vgCuePoints) {
                // We need to transform the TextTrackCueList to Array or it doesn't work on IE11/Edge.
                // See: https://github.com/videogular/videogular2/issues/369
                this.cuePoints = [];
                for (var i = 0, l = this.vgCuePoints.length; i < l; i++) {
                    var end = this.vgCuePoints[i].endTime >= 0
                        ? this.vgCuePoints[i].endTime
                        : this.vgCuePoints[i].startTime + 1;
                    var cuePointDuration = (end - this.vgCuePoints[i].startTime) * 1000;
                    var position = '0';
                    var percentWidth = '0';
                    if (typeof cuePointDuration === 'number' && this.target.time.total) {
                        percentWidth =
                            (cuePointDuration * 100) / this.target.time.total + '%';
                        position =
                            (this.vgCuePoints[i].startTime * 100) /
                                Math.round(this.target.time.total / 1000) +
                                '%';
                    }
                    this.vgCuePoints[i].$$style = {
                        width: percentWidth,
                        left: position,
                    };
                    this.cuePoints.push(this.vgCuePoints[i]);
                }
            }
        };
        VgScrubBarCuePointsComponent.prototype.updateCuePoints = function () {
            if (!this.target) {
                this.onLoadedMetadataCalled = true;
                return;
            }
            this.onLoadedMetadata();
        };
        VgScrubBarCuePointsComponent.prototype.ngOnChanges = function (changes) {
            if (changes.vgCuePoints.currentValue) {
                this.updateCuePoints();
            }
        };
        VgScrubBarCuePointsComponent.prototype.ngDoCheck = function () {
            if (this.vgCuePoints) {
                var changes = this.totalCues !== this.vgCuePoints.length;
                if (changes) {
                    this.totalCues = this.vgCuePoints.length;
                    this.updateCuePoints();
                }
            }
        };
        VgScrubBarCuePointsComponent.prototype.ngOnDestroy = function () {
            this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
        };
        return VgScrubBarCuePointsComponent;
    }());
    VgScrubBarCuePointsComponent.decorators = [
        { type: core$1.Component, args: [{
                    selector: 'vg-scrub-bar-cue-points',
                    encapsulation: core$1.ViewEncapsulation.None,
                    template: "\n    <div class=\"cue-point-container\">\n      <span\n        *ngFor=\"let cp of cuePoints\"\n        [style.width]=\"cp.$$style?.width\"\n        [style.left]=\"cp.$$style?.left\"\n        class=\"cue-point\"\n      ></span>\n    </div>\n  ",
                    styles: ["\n      vg-scrub-bar-cue-points {\n        display: flex;\n        width: 100%;\n        height: 5px;\n        pointer-events: none;\n        position: absolute;\n      }\n      vg-scrub-bar-cue-points .cue-point-container .cue-point {\n        position: absolute;\n        height: 5px;\n        background-color: rgba(255, 204, 0, 0.7);\n      }\n      vg-controls vg-scrub-bar-cue-points {\n        position: absolute;\n        top: calc(50% - 3px);\n      }\n    "]
                },] }
    ];
    /** @nocollapse */
    VgScrubBarCuePointsComponent.ctorParameters = function () { return [
        { type: core$1.ElementRef },
        { type: core.VgApiService }
    ]; };
    VgScrubBarCuePointsComponent.propDecorators = {
        vgCuePoints: [{ type: core$1.Input }],
        vgFor: [{ type: core$1.Input }]
    };

    var VgScrubBarCurrentTimeComponent = /** @class */ (function () {
        function VgScrubBarCurrentTimeComponent(ref, API) {
            this.API = API;
            this.vgSlider = false;
            this.subscriptions = [];
            this.elem = ref.nativeElement;
        }
        VgScrubBarCurrentTimeComponent.prototype.ngOnInit = function () {
            var _this = this;
            if (this.API.isPlayerReady) {
                this.onPlayerReady();
            }
            else {
                this.subscriptions.push(this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); }));
            }
        };
        VgScrubBarCurrentTimeComponent.prototype.onPlayerReady = function () {
            this.target = this.API.getMediaById(this.vgFor);
        };
        VgScrubBarCurrentTimeComponent.prototype.getPercentage = function () {
            return this.target
                ? Math.round((this.target.time.current * 100) / this.target.time.total) +
                    '%'
                : '0%';
        };
        VgScrubBarCurrentTimeComponent.prototype.ngOnDestroy = function () {
            this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
        };
        return VgScrubBarCurrentTimeComponent;
    }());
    VgScrubBarCurrentTimeComponent.decorators = [
        { type: core$1.Component, args: [{
                    selector: 'vg-scrub-bar-current-time',
                    encapsulation: core$1.ViewEncapsulation.None,
                    template: "<div class=\"background\" [style.width]=\"getPercentage()\"></div>\n    <span class=\"slider\" *ngIf=\"vgSlider\"></span>",
                    styles: ["\n      vg-scrub-bar-current-time {\n        display: flex;\n        width: 100%;\n        height: 5px;\n        pointer-events: none;\n        position: absolute;\n      }\n      vg-scrub-bar-current-time .background {\n        background-color: white;\n      }\n      vg-controls vg-scrub-bar-current-time {\n        position: absolute;\n        top: calc(50% - 3px);\n        -webkit-border-radius: 2px;\n        -moz-border-radius: 2px;\n        border-radius: 2px;\n      }\n      vg-controls vg-scrub-bar-current-time .background {\n        border: 1px solid white;\n        -webkit-border-radius: 2px;\n        -moz-border-radius: 2px;\n        border-radius: 2px;\n      }\n      vg-scrub-bar-current-time .slider {\n        background: white;\n        height: 15px;\n        width: 15px;\n        border-radius: 50%;\n        box-shadow: 0px 0px 10px black;\n        margin-top: -5px;\n        margin-left: -10px;\n      }\n    "]
                },] }
    ];
    /** @nocollapse */
    VgScrubBarCurrentTimeComponent.ctorParameters = function () { return [
        { type: core$1.ElementRef },
        { type: core.VgApiService }
    ]; };
    VgScrubBarCurrentTimeComponent.propDecorators = {
        vgFor: [{ type: core$1.Input }],
        vgSlider: [{ type: core$1.Input }]
    };

    var components = [
        VgControlsComponent,
        VgVolumeComponent,
        VgTrackSelectorComponent,
        VgTimeDisplayComponent,
        VgScrubBarComponent,
        VgQualitySelectorComponent,
        VgPlaybackButtonComponent,
        VgPlayPauseComponent,
        VgMuteComponent,
        VgFullscreenComponent,
        VgUtcPipe,
        VgScrubBarBufferingTimeComponent,
        VgScrubBarCuePointsComponent,
        VgScrubBarCurrentTimeComponent
    ];
    var VgControlsModule = /** @class */ (function () {
        function VgControlsModule() {
        }
        return VgControlsModule;
    }());
    VgControlsModule.decorators = [
        { type: core$1.NgModule, args: [{
                    imports: [common.CommonModule, core.VgCoreModule],
                    declarations: __spreadArray([], __read(components)),
                    exports: __spreadArray([], __read(components)),
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.VgControlsComponent = VgControlsComponent;
    exports.VgControlsModule = VgControlsModule;
    exports.VgFullscreenComponent = VgFullscreenComponent;
    exports.VgMuteComponent = VgMuteComponent;
    exports.VgPlayPauseComponent = VgPlayPauseComponent;
    exports.VgPlaybackButtonComponent = VgPlaybackButtonComponent;
    exports.VgQualitySelectorComponent = VgQualitySelectorComponent;
    exports.VgScrubBarBufferingTimeComponent = VgScrubBarBufferingTimeComponent;
    exports.VgScrubBarComponent = VgScrubBarComponent;
    exports.VgScrubBarCuePointsComponent = VgScrubBarCuePointsComponent;
    exports.VgScrubBarCurrentTimeComponent = VgScrubBarCurrentTimeComponent;
    exports.VgTimeDisplayComponent = VgTimeDisplayComponent;
    exports.VgTrackSelectorComponent = VgTrackSelectorComponent;
    exports.VgUtcPipe = VgUtcPipe;
    exports.VgVolumeComponent = VgVolumeComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=videogular-ngx-videogular-controls.umd.js.map
