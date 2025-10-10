import React from 'react';
import { AuthProviderType } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { SpinnerIcon } from '../icons/SpinnerIcon';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import { GoogleIcon } from '../icons/GoogleIcon';
import ErrorDisplay from '../ErrorDisplay';

interface ConnectorProps {
    onBack: () => void;
    onSuccess: () => void;
}

const GoogleConnector: React.FC<ConnectorProps> = ({ onBack, onSuccess }) => {
    const { login, loading, error } = useAuth();
    
    const handleConnect = async () => {
        // In a real app, this would trigger the Google OAuth flow.
        await login(AuthProviderType.GOOGLE, {
            scope: "email profile openid",
        });
    };

    return (
        <div>
            <button onClick={onBack} className="flex items-center text-sm text-gray-400 hover:text-white mb-4">
                <ArrowLeftIcon />
                Back
            </button>
            <div className="flex flex-col items-center">
                <GoogleIcon className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold text-center text-white mb-2">Sign in with Google</h3>
                <p className="text-center text-gray-400 text-sm mb-6">You will be redirected to Google to sign in.</p>
            </div>

            <ErrorDisplay message={error} />
            
            <button
                onClick={handleConnect}
                disabled={loading}
                className="w-full flex items-center justify-center p-3 bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors duration-200 text-white font-bold disabled:bg-gray-700 disabled:cursor-not-allowed"
            >
                {loading ? <SpinnerIcon /> : 'Continue with Google'}
            </button>
        </div>
    );
};

export default GoogleConnector;