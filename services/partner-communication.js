"use strict";
/**
 * Partner Communication Service
 * Communicates deaf user status to PinkSync, 360 Magicians, and other partners
 * Enables adaptive accessibility coordination across the ecosystem
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
exports.PartnerCommunicationService = void 0;
exports.createPartnerCommunicationService = createPartnerCommunicationService;
var supabase_1 = require("./supabase");
var PartnerCommunicationService = /** @class */ (function () {
    function PartnerCommunicationService(oidcProvider) {
        this.partners = new Map([
            ['pinksync', 'https://pinksync.io/api/v1/deafauth/notify'],
            ['360magicians', 'https://360magicians.com/api/v1/accessibility/update'],
            ['fibronrose', 'https://fibronrose.mbtq.dev/api/v1/trust/sync'],
        ]);
        this.oidcProvider = oidcProvider;
    }
    /**
     * Get comprehensive deaf user profile
     */
    PartnerCommunicationService.prototype.getDeafUserProfile = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, profile, profileError, verification, deafUserProfile, error_1;
            var _b, _c, _d, _e, _f, _g, _h, _j, _k;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        _l.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, supabase_1.supabase
                                .from('accessibility_profiles')
                                .select('*')
                                .eq('user_id', userId)
                                .single()];
                    case 1:
                        _a = _l.sent(), profile = _a.data, profileError = _a.error;
                        if (profileError || !profile) {
                            console.error('Failed to fetch deaf user profile:', profileError);
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, supabase_1.supabase
                                .from('user_verification')
                                .select('*')
                                .eq('user_id', userId)
                                .single()];
                    case 2:
                        verification = (_l.sent()).data;
                        deafUserProfile = {
                            userId: userId,
                            // Determine if user is deaf based on deaf identity markers
                            // Users with deaf_identity set or sign language preferences are considered deaf
                            isDeaf: profile.hearing_tech_used === true ||
                                ((_d = (_c = (_b = profile.language_preferences) === null || _b === void 0 ? void 0 : _b.signLanguages) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) > 0 ||
                                ((_e = profile.interpretation_preferences) === null || _e === void 0 ? void 0 : _e.required) === true,
                            signLanguages: ((_f = profile.language_preferences) === null || _f === void 0 ? void 0 : _f.signLanguages) || [],
                            communicationPreferences: {
                                preferred: profile.preferred_communication_methods || ['ASL'],
                                requiresVisualAlerts: ((_g = profile.visual_accommodation_needs) === null || _g === void 0 ? void 0 : _g.alerts) || true,
                                requiresCaptions: ((_h = profile.visual_accommodation_needs) === null || _h === void 0 ? void 0 : _h.captions) || true,
                                requiresInterpreter: ((_j = profile.interpretation_preferences) === null || _j === void 0 ? void 0 : _j.required) || false,
                            },
                            accessibilitySettings: {
                                visualInterface: true,
                                adaptiveContent: true,
                                minimalMode: ((_k = profile.cognitive_support_needs) === null || _k === void 0 ? void 0 : _k.minimalMode) || false,
                            },
                            fibronroseScore: (verification === null || verification === void 0 ? void 0 : verification.verification_score) || 0,
                        };
                        return [2 /*return*/, deafUserProfile];
                    case 3:
                        error_1 = _l.sent();
                        console.error('Error getting deaf user profile:', error_1);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Notify partners about deaf user authentication
     * This allows partners to adapt their interfaces and services
     */
    PartnerCommunicationService.prototype.notifyPartners = function (userId, action) {
        return __awaiter(this, void 0, void 0, function () {
            var profile, partnerToken, notifications;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDeafUserProfile(userId)];
                    case 1:
                        profile = _a.sent();
                        if (!profile) {
                            console.error('Cannot notify partners: user profile not found');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.oidcProvider.createPartnerToken(userId, profile.isDeaf, {
                                signLanguages: profile.signLanguages,
                                accessibilityNeeds: profile.communicationPreferences,
                            })];
                    case 2:
                        partnerToken = _a.sent();
                        notifications = Array.from(this.partners.entries()).map(function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
                            var notification, response, error_2;
                            var partner = _b[0], endpoint = _b[1];
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        _c.trys.push([0, 3, , 4]);
                                        notification = {
                                            userId: userId,
                                            partner: partner,
                                            action: action,
                                            deafUserProfile: profile,
                                            timestamp: new Date(),
                                        };
                                        return [4 /*yield*/, fetch(endpoint, {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Authorization': "Bearer ".concat(partnerToken),
                                                    'X-DeafAuth-Version': '1.0',
                                                },
                                                body: JSON.stringify(notification),
                                            })];
                                    case 1:
                                        response = _c.sent();
                                        if (!response.ok) {
                                            console.error("Failed to notify ".concat(partner, ":"), response.statusText);
                                        }
                                        else {
                                            console.log("Successfully notified ".concat(partner, " about user ").concat(userId));
                                        }
                                        // Log notification in database
                                        return [4 /*yield*/, this.logPartnerNotification(notification)];
                                    case 2:
                                        // Log notification in database
                                        _c.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        error_2 = _c.sent();
                                        console.error("Error notifying partner ".concat(partner, ":"), error_2);
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(notifications)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Log partner notification for audit trail
     */
    PartnerCommunicationService.prototype.logPartnerNotification = function (notification) {
        return __awaiter(this, void 0, void 0, function () {
            var error, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, supabase_1.supabase
                                .from('service_logs')
                                .insert({
                                user_id: notification.userId,
                                service_type: notification.partner,
                                communication_mode: notification.deafUserProfile.communicationPreferences.preferred[0],
                                interaction_timestamp: notification.timestamp.toISOString(),
                                additional_metadata: {
                                    action: notification.action,
                                    isDeaf: notification.deafUserProfile.isDeaf,
                                },
                            })];
                    case 1:
                        error = (_a.sent()).error;
                        if (error) {
                            console.error('Failed to log partner notification:', error);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.error('Error logging partner notification:', error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Update accessibility preferences and notify partners
     */
    PartnerCommunicationService.prototype.updateAccessibilityPreferences = function (userId, preferences) {
        return __awaiter(this, void 0, void 0, function () {
            var error, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, supabase_1.supabase
                                .from('accessibility_profiles')
                                .update({
                                preferred_communication_methods: preferences.preferred,
                                emergency_communication_preferences: {
                                    requiresVisualAlerts: preferences.requiresVisualAlerts,
                                    requiresCaptions: preferences.requiresCaptions,
                                    requiresInterpreter: preferences.requiresInterpreter,
                                },
                                last_updated: new Date().toISOString(),
                            })
                                .eq('user_id', userId)];
                    case 1:
                        error = (_a.sent()).error;
                        if (error) {
                            console.error('Failed to update accessibility preferences:', error);
                            return [2 /*return*/, false];
                        }
                        // Notify partners of the update
                        return [4 /*yield*/, this.notifyPartners(userId, 'accessibility_preferences_updated')];
                    case 2:
                        // Notify partners of the update
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3:
                        error_4 = _a.sent();
                        console.error('Error updating accessibility preferences:', error_4);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Register new partner service
     */
    PartnerCommunicationService.prototype.registerPartner = function (name, endpoint) {
        this.partners.set(name, endpoint);
        console.log("Registered partner: ".concat(name, " at ").concat(endpoint));
    };
    /**
     * Adaptive middleware to adjust response based on deaf user profile
     * Adds accessibility metadata to responses for frontend adaptation
     */
    PartnerCommunicationService.prototype.adaptiveAccessibilityMiddleware = function () {
        var _this = this;
        return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var originalJson;
            var _this = this;
            return __generator(this, function (_a) {
                originalJson = res.json.bind(res);
                res.json = function (data) { return __awaiter(_this, void 0, void 0, function () {
                    var enhancedData;
                    var _a, _b;
                    return __generator(this, function (_c) {
                        // Add accessibility context if user is deaf
                        if ((_a = req.deafUser) === null || _a === void 0 ? void 0 : _a.isDeaf) {
                            enhancedData = __assign(__assign({}, data), { _accessibility: {
                                    deafUser: true,
                                    visualMode: true,
                                    minimalAdaptive: ((_b = req.deafUser.accessibilityNeeds) === null || _b === void 0 ? void 0 : _b.minimalMode) || false,
                                    signLanguages: req.deafUser.signLanguages || [],
                                    recommendations: {
                                        enableCaptions: true,
                                        useVisualAlerts: true,
                                        provideSignLanguageSupport: true,
                                    },
                                } });
                            return [2 /*return*/, originalJson(enhancedData)];
                        }
                        return [2 /*return*/, originalJson(data)];
                    });
                }); };
                next();
                return [2 /*return*/];
            });
        }); };
    };
    /**
     * Get accessibility recommendations for partners
     */
    PartnerCommunicationService.prototype.getAccessibilityRecommendations = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var profile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDeafUserProfile(userId)];
                    case 1:
                        profile = _a.sent();
                        if (!profile) {
                            return [2 /*return*/, {
                                    recommendations: [],
                                    message: 'User profile not found',
                                }];
                        }
                        return [2 /*return*/, {
                                recommendations: [
                                    profile.communicationPreferences.requiresCaptions && {
                                        type: 'captions',
                                        priority: 'high',
                                        message: 'Enable real-time captions for all audio content',
                                    },
                                    profile.communicationPreferences.requiresVisualAlerts && {
                                        type: 'visual_alerts',
                                        priority: 'high',
                                        message: 'Use visual alerts instead of audio notifications',
                                    },
                                    profile.communicationPreferences.requiresInterpreter && {
                                        type: 'interpreter',
                                        priority: 'medium',
                                        message: 'Consider providing sign language interpreter support',
                                    },
                                    profile.accessibilitySettings.minimalMode && {
                                        type: 'minimal_ui',
                                        priority: 'medium',
                                        message: 'Use minimal, distraction-free interface',
                                    },
                                ].filter(Boolean),
                                signLanguages: profile.signLanguages,
                                preferredCommunication: profile.communicationPreferences.preferred,
                            }];
                }
            });
        });
    };
    return PartnerCommunicationService;
}());
exports.PartnerCommunicationService = PartnerCommunicationService;
/**
 * Factory function to create partner communication service
 */
function createPartnerCommunicationService(oidcProvider) {
    return new PartnerCommunicationService(oidcProvider);
}
