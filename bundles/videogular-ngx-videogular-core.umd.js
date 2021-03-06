(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@videogular/ngx-videogular/core', ['exports', '@angular/core', '@angular/common', 'rxjs', 'rxjs/operators'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.videogular = global.videogular || {}, global.videogular['ngx-videogular'] = global.videogular['ngx-videogular'] || {}, global.videogular['ngx-videogular'].core = {}), global.ng.core, global.ng.common, global.rxjs, global.rxjs.operators));
}(this, (function (exports, i0, common, rxjs, operators) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);

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

    var VgStates = /** @class */ (function () {
        function VgStates() {
        }
        return VgStates;
    }());
    VgStates.VG_ENDED = 'ended';
    VgStates.VG_PAUSED = 'paused';
    VgStates.VG_PLAYING = 'playing';
    VgStates.VG_LOADING = 'waiting';
    /** @nocollapse */ VgStates.??prov = i0__namespace.????defineInjectable({ factory: function VgStates_Factory() { return new VgStates(); }, token: VgStates, providedIn: "root" });
    VgStates.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];

    var VgApiService = /** @class */ (function () {
        function VgApiService() {
            this.medias = {}; // TODO: refactor to Set<IPlayable>
            this.playerReadyEvent = new i0.EventEmitter(true);
            this.isPlayerReady = false;
        }
        VgApiService.prototype.onPlayerReady = function (fsAPI) {
            this.fsAPI = fsAPI;
            this.isPlayerReady = true;
            this.playerReadyEvent.emit(this);
        };
        VgApiService.prototype.getDefaultMedia = function () {
            for (var item in this.medias) {
                if (this.medias[item]) {
                    return this.medias[item];
                }
            }
        };
        VgApiService.prototype.getMasterMedia = function () {
            var master;
            for (var id in this.medias) {
                if (this.medias[id].vgMaster === 'true' ||
                    this.medias[id].vgMaster === true) {
                    master = this.medias[id];
                    break;
                }
            }
            return master || this.getDefaultMedia();
        };
        VgApiService.prototype.isMasterDefined = function () {
            var result = false;
            for (var id in this.medias) {
                if (this.medias[id].vgMaster === 'true' ||
                    this.medias[id].vgMaster === true) {
                    result = true;
                    break;
                }
            }
            return result;
        };
        VgApiService.prototype.getMediaById = function (id) {
            if (id === void 0) { id = null; }
            var media = this.medias[id];
            if (!id || id === '*') {
                media = this;
            }
            return media;
        };
        VgApiService.prototype.play = function () {
            for (var id in this.medias) {
                if (this.medias[id]) {
                    this.medias[id].play();
                }
            }
        };
        VgApiService.prototype.pause = function () {
            for (var id in this.medias) {
                if (this.medias[id]) {
                    this.medias[id].pause();
                }
            }
        };
        Object.defineProperty(VgApiService.prototype, "duration", {
            get: function () {
                return this.$$getAllProperties('duration');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VgApiService.prototype, "currentTime", {
            get: function () {
                return this.$$getAllProperties('currentTime');
            },
            set: function (seconds) {
                this.$$setAllProperties('currentTime', seconds);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VgApiService.prototype, "state", {
            get: function () {
                return this.$$getAllProperties('state');
            },
            set: function (state) {
                this.$$setAllProperties('state', state);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VgApiService.prototype, "volume", {
            get: function () {
                return this.$$getAllProperties('volume');
            },
            set: function (volume) {
                this.$$setAllProperties('volume', volume);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VgApiService.prototype, "playbackRate", {
            get: function () {
                return this.$$getAllProperties('playbackRate');
            },
            set: function (rate) {
                this.$$setAllProperties('playbackRate', rate);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VgApiService.prototype, "canPlay", {
            get: function () {
                return this.$$getAllProperties('canPlay');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VgApiService.prototype, "canPlayThrough", {
            get: function () {
                return this.$$getAllProperties('canPlayThrough');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VgApiService.prototype, "isMetadataLoaded", {
            get: function () {
                return this.$$getAllProperties('isMetadataLoaded');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VgApiService.prototype, "isWaiting", {
            get: function () {
                return this.$$getAllProperties('isWaiting');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VgApiService.prototype, "isCompleted", {
            get: function () {
                return this.$$getAllProperties('isCompleted');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VgApiService.prototype, "isLive", {
            get: function () {
                return this.$$getAllProperties('isLive');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VgApiService.prototype, "isMaster", {
            get: function () {
                return this.$$getAllProperties('isMaster');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VgApiService.prototype, "time", {
            get: function () {
                return this.$$getAllProperties('time');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VgApiService.prototype, "buffer", {
            get: function () {
                return this.$$getAllProperties('buffer');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VgApiService.prototype, "buffered", {
            get: function () {
                return this.$$getAllProperties('buffered');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VgApiService.prototype, "subscriptions", {
            get: function () {
                return this.$$getAllProperties('subscriptions');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VgApiService.prototype, "textTracks", {
            get: function () {
                return this.$$getAllProperties('textTracks');
            },
            enumerable: false,
            configurable: true
        });
        VgApiService.prototype.seekTime = function (value, byPercent) {
            if (byPercent === void 0) { byPercent = false; }
            for (var id in this.medias) {
                if (this.medias[id]) {
                    this.$$seek(this.medias[id], value, byPercent);
                }
            }
        };
        VgApiService.prototype.$$seek = function (media, value, byPercent) {
            if (byPercent === void 0) { byPercent = false; }
            var second;
            var duration = media.duration;
            if (byPercent) {
                if (this.isMasterDefined()) {
                    duration = this.getMasterMedia().duration;
                }
                second = (value * duration) / 100;
            }
            else {
                second = value;
            }
            media.currentTime = second;
        };
        VgApiService.prototype.addTextTrack = function (type, label, language) {
            for (var id in this.medias) {
                if (this.medias[id]) {
                    this.$$addTextTrack(this.medias[id], type, label, language);
                }
            }
        };
        VgApiService.prototype.$$addTextTrack = function (media, type, label, language) {
            media.addTextTrack(type, label, language);
        };
        VgApiService.prototype.$$getAllProperties = function (property) {
            var medias = {};
            var result;
            for (var id in this.medias) {
                if (this.medias[id]) {
                    medias[id] = this.medias[id];
                }
            }
            var nMedias = Object.keys(medias).length;
            switch (nMedias) {
                case 0:
                    // Return default values until vgMedia is initialized
                    switch (property) {
                        case 'state':
                            result = VgStates.VG_PAUSED;
                            break;
                        case 'playbackRate':
                        case 'volume':
                            result = 1;
                            break;
                        case 'time':
                            result = { current: 0, total: 0, left: 0 };
                            break;
                    }
                    break;
                case 1:
                    // If there's only one media element then return the plain value
                    var firstMediaId = Object.keys(medias)[0];
                    result = medias[firstMediaId][property];
                    break;
                default:
                    // TODO: return 'master' value
                    var master = this.getMasterMedia();
                    result = medias[master.id][property];
            }
            return result;
        };
        VgApiService.prototype.$$setAllProperties = function (property, value) {
            for (var id in this.medias) {
                if (this.medias[id]) {
                    this.medias[id][property] = value;
                }
            }
        };
        VgApiService.prototype.registerElement = function (elem) {
            this.videogularElement = elem;
        };
        VgApiService.prototype.registerMedia = function (media) {
            this.medias[media.id] = media;
        };
        VgApiService.prototype.unregisterMedia = function (media) {
            delete this.medias[media.id];
        };
        return VgApiService;
    }());
    /** @nocollapse */ VgApiService.??prov = i0__namespace.????defineInjectable({ factory: function VgApiService_Factory() { return new VgApiService(); }, token: VgApiService, providedIn: "root" });
    VgApiService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    /** @nocollapse */
    VgApiService.ctorParameters = function () { return []; };

    var VgControlsHiddenService = /** @class */ (function () {
        function VgControlsHiddenService() {
            this.isHiddenSubject = new rxjs.Subject();
            this.isHidden = this.isHiddenSubject.asObservable();
        }
        VgControlsHiddenService.prototype.state = function (hidden) {
            this.isHiddenSubject.next(hidden);
        };
        return VgControlsHiddenService;
    }());
    /** @nocollapse */ VgControlsHiddenService.??prov = i0__namespace.????defineInjectable({ factory: function VgControlsHiddenService_Factory() { return new VgControlsHiddenService(); }, token: VgControlsHiddenService, providedIn: "root" });
    VgControlsHiddenService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    /** @nocollapse */
    VgControlsHiddenService.ctorParameters = function () { return []; };

    var VgUtilsService = /** @class */ (function () {
        function VgUtilsService() {
        }
        /**
         * Inspired by Paul Irish
         * https://gist.github.com/paulirish/211209
         */
        VgUtilsService.getZIndex = function () {
            var zIndex = 1;
            var elementZIndex;
            var tags = document.getElementsByTagName('*');
            for (var i = 0, l = tags.length; i < l; i++) {
                elementZIndex = parseInt(window.getComputedStyle(tags[i])['z-index'], 10);
                if (elementZIndex > zIndex) {
                    zIndex = elementZIndex + 1;
                }
            }
            return zIndex;
        };
        // Very simple mobile detection, not 100% reliable
        VgUtilsService.isMobileDevice = function () {
            // return (
            //   typeof window.screen.orientation !== 'undefined' ||
            //   navigator.userAgent.indexOf('IEMobile') !== -1
            // );
            // window.orientation is deprecated and we should use window.screen.orientation
            return (typeof window.orientation !== 'undefined' ||
                navigator.userAgent.indexOf('IEMobile') !== -1);
        };
        VgUtilsService.isiOSDevice = function () {
            return (navigator.userAgent.match(/ip(hone|ad|od)/i) &&
                !navigator.userAgent.match(/(iemobile)[\/\s]?([\w\.]*)/i));
        };
        VgUtilsService.isCordova = function () {
            return (document.URL.indexOf('http://') === -1 &&
                document.URL.indexOf('https://') === -1);
        };
        return VgUtilsService;
    }());
    /** @nocollapse */ VgUtilsService.??prov = i0__namespace.????defineInjectable({ factory: function VgUtilsService_Factory() { return new VgUtilsService(); }, token: VgUtilsService, providedIn: "root" });
    VgUtilsService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];

    var VgFullscreenApiService = /** @class */ (function () {
        function VgFullscreenApiService() {
            this.nativeFullscreen = true;
            this.isFullscreen = false;
            this.onChangeFullscreen = new i0.EventEmitter();
        }
        VgFullscreenApiService.prototype.init = function (elem, medias) {
            var _this = this;
            this.videogularElement = elem;
            this.medias = medias;
            var APIs = {
                w3: {
                    enabled: 'fullscreenEnabled',
                    element: 'fullscreenElement',
                    request: 'requestFullscreen',
                    exit: 'exitFullscreen',
                    onchange: 'fullscreenchange',
                    onerror: 'fullscreenerror',
                },
                newWebkit: {
                    enabled: 'webkitFullscreenEnabled',
                    element: 'webkitFullscreenElement',
                    request: 'webkitRequestFullscreen',
                    exit: 'webkitExitFullscreen',
                    onchange: 'webkitfullscreenchange',
                    onerror: 'webkitfullscreenerror',
                },
                oldWebkit: {
                    enabled: 'webkitIsFullScreen',
                    element: 'webkitCurrentFullScreenElement',
                    request: 'webkitRequestFullScreen',
                    exit: 'webkitCancelFullScreen',
                    onchange: 'webkitfullscreenchange',
                    onerror: 'webkitfullscreenerror',
                },
                moz: {
                    enabled: 'mozFullScreen',
                    element: 'mozFullScreenElement',
                    request: 'mozRequestFullScreen',
                    exit: 'mozCancelFullScreen',
                    onchange: 'mozfullscreenchange',
                    onerror: 'mozfullscreenerror',
                },
                ios: {
                    enabled: 'webkitFullscreenEnabled',
                    element: 'webkitFullscreenElement',
                    request: 'webkitEnterFullscreen',
                    exit: 'webkitExitFullscreen',
                    onchange: 'webkitendfullscreen',
                    onerror: 'webkitfullscreenerror',
                },
                ms: {
                    enabled: 'msFullscreenEnabled',
                    element: 'msFullscreenElement',
                    request: 'msRequestFullscreen',
                    exit: 'msExitFullscreen',
                    onchange: 'MSFullscreenChange',
                    onerror: 'MSFullscreenError',
                },
            };
            for (var browser in APIs) {
                if (APIs[browser].enabled in document) {
                    this.polyfill = APIs[browser];
                    break;
                }
            }
            if (VgUtilsService.isiOSDevice()) {
                this.polyfill = APIs.ios;
            }
            this.isAvailable = this.polyfill != null;
            if (this.polyfill == null) {
                return;
            }
            var fsElemDispatcher;
            switch (this.polyfill.onchange) {
                // Mozilla dispatches the fullscreen change event from document, not the element
                // See: https://bugzilla.mozilla.org/show_bug.cgi?id=724816#c3
                case 'mozfullscreenchange':
                    fsElemDispatcher = document;
                    break;
                // iOS dispatches the fullscreen change event from video element
                case 'webkitendfullscreen':
                    fsElemDispatcher = this.medias.toArray()[0].elem;
                    break;
                // HTML5 implementation dispatches the fullscreen change event from the element
                default:
                    fsElemDispatcher = elem;
            }
            this.fsChangeSubscription = rxjs.fromEvent(fsElemDispatcher, this.polyfill.onchange).subscribe(function () {
                _this.onFullscreenChange();
            });
        };
        VgFullscreenApiService.prototype.onFullscreenChange = function () {
            this.isFullscreen = !!document[this.polyfill.element];
            this.onChangeFullscreen.emit(this.isFullscreen);
        };
        VgFullscreenApiService.prototype.toggleFullscreen = function (element) {
            if (element === void 0) { element = null; }
            if (this.isFullscreen) {
                this.exit();
            }
            else {
                this.request(element);
            }
        };
        VgFullscreenApiService.prototype.request = function (elem) {
            if (!elem) {
                elem = this.videogularElement;
            }
            this.isFullscreen = true;
            this.onChangeFullscreen.emit(true);
            // Perform native full screen support
            if (this.isAvailable && this.nativeFullscreen) {
                // Fullscreen for mobile devices
                if (VgUtilsService.isMobileDevice()) {
                    // We should make fullscreen the video object if it doesn't have native fullscreen support
                    // Fallback! We can't set vg-player on fullscreen, only video/audio objects
                    if ((!this.polyfill.enabled && elem === this.videogularElement) ||
                        VgUtilsService.isiOSDevice()) {
                        elem = this.medias.toArray()[0].elem;
                    }
                    this.enterElementInFullScreen(elem);
                }
                else {
                    this.enterElementInFullScreen(this.videogularElement);
                }
            }
        };
        VgFullscreenApiService.prototype.enterElementInFullScreen = function (elem) {
            elem[this.polyfill.request]();
        };
        VgFullscreenApiService.prototype.exit = function () {
            this.isFullscreen = false;
            this.onChangeFullscreen.emit(false);
            // Exit from native fullscreen
            if (this.isAvailable && this.nativeFullscreen) {
                document[this.polyfill.exit]();
            }
        };
        return VgFullscreenApiService;
    }());
    /** @nocollapse */ VgFullscreenApiService.??prov = i0__namespace.????defineInjectable({ factory: function VgFullscreenApiService_Factory() { return new VgFullscreenApiService(); }, token: VgFullscreenApiService, providedIn: "root" });
    VgFullscreenApiService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    /** @nocollapse */
    VgFullscreenApiService.ctorParameters = function () { return []; };

    var VgEvents = /** @class */ (function () {
        function VgEvents() {
        }
        return VgEvents;
    }());
    VgEvents.VG_ABORT = 'abort';
    VgEvents.VG_CAN_PLAY = 'canplay';
    VgEvents.VG_CAN_PLAY_THROUGH = 'canplaythrough';
    VgEvents.VG_DURATION_CHANGE = 'durationchange';
    VgEvents.VG_EMPTIED = 'emptied';
    VgEvents.VG_ENCRYPTED = 'encrypted';
    VgEvents.VG_ENDED = 'ended';
    VgEvents.VG_ERROR = 'error';
    VgEvents.VG_LOADED_DATA = 'loadeddata';
    VgEvents.VG_LOADED_METADATA = 'loadedmetadata';
    VgEvents.VG_LOAD_START = 'loadstart';
    VgEvents.VG_PAUSE = 'pause';
    VgEvents.VG_PLAY = 'play';
    VgEvents.VG_PLAYING = 'playing';
    VgEvents.VG_PROGRESS = 'progress';
    VgEvents.VG_RATE_CHANGE = 'ratechange';
    VgEvents.VG_SEEK = 'seek';
    VgEvents.VG_SEEKED = 'seeked';
    VgEvents.VG_SEEKING = 'seeking';
    VgEvents.VG_STALLED = 'stalled';
    VgEvents.VG_SUSPEND = 'suspend';
    VgEvents.VG_TIME_UPDATE = 'timeupdate';
    VgEvents.VG_VOLUME_CHANGE = 'volumechange';
    VgEvents.VG_WAITING = 'waiting';
    VgEvents.VG_LOAD = 'load';
    VgEvents.VG_ENTER = 'enter';
    VgEvents.VG_EXIT = 'exit';
    VgEvents.VG_START_ADS = 'startads';
    VgEvents.VG_END_ADS = 'endads';
    /** @nocollapse */ VgEvents.??prov = i0__namespace.????defineInjectable({ factory: function VgEvents_Factory() { return new VgEvents(); }, token: VgEvents, providedIn: "root" });
    VgEvents.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];

    var VgCuePointsDirective = /** @class */ (function () {
        function VgCuePointsDirective(ref) {
            this.ref = ref;
            this.onEnterCuePoint = new i0.EventEmitter();
            this.onUpdateCuePoint = new i0.EventEmitter();
            this.onExitCuePoint = new i0.EventEmitter();
            this.onCompleteCuePoint = new i0.EventEmitter();
            this.subscriptions = [];
            this.cuesSubscriptions = [];
            this.totalCues = 0;
        }
        VgCuePointsDirective.prototype.ngOnInit = function () {
            this.onLoad$ = rxjs.fromEvent(this.ref.nativeElement, VgEvents.VG_LOAD);
            this.subscriptions.push(this.onLoad$.subscribe(this.onLoad.bind(this)));
        };
        VgCuePointsDirective.prototype.onLoad = function (event) {
            var cues = event.target.track.cues;
            this.ref.nativeElement.cues = cues;
            this.updateCuePoints(cues);
        };
        VgCuePointsDirective.prototype.updateCuePoints = function (cues) {
            this.cuesSubscriptions.forEach(function (s) { return s.unsubscribe(); });
            for (var i = 0, l = cues.length; i < l; i++) {
                this.onEnter$ = rxjs.fromEvent(cues[i], VgEvents.VG_ENTER);
                this.cuesSubscriptions.push(this.onEnter$.subscribe(this.onEnter.bind(this)));
                this.onExit$ = rxjs.fromEvent(cues[i], VgEvents.VG_EXIT);
                this.cuesSubscriptions.push(this.onExit$.subscribe(this.onExit.bind(this)));
            }
        };
        VgCuePointsDirective.prototype.onEnter = function (event) {
            this.onEnterCuePoint.emit(event.target);
        };
        VgCuePointsDirective.prototype.onExit = function (event) {
            this.onExitCuePoint.emit(event.target);
        };
        VgCuePointsDirective.prototype.ngDoCheck = function () {
            if (this.ref.nativeElement.track && this.ref.nativeElement.track.cues) {
                var changes = this.totalCues !== this.ref.nativeElement.track.cues.length;
                if (changes) {
                    this.totalCues = this.ref.nativeElement.track.cues.length;
                    this.ref.nativeElement.cues = this.ref.nativeElement.track.cues;
                    this.updateCuePoints(this.ref.nativeElement.track.cues);
                }
            }
        };
        VgCuePointsDirective.prototype.ngOnDestroy = function () {
            this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
        };
        return VgCuePointsDirective;
    }());
    VgCuePointsDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[vgCuePoints]',
                },] }
    ];
    /** @nocollapse */
    VgCuePointsDirective.ctorParameters = function () { return [
        { type: i0.ElementRef }
    ]; };
    VgCuePointsDirective.propDecorators = {
        onEnterCuePoint: [{ type: i0.Output }],
        onUpdateCuePoint: [{ type: i0.Output }],
        onExitCuePoint: [{ type: i0.Output }],
        onCompleteCuePoint: [{ type: i0.Output }]
    };

    var VgMediaDirective = /** @class */ (function () {
        function VgMediaDirective(api, ref) {
            this.api = api;
            this.ref = ref;
            this.state = VgStates.VG_PAUSED;
            this.time = { current: 0, total: 0, left: 0 };
            this.buffer = { end: 0 };
            this.canPlay = false;
            this.canPlayThrough = false;
            this.isMetadataLoaded = false;
            this.isWaiting = false;
            this.isCompleted = false;
            this.isLive = false;
            this.isBufferDetected = false;
            this.checkInterval = 200;
            this.currentPlayPos = 0;
            this.lastPlayPos = 0;
            this.playAtferSync = false;
            this.bufferDetected = new rxjs.Subject();
        }
        VgMediaDirective.prototype.ngOnInit = function () {
            var _this = this;
            if (this.vgMedia.nodeName) {
                // It's a native element
                this.elem = this.vgMedia;
            }
            else {
                // It's an Angular Class
                this.elem = this.vgMedia.elem;
            }
            // Just in case we're creating this vgMedia dynamically register again into API
            this.api.registerMedia(this);
            this.subscriptions = {
                // Native events
                abort: rxjs.fromEvent(this.elem, VgEvents.VG_ABORT),
                canPlay: rxjs.fromEvent(this.elem, VgEvents.VG_CAN_PLAY),
                canPlayThrough: rxjs.fromEvent(this.elem, VgEvents.VG_CAN_PLAY_THROUGH),
                durationChange: rxjs.fromEvent(this.elem, VgEvents.VG_DURATION_CHANGE),
                emptied: rxjs.fromEvent(this.elem, VgEvents.VG_EMPTIED),
                encrypted: rxjs.fromEvent(this.elem, VgEvents.VG_ENCRYPTED),
                ended: rxjs.fromEvent(this.elem, VgEvents.VG_ENDED),
                error: rxjs.fromEvent(this.elem, VgEvents.VG_ERROR),
                loadedData: rxjs.fromEvent(this.elem, VgEvents.VG_LOADED_DATA),
                loadedMetadata: rxjs.fromEvent(this.elem, VgEvents.VG_LOADED_METADATA),
                loadStart: rxjs.fromEvent(this.elem, VgEvents.VG_LOAD_START),
                pause: rxjs.fromEvent(this.elem, VgEvents.VG_PAUSE),
                play: rxjs.fromEvent(this.elem, VgEvents.VG_PLAY),
                playing: rxjs.fromEvent(this.elem, VgEvents.VG_PLAYING),
                progress: rxjs.fromEvent(this.elem, VgEvents.VG_PROGRESS),
                rateChange: rxjs.fromEvent(this.elem, VgEvents.VG_RATE_CHANGE),
                seeked: rxjs.fromEvent(this.elem, VgEvents.VG_SEEKED),
                seeking: rxjs.fromEvent(this.elem, VgEvents.VG_SEEKING),
                stalled: rxjs.fromEvent(this.elem, VgEvents.VG_STALLED),
                suspend: rxjs.fromEvent(this.elem, VgEvents.VG_SUSPEND),
                timeUpdate: rxjs.fromEvent(this.elem, VgEvents.VG_TIME_UPDATE),
                volumeChange: rxjs.fromEvent(this.elem, VgEvents.VG_VOLUME_CHANGE),
                waiting: rxjs.fromEvent(this.elem, VgEvents.VG_WAITING),
                // Advertisement only events
                startAds: rxjs.fromEvent(window, VgEvents.VG_START_ADS),
                endAds: rxjs.fromEvent(window, VgEvents.VG_END_ADS),
                // See changes on <source> child elements to reload the video file
                mutation: new rxjs.Observable(function (observer) {
                    var domObs = new MutationObserver(function (mutations) {
                        observer.next(mutations);
                    });
                    domObs.observe(_this.elem, { childList: true, attributes: true });
                    return function () {
                        domObs.disconnect();
                    };
                }),
                // Custom buffering detection
                bufferDetected: this.bufferDetected,
            };
            this.mutationObs = this.subscriptions.mutation.subscribe(this.onMutation.bind(this));
            this.canPlayObs = this.subscriptions.canPlay.subscribe(this.onCanPlay.bind(this));
            this.canPlayThroughObs = this.subscriptions.canPlayThrough.subscribe(this.onCanPlayThrough.bind(this));
            this.loadedMetadataObs = this.subscriptions.loadedMetadata.subscribe(this.onLoadMetadata.bind(this));
            this.waitingObs = this.subscriptions.waiting.subscribe(this.onWait.bind(this));
            this.progressObs = this.subscriptions.progress.subscribe(this.onProgress.bind(this));
            this.endedObs = this.subscriptions.ended.subscribe(this.onComplete.bind(this));
            this.playingObs = this.subscriptions.playing.subscribe(this.onStartPlaying.bind(this));
            this.playObs = this.subscriptions.play.subscribe(this.onPlay.bind(this));
            this.pauseObs = this.subscriptions.pause.subscribe(this.onPause.bind(this));
            this.timeUpdateObs = this.subscriptions.timeUpdate.subscribe(this.onTimeUpdate.bind(this));
            this.volumeChangeObs = this.subscriptions.volumeChange.subscribe(this.onVolumeChange.bind(this));
            this.errorObs = this.subscriptions.error.subscribe(this.onError.bind(this));
            if (this.vgMaster) {
                this.api.playerReadyEvent.subscribe(function () {
                    _this.prepareSync();
                });
            }
        };
        VgMediaDirective.prototype.prepareSync = function () {
            var _this = this;
            var canPlayAll = [];
            for (var media in this.api.medias) {
                if (this.api.medias[media]) {
                    canPlayAll.push(this.api.medias[media].subscriptions.canPlay);
                }
            }
            this.canPlayAllSubscription = rxjs.combineLatest(canPlayAll)
                .pipe(operators.map(function () {
                var params = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    params[_i] = arguments[_i];
                }
                var checkReadyState = function (event) {
                    if (!(event === null || event === void 0 ? void 0 : event.target)) {
                        return false;
                    }
                    return event.target.readyState === 4;
                };
                var allReady = params.some(checkReadyState);
                if (allReady && !_this.syncSubscription) {
                    _this.startSync();
                    _this.syncSubscription.unsubscribe();
                }
            }))
                .subscribe();
        };
        VgMediaDirective.prototype.startSync = function () {
            var _this = this;
            this.syncSubscription = rxjs.timer(0, 1000).subscribe(function () {
                for (var media in _this.api.medias) {
                    if (_this.api.medias[media] !== _this) {
                        var diff = _this.api.medias[media].currentTime - _this.currentTime;
                        if (diff < -0.3 || diff > 0.3) {
                            _this.playAtferSync = _this.state === VgStates.VG_PLAYING;
                            _this.pause();
                            _this.api.medias[media].pause();
                            _this.api.medias[media].currentTime = _this.currentTime;
                        }
                        else {
                            if (_this.playAtferSync) {
                                _this.play();
                                _this.api.medias[media].play();
                                _this.playAtferSync = false;
                            }
                        }
                    }
                }
            });
        };
        VgMediaDirective.prototype.onMutation = function (mutations) {
            // Detect changes only for source elements or src attribute
            for (var i = 0, l = mutations.length; i < l; i++) {
                var mut = mutations[i];
                if (mut.type === 'attributes' && mut.attributeName === 'src') {
                    // Only load src file if it's not a blob (for DASH / HLS sources)
                    if (mut.target.src &&
                        mut.target.src.length > 0 &&
                        mut.target.src.indexOf('blob:') < 0) {
                        this.loadMedia();
                        break;
                    }
                }
                else if (mut.type === 'childList' &&
                    mut.removedNodes.length &&
                    mut.removedNodes[0].nodeName.toLowerCase() === 'source') {
                    this.loadMedia();
                    break;
                }
            }
        };
        VgMediaDirective.prototype.loadMedia = function () {
            var _this = this;
            this.vgMedia.pause();
            this.vgMedia.currentTime = 0;
            // Start buffering until we can play the media file
            this.stopBufferCheck();
            this.isBufferDetected = true;
            this.bufferDetected.next(this.isBufferDetected);
            // TODO: This is ugly, we should find something cleaner. For some reason a TimerObservable doesn't works.
            setTimeout(function () { return _this.vgMedia.load(); }, 10);
        };
        VgMediaDirective.prototype.play = function () {
            var _this = this;
            // short-circuit if already playing
            if (this.playPromise ||
                (this.state !== VgStates.VG_PAUSED && this.state !== VgStates.VG_ENDED)) {
                return;
            }
            this.playPromise = this.vgMedia.play();
            // browser has async play promise
            if (this.playPromise && this.playPromise.then && this.playPromise.catch) {
                this.playPromise
                    .then(function () {
                    _this.playPromise = null;
                })
                    .catch(function () {
                    _this.playPromise = null;
                    // deliberately empty for the sake of eating console noise
                });
            }
            return this.playPromise;
        };
        VgMediaDirective.prototype.pause = function () {
            var _this = this;
            // browser has async play promise
            if (this.playPromise) {
                this.playPromise.then(function () {
                    _this.vgMedia.pause();
                });
            }
            else {
                this.vgMedia.pause();
            }
        };
        Object.defineProperty(VgMediaDirective.prototype, "id", {
            get: function () {
                // We should return undefined if vgMedia still doesn't exist
                var result;
                if (this.vgMedia) {
                    result = this.vgMedia.id;
                }
                return result;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VgMediaDirective.prototype, "duration", {
            get: function () {
                return this.vgMedia.duration === Infinity
                    ? this.specifiedDuration
                    : this.vgMedia.duration;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VgMediaDirective.prototype, "currentTime", {
            get: function () {
                return this.vgMedia.currentTime;
            },
            set: function (seconds) {
                this.vgMedia.currentTime = seconds;
                // this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_SEEK));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VgMediaDirective.prototype, "volume", {
            get: function () {
                return this.vgMedia.volume;
            },
            set: function (volume) {
                this.vgMedia.volume = volume;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VgMediaDirective.prototype, "playbackRate", {
            get: function () {
                return this.vgMedia.playbackRate;
            },
            set: function (rate) {
                this.vgMedia.playbackRate = rate;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VgMediaDirective.prototype, "buffered", {
            get: function () {
                return this.vgMedia.buffered;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VgMediaDirective.prototype, "textTracks", {
            get: function () {
                return this.vgMedia.textTracks;
            },
            enumerable: false,
            configurable: true
        });
        // @ts-ignore
        VgMediaDirective.prototype.onCanPlay = function (event) {
            this.isBufferDetected = false;
            this.bufferDetected.next(this.isBufferDetected);
            this.canPlay = true;
            this.ref.detectChanges();
        };
        // @ts-ignore
        VgMediaDirective.prototype.onCanPlayThrough = function (event) {
            this.isBufferDetected = false;
            this.bufferDetected.next(this.isBufferDetected);
            this.canPlayThrough = true;
            this.ref.detectChanges();
        };
        // @ts-ignore
        VgMediaDirective.prototype.onLoadMetadata = function (event) {
            this.isMetadataLoaded = true;
            this.time = {
                current: 0,
                left: 0,
                total: this.duration * 1000,
            };
            this.state = VgStates.VG_PAUSED;
            // Live streaming check
            var t = Math.round(this.time.total);
            this.isLive = t === Infinity;
            this.ref.detectChanges();
        };
        // @ts-ignore
        VgMediaDirective.prototype.onWait = function (event) {
            this.isWaiting = true;
            this.ref.detectChanges();
        };
        // @ts-ignore
        VgMediaDirective.prototype.onComplete = function (event) {
            this.isCompleted = true;
            this.state = VgStates.VG_ENDED;
            this.ref.detectChanges();
        };
        // @ts-ignore
        VgMediaDirective.prototype.onStartPlaying = function (event) {
            this.state = VgStates.VG_PLAYING;
            this.ref.detectChanges();
        };
        // @ts-ignore
        VgMediaDirective.prototype.onPlay = function (event) {
            this.state = VgStates.VG_PLAYING;
            if (this.vgMaster) {
                if (!this.syncSubscription || this.syncSubscription.closed) {
                    this.startSync();
                }
            }
            this.startBufferCheck();
            this.ref.detectChanges();
        };
        // @ts-ignore
        VgMediaDirective.prototype.onPause = function (event) {
            this.state = VgStates.VG_PAUSED;
            if (this.vgMaster) {
                if (!this.playAtferSync) {
                    this.syncSubscription.unsubscribe();
                }
            }
            this.stopBufferCheck();
            this.ref.detectChanges();
        };
        // @ts-ignore
        VgMediaDirective.prototype.onTimeUpdate = function (event) {
            var end = this.buffered.length - 1;
            this.time = {
                current: this.currentTime * 1000,
                total: this.time.total,
                left: (this.duration - this.currentTime) * 1000,
            };
            if (end >= 0) {
                this.buffer = { end: this.buffered.end(end) * 1000 };
            }
            this.ref.detectChanges();
        };
        // @ts-ignore
        VgMediaDirective.prototype.onProgress = function (event) {
            var end = this.buffered.length - 1;
            if (end >= 0) {
                this.buffer = { end: this.buffered.end(end) * 1000 };
            }
            this.ref.detectChanges();
        };
        // @ts-ignore
        VgMediaDirective.prototype.onVolumeChange = function (event) {
            // TODO: Save to localstorage the current volume
            this.ref.detectChanges();
        };
        // @ts-ignore
        VgMediaDirective.prototype.onError = function (event) {
            // TODO: Handle error messages
            this.ref.detectChanges();
        };
        // http://stackoverflow.com/a/23828241/779529
        VgMediaDirective.prototype.bufferCheck = function () {
            var offset = 1 / this.checkInterval;
            this.currentPlayPos = this.currentTime;
            if (!this.isBufferDetected &&
                this.currentPlayPos < this.lastPlayPos + offset) {
                this.isBufferDetected = true;
            }
            if (this.isBufferDetected &&
                this.currentPlayPos > this.lastPlayPos + offset) {
                this.isBufferDetected = false;
            }
            // Prevent calls to bufferCheck after ngOnDestroy have been called
            if (!this.bufferDetected.closed) {
                this.bufferDetected.next(this.isBufferDetected);
            }
            this.lastPlayPos = this.currentPlayPos;
        };
        VgMediaDirective.prototype.startBufferCheck = function () {
            var _this = this;
            this.checkBufferSubscription = rxjs.timer(0, this.checkInterval).subscribe(function () {
                _this.bufferCheck();
            });
        };
        VgMediaDirective.prototype.stopBufferCheck = function () {
            if (this.checkBufferSubscription) {
                this.checkBufferSubscription.unsubscribe();
            }
            this.isBufferDetected = false;
            this.bufferDetected.next(this.isBufferDetected);
        };
        VgMediaDirective.prototype.seekTime = function (value, byPercent) {
            if (byPercent === void 0) { byPercent = false; }
            var second;
            var duration = this.duration;
            if (byPercent) {
                second = (value * duration) / 100;
            }
            else {
                second = value;
            }
            this.currentTime = second;
        };
        VgMediaDirective.prototype.addTextTrack = function (type, label, language, mode) {
            var newTrack = this.vgMedia.addTextTrack(type, label, language);
            if (mode) {
                newTrack.mode = mode;
            }
            return newTrack;
        };
        VgMediaDirective.prototype.ngOnDestroy = function () {
            this.vgMedia.src = '';
            this.mutationObs.unsubscribe();
            this.canPlayObs.unsubscribe();
            this.canPlayThroughObs.unsubscribe();
            this.loadedMetadataObs.unsubscribe();
            this.waitingObs.unsubscribe();
            this.progressObs.unsubscribe();
            this.endedObs.unsubscribe();
            this.playingObs.unsubscribe();
            this.playObs.unsubscribe();
            this.pauseObs.unsubscribe();
            this.timeUpdateObs.unsubscribe();
            this.volumeChangeObs.unsubscribe();
            this.errorObs.unsubscribe();
            if (this.checkBufferSubscription) {
                this.checkBufferSubscription.unsubscribe();
            }
            if (this.syncSubscription) {
                this.syncSubscription.unsubscribe();
            }
            this.bufferDetected.complete();
            this.bufferDetected.unsubscribe();
            this.api.unregisterMedia(this);
        };
        return VgMediaDirective;
    }());
    VgMediaDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[vgMedia]',
                },] }
    ];
    /** @nocollapse */
    VgMediaDirective.ctorParameters = function () { return [
        { type: VgApiService },
        { type: i0.ChangeDetectorRef }
    ]; };
    VgMediaDirective.propDecorators = {
        vgMedia: [{ type: i0.Input }],
        vgMaster: [{ type: i0.Input }]
    };

    var VgPlayerComponent = /** @class */ (function () {
        function VgPlayerComponent(ref, api, fsAPI, controlsHidden) {
            this.api = api;
            this.fsAPI = fsAPI;
            this.controlsHidden = controlsHidden;
            this.isFullscreen = false;
            this.isNativeFullscreen = false;
            this.areControlsHidden = false;
            this.onPlayerReady = new i0.EventEmitter();
            this.onMediaReady = new i0.EventEmitter();
            this.subscriptions = [];
            this.elem = ref.nativeElement;
            this.api.registerElement(this.elem);
        }
        VgPlayerComponent.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.medias.toArray().forEach(function (media) {
                _this.api.registerMedia(media);
            });
            this.fsAPI.init(this.elem, this.medias);
            this.subscriptions.push(this.fsAPI.onChangeFullscreen.subscribe(this.onChangeFullscreen.bind(this)));
            this.subscriptions.push(this.controlsHidden.isHidden.subscribe(this.onHideControls.bind(this)));
            this.api.onPlayerReady(this.fsAPI);
            this.onPlayerReady.emit(this.api);
        };
        VgPlayerComponent.prototype.onChangeFullscreen = function (fsState) {
            if (!this.fsAPI.nativeFullscreen) {
                this.isFullscreen = fsState;
                this.zIndex = fsState ? VgUtilsService.getZIndex().toString() : 'auto';
            }
            else {
                this.isNativeFullscreen = fsState;
            }
        };
        VgPlayerComponent.prototype.onHideControls = function (hidden) {
            this.areControlsHidden = hidden;
        };
        VgPlayerComponent.prototype.ngOnDestroy = function () {
            this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
        };
        return VgPlayerComponent;
    }());
    VgPlayerComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vg-player',
                    encapsulation: i0.ViewEncapsulation.None,
                    template: "<ng-content></ng-content>",
                    providers: [VgApiService, VgFullscreenApiService, VgControlsHiddenService],
                    styles: ["\n      vg-player {\n        font-family: 'videogular';\n        position: relative;\n        display: flex;\n        width: 100%;\n        height: 100%;\n        overflow: hidden;\n        background-color: black;\n      }\n      vg-player.fullscreen {\n        position: fixed;\n        left: 0;\n        top: 0;\n      }\n      vg-player.native-fullscreen.controls-hidden {\n        cursor: none;\n      }\n    "]
                },] }
    ];
    /** @nocollapse */
    VgPlayerComponent.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: VgApiService },
        { type: VgFullscreenApiService },
        { type: VgControlsHiddenService }
    ]; };
    VgPlayerComponent.propDecorators = {
        isFullscreen: [{ type: i0.HostBinding, args: ['class.fullscreen',] }],
        isNativeFullscreen: [{ type: i0.HostBinding, args: ['class.native-fullscreen',] }],
        areControlsHidden: [{ type: i0.HostBinding, args: ['class.controls-hidden',] }],
        zIndex: [{ type: i0.HostBinding, args: ['style.z-index',] }],
        onPlayerReady: [{ type: i0.Output }],
        onMediaReady: [{ type: i0.Output }],
        medias: [{ type: i0.ContentChildren, args: [VgMediaDirective,] }]
    };

    var services = [
        VgApiService,
        VgControlsHiddenService,
        VgFullscreenApiService,
        VgUtilsService,
        VgEvents,
        VgStates
    ];
    var directives = [
        VgCuePointsDirective,
        VgMediaDirective
    ];
    var VgCoreModule = /** @class */ (function () {
        function VgCoreModule() {
        }
        return VgCoreModule;
    }());
    VgCoreModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [common.CommonModule],
                    providers: __spreadArray([], __read(services)),
                    declarations: __spreadArray(__spreadArray([], __read(directives)), [VgPlayerComponent]),
                    exports: __spreadArray(__spreadArray([], __read(directives)), [VgPlayerComponent])
                },] }
    ];

    var VgMediaElement = /** @class */ (function () {
        function VgMediaElement() {
        }
        Object.defineProperty(VgMediaElement.prototype, "audioTracks", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        // @ts-ignore
        VgMediaElement.prototype.addTextTrack = function (kind, label, language) {
            return null;
        };
        // @ts-ignore
        VgMediaElement.prototype.canPlayType = function (type) {
            return null;
        };
        VgMediaElement.prototype.load = function () { };
        VgMediaElement.prototype.msClearEffects = function () { };
        VgMediaElement.prototype.msGetAsCastingSource = function () {
            return null;
        };
        // @ts-ignore
        VgMediaElement.prototype.msInsertAudioEffect = function (_activatableClassId, _effectRequired, _config) { };
        // @ts-ignore
        VgMediaElement.prototype.msSetMediaKeys = function (mediaKeys) { };
        // @ts-ignore
        VgMediaElement.prototype.msSetMediaProtectionManager = function (mediaProtectionManager) { };
        VgMediaElement.prototype.pause = function () { };
        VgMediaElement.prototype.play = function () {
            return null;
        };
        // @ts-ignore
        VgMediaElement.prototype.setMediaKeys = function (mediaKeys) {
            return null;
        };
        // @ts-ignore
        VgMediaElement.prototype.addEventListener = function (_type, _listener, _useCapture) { };
        return VgMediaElement;
    }());

    /**
     * Generated bundle index. Do not edit.
     */

    exports.VgApiService = VgApiService;
    exports.VgControlsHiddenService = VgControlsHiddenService;
    exports.VgCoreModule = VgCoreModule;
    exports.VgCuePointsDirective = VgCuePointsDirective;
    exports.VgEvents = VgEvents;
    exports.VgFullscreenApiService = VgFullscreenApiService;
    exports.VgMediaDirective = VgMediaDirective;
    exports.VgMediaElement = VgMediaElement;
    exports.VgPlayerComponent = VgPlayerComponent;
    exports.VgStates = VgStates;
    exports.VgUtilsService = VgUtilsService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=videogular-ngx-videogular-core.umd.js.map
