import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Role, UserUpdatePayload } from '../types';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { UploadIcon } from './icons/UploadIcon';
import { DocumentIcon } from './icons/DocumentIcon';
import { XIcon } from './icons/XIcon';
import { OnboardingGuide } from './OnboardingGuide';
import { PersistIDIcon } from './icons/PersistIDIcon';
import { EmailIcon } from './icons/EmailIcon';
import { PlusIcon } from './icons/PlusIcon';
import { GoogleGenAI, Type } from "@google/genai";
import { SparklesIcon } from './icons/SparklesIcon';

const languages = [
    { value: '', label: 'Not Set' },
    { value: 'en', label: 'English' },
    { value: 'asl', label: 'ASL (American Sign Language)' },
    { value: 'es', label: 'Español (Spanish)' },
    { value: 'fr', label: 'Français (French)' },
    { value: 'de', label: 'Deutsch (German)' },
    { value: 'zh', label: '中文 (Mandarin)' },
];

const getLanguageLabel = (value: string): string => {
    return languages.find(lang => lang.value === value)?.label || 'Not Set';
};

const RolePill: React.FC<{ role: Role }> = ({ role }) => {
    const roleColors: Record<Role, string> = {
        [Role.GUEST]: 'bg-gray-500',
        [Role.MEMBER]: 'bg-blue-500',
        [Role.CREATOR]: 'bg-purple-500',
        [Role.ADMIN]: 'bg-red-500',
        [Role.MAGICIAN]: 'bg-pink-500 animate-pulse',
    };

    return (
        <span className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${roleColors[role]}`}>
            {role}
        </span>
    );
}

const formatWalletAddress = (address: string): string => {
    if (address.length < 10) return address;
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

const TabButton: React.FC<{ children: React.ReactNode, active: boolean, onClick: () => void }> = ({ children, active, onClick }) => (
    <button
        onClick={onClick}
        className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${
            active ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700'
        } flex items-center justify-center`}
    >
        {children}
    </button>
);


