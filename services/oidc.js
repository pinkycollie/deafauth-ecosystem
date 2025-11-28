"use strict";
/**
 * OpenID Connect (OIDC) Provider Configuration
 * Implements production-ready OIDC/OAuth2 authentication
 * Compliant with OpenID Connect Core 1.0 specification
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
exports.OIDCProvider = void 0;
exports.createOIDCProvider = createOIDCProvider;
exports.deafUserMiddleware = deafUserMiddleware;
var openid_client_1 = require("openid-client");
var jose_1 = require("jose");
var OIDCProvider = /** @class */ (function () {
    function OIDCProvider(config, jwtSecret) {
        this.client = null;
        this.codeVerifiers = new Map(); // Store code verifiers by state
        this.config = __assign({ scope: 'openid email profile' }, config);
        this.jwtSecret = new TextEncoder().encode(jwtSecret);
    }
    /**
     * Initialize OIDC client with issuer discovery
     */
    OIDCProvider.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var issuer, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, openid_client_1.Issuer.discover(this.config.issuer)];
                    case 1:
                        issuer = _a.sent();
                        this.client = new issuer.Client({
                            client_id: this.config.clientId,
                            client_secret: this.config.clientSecret,
                            redirect_uris: [this.config.redirectUri],
                            response_types: ['code'],
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Failed to initialize OIDC client:', error_1);
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Generate authorization URL for deaf-first authentication flow
     */
    OIDCProvider.prototype.getAuthorizationUrl = function (state) {
        if (!this.client) {
            throw new Error('OIDC client not initialized');
        }
        var codeVerifier = openid_client_1.generators.codeVerifier();
        var codeChallenge = openid_client_1.generators.codeChallenge(codeVerifier);
        var authState = state || openid_client_1.generators.state();
        // Store code verifier for later use in callback
        this.codeVerifiers.set(authState, codeVerifier);
        var url = this.client.authorizationUrl({
            scope: this.config.scope,
            code_challenge: codeChallenge,
            code_challenge_method: 'S256',
            state: authState,
            // Add deaf-specific claims
            claims: JSON.stringify({
                userinfo: {
                    deaf_identity: null,
                    sign_languages: null,
                    accessibility_profile: null,
                },
            }),
        });
        return { url: url, state: authState, codeVerifier: codeVerifier };
    };
    /**
     * Exchange authorization code for tokens
     */
    OIDCProvider.prototype.handleCallback = function (params, state) {
        return __awaiter(this, void 0, void 0, function () {
            var codeVerifier, tokenSet, userinfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.client) {
                            throw new Error('OIDC client not initialized');
                        }
                        codeVerifier = this.codeVerifiers.get(state);
                        if (!codeVerifier) {
                            throw new Error('Code verifier not found for state');
                        }
                        // Clean up stored verifier
                        this.codeVerifiers.delete(state);
                        return [4 /*yield*/, this.client.callback(this.config.redirectUri, params, { code_verifier: codeVerifier, state: state })];
                    case 1:
                        tokenSet = _a.sent();
                        return [4 /*yield*/, this.client.userinfo(tokenSet.access_token)];
                    case 2:
                        userinfo = _a.sent();
                        return [2 /*return*/, {
                                sub: userinfo.sub,
                                email: userinfo.email,
                                deaf_identity: userinfo.deaf_identity,
                                sign_languages: userinfo.sign_languages,
                                communication_preferences: userinfo.communication_preferences,
                                accessibility_profile: userinfo.accessibility_profile,
                            }];
                }
            });
        });
    };
    /**
     * Create a custom JWT for DeafAuth with accessibility claims
     */
    OIDCProvider.prototype.createDeafAuthToken = function (claims) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new jose_1.SignJWT(__assign(__assign({}, claims), { aud: 'deafauth-ecosystem', iss: 'https://deafauth.mbtq.dev' }))
                            .setProtectedHeader({ alg: 'HS256' })
                            .setIssuedAt()
                            .setExpirationTime('24h')
                            .sign(this.jwtSecret)];
                    case 1:
                        token = _a.sent();
                        return [2 /*return*/, token];
                }
            });
        });
    };
    /**
     * Verify DeafAuth token
     */
    OIDCProvider.prototype.verifyToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, jose_1.jwtVerify)(token, this.jwtSecret, {
                            issuer: 'https://deafauth.mbtq.dev',
                            audience: 'deafauth-ecosystem',
                        })];
                    case 1:
                        payload = (_a.sent()).payload;
                        return [2 /*return*/, payload];
                }
            });
        });
    };
    /**
     * Create token with deaf user identity flag for partner services
     * This communicates to PinkSync and partners that user is deaf
     */
    OIDCProvider.prototype.createPartnerToken = function (userId, isDeaf, metadata) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new jose_1.SignJWT({
                            sub: userId,
                            deaf_user: isDeaf,
                            requires_accessibility: isDeaf,
                            partner_metadata: metadata || {},
                            aud: ['pinksync', '360magicians', 'fibronrose'],
                            iss: 'https://deafauth.mbtq.dev',
                        })
                            .setProtectedHeader({ alg: 'HS256' })
                            .setIssuedAt()
                            .setExpirationTime('1h')
                            .sign(this.jwtSecret)];
                    case 1:
                        token = _a.sent();
                        return [2 /*return*/, token];
                }
            });
        });
    };
    /**
     * Validate Supabase custom auth token
     * Note: In production, this should use Supabase's JWT secret from the project settings
     */
    OIDCProvider.prototype.validateSupabaseAuth = function (supabaseToken, supabaseJwtSecret) {
        return __awaiter(this, void 0, void 0, function () {
            var secret, payload, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        secret = supabaseJwtSecret
                            ? new TextEncoder().encode(supabaseJwtSecret)
                            : this.jwtSecret;
                        return [4 /*yield*/, (0, jose_1.jwtVerify)(supabaseToken, secret)];
                    case 1:
                        payload = (_b.sent()).payload;
                        return [2 /*return*/, !!payload.sub];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return OIDCProvider;
}());
exports.OIDCProvider = OIDCProvider;
/**
 * Factory function to create OIDC provider instance
 */
function createOIDCProvider(config, jwtSecret) {
    return new OIDCProvider(config, jwtSecret);
}
/**
 * Middleware to extract deaf user information and communicate to downstream services
 */
function deafUserMiddleware() {
    var _this = this;
    return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
        var token, provider, claims, error_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
                    if (!token) return [3 /*break*/, 2];
                    provider = req.app.get('oidcProvider');
                    if (!provider) return [3 /*break*/, 2];
                    return [4 /*yield*/, provider.verifyToken(token)];
                case 1:
                    claims = _b.sent();
                    req.deafUser = {
                        isDeaf: claims.deaf_identity || false,
                        signLanguages: claims.sign_languages || [],
                        accessibilityNeeds: claims.accessibility_profile || {},
                    };
                    _b.label = 2;
                case 2:
                    next();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _b.sent();
                    console.error('Deaf user middleware error:', error_2);
                    next();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
}
