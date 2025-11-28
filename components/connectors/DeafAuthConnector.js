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
var CameraIcon_1 = require("../icons/CameraIcon");
var DeafAuthConnector = function (_a) {
    var onBack = _a.onBack;
    var _b = (0, useAuth_1.useAuth)(), login = _b.login, loading = _b.loading, error = _b.error;
    var _c = (0, react_1.useState)('idle'), verificationState = _c[0], setVerificationState = _c[1];
    var videoRef = (0, react_1.useRef)(null);
    var streamRef = (0, react_1.useRef)(null);
    var stopCamera = function () {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(function (track) { return track.stop(); });
            streamRef.current = null;
        }
    };
    // Cleanup effect
    (0, react_1.useEffect)(function () {
        return function () {
            stopCamera();
        };
    }, []);
    var startVerification = function () { return __awaiter(void 0, void 0, void 0, function () {
        var stream, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setVerificationState('initializing');
                    if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, navigator.mediaDevices.getUserMedia({ video: true })];
                case 2:
                    stream = _a.sent();
                    streamRef.current = stream;
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                    setVerificationState('ready');
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.error("Camera access denied:", err_1);
                    setVerificationState('permission_denied');
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 6];
                case 5:
                    setVerificationState('permission_denied'); // Or a 'not_supported' state
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var handleLogin = function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockToken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setVerificationState('verifying');
                    stopCamera();
                    // Simulate a delay for AI processing
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 2500); })];
                case 1:
                    // Simulate a delay for AI processing
                    _a.sent();
                    mockToken = 'deafauth-token-' + Date.now();
                    // The context now handles how to process this custom auth type
                    return [4 /*yield*/, login(types_1.AuthProviderType.DEAF_AUTH, { token: mockToken })];
                case 2:
                    // The context now handles how to process this custom auth type
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var renderContent = function () {
        switch (verificationState) {
            case 'idle':
                return (<div className="text-center">
                        <p className="text-gray-400 text-sm mb-4">An ASL-first, visual authentication experience.</p>
                        <div className="text-center text-xs text-gray-500 border border-gray-700 rounded-md p-2 mb-6 bg-gray-900/50">
                            <p><strong className="font-semibold text-gray-400">Note:</strong> This simulates a real DeafAuth verification using your camera.</p>
                        </div>
                        <CameraIcon_1.CameraIcon className="w-16 h-16 mx-auto text-blue-500 mb-4"/>
                        <button onClick={startVerification} className="w-full flex items-center justify-center p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-white font-bold">
                            Start Verification
                        </button>
                    </div>);
            case 'initializing':
                return (<div className="text-center py-8">
                        <SpinnerIcon_1.SpinnerIcon className="w-10 h-10 mx-auto"/>
                        <p className="mt-4 text-gray-400">Initializing camera...</p>
                    </div>);
            case 'permission_denied':
                return (<div className="text-center">
                         <p className="text-red-400 text-sm mb-4">Camera access was denied. Please enable camera permissions in your browser settings to use DeafAuth.</p>
                         <button onClick={onBack} className="w-full flex items-center justify-center p-3 bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors duration-200 text-white font-bold">
                            Go Back
                         </button>
                    </div>);
            case 'verifying':
                return (<div className="aspect-video bg-gray-900 rounded-md mb-6 flex items-center justify-center border border-gray-600 relative">
                        <video ref={videoRef} autoPlay playsInline muted className="absolute w-full h-full object-cover rounded-md opacity-30"></video>
                        <div className="z-10 text-center">
                           <SpinnerIcon_1.SpinnerIcon className="w-10 h-10 mx-auto"/>
                           <p className="mt-4 text-white font-semibold">Verifying with DeafAuth AI...</p>
                        </div>
                    </div>);
            case 'ready':
                return (<>
                        <div className="aspect-video bg-gray-900 rounded-md mb-6 flex items-center justify-center border border-gray-600 relative overflow-hidden">
                            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover"></video>
                            <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                CHALLENGE: Sign "Hello"
                            </div>
                        </div>
                        <button onClick={handleLogin} disabled={loading} className="w-full flex items-center justify-center p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-white font-bold disabled:bg-blue-800 disabled:cursor-not-allowed">
                            {loading ? <SpinnerIcon_1.SpinnerIcon /> : 'Confirm Identity'}
                        </button>
                    </>);
        }
    };
    return (<div>
            <button onClick={function () { stopCamera(); onBack(); }} className="flex items-center text-sm text-gray-400 hover:text-white mb-4">
                <ArrowLeftIcon_1.ArrowLeftIcon />
                Back
            </button>
            <h3 className="text-xl font-bold text-center text-white mb-2">DeafAuth</h3>
            {error && <p className="text-red-400 text-center text-sm mb-4">{error}</p>}
            {renderContent()}
        </div>);
};
exports.default = DeafAuthConnector;
