
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import UserProfile from './UserProfile';
import AuthModal from './AuthModal';
import DeployAuthButton from './DeployAuthButton';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { LogoIcon } from './icons/LogoIcon';
import { DeploymentStatus } from '../services/version-control';

const MainContent: React.FC = () => {
    const { user, loading } = useAuth();
    const [isAuthModalOpen, setAuthModalOpen] = useState(false);
    const [showDeployPanel, setShowDeployPanel] = useState(false);

    const handleDeploy = (status: DeploymentStatus) => {
        console.log('Auth system deployed:', status);
    };

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
                <div className="w-full max-w-4xl">
                    <UserProfile />
                    
                    {/* Deploy Panel for Authenticated Users */}
                    <div className="mt-8 p-6 bg-gray-800/50 border border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-white">Deploy Auth System</h3>
                            <button
                                onClick={() => setShowDeployPanel(!showDeployPanel)}
                                className="text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                {showDeployPanel ? 'Hide Details' : 'Show Details'}
                            </button>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">
                            Deploy DeafAuth as a ready-to-use authentication system with version control,
                            integrity validation, and consistency checks.
                        </p>
                        <DeployAuthButton
                            environment="production"
                            version="1.0.0"
                            onDeploy={handleDeploy}
                        />
                    </div>
                </div>
            ) : (
                <div className="text-center bg-gray-800/50 border border-gray-700 p-12 rounded-lg shadow-2xl max-w-lg">
                    <LogoIcon className="h-16 w-16 text-pink-500 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-white mb-2">Welcome to the Ecosystem</h2>
                    <p className="text-gray-400 mb-8">
                        Join a decentralized studio where ideas are valued and creators are empowered.
                    </p>
                    <div className="space-y-4">
                        <button
                            onClick={() => setAuthModalOpen(true)}
                            className="w-full px-8 py-3 bg-pink-600 text-white font-bold rounded-lg hover:bg-pink-700 transition-transform transform hover:scale-105"
                        >
                            Sign In / Create Account
                        </button>
                        
                        {/* Deploy Button for Quick Access */}
                        <div className="pt-4 border-t border-gray-700">
                            <p className="text-gray-500 text-xs mb-3">Ready to integrate?</p>
                            <DeployAuthButton
                                environment="production"
                                version="1.0.0"
                                onDeploy={handleDeploy}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            )}
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
        </>
    );
};

export default MainContent;