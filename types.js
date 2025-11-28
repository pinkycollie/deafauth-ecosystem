"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProviderType = exports.Role = void 0;
var Role;
(function (Role) {
    Role["GUEST"] = "guest";
    Role["MEMBER"] = "member";
    Role["CREATOR"] = "creator";
    Role["ADMIN"] = "admin";
    Role["MAGICIAN"] = "magician";
})(Role || (exports.Role = Role = {}));
var AuthProviderType;
(function (AuthProviderType) {
    AuthProviderType["EMAIL"] = "email";
    AuthProviderType["GOOGLE"] = "google";
    AuthProviderType["GITHUB"] = "github";
    // FIX: Add missing provider types to resolve compilation errors.
    AuthProviderType["WALLET"] = "wallet";
    AuthProviderType["DEAF_AUTH"] = "deaf_auth";
    AuthProviderType["PASSKEY"] = "passkey";
    AuthProviderType["AZURE"] = "azure";
    AuthProviderType["ONEAUTH"] = "zoho";
})(AuthProviderType || (exports.AuthProviderType = AuthProviderType = {}));
