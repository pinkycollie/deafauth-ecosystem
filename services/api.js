"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitIdea = exports.mintDeafPass = void 0;
var supabase_1 = require("./supabase");
var API_BASE_URL = '/api/v1'; // This would be the base URL for your actual backend API.
/**
 * A wrapper for the fetch API that gets the current Supabase session token
 * to authorize requests to external APIs.
 * @param url The API endpoint to call (e.g., '/ideas/submit').
 * @param options The standard RequestInit options for fetch.
 * @returns The JSON response from the API.
 */
var apiFetch = function (url_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([url_1], args_1, true), void 0, function (url, options) {
        var session, token, headers, response, errorData;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supabase_1.supabase.auth.getSession()];
                case 1:
                    session = (_a.sent()).data.session;
                    token = session === null || session === void 0 ? void 0 : session.access_token;
                    headers = __assign({ 'Content-Type': 'application/json' }, options.headers);
                    if (token) {
                        headers['Authorization'] = "Bearer ".concat(token);
                    }
                    return [4 /*yield*/, fetch("".concat(API_BASE_URL).concat(url), __assign(__assign({}, options), { headers: headers }))];
                case 2:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 4];
                    if (response.status === 401) {
                        // The onAuthStateChange listener in AuthContext should handle session errors.
                        // Throw an error to stop the current operation.
                        throw new Error('Your session is invalid or has expired. Please sign in again.');
                    }
                    return [4 /*yield*/, response.json().catch(function () { return ({ message: 'An unknown API error occurred.' }); })];
                case 3:
                    errorData = _a.sent();
                    throw new Error(errorData.message || "HTTP error! status: ".concat(response.status));
                case 4:
                    // Handle responses with no content
                    if (response.status === 204) {
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, response.json()];
            }
        });
    });
};
// --- PROTECTED API CALLS (to your custom backend) ---
var mintDeafPass = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('[API] Minting DeafAuth Pass');
                // MOCK: This is a mock response. In a real app, this would hit your backend.
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1500); })];
            case 1:
                // MOCK: This is a mock response. In a real app, this would hit your backend.
                _a.sent();
                return [2 /*return*/, Promise.resolve({
                        message: 'PersistID minted successfully!',
                        txHash: '0x' + Array(64).fill(0).map(function () { return Math.floor(Math.random() * 16).toString(16); }).join('')
                    })];
        }
    });
}); };
exports.mintDeafPass = mintDeafPass;
var submitIdea = function (idea) { return __awaiter(void 0, void 0, void 0, function () {
    var ideaContent;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("[API] Submitting idea");
                // MOCK: This is a mock response.
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
            case 1:
                // MOCK: This is a mock response.
                _a.sent();
                ideaContent = JSON.parse(idea);
                return [2 /*return*/, Promise.resolve({
                        message: 'Idea submitted successfully!',
                        ideaId: "idea-".concat(Date.now())
                    })];
        }
    });
}); };
exports.submitIdea = submitIdea;
