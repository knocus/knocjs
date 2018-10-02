"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Axios = require("axios");
var qs = require('querystring');
var axios = Axios.default;
var Fb = /** @class */ (function () {
    function Fb() {
        var _this = this;
        this.url = function (path, params) {
            var baseUrl = [Fb.GRAPH_URL, path].join('/');
            return [baseUrl, qs.stringify(params)].join('?');
        };
        this.inspectUrl = function (params) {
            return _this.url(Fb.DEBUG_TOKEN_PATH, params);
        };
        this.appTokenUrl = function (params) {
            return _this.url(Fb.APP_TOKEN_PATH, params);
        };
        this.inspectToken = function (config) { return __awaiter(_this, void 0, void 0, function () {
            var app_access_token, params, url, response, fbresponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAppAccessToken(config)];
                    case 1:
                        app_access_token = _a.sent();
                        if (app_access_token === '') {
                            return [2 /*return*/, null];
                        }
                        params = {
                            input_token: config.token,
                            access_token: app_access_token
                        };
                        url = this.inspectUrl(params);
                        return [4 /*yield*/, axios.get(url)];
                    case 2:
                        response = _a.sent();
                        fbresponse = response.data;
                        return [2 /*return*/, fbresponse];
                }
            });
        }); };
        this.getAppAccessToken = function (config) { return __awaiter(_this, void 0, void 0, function () {
            var params, url, response, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            client_id: config.clientId,
                            client_secret: config.clientSecret,
                            grant_type: config.grantType,
                            redirect_uri: config.redirectUri
                        };
                        url = this.appTokenUrl(params);
                        return [4 /*yield*/, axios.get(url)];
                    case 1:
                        response = _a.sent();
                        token = response.data.access_token;
                        return [2 /*return*/, token];
                }
            });
        }); };
        this.getProfile = function (token, userId) { return __awaiter(_this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.url([Fb.version, userId].join('/'), { access_token: token });
                        return [4 /*yield*/, axios.get(url)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        }); };
        this.authenticate = function (config) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.inspectToken(config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.profile = function (token, userId) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getProfile(token, userId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
    }
    Fb.GRAPH_URL = "https://graph.facebook.com";
    Fb.DEBUG_TOKEN_PATH = "debug_token";
    Fb.APP_TOKEN_PATH = "oauth/access_token";
    Fb.version = "v3.1";
    return Fb;
}());
exports.Fb = Fb;
var fb = new Fb();
exports.fb = fb;
