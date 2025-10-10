import React from 'react';
import { AuthProviderType } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { SpinnerIcon } from '../icons/SpinnerIcon';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import { OneAuthIcon } from '../icons/OneAuthIcon';
import ErrorDisplay from '../ErrorDisplay';

interface ConnectorProps {
    onBack: () => void;
    onSuccess: () => void;
}

const OneAuthConnector: React.FC<ConnectorProps> = ({ onBack, onSuccess }) => {
    const { login, loading, error } = useAuth();
    
    const handleConnect = async () => {
        // In a real app, this would trigger the Zoho OAuth flow.
        await login(AuthProviderType.ONEAUTH, {
            scope: "profile.readonly",
        });
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

            <ErrorDisplay message={error} />
            
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