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
var version_control_1 = require("../services/version-control");
var SpinnerIcon_1 = require("./icons/SpinnerIcon");
var CheckIcon_1 = require("./icons/CheckIcon");
var DeployAuthButton = function (_a) {
    var onDeploy = _a.onDeploy, _b = _a.environment, environment = _b === void 0 ? 'production' : _b, _c = _a.version, version = _c === void 0 ? '1.0.0' : _c, _d = _a.className, className = _d === void 0 ? '' : _d;
    var _e = (0, react_1.useState)('idle'), deployState = _e[0], setDeployState = _e[1];
    var _f = (0, react_1.useState)(null), status = _f[0], setStatus = _f[1];
    var _g = (0, react_1.useState)(null), error = _g[0], setError = _g[1];
    var versionControl = (0, react_1.useState)(function () {
        return (0, version_control_1.createVersionControlService)({
            version: version,
            environment: environment,
            authEnabled: true,
            integrityChecks: true,
            consistencyChecks: true,
        });
    })[0];
    (0, react_1.useEffect)(function () {
        var checkDeploymentReady = function () { return __awaiter(void 0, void 0, void 0, function () {
            var deployStatus, failedChecks, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setDeployState('checking');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, versionControl.initialize()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, versionControl.getDeploymentStatus()];
                    case 3:
                        deployStatus = _a.sent();
                        setStatus(deployStatus);
                        setDeployState(deployStatus.ready ? 'ready' : 'error');
                        if (!deployStatus.ready) {
                            failedChecks = deployStatus.consistency.checks
                                .filter(function (c) { return !c.passed; })
                                .map(function (c) { return c.message; })
                                .join('; ');
                            setError(failedChecks || 'Deployment checks failed');
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        setDeployState('error');
                        setError(err_1 instanceof Error ? err_1.message : 'Failed to check deployment status');
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        checkDeploymentReady();
    }, [versionControl]);
    var handleDeploy = function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (deployState !== 'ready' || !status)
                        return [2 /*return*/];
                    setDeployState('deploying');
                    setError(null);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, versionControl.prepareDeployment()];
                case 2:
                    result = _a.sent();
                    if (result.success) {
                        setDeployState('deployed');
                        onDeploy === null || onDeploy === void 0 ? void 0 : onDeploy(result.status);
                    }
                    else {
                        setDeployState('error');
                        setError(result.message);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    setDeployState('error');
                    setError(err_2 instanceof Error ? err_2.message : 'Deployment failed');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var getButtonContent = function () {
        switch (deployState) {
            case 'idle':
            case 'checking':
                return (<>
            <SpinnerIcon_1.SpinnerIcon className="w-5 h-5 mr-2"/>
            <span>Checking System...</span>
          </>);
            case 'ready':
                return (<>
            <CheckIcon_1.CheckIcon className="w-5 h-5 mr-2"/>
            <span>Deploy Auth System</span>
          </>);
            case 'deploying':
                return (<>
            <SpinnerIcon_1.SpinnerIcon className="w-5 h-5 mr-2"/>
            <span>Deploying...</span>
          </>);
            case 'deployed':
                return (<>
            <CheckIcon_1.CheckIcon className="w-5 h-5 mr-2"/>
            <span>Deployed ✓</span>
          </>);
            case 'error':
                return <span>Retry Deploy</span>;
        }
    };
    var getButtonStyles = function () {
        var baseStyles = 'flex items-center justify-center px-6 py-3 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';
        switch (deployState) {
            case 'idle':
            case 'checking':
                return "".concat(baseStyles, " bg-gray-600 text-white");
            case 'ready':
                return "".concat(baseStyles, " bg-green-600 hover:bg-green-700 text-white");
            case 'deploying':
                return "".concat(baseStyles, " bg-yellow-600 text-white");
            case 'deployed':
                return "".concat(baseStyles, " bg-green-700 text-white");
            case 'error':
                return "".concat(baseStyles, " bg-red-600 hover:bg-red-700 text-white");
        }
    };
    return (<div className={"".concat(className)}>
      <button onClick={handleDeploy} disabled={deployState === 'checking' || deployState === 'deploying' || deployState === 'deployed'} className={getButtonStyles()}>
        {getButtonContent()}
      </button>
      
      {/* Status Display */}
      {status && (<div className="mt-4 p-4 bg-gray-800/50 border border-gray-700 rounded-lg text-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Version:</span>
            <span className="text-white font-mono">{status.version.version}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Environment:</span>
            <span className={"font-mono ".concat(status.config.environment === 'production'
                ? 'text-green-400'
                : status.config.environment === 'staging'
                    ? 'text-yellow-400'
                    : 'text-blue-400')}>
              {status.config.environment}
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Integrity:</span>
            <span className={status.integrity.isValid ? 'text-green-400' : 'text-red-400'}>
              {status.integrity.isValid ? '✓ Valid' : '✗ Invalid'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Consistency:</span>
            <span className={status.consistency.isConsistent ? 'text-green-400' : 'text-red-400'}>
              {status.consistency.isConsistent ? '✓ Consistent' : '✗ Issues'}
            </span>
          </div>
          {status.version.hash && (<div className="mt-2 pt-2 border-t border-gray-700">
              <span className="text-gray-500 text-xs font-mono">
                Hash: {status.version.hash.substring(0, 16)}...
              </span>
            </div>)}
        </div>)}

      {/* Error Display */}
      {error && (<div className="mt-2 p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-400 text-sm">
          {error}
        </div>)}
    </div>);
};
exports.default = DeployAuthButton;
