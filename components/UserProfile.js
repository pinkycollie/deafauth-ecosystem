"use strict";
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
var react_1 = require("react");
var useAuth_1 = require("../hooks/useAuth");
var types_1 = require("../types");
var SpinnerIcon_1 = require("./icons/SpinnerIcon");
var UploadIcon_1 = require("./icons/UploadIcon");
var DocumentIcon_1 = require("./icons/DocumentIcon");
var XIcon_1 = require("./icons/XIcon");
var OnboardingGuide_1 = require("./OnboardingGuide");
var PersistIDIcon_1 = require("./icons/PersistIDIcon");
var EmailIcon_1 = require("./icons/EmailIcon");
var PlusIcon_1 = require("./icons/PlusIcon");
var genai_1 = require("@google/genai");
var SparklesIcon_1 = require("./icons/SparklesIcon");
var languages = [
    { value: '', label: 'Not Set' },
    { value: 'en', label: 'English' },
    { value: 'asl', label: 'ASL (American Sign Language)' },
    { value: 'es', label: 'Español (Spanish)' },
    { value: 'fr', label: 'Français (French)' },
    { value: 'de', label: 'Deutsch (German)' },
    { value: 'zh', label: '中文 (Mandarin)' },
];
var getLanguageLabel = function (value) {
    var _a;
    return ((_a = languages.find(function (lang) { return lang.value === value; })) === null || _a === void 0 ? void 0 : _a.label) || 'Not Set';
};
var RolePill = function (_a) {
    var _b;
    var role = _a.role;
    var roleColors = (_b = {},
        _b[types_1.Role.GUEST] = 'bg-gray-500',
        _b[types_1.Role.MEMBER] = 'bg-blue-500',
        _b[types_1.Role.CREATOR] = 'bg-purple-500',
        _b[types_1.Role.ADMIN] = 'bg-red-500',
        _b[types_1.Role.MAGICIAN] = 'bg-pink-500 animate-pulse',
        _b);
    return (<span className={"px-2 py-1 text-xs font-semibold text-white rounded-full ".concat(roleColors[role])}>
            {role}
        </span>);
};
var formatWalletAddress = function (address) {
    if (address.length < 10)
        return address;
    return "".concat(address.substring(0, 6), "...").concat(address.substring(address.length - 4));
};
var TabButton = function (_a) {
    var children = _a.children, active = _a.active, onClick = _a.onClick;
    return (<button onClick={onClick} className={"px-3 py-1 text-sm font-semibold rounded-md transition-colors ".concat(active ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700', " flex items-center justify-center")}>
        {children}
    </button>);
};
var UserProfile = function () {
    var _a = (0, useAuth_1.useAuth)(), user = _a.user, logout = _a.logout, loading = _a.loading, mintDeafPass = _a.mintDeafPass, submitIdea = _a.submitIdea, updateUser = _a.updateUser;
    var _b = (0, react_1.useState)(null), notification = _b[0], setNotification = _b[1];
    var _c = (0, react_1.useState)(null), ideaFile = _c[0], setIdeaFile = _c[1];
    var fileInputRef = (0, react_1.useRef)(null);
    var _d = (0, react_1.useState)(false), showOnboarding = _d[0], setShowOnboarding = _d[1];
    var _e = (0, react_1.useState)(false), isEditingProfile = _e[0], setIsEditingProfile = _e[1];
    var _f = (0, react_1.useState)(false), isSaving = _f[0], setIsSaving = _f[1];
    var _g = (0, react_1.useState)({
        displayName: '',
        preferredLanguage: '',
    }), profileData = _g[0], setProfileData = _g[1];
    var _h = (0, react_1.useState)('upload'), submitTab = _h[0], setSubmitTab = _h[1];
    var _j = (0, react_1.useState)(''), ideaPrompt = _j[0], setIdeaPrompt = _j[1];
    var _k = (0, react_1.useState)(null), generatedIdea = _k[0], setGeneratedIdea = _k[1];
    var _l = (0, react_1.useState)(false), isGeneratingIdea = _l[0], setIsGeneratingIdea = _l[1];
    (0, react_1.useEffect)(function () {
        if (user) {
            setProfileData({
                displayName: user.displayName,
                preferredLanguage: user.profileMeta.preferredLanguage || '',
            });
        }
    }, [user]);
    (0, react_1.useEffect)(function () {
        var onboardingCompleted = localStorage.getItem('onboardingCompleted');
        if (!onboardingCompleted) {
            setTimeout(function () { return setShowOnboarding(true); }, 500);
        }
    }, []);
    var handleOnboardingComplete = function () {
        setShowOnboarding(false);
        localStorage.setItem('onboardingCompleted', 'true');
    };
    var handleProfileChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setProfileData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
        });
    };
    var handleCancelEdit = function () {
        if (user) {
            setProfileData({
                displayName: user.displayName,
                preferredLanguage: user.profileMeta.preferredLanguage || '',
            });
        }
        setIsEditingProfile(false);
    };
    var handleSaveProfile = function () { return __awaiter(void 0, void 0, void 0, function () {
        var payload, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!user)
                        return [2 /*return*/];
                    setIsSaving(true);
                    setNotification(null);
                    payload = {};
                    if (profileData.displayName !== user.displayName) {
                        payload.displayName = profileData.displayName;
                    }
                    if (profileData.preferredLanguage !== (user.profileMeta.preferredLanguage || '')) {
                        payload.profileMeta = { preferredLanguage: profileData.preferredLanguage };
                    }
                    if (!(Object.keys(payload).length > 0)) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, updateUser(payload)];
                case 2:
                    _a.sent();
                    setNotification({ type: 'success', message: 'Profile updated successfully.' });
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    setNotification({ type: 'error', message: e_1.message || 'Failed to update profile.' });
                    return [3 /*break*/, 4];
                case 4:
                    setIsSaving(false);
                    setIsEditingProfile(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var showNotImplemented = function () {
        setNotification({ type: 'error', message: 'This feature is for UI demonstration and is not functional.' });
    };
    var handleMint = function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setNotification(null);
                    return [4 /*yield*/, mintDeafPass()];
                case 1:
                    result = _b.sent();
                    if (result.success) {
                        setNotification({ type: 'success', message: "".concat(result.message, " TX: ").concat((_a = result.txHash) === null || _a === void 0 ? void 0 : _a.substring(0, 10), "...") });
                    }
                    else {
                        setNotification({ type: 'error', message: result.message });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleDragOver = function (e) {
        e.preventDefault();
    };
    var handleDrop = function (e) {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };
    var handleFileChange = function (e) {
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };
    var processFile = function (file) {
        if (file.type === 'application/json') {
            setIdeaFile(file);
            setNotification(null);
        }
        else {
            setNotification({ type: 'error', message: 'Please upload a valid JSON file.' });
            handleRemoveFile();
        }
    };
    var handleFileSelectClick = function () {
        var _a;
        (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click();
    };
    var handleRemoveFile = function () {
        setIdeaFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    var handleSubmitIdea = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var reader;
        return __generator(this, function (_a) {
            e.preventDefault();
            if (!ideaFile)
                return [2 /*return*/];
            setNotification(null);
            reader = new FileReader();
            reader.onload = function (event) { return __awaiter(void 0, void 0, void 0, function () {
                var fileContent, result, err_1;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            fileContent = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
                            JSON.parse(fileContent); // Validate JSON
                            return [4 /*yield*/, submitIdea(fileContent)];
                        case 1:
                            result = _b.sent();
                            if (result.success) {
                                setNotification({ type: 'success', message: "".concat(result.message, " ID: ").concat(result.ideaId) });
                                handleRemoveFile();
                            }
                            else {
                                setNotification({ type: 'error', message: result.message });
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            err_1 = _b.sent();
                            setNotification({ type: 'error', message: 'Invalid JSON file content.' });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
            reader.onerror = function () {
                setNotification({ type: 'error', message: 'Failed to read the file.' });
            };
            reader.readAsText(ideaFile);
            return [2 /*return*/];
        });
    }); };
    var handleGenerateIdea = function () { return __awaiter(void 0, void 0, void 0, function () {
        var ai, responseSchema, contents, response, jsonString, parsedJson, prettyJson, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!ideaPrompt.trim()) {
                        setNotification({ type: 'error', message: 'Please enter your idea description first.' });
                        return [2 /*return*/];
                    }
                    setIsGeneratingIdea(true);
                    setGeneratedIdea(null);
                    setNotification(null);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    ai = new genai_1.GoogleGenAI({ apiKey: process.env.API_KEY });
                    responseSchema = {
                        type: genai_1.Type.OBJECT,
                        properties: {
                            ideaTitle: { type: genai_1.Type.STRING, description: 'A short, catchy title for the idea.' },
                            summary: { type: genai_1.Type.STRING, description: 'A one-sentence summary of the idea.' },
                            problemStatement: { type: genai_1.Type.STRING, description: 'The core problem this idea aims to solve.' },
                            solution: { type: genai_1.Type.STRING, description: 'A detailed description of the proposed solution.' },
                            targetAudience: { type: genai_1.Type.STRING, description: 'The primary user or group this idea is for.' },
                            requiredTechnologies: {
                                type: genai_1.Type.ARRAY,
                                items: { type: genai_1.Type.STRING },
                                description: 'A list of key technologies, protocols, or skills needed to build this.'
                            }
                        },
                        required: ['ideaTitle', 'summary', 'problemStatement', 'solution']
                    };
                    contents = "Based on the following idea, generate a structured JSON object that conforms to the provided schema. The idea is: \"".concat(ideaPrompt, "\"");
                    return [4 /*yield*/, ai.models.generateContent({
                            model: 'gemini-2.5-flash',
                            contents: contents,
                            config: {
                                responseMimeType: "application/json",
                                responseSchema: responseSchema,
                            }
                        })];
                case 2:
                    response = _a.sent();
                    jsonString = response.text;
                    parsedJson = JSON.parse(jsonString);
                    prettyJson = JSON.stringify(parsedJson, null, 2);
                    setGeneratedIdea(prettyJson);
                    return [3 /*break*/, 5];
                case 3:
                    e_2 = _a.sent();
                    console.error("Gemini API error:", e_2);
                    setNotification({ type: 'error', message: e_2.message || 'Failed to generate idea structure.' });
                    return [3 /*break*/, 5];
                case 4:
                    setIsGeneratingIdea(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleSubmitGeneratedIdea = function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!generatedIdea)
                        return [2 /*return*/];
                    setNotification(null);
                    return [4 /*yield*/, submitIdea(generatedIdea)];
                case 1:
                    result = _a.sent();
                    if (result.success) {
                        setNotification({ type: 'success', message: "".concat(result.message, " ID: ").concat(result.ideaId) });
                        setGeneratedIdea(null);
                        setIdeaPrompt('');
                    }
                    else {
                        setNotification({ type: 'error', message: result.message });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    if (!user) {
        return <p>Error: No user data found.</p>;
    }
    return (<>
            {showOnboarding && <OnboardingGuide_1.OnboardingGuide onComplete={handleOnboardingComplete}/>}
            <div className="w-full max-w-4xl mx-auto bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-lg space-y-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                    <div>
                        {user.profileMeta.walletAddress ? (<h2 className="text-3xl font-bold text-white font-mono tracking-tight">{formatWalletAddress(user.profileMeta.walletAddress)}</h2>) : (<>
                                <h2 className="text-3xl font-bold text-white">{user.displayName}</h2>
                                <p className="text-gray-400">{user.email || ''}</p>
                            </>)}
                        <div className="flex items-center space-x-2 mt-2">
                            {user.roles.map(function (role) { return <RolePill key={role} role={role}/>; })}
                        </div>
                    </div>
                    <button onClick={logout} disabled={loading} className="mt-4 md:mt-0 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-900 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]">
                        {loading ? <SpinnerIcon_1.SpinnerIcon className="w-5 h-5"/> : 'Sign Out'}
                    </button>
                </div>
                
                <div className="bg-gray-700/50 p-6 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-white">Profile Details</h3>
                        {!isEditingProfile && (<button onClick={function () { return setIsEditingProfile(true); }} className="text-sm text-cyan-400 hover:text-cyan-300 font-semibold">
                                Edit
                            </button>)}
                    </div>
                    {isEditingProfile ? (<div className="space-y-4">
                            <div>
                                <label htmlFor="displayName" className="block text-sm font-medium text-gray-300 mb-1">Display Name</label>
                                <input type="text" name="displayName" id="displayName" value={profileData.displayName} onChange={handleProfileChange} className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"/>
                            </div>
                            <div>
                                <label htmlFor="preferredLanguage" className="block text-sm font-medium text-gray-300 mb-1">Preferred Language</label>
                                <select name="preferredLanguage" id="preferredLanguage" value={profileData.preferredLanguage} onChange={handleProfileChange} className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition appearance-none pr-8" style={{
                backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em'
            }}>
                                    {languages.map(function (lang) { return (<option key={lang.value} value={lang.value}>{lang.label}</option>); })}
                                </select>
                            </div>
                            <div className="flex justify-end space-x-3 pt-2">
                                <button onClick={handleCancelEdit} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500">
                                    Cancel
                                </button>
                                <button onClick={handleSaveProfile} disabled={isSaving || loading} className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 disabled:bg-cyan-800 flex items-center justify-center min-w-[80px]">
                                    {isSaving ? <SpinnerIcon_1.SpinnerIcon className="w-5 h-5"/> : 'Save'}
                                </button>
                            </div>
                        </div>) : (<div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 font-medium">Display Name</span>
                                <span className="text-white">{user.displayName}</span>
                            </div>
                             <div className="flex justify-between items-center">
                                <span className="text-gray-400 font-medium">Email</span>
                                <span className="text-gray-300 font-mono text-sm">{user.email}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 font-medium">Preferred Language</span>
                                <span className="text-white">{getLanguageLabel(user.profileMeta.preferredLanguage || '')}</span>
                            </div>
                        </div>)}
                </div>

                <div className="bg-gray-700/50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-4">Identity & Sign-in Methods</h3>
                    <div className="space-y-4">
                        {user.email && (<div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-md border border-gray-600">
                                <div className="flex items-center space-x-4">
                                    <EmailIcon_1.EmailIcon className="w-6 h-6 text-gray-400 flex-shrink-0"/>
                                    <div>
                                        <p className="text-white font-medium">{user.email}</p>
                                        <p className="text-xs text-green-400 font-semibold uppercase tracking-wider">Primary</p>
                                    </div>
                                </div>
                            </div>)}
                        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
                             <button onClick={showNotImplemented} className="flex-1 flex items-center justify-center text-sm p-3 bg-gray-600/50 rounded-lg hover:bg-gray-600 transition-colors duration-200 text-gray-300 hover:text-white font-semibold border border-gray-500">
                                <PlusIcon_1.PlusIcon className="w-5 h-5 mr-2"/>
                                <span>Add email address</span>
                            </button>
                            <button onClick={showNotImplemented} className="flex-1 flex items-center justify-center text-sm p-3 bg-gray-600/50 rounded-lg hover:bg-gray-600 transition-colors duration-200 text-gray-300 hover:text-white font-semibold border border-gray-500">
                                <PlusIcon_1.PlusIcon className="w-5 h-5 mr-2"/>
                                <span>Add phone number</span>
                            </button>
                        </div>
                    </div>
                </div>

                {notification && (<div className={"p-4 rounded-md ".concat(notification.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300')}>
                        <p className="font-semibold">{notification.type === 'success' ? 'Success' : 'Error'}</p>
                        <p className="text-sm">{notification.message}</p>
                    </div>)}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div id="identity-section" className="bg-gray-700/50 p-6 rounded-lg flex flex-col">
                        {user.roles.includes(types_1.Role.CREATOR) ? (<>
                                <div className="flex items-center mb-2">
                                    <PersistIDIcon_1.PersistIDIcon className="w-6 h-6 mr-2 text-cyan-400"/>
                                    <h3 className="text-xl font-semibold text-cyan-400">Create Your PersistID</h3>
                                </div>
                                <p className="text-gray-300 mb-4 flex-grow">Solidify your digital identity with a permanent, self-sovereign PersistID. This is your key to the ecosystem.</p>
                                <button onClick={handleMint} disabled={loading} className="w-full mt-auto px-4 py-2 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-700 disabled:bg-cyan-800 disabled:cursor-not-allowed flex items-center justify-center">
                                     {loading ? <SpinnerIcon_1.SpinnerIcon className="w-5 h-5"/> : 'Create PersistID'}
                                </button>
                            </>) : (<>
                                <div className="flex items-center mb-2">
                                    <PersistIDIcon_1.PersistIDIcon className="w-6 h-6 mr-2 text-yellow-400"/>
                                    <h3 className="text-xl font-semibold text-yellow-400">Upgrade to PersistID</h3>
                                </div>
                                <p className="text-gray-300 mb-4 flex-grow">Unlock premium features, including a permanent digital identity, by becoming a Creator.</p>
                                <button disabled className="w-full mt-auto px-4 py-2 bg-gray-600 text-gray-400 font-semibold rounded-md cursor-not-allowed">
                                    Upgrade to Creator
                                </button>
                            </>)}
                    </div>

                    <div id="submit-idea-section" className="bg-gray-700/50 p-6 rounded-lg flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-cyan-400">Submit an Idea</h3>
                            <div className="flex space-x-1 bg-gray-900/50 p-1 rounded-lg">
                                <TabButton active={submitTab === 'upload'} onClick={function () { return setSubmitTab('upload'); }}>
                                    Upload
                                </TabButton>
                                <TabButton active={submitTab === 'ai'} onClick={function () { return setSubmitTab('ai'); }}>
                                    <SparklesIcon_1.SparklesIcon className="w-4 h-4 mr-1.5"/>
                                    AI Builder
                                </TabButton>
                            </div>
                        </div>

                        {submitTab === 'upload' ? (<div>
                                <p className="text-gray-300 mb-4">Upload your idea as a JSON file to prove provenance.</p>
                                <form onSubmit={handleSubmitIdea}>
                                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="application/json" className="hidden"/>
                                    {!ideaFile ? (<div onClick={handleFileSelectClick} onDragOver={handleDragOver} onDrop={handleDrop} className="w-full flex flex-col justify-center items-center px-6 py-10 border-2 border-dashed border-gray-500 rounded-md cursor-pointer hover:border-cyan-400 hover:bg-gray-700/50 transition-colors duration-200">
                                            <UploadIcon_1.UploadIcon />
                                            <p className="mt-2 text-sm text-gray-400">
                                                <span className="font-semibold text-cyan-400">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500">JSON file only</p>
                                        </div>) : (<div className="w-full flex items-center justify-between p-3 bg-gray-800 border border-gray-600 rounded-md">
                                            <div className="flex items-center space-x-3 overflow-hidden">
                                                <DocumentIcon_1.DocumentIcon />
                                                <span className="text-gray-300 truncate font-mono text-sm">{ideaFile.name}</span>
                                            </div>
                                            <button type="button" onClick={handleRemoveFile} className="text-gray-400 hover:text-white transition-colors" aria-label="Remove file">
                                                <XIcon_1.XIcon className="w-5 h-5"/>
                                            </button>
                                        </div>)}
                                    <button type="submit" disabled={loading || !ideaFile} className="w-full mt-4 px-4 py-2 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-700 disabled:bg-cyan-800 disabled:cursor-not-allowed flex items-center justify-center">
                                        {loading ? <SpinnerIcon_1.SpinnerIcon className="w-5 h-5"/> : 'Submit Idea'}
                                    </button>
                                </form>
                            </div>) : (<div className="flex flex-col flex-grow">
                                <p className="text-gray-300 mb-4">Describe your idea and let AI structure it for you.</p>
                                <textarea value={ideaPrompt} onChange={function (e) { return setIdeaPrompt(e.target.value); }} placeholder="e.g., A decentralized social network for artists to securely share and monetize their work..." className="w-full bg-gray-900 border border-gray-600 rounded-md p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition min-h-[100px]" rows={4} disabled={isGeneratingIdea}/>
                                <button onClick={handleGenerateIdea} disabled={isGeneratingIdea || !ideaPrompt.trim()} className="w-full mt-4 px-4 py-2 bg-pink-600 text-white font-semibold rounded-md hover:bg-pink-700 disabled:bg-pink-800/80 disabled:cursor-not-allowed flex items-center justify-center">
                                    {isGeneratingIdea ? <SpinnerIcon_1.SpinnerIcon className="w-5 h-5"/> : <><SparklesIcon_1.SparklesIcon className="w-5 h-5 mr-2"/>Generate with AI</>}
                                </button>
                                {generatedIdea && (<div className="mt-4 flex flex-col flex-grow">
                                        <p className="text-sm font-semibold text-gray-300 mb-2">Generated Idea Structure:</p>
                                        <pre className="bg-gray-900 rounded-md p-4 text-xs text-gray-200 overflow-x-auto max-h-60 flex-grow">
                                            <code>{generatedIdea}</code>
                                        </pre>
                                        <button onClick={handleSubmitGeneratedIdea} disabled={loading} className="w-full mt-4 px-4 py-2 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-700 disabled:bg-cyan-800 disabled:cursor-not-allowed flex items-center justify-center">
                                            {loading ? <SpinnerIcon_1.SpinnerIcon className="w-5 h-5"/> : 'Submit Generated Idea'}
                                        </button>
                                    </div>)}
                            </div>)}
                    </div>
                </div>
            </div>
        </>);
};
exports.default = UserProfile;
