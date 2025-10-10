import React from 'react';
import { AuthProviderType } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { SpinnerIcon } from '../icons/SpinnerIcon';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import { AzureIcon } from '../icons/AzureIcon';
import ErrorDisplay from '../ErrorDisplay';

interface ConnectorProps {
    onBack: () => void;
    onSuccess: () => void;
}

const AzureConnector: React.FC<ConnectorProps> = ({ onBack, onSuccess }) => {
    const { login, loading, error } = useAuth();
    
    const handleConnect = async () => {
        // In a real app, this would trigger the Azure AD OAuth flow.
        await login(AuthProviderType.AZURE, {
            tenant: "common", // or a specific tenant ID
        });
    };

    return (
        <div>
            <button onClick={onBack} className="flex items-center text-sm text-gray-400 hover:text-white mb-4">
                <ArrowLeftIcon />
                Back
            </button>
             <div className="flex flex-col items-center">
                <AzureIcon className="w-12 h-12 mb-4 text-blue-500" />
                <h3 className="text-xl font-bold text-center text-white mb-2">Sign in with Azure AD</h3>
                <p className="text-center text-gray-400 text-sm mb-6">Use your work or school account to sign in.</p>
            </div>

            <ErrorDisplay message={error} />
            
            <button
                onClick={handleConnect}
                disabled={loading}
                className="w-full flex items-center justify-center p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-white font-bold disabled:bg-blue-800 disabled:cursor-not-allowed"
            >
                {loading ? <SpinnerIcon /> : 'Continue with Microsoft'}
            </button>
        </div>
    );
};

export default AzureConnector;