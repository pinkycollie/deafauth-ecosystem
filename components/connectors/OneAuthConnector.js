"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useAuth_1 = require("../../hooks/useAuth");
var SpinnerIcon_1 = require("../icons/SpinnerIcon");
var ArrowLeftIcon_1 = require("../icons/ArrowLeftIcon");
var OneAuthIcon_1 = require("../icons/OneAuthIcon");
var types_1 = require("../../types");
var OneAuthConnector = function (_a) {
    var onBack = _a.onBack;
    var _b = (0, useAuth_1.useAuth)(), login = _b.login, loading = _b.loading, error = _b.error;
    var handleConnect = function () {
        // The useAuth hook now calls Supabase's signInWithOAuth for Zoho
        login(types_1.AuthProviderType.ONEAUTH, {});
    };
    return (<div>
            <button onClick={onBack} className="flex items-center text-sm text-gray-400 hover:text-white mb-4">
                <ArrowLeftIcon_1.ArrowLeftIcon />
                Back
            </button>
             <div className="flex flex-col items-center">
                <OneAuthIcon_1.OneAuthIcon className="w-12 h-12 mb-4"/>
                <h3 className="text-xl font-bold text-center text-white mb-2">Sign in with OneAuth</h3>
                <p className="text-center text-gray-400 text-sm mb-6">Use your Zoho account to sign in securely.</p>
            </div>

            {error && <p className="text-red-400 text-center text-sm mb-4">{error}</p>}
            
            <button onClick={handleConnect} disabled={loading} className="w-full flex items-center justify-center p-3 bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200 text-white font-bold disabled:bg-red-800 disabled:cursor-not-allowed">
                {loading ? <SpinnerIcon_1.SpinnerIcon /> : 'Continue with Zoho'}
            </button>
        </div>);
};
exports.default = OneAuthConnector;
