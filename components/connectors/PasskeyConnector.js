"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var types_1 = require("../../types");
var useAuth_1 = require("../../hooks/useAuth");
var SpinnerIcon_1 = require("../icons/SpinnerIcon");
var ArrowLeftIcon_1 = require("../icons/ArrowLeftIcon");
var PasskeyConnector = function (_a) {
    var onBack = _a.onBack, onSuccess = _a.onSuccess;
    var _b = (0, useAuth_1.useAuth)(), login = _b.login, loading = _b.loading, error = _b.error;
    var handleLogin = function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockAssertion;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockAssertion = {
                        id: 'passkey-assertion-id',
                        rawId: 'raw-id',
                        response: {
                            authenticatorData: 'auth-data',
                            clientDataJSON: 'client-json',
                            signature: 'sig',
                            userHandle: 'user-handle'
                        },
                        type: 'public-key'
                    };
                    return [4 /*yield*/, login(types_1.AuthProviderType.PASSKEY, { assertion: mockAssertion })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return (<div>
            <button onClick={onBack} className="flex items-center text-sm text-gray-400 hover:text-white mb-4">
                <ArrowLeftIcon_1.ArrowLeftIcon />
                Back
            </button>
            <h3 className="text-xl font-bold text-center text-white mb-2">Use Passkey</h3>
            <p className="text-center text-gray-400 text-sm mb-6">The fastest and most secure way to sign in.</p>

            {error && <p className="text-red-400 text-center text-sm mb-4">{error}</p>}
            
            <button onClick={handleLogin} disabled={loading} className="w-full flex items-center justify-center p-3 bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200 text-white font-bold disabled:bg-green-800 disabled:cursor-not-allowed">
                {loading ? <SpinnerIcon_1.SpinnerIcon /> : 'Sign In with Passkey'}
            </button>
            <p className="text-xs text-gray-500 text-center mt-4">Your device will prompt you to use your fingerprint, face, or PIN.</p>
        </div>);
};
exports.default = PasskeyConnector;
