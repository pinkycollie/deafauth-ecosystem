
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { SpinnerIcon } from '../icons/SpinnerIcon';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import { OneAuthIcon } from '../icons/OneAuthIcon';
import { AuthProviderType } from '../../types';

interface ConnectorProps {
    onBack: () => void;
    onSuccess: () => void;
}

const OneAuthConnector: React.FC<ConnectorProps> = ({ onBack }) => {
    const { login, loading, error } = useAuth();
    
    const handleConnect = () => {
        // The useAuth hook now calls Supabase's signInWithOAuth for Zoho
        login(AuthProviderType.ONEAUTH, {});
    };

    return (
        <div>
            <button onClick={onBack} className="flex items-center text-sm text-gray-400 hover:text-white mb-4">
                <ArrowLeftIcon />
                Back
            </button>
             <div className="flex flex-col items-center">
                <OneAuthIcon className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold text-center text-white mb-2">Sign in with OneAuth</h3>
                <p className="text-center text-gray-400 text-sm mb-6">Use your Zoho account to sign in securely.</p>
            </div>

            {error && <p className="text-red-400 text-center text-sm mb-4">{error}</p>}
            
            <button
                onClick={handleConnect}
                disabled={loading}
                className="w-full flex items-center justify-center p-3 bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200 text-white font-bold disabled:bg-red-800 disabled:cursor-not-allowed"
            >
                {loading ? <SpinnerIcon /> : 'Continue with Zoho'}
            </button>
        </div>
    );
};

export default OneAuthConnector;