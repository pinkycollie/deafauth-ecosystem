"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var types_1 = require("../types");
var EmailConnector_1 = require("./connectors/EmailConnector");
var GoogleConnector_1 = require("./connectors/GoogleConnector");
var GitHubConnector_1 = require("./connectors/GitHubConnector");
var DeafAuthConnector_1 = require("./connectors/DeafAuthConnector");
var EmailIcon_1 = require("./icons/EmailIcon");
var XIcon_1 = require("./icons/XIcon");
var GoogleIcon_1 = require("./icons/GoogleIcon");
var GitHubIcon_1 = require("./icons/GitHubIcon");
var DeafAuthIcon_1 = require("./icons/DeafAuthIcon");
var AuthModal = function (_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose;
    var _b = (0, react_1.useState)('selector'), view = _b[0], setView = _b[1];
    if (!isOpen)
        return null;
    var handleClose = function () {
        setView('selector');
        onClose();
    };
    var renderView = function () {
        switch (view) {
            case types_1.AuthProviderType.EMAIL:
                return <EmailConnector_1.default onBack={function () { return setView('selector'); }} onSuccess={handleClose}/>;
            case types_1.AuthProviderType.GOOGLE:
                return <GoogleConnector_1.default onBack={function () { return setView('selector'); }} onSuccess={handleClose}/>;
            case types_1.AuthProviderType.GITHUB:
                return <GitHubConnector_1.default onBack={function () { return setView('selector'); }} onSuccess={handleClose}/>;
            case types_1.AuthProviderType.DEAF_AUTH:
                return <DeafAuthConnector_1.default onBack={function () { return setView('selector'); }} onSuccess={handleClose}/>;
            default:
                return (<>
            <h2 className="text-2xl font-bold text-center text-white mb-6">Sign In / Sign Up</h2>
            <div className="space-y-3">
              <button onClick={function () { return setView(types_1.AuthProviderType.DEAF_AUTH); }} className="flex items-center w-full p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 border border-blue-500">
                  <span className="flex-shrink-0">
                      <DeafAuthIcon_1.DeafAuthIcon className="w-6 h-6 mr-4 text-white"/>
                  </span>
                  <span className="flex-grow text-center text-md font-semibold text-white">Continue with DeafAuth</span>
              </button>
              
              <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-gray-600"></div>
                  <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase">Or</span>
                  <div className="flex-grow border-t border-gray-600"></div>
              </div>

              <AuthProviderButton icon={<GitHubIcon_1.GitHubIcon className="w-6 h-6 mr-4"/>} label="Continue with GitHub" onClick={function () { return setView(types_1.AuthProviderType.GITHUB); }}/>
              <AuthProviderButton icon={<GoogleIcon_1.GoogleIcon className="w-6 h-6 mr-4"/>} label="Continue with Google" onClick={function () { return setView(types_1.AuthProviderType.GOOGLE); }}/>
              <AuthProviderButton icon={<EmailIcon_1.EmailIcon className="w-6 h-6 mr-4 text-gray-300"/>} label="Continue with Email" onClick={function () { return setView(types_1.AuthProviderType.EMAIL); }}/>
            </div>
          </>);
        }
    };
    return (<div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={handleClose}>
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-sm relative border border-gray-700" onClick={function (e) { return e.stopPropagation(); }}>
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition">
          <XIcon_1.XIcon />
        </button>
        {renderView()}
      </div>
    </div>);
};
var AuthProviderButton = function (_a) {
    var icon = _a.icon, label = _a.label, onClick = _a.onClick;
    return (<button onClick={onClick} className="flex items-center w-full p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200 border border-gray-600">
        <span className="flex-shrink-0">{icon}</span>
        <span className="flex-grow text-center text-md font-semibold text-white">{label}</span>
    </button>);
};
exports.default = AuthModal;