const UserProfile: React.FC = () => {
    const { user, logout, loading, mintDeafPass, submitIdea, updateUser } = useAuth();
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [ideaFile, setIdeaFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [profileData, setProfileData] = useState({
        displayName: '',
        preferredLanguage: '',
    });

    const [submitTab, setSubmitTab] = useState<'upload' | 'ai'>('upload');
    const [ideaPrompt, setIdeaPrompt] = useState('');
    const [generatedIdea, setGeneratedIdea] = useState<string | null>(null);
    const [isGeneratingIdea, setIsGeneratingIdea] = useState(false);


    useEffect(() => {
        if (user) {
            setProfileData({
                displayName: user.displayName,
                preferredLanguage: user.profileMeta.preferredLanguage || '',
            });
        }
    }, [user]);

    useEffect(() => {
        const onboardingCompleted = localStorage.getItem('onboardingCompleted');
        if (!onboardingCompleted) {
            setTimeout(() => setShowOnboarding(true), 500);
        }
    }, []);

    const handleOnboardingComplete = () => {
        setShowOnboarding(false);
        localStorage.setItem('onboardingCompleted', 'true');
    };

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleCancelEdit = () => {
        if (user) {
            setProfileData({
                displayName: user.displayName,
                preferredLanguage: user.profileMeta.preferredLanguage || '',
            });
        }
        setIsEditingProfile(false);
    };

    const handleSaveProfile = async () => {
        if (!user) return;
        setIsSaving(true);
        setNotification(null);

        const payload: UserUpdatePayload = {};
        if (profileData.displayName !== user.displayName) {
            payload.displayName = profileData.displayName;
        }
        if (profileData.preferredLanguage !== (user.profileMeta.preferredLanguage || '')) {
            payload.profileMeta = { preferredLanguage: profileData.preferredLanguage };
        }
        
        if (Object.keys(payload).length > 0) {
            try {
                await updateUser(payload);
                setNotification({ type: 'success', message: 'Profile updated successfully.' });
            } catch (e: any) {
                setNotification({ type: 'error', message: e.message || 'Failed to update profile.' });
            }
        }

        setIsSaving(false);
        setIsEditingProfile(false);
    };
    
    const showNotImplemented = () => {
        setNotification({ type: 'error', message: 'This feature is for UI demonstration and is not functional.' });
    };

    const handleMint = async () => {
        setNotification(null);
        const result = await mintDeafPass();
        if (result.success) {
            setNotification({ type: 'success', message: `${result.message} TX: ${result.txHash?.substring(0, 10)}...` });
        } else {
            setNotification({ type: 'error', message: result.message });
        }
    };
    
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };
    
    const processFile = (file: File) => {
        if (file.type === 'application/json') {
            setIdeaFile(file);
            setNotification(null);
        } else {
            setNotification({ type: 'error', message: 'Please upload a valid JSON file.' });
            handleRemoveFile();
        }
    };

    const handleFileSelectClick = () => {
        fileInputRef.current?.click();
    };

    const handleRemoveFile = () => {
        setIdeaFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmitIdea = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!ideaFile) return;
        setNotification(null);

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const fileContent = event.target?.result as string;
                JSON.parse(fileContent); // Validate JSON
                const result = await submitIdea(fileContent);
                 if (result.success) {
                    setNotification({ type: 'success', message: `${result.message} ID: ${result.ideaId}` });
                    handleRemoveFile();
                } else {
                    setNotification({ type: 'error', message: result.message });
                }
            } catch (err) {
                setNotification({ type: 'error', message: 'Invalid JSON file content.' });
            }
        };
        reader.onerror = () => {
            setNotification({ type: 'error', message: 'Failed to read the file.' });
        };
        reader.readAsText(ideaFile);
    };

    const handleGenerateIdea = async () => {
        if (!ideaPrompt.trim()) {
            setNotification({ type: 'error', message: 'Please enter your idea description first.' });
            return;
        }
        setIsGeneratingIdea(true);
        setGeneratedIdea(null);
        setNotification(null);
    
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const responseSchema = {
                type: Type.OBJECT,
                properties: {
                    ideaTitle: { type: Type.STRING, description: 'A short, catchy title for the idea.' },
                    summary: { type: Type.STRING, description: 'A one-sentence summary of the idea.' },
                    problemStatement: { type: Type.STRING, description: 'The core problem this idea aims to solve.' },
                    solution: { type: Type.STRING, description: 'A detailed description of the proposed solution.' },
                    targetAudience: { type: Type.STRING, description: 'The primary user or group this idea is for.' },
                    requiredTechnologies: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                        description: 'A list of key technologies, protocols, or skills needed to build this.'
                    }
                },
                required: ['ideaTitle', 'summary', 'problemStatement', 'solution']
            };
    
            const contents = `Based on the following idea, generate a structured JSON object that conforms to the provided schema. The idea is: "${ideaPrompt}"`;
    
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents,
                config: {
                    responseMimeType: "application/json",
                    responseSchema,
                }
            });
            
            const jsonString = response.text;
            const parsedJson = JSON.parse(jsonString);
            const prettyJson = JSON.stringify(parsedJson, null, 2);
            setGeneratedIdea(prettyJson);
    
        } catch (e: any) {
            console.error("Gemini API error:", e);
            setNotification({ type: 'error', message: e.message || 'Failed to generate idea structure.' });
        } finally {
            setIsGeneratingIdea(false);
        }
    };

    const handleSubmitGeneratedIdea = async () => {
        if (!generatedIdea) return;
        setNotification(null);
        
        const result = await submitIdea(generatedIdea);
        
        if (result.success) {
            setNotification({ type: 'success', message: `${result.message} ID: ${result.ideaId}` });
            setGeneratedIdea(null);
            setIdeaPrompt('');
        } else {
            setNotification({ type: 'error', message: result.message });
        }
    };

    if (!user) {
        return <p>Error: No user data found.</p>;
    }

    return (
        <>
            {showOnboarding && <OnboardingGuide onComplete={handleOnboardingComplete} />}
            <div className="w-full max-w-4xl mx-auto bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-lg space-y-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                    <div>
                        {user.profileMeta.walletAddress ? (
                             <h2 className="text-3xl font-bold text-white font-mono tracking-tight">{formatWalletAddress(user.profileMeta.walletAddress)}</h2>
                        ) : (
                            <>
                                <h2 className="text-3xl font-bold text-white">{user.displayName}</h2>
                                <p className="text-gray-400">{user.email || ''}</p>
                            </>
                        )}
                        <div className="flex items-center space-x-2 mt-2">
                            {user.roles.map(role => <RolePill key={role} role={role} />)}
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        disabled={loading}
                        className="mt-4 md:mt-0 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-900 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
                    >
                        {loading ? <SpinnerIcon className="w-5 h-5" /> : 'Sign Out'}
                    </button>
                </div>
                
                <div className="bg-gray-700/50 p-6 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-white">Profile Details</h3>
                        {!isEditingProfile && (
                            <button onClick={() => setIsEditingProfile(true)} className="text-sm text-cyan-400 hover:text-cyan-300 font-semibold">
                                Edit
                            </button>
                        )}
                    </div>
                    {isEditingProfile ? (
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="displayName" className="block text-sm font-medium text-gray-300 mb-1">Display Name</label>
                                <input
                                    type="text"
                                    name="displayName"
                                    id="displayName"
                                    value={profileData.displayName}
                                    onChange={handleProfileChange}
                                    className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                                />
                            </div>
                            <div>
                                <label htmlFor="preferredLanguage" className="block text-sm font-medium text-gray-300 mb-1">Preferred Language</label>
                                <select
                                    name="preferredLanguage"
                                    id="preferredLanguage"
                                    value={profileData.preferredLanguage}
                                    onChange={handleProfileChange}
                                    className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition appearance-none pr-8"
                                    style={{ 
                                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                        backgroundPosition: 'right 0.5rem center',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: '1.5em 1.5em'
                                    }}
                                >
                                    {languages.map(lang => (
                                        <option key={lang.value} value={lang.value}>{lang.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-end space-x-3 pt-2">
                                <button onClick={handleCancelEdit} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500">
                                    Cancel
                                </button>
                                <button onClick={handleSaveProfile} disabled={isSaving || loading} className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 disabled:bg-cyan-800 flex items-center justify-center min-w-[80px]">
                                    {isSaving ? <SpinnerIcon className="w-5 h-5" /> : 'Save'}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3">
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
                        </div>
                    )}
                </div>

                <div className="bg-gray-700/50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-4">Identity & Sign-in Methods</h3>
                    <div className="space-y-4">
                        {user.email && (
                            <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-md border border-gray-600">
                                <div className="flex items-center space-x-4">
                                    <EmailIcon className="w-6 h-6 text-gray-400 flex-shrink-0" />
                                    <div>
                                        <p className="text-white font-medium">{user.email}</p>
                                        <p className="text-xs text-green-400 font-semibold uppercase tracking-wider">Primary</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
                             <button
                                onClick={showNotImplemented}
                                className="flex-1 flex items-center justify-center text-sm p-3 bg-gray-600/50 rounded-lg hover:bg-gray-600 transition-colors duration-200 text-gray-300 hover:text-white font-semibold border border-gray-500"
                            >
                                <PlusIcon className="w-5 h-5 mr-2" />
                                <span>Add email address</span>
                            </button>
                            <button
                                onClick={showNotImplemented}
                                className="flex-1 flex items-center justify-center text-sm p-3 bg-gray-600/50 rounded-lg hover:bg-gray-600 transition-colors duration-200 text-gray-300 hover:text-white font-semibold border border-gray-500"
                            >
                                <PlusIcon className="w-5 h-5 mr-2" />
                                <span>Add phone number</span>
                            </button>
                        </div>
                    </div>
                </div>

                {notification && (
                    <div className={`p-4 rounded-md ${notification.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                        <p className="font-semibold">{notification.type === 'success' ? 'Success' : 'Error'}</p>
                        <p className="text-sm">{notification.message}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div id="identity-section" className="bg-gray-700/50 p-6 rounded-lg flex flex-col">
                        {user.roles.includes(Role.CREATOR) ? (
                            <>
                                <div className="flex items-center mb-2">
                                    <PersistIDIcon className="w-6 h-6 mr-2 text-cyan-400" />
                                    <h3 className="text-xl font-semibold text-cyan-400">Create Your PersistID</h3>
                                </div>
                                <p className="text-gray-300 mb-4 flex-grow">Solidify your digital identity with a permanent, self-sovereign PersistID. This is your key to the ecosystem.</p>
                                <button 
                                    onClick={handleMint}
                                    disabled={loading}
                                    className="w-full mt-auto px-4 py-2 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-700 disabled:bg-cyan-800 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                     {loading ? <SpinnerIcon className="w-5 h-5" /> : 'Create PersistID'}
                                </button>
                            </>
                        ) : (
                             <>
                                <div className="flex items-center mb-2">
                                    <PersistIDIcon className="w-6 h-6 mr-2 text-yellow-400" />
                                    <h3 className="text-xl font-semibold text-yellow-400">Upgrade to PersistID</h3>
                                </div>
                                <p className="text-gray-300 mb-4 flex-grow">Unlock premium features, including a permanent digital identity, by becoming a Creator.</p>
                                <button 
                                    disabled
                                    className="w-full mt-auto px-4 py-2 bg-gray-600 text-gray-400 font-semibold rounded-md cursor-not-allowed"
                                >
                                    Upgrade to Creator
                                </button>
                            </>
                        )}
                    </div>

                    <div id="submit-idea-section" className="bg-gray-700/50 p-6 rounded-lg flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-cyan-400">Submit an Idea</h3>
                            <div className="flex space-x-1 bg-gray-900/50 p-1 rounded-lg">
                                <TabButton active={submitTab === 'upload'} onClick={() => setSubmitTab('upload')}>
                                    Upload
                                </TabButton>
                                <TabButton active={submitTab === 'ai'} onClick={() => setSubmitTab('ai')}>
                                    <SparklesIcon className="w-4 h-4 mr-1.5" />
                                    AI Builder
                                </TabButton>
                            </div>
                        </div>

                        {submitTab === 'upload' ? (
                            <div>
                                <p className="text-gray-300 mb-4">Upload your idea as a JSON file to prove provenance.</p>
                                <form onSubmit={handleSubmitIdea}>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        accept="application/json"
                                        className="hidden"
                                    />
                                    {!ideaFile ? (
                                        <div
                                            onClick={handleFileSelectClick}
                                            onDragOver={handleDragOver}
                                            onDrop={handleDrop}
                                            className="w-full flex flex-col justify-center items-center px-6 py-10 border-2 border-dashed border-gray-500 rounded-md cursor-pointer hover:border-cyan-400 hover:bg-gray-700/50 transition-colors duration-200"
                                        >
                                            <UploadIcon />
                                            <p className="mt-2 text-sm text-gray-400">
                                                <span className="font-semibold text-cyan-400">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500">JSON file only</p>
                                        </div>
                                    ) : (
                                        <div className="w-full flex items-center justify-between p-3 bg-gray-800 border border-gray-600 rounded-md">
                                            <div className="flex items-center space-x-3 overflow-hidden">
                                                <DocumentIcon />
                                                <span className="text-gray-300 truncate font-mono text-sm">{ideaFile.name}</span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleRemoveFile}
                                                className="text-gray-400 hover:text-white transition-colors"
                                                aria-label="Remove file"
                                            >
                                                <XIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    )}
                                    <button 
                                        type="submit"
                                        disabled={loading || !ideaFile}
                                        className="w-full mt-4 px-4 py-2 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-700 disabled:bg-cyan-800 disabled:cursor-not-allowed flex items-center justify-center"
                                    >
                                        {loading ? <SpinnerIcon className="w-5 h-5" /> : 'Submit Idea'}
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="flex flex-col flex-grow">
                                <p className="text-gray-300 mb-4">Describe your idea and let AI structure it for you.</p>
                                <textarea
                                    value={ideaPrompt}
                                    onChange={(e) => setIdeaPrompt(e.target.value)}
                                    placeholder="e.g., A decentralized social network for artists to securely share and monetize their work..."
                                    className="w-full bg-gray-900 border border-gray-600 rounded-md p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition min-h-[100px]"
                                    rows={4}
                                    disabled={isGeneratingIdea}
                                />
                                <button
                                    onClick={handleGenerateIdea}
                                    disabled={isGeneratingIdea || !ideaPrompt.trim()}
                                    className="w-full mt-4 px-4 py-2 bg-pink-600 text-white font-semibold rounded-md hover:bg-pink-700 disabled:bg-pink-800/80 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {isGeneratingIdea ? <SpinnerIcon className="w-5 h-5" /> : <><SparklesIcon className="w-5 h-5 mr-2" />Generate with AI</>}
                                </button>
                                {generatedIdea && (
                                    <div className="mt-4 flex flex-col flex-grow">
                                        <p className="text-sm font-semibold text-gray-300 mb-2">Generated Idea Structure:</p>
                                        <pre className="bg-gray-900 rounded-md p-4 text-xs text-gray-200 overflow-x-auto max-h-60 flex-grow">
                                            <code>{generatedIdea}</code>
                                        </pre>
                                        <button
                                            onClick={handleSubmitGeneratedIdea}
                                            disabled={loading}
                                            className="w-full mt-4 px-4 py-2 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-700 disabled:bg-cyan-800 disabled:cursor-not-allowed flex items-center justify-center"
                                        >
                                            {loading ? <SpinnerIcon className="w-5 h-5" /> : 'Submit Generated Idea'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;