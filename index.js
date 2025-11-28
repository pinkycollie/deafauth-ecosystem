"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var client_1 = require("react-dom/client");
var App_1 = require("./App");
var AuthContext_1 = require("./context/AuthContext");
var rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error("Could not find root element to mount to");
}
var root = (0, client_1.createRoot)(rootElement);
root.render(<react_1.default.StrictMode>
    <AuthContext_1.AuthProvider>
      <App_1.default />
    </AuthContext_1.AuthProvider>
  </react_1.default.StrictMode>);
