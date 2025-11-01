

import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { SpinnerIcon } from '../icons/SpinnerIcon';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import { GitHubIcon } from '../icons/GitHubIcon';
import { AuthProviderType } from '../../types';

interface ConnectorProps {
    onBack: () => void;
    onSuccess: () => void;
}

const GitHubConnector: React.FC<ConnectorProps> = ({ onBack }) => {
    const { login, loading, error } = useAuth();
    
    const handleConnect = () => {
        login(AuthProviderType.GITHUB, {});
    };

    return (
        <div>
            <button onClick={onBack} className="flex items-center text-sm text-gray-400 hover:text-white mb-4">
                <ArrowLeftIcon />
                Back
            </button>
            <div className="flex flex-col items-center">
                <GitHubIcon className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold text-center text-white mb-2">Sign in with GitHub</h3>
                <p className="text-center text-gray-400 text-sm mb-6">You will be redirected to GitHub to sign in.</p>
            </div>

            {error && <p className="text-red-400 text-center text-sm mb-4">{error}</p>}
            
            <button
                onClick={handleConnect}
                disabled={loading}
                className="w-full flex items-center justify-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-white font-bold disabled:bg-gray-900 disabled:cursor-not-allowed border border-gray-600"
            >
                {loading ? <SpinnerIcon /> : 'Continue with GitHub'}
            </button>
        </div>
    );
};

export default GitHubConnector;