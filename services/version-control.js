"use strict";
/**
 * Version Control & Integrity Framework
 * Framework-agnostic version control ensuring integrity, validation, and consistency
 */
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersionControlService = void 0;
exports.createVersionControlService = createVersionControlService;
exports.getVersionControlService = getVersionControlService;
/**
 * Generate a simple hash for integrity verification
 * Using a basic hashing approach that works in browser environments
 */
function generateHash(data) {
    return __awaiter(this, void 0, void 0, function () {
        var encoder, dataBuffer, hashBuffer, hashArray;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    encoder = new TextEncoder();
                    dataBuffer = encoder.encode(data);
                    return [4 /*yield*/, crypto.subtle.digest('SHA-256', dataBuffer)];
                case 1:
                    hashBuffer = _a.sent();
                    hashArray = Array.from(new Uint8Array(hashBuffer));
                    return [2 /*return*/, hashArray.map(function (b) { return b.toString(16).padStart(2, '0'); }).join('')];
            }
        });
    });
}
/**
 * Version Control Service
 * Provides framework-agnostic version control with integrity and consistency validation
 */
var VersionControlService = /** @class */ (function () {
    function VersionControlService(config) {
        var defaultConfig = {
            version: '1.0.0',
            environment: 'development',
            authEnabled: true,
            integrityChecks: true,
            consistencyChecks: true,
        };
        this.config = __assign(__assign({}, defaultConfig), config);
        this.currentVersion = {
            version: this.config.version,
            hash: '',
            timestamp: new Date().toISOString(),
            environment: this.config.environment,
        };
    }
    /**
     * Initialize version control with computed hash
     */
    VersionControlService.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var versionData, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        versionData = JSON.stringify({
                            version: this.config.version,
                            environment: this.config.environment,
                            timestamp: this.currentVersion.timestamp,
                        });
                        _a = this.currentVersion;
                        return [4 /*yield*/, generateHash(versionData)];
                    case 1:
                        _a.hash = _b.sent();
                        return [2 /*return*/, this.currentVersion];
                }
            });
        });
    };
    /**
     * Get current version information
     */
    VersionControlService.prototype.getVersion = function () {
        return __assign({}, this.currentVersion);
    };
    /**
     * Verify data integrity
     */
    VersionControlService.prototype.verifyIntegrity = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, warnings, timestamp, dataString, hash, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        errors = [];
                        warnings = [];
                        timestamp = new Date().toISOString();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        // Validate data exists
                        if (data === null || data === undefined) {
                            errors.push('Data is null or undefined');
                        }
                        // Validate data type
                        if (typeof data !== 'object' && typeof data !== 'string') {
                            warnings.push('Data is not an object or string');
                        }
                        dataString = typeof data === 'string' ? data : JSON.stringify(data);
                        return [4 /*yield*/, generateHash(dataString)];
                    case 2:
                        hash = _a.sent();
                        return [2 /*return*/, {
                                isValid: errors.length === 0,
                                hash: hash,
                                errors: errors,
                                warnings: warnings,
                                timestamp: timestamp,
                            }];
                    case 3:
                        error_1 = _a.sent();
                        errors.push("Integrity check failed: ".concat(error_1 instanceof Error ? error_1.message : 'Unknown error'));
                        return [2 /*return*/, {
                                isValid: false,
                                hash: '',
                                errors: errors,
                                warnings: warnings,
                                timestamp: timestamp,
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Validate auth configuration
     */
    VersionControlService.prototype.validateAuthConfig = function (authConfig) {
        var errors = [];
        var warnings = [];
        var timestamp = new Date().toISOString();
        if (!authConfig || typeof authConfig !== 'object') {
            errors.push('Auth configuration is missing or invalid');
            return { isValid: false, hash: '', errors: errors, warnings: warnings, timestamp: timestamp };
        }
        var config = authConfig;
        // Check required auth fields
        if (!config.providers || !Array.isArray(config.providers)) {
            warnings.push('No authentication providers configured');
        }
        if (!config.redirectUrl) {
            warnings.push('No redirect URL configured');
        }
        return {
            isValid: errors.length === 0,
            hash: '',
            errors: errors,
            warnings: warnings,
            timestamp: timestamp,
        };
    };
    /**
     * Check system consistency
     */
    VersionControlService.prototype.checkConsistency = function () {
        return __awaiter(this, void 0, void 0, function () {
            var checks, timestamp, allPassed;
            return __generator(this, function (_a) {
                checks = [];
                timestamp = new Date().toISOString();
                // Check version consistency
                checks.push({
                    name: 'version_format',
                    passed: /^\d+\.\d+\.\d+$/.test(this.config.version),
                    message: this.config.version.match(/^\d+\.\d+\.\d+$/)
                        ? 'Version format is valid (semver)'
                        : 'Version should follow semver format (x.y.z)',
                });
                // Check environment consistency
                checks.push({
                    name: 'environment',
                    passed: ['development', 'staging', 'production'].includes(this.config.environment),
                    message: "Environment is set to: ".concat(this.config.environment),
                });
                // Check auth configuration
                checks.push({
                    name: 'auth_enabled',
                    passed: this.config.authEnabled,
                    message: this.config.authEnabled
                        ? 'Authentication is enabled'
                        : 'Authentication is disabled',
                });
                // Check integrity checks configuration
                checks.push({
                    name: 'integrity_checks',
                    passed: this.config.integrityChecks,
                    message: this.config.integrityChecks
                        ? 'Integrity checks are enabled'
                        : 'Integrity checks are disabled',
                });
                // Check hash presence
                checks.push({
                    name: 'version_hash',
                    passed: this.currentVersion.hash.length > 0,
                    message: this.currentVersion.hash.length > 0
                        ? 'Version hash is generated'
                        : 'Version hash is missing - call initialize() first',
                });
                allPassed = checks.every(function (check) { return check.passed; });
                return [2 /*return*/, {
                        isConsistent: allPassed,
                        checks: checks,
                        timestamp: timestamp,
                    }];
            });
        });
    };
    /**
     * Get complete deployment status
     */
    VersionControlService.prototype.getDeploymentStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var version, integrity, consistency, ready;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        version = this.getVersion();
                        return [4 /*yield*/, this.verifyIntegrity(this.config)];
                    case 1:
                        integrity = _a.sent();
                        return [4 /*yield*/, this.checkConsistency()];
                    case 2:
                        consistency = _a.sent();
                        ready = integrity.isValid && consistency.isConsistent;
                        return [2 /*return*/, {
                                ready: ready,
                                version: version,
                                integrity: integrity,
                                consistency: consistency,
                                config: __assign({}, this.config),
                            }];
                }
            });
        });
    };
    /**
     * Update configuration
     */
    VersionControlService.prototype.updateConfig = function (updates) {
        this.config = __assign(__assign({}, this.config), updates);
    };
    /**
     * Prepare for deployment
     */
    VersionControlService.prototype.prepareDeployment = function () {
        return __awaiter(this, void 0, void 0, function () {
            var status, failedChecks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initialize()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getDeploymentStatus()];
                    case 2:
                        status = _a.sent();
                        if (!status.ready) {
                            failedChecks = status.consistency.checks
                                .filter(function (c) { return !c.passed; })
                                .map(function (c) { return c.name; })
                                .join(', ');
                            return [2 /*return*/, {
                                    success: false,
                                    status: status,
                                    message: "Deployment not ready. Failed checks: ".concat(failedChecks || 'integrity issues'),
                                }];
                        }
                        return [2 /*return*/, {
                                success: true,
                                status: status,
                                message: "Ready to deploy version ".concat(status.version.version, " to ").concat(status.config.environment),
                            }];
                }
            });
        });
    };
    return VersionControlService;
}());
exports.VersionControlService = VersionControlService;
/**
 * Factory function to create a version control service
 */
function createVersionControlService(config) {
    return new VersionControlService(config);
}
/**
 * Default instance for quick access
 */
var defaultInstance = null;
function getVersionControlService(config) {
    if (!defaultInstance) {
        defaultInstance = createVersionControlService(config);
    }
    return defaultInstance;
}
