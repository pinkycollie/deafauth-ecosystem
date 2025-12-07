"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Header_1 = require("./components/Header");
var MainContent_1 = require("./components/MainContent");
var Footer_1 = require("./components/Footer");
var App = function () {
    return (<div className="flex flex-col min-h-screen bg-gray-900 text-white items-center">
      <Header_1.default />
      <main className="flex-grow w-full container mx-auto flex items-center justify-center p-4">
        <MainContent_1.default />
      </main>
      <Footer_1.default />
    </div>);
};
exports.default = App;
