
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import UserProfile from './UserProfile';
import AuthModal from './AuthModal';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { LogoIcon } from './icons/LogoIcon';

const MainContent: React.FC = () => {
    const { user, loading } = useAuth();
    const [isAuthModalOpen, setAuthModalOpen] = useState(false);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center text-gray-400">
                <SpinnerIcon className="w-10 h-10" />
                <p className="mt-4">Initializing Session...</p>
            </div>
        );
    }

    return (
        <>
            {user ? (
                <UserProfile />
            ) : (
                <div className="text-center bg-gray-800/50 border border-gray-700 p-12 rounded-lg shadow-2xl max-w-lg">
                    <LogoIcon className="h-16 w-16 text-pink-500 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-white mb-2">Welcome to the Ecosystem</h2>
                    <p className="text-gray-400 mb-8">
                        Join a decentralized studio where ideas are valued and creators are empowered.
                    </p>
                    <button
                        onClick={() => setAuthModalOpen(true)}
                        className="px-8 py-3 bg-pink-600 text-white font-bold rounded-lg hover:bg-pink-700 transition-transform transform hover:scale-105"
                    >
                        Sign In / Create Account
                    </button>
                </div>
            )}
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
        </>
    );
};

export default MainContent;