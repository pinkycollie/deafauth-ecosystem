import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Role } from '../types';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { UploadIcon } from './icons/UploadIcon';
import { DocumentIcon } from './icons/DocumentIcon';
import { XIcon } from './icons/XIcon';
import { OnboardingGuide } from './OnboardingGuide';

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

const UserProfile: React.FC = () => {
    const { user, logout, loading, mintDeafPass, submitIdea } = useAuth();
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [ideaFile, setIdeaFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showOnboarding, setShowOnboarding] = useState(false);

    useEffect(() => {
        const onboardingCompleted = localStorage.getItem('onboardingCompleted');
        if (!onboardingCompleted) {
            // Use a small timeout to ensure the UI has rendered and elements are available
            setTimeout(() => setShowOnboarding(true), 500);
        }
    }, []);

    const handleOnboardingComplete = () => {
        setShowOnboarding(false);
        localStorage.setItem('onboardingCompleted', 'true');
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

    if (!user) {
        return <p>Error: No user data found.</p>;
    }

    return (
        <>
            {showOnboarding && <OnboardingGuide onComplete={handleOnboardingComplete} />}
            <div className="w-full max-w-4xl mx-auto bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-lg">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
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
                
                {notification && (
                    <div
                        aria-live="polite"
                        className={`p-4 rounded-md mb-6 ${notification.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                        <p className="font-semibold">{notification.type === 'success' ? 'Success' : 'Error'}</p>
                        <p className="text-sm">{notification.message}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div id="mint-pass-section" className="bg-gray-700/50 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2 text-pink-400">Mint DeafAuth Pass</h3>
                        <p className="text-gray-300 mb-4">Secure your identity on-chain with a DeafAuth Pass NFT. This acts as your credential across the ecosystem.</p>
                        <button 
                            onClick={handleMint}
                            disabled={loading}
                            className="w-full px-4 py-2 bg-pink-600 text-white font-semibold rounded-md hover:bg-pink-700 disabled:bg-pink-800 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                             {loading ? <SpinnerIcon className="w-5 h-5" /> : 'Mint Pass'}
                        </button>
                    </div>

                    <div id="submit-idea-section" className="bg-gray-700/50 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2 text-cyan-400">Submit an Idea</h3>
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
                                    role="button"
                                    tabIndex={0}
                                    onClick={handleFileSelectClick}
                                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleFileSelectClick(); }}
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                    className="w-full flex flex-col justify-center items-center px-6 py-10 border-2 border-dashed border-gray-500 rounded-md cursor-pointer hover:border-cyan-400 hover:bg-gray-700/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500"
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
                </div>
            </div>
        </>
    );
};

export default UserProfile;