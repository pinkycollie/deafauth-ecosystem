"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useAuth_1 = require("../hooks/useAuth");
var UserProfile_1 = require("./UserProfile");
var AuthModal_1 = require("./AuthModal");
var DeployAuthButton_1 = require("./DeployAuthButton");
var SpinnerIcon_1 = require("./icons/SpinnerIcon");
var LogoIcon_1 = require("./icons/LogoIcon");
var MainContent = function () {
    var _a = (0, useAuth_1.useAuth)(), user = _a.user, loading = _a.loading;
    var _b = (0, react_1.useState)(false), isAuthModalOpen = _b[0], setAuthModalOpen = _b[1];
    var _c = (0, react_1.useState)(false), showDeployPanel = _c[0], setShowDeployPanel = _c[1];
    var handleDeploy = function (status) {
        console.log('Auth system deployed:', status);
    };
    if (loading) {
        return (<div className="flex flex-col items-center justify-center text-gray-400">
                <SpinnerIcon_1.SpinnerIcon className="w-10 h-10"/>
                <p className="mt-4">Initializing Session...</p>
            </div>);
    }
    return (<>
            {user ? (<div className="w-full max-w-4xl">
                    <UserProfile_1.default />
                    
                    {/* Deploy Panel for Authenticated Users */}
                    <div className="mt-8 p-6 bg-gray-800/50 border border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-white">Deploy Auth System</h3>
                            <button onClick={function () { return setShowDeployPanel(!showDeployPanel); }} className="text-sm text-gray-400 hover:text-white transition-colors">
                                {showDeployPanel ? 'Hide Details' : 'Show Details'}
                            </button>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">
                            Deploy DeafAuth as a ready-to-use authentication system with version control,
                            integrity validation, and consistency checks.
                        </p>
                        <DeployAuthButton_1.default environment="production" version="1.0.0" onDeploy={handleDeploy}/>
                    </div>
                </div>) : (<div className="text-center bg-gray-800/50 border border-gray-700 p-12 rounded-lg shadow-2xl max-w-lg">
                    <LogoIcon_1.LogoIcon className="h-16 w-16 text-pink-500 mx-auto mb-4"/>
                    <h2 className="text-3xl font-bold text-white mb-2">Welcome to the Ecosystem</h2>
                    <p className="text-gray-400 mb-8">
                        Join a decentralized studio where ideas are valued and creators are empowered.
                    </p>
                    <div className="space-y-4">
                        <button onClick={function () { return setAuthModalOpen(true); }} className="w-full px-8 py-3 bg-pink-600 text-white font-bold rounded-lg hover:bg-pink-700 transition-transform transform hover:scale-105">
                            Sign In / Create Account
                        </button>
                        
                        {/* Deploy Button for Quick Access */}
                        <div className="pt-4 border-t border-gray-700">
                            <p className="text-gray-500 text-xs mb-3">Ready to integrate?</p>
                            <DeployAuthButton_1.default environment="production" version="1.0.0" onDeploy={handleDeploy} className="w-full"/>
                        </div>
                    </div>
                </div>)}
            <AuthModal_1.default isOpen={isAuthModalOpen} onClose={function () { return setAuthModalOpen(false); }}/>
        </>);
};
exports.default = MainContent;
