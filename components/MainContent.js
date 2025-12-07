"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useAuth_1 = require("../hooks/useAuth");
var UserProfile_1 = require("./UserProfile");
var AuthModal_1 = require("./AuthModal");
var SpinnerIcon_1 = require("./icons/SpinnerIcon");
var LogoIcon_1 = require("./icons/LogoIcon");
var MainContent = function () {
    var _a = (0, useAuth_1.useAuth)(), user = _a.user, loading = _a.loading;
    var _b = (0, react_1.useState)(false), isAuthModalOpen = _b[0], setAuthModalOpen = _b[1];
    if (loading) {
        return (<div className="flex flex-col items-center justify-center text-gray-400">
                <SpinnerIcon_1.SpinnerIcon className="w-10 h-10"/>
                <p className="mt-4">Initializing Session...</p>
            </div>);
    }
    return (<>
            {user ? (<UserProfile_1.default />) : (<div className="text-center bg-gray-800/50 border border-gray-700 p-12 rounded-lg shadow-2xl max-w-lg">
                    <LogoIcon_1.LogoIcon className="h-16 w-16 text-pink-500 mx-auto mb-4"/>
                    <h2 className="text-3xl font-bold text-white mb-2">Welcome to the Ecosystem</h2>
                    <p className="text-gray-400 mb-8">
                        Join a decentralized studio where ideas are valued and creators are empowered.
                    </p>
                    <button onClick={function () { return setAuthModalOpen(true); }} className="px-8 py-3 bg-pink-600 text-white font-bold rounded-lg hover:bg-pink-700 transition-transform transform hover:scale-105">
                        Sign In / Create Account
                    </button>
                </div>)}
            <AuthModal_1.default isOpen={isAuthModalOpen} onClose={function () { return setAuthModalOpen(false); }}/>
        </>);
};
exports.default = MainContent;
