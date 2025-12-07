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
var EmailConnector = function (_a) {
    var onBack = _a.onBack, onSuccess = _a.onSuccess;
    var _b = (0, react_1.useState)(''), email = _b[0], setEmail = _b[1];
    var _c = (0, react_1.useState)(false), submitted = _c[0], setSubmitted = _c[1];
    var _d = (0, useAuth_1.useAuth)(), login = _d.login, loading = _d.loading, error = _d.error;
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var authError;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    return [4 /*yield*/, login(types_1.AuthProviderType.EMAIL, { email: email })];
                case 1:
                    _a.sent();
                    authError = (0, useAuth_1.useAuth)().error;
                    if (!authError) {
                        setSubmitted(true);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return (<div>
            <button onClick={onBack} className="flex items-center text-sm text-gray-400 hover:text-white mb-4">
                <ArrowLeftIcon_1.ArrowLeftIcon />
                Back
            </button>
            <h3 className="text-xl font-bold text-center text-white mb-2">Sign in with Email</h3>
            
            {error && <p className="text-red-400 text-center text-sm my-4">{error}</p>}

            {!submitted ? (<>
                    <p className="text-center text-gray-400 text-sm mb-6">We'll send a secure magic link to your email.</p>
                    <form onSubmit={handleSubmit}>
                        <input type="email" value={email} onChange={function (e) { return setEmail(e.target.value); }} placeholder="you@example.com" className="w-full bg-gray-900 border border-gray-600 rounded-md p-3 mb-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition" required/>
                        <button type="submit" disabled={loading} className="w-full flex items-center justify-center p-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors duration-200 text-white font-bold disabled:bg-purple-800 disabled:cursor-not-allowed">
                            {loading ? <SpinnerIcon_1.SpinnerIcon /> : 'Send Magic Link'}
                        </button>
                    </form>
                </>) : (<div className="text-center">
                    <p className="text-gray-300">Magic link sent to <strong>{email}</strong>.</p>
                    <p className="text-gray-400 mt-2">Please check your inbox and click the link to sign in.</p>
                </div>)}
        </div>);
};
exports.default = EmailConnector;
