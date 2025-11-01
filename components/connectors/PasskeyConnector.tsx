
import React from 'react';
import { AuthProviderType } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { SpinnerIcon } from '../icons/SpinnerIcon';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';

interface ConnectorProps {
    onBack: () => void;
    onSuccess: () => void;
}

const PasskeyConnector: React.FC<ConnectorProps> = ({ onBack, onSuccess }) => {
    const { login, loading, error } = useAuth();
    
    const handleLogin = async () => {
        // This simulates getting a WebAuthn assertion from the browser
        const mockAssertion = {
            id: 'passkey-assertion-id',
            rawId: 'raw-id',
            response: {
                authenticatorData: 'auth-data',
                clientDataJSON: 'client-json',
                signature: 'sig',
                userHandle: 'user-handle'
            },
            type: 'public-key'
        };
        await login(AuthProviderType.PASSKEY, { assertion: mockAssertion });
    };

    return (
        <div>
            <button onClick={onBack} className="flex items-center text-sm text-gray-400 hover:text-white mb-4">
                <ArrowLeftIcon />
                Back
            </button>
            <h3 className="text-xl font-bold text-center text-white mb-2">Use Passkey</h3>
            <p className="text-center text-gray-400 text-sm mb-6">The fastest and most secure way to sign in.</p>

            {error && <p className="text-red-400 text-center text-sm mb-4">{error}</p>}
            
            <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center p-3 bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200 text-white font-bold disabled:bg-green-800 disabled:cursor-not-allowed"
            >
                {loading ? <SpinnerIcon /> : 'Sign In with Passkey'}
            </button>
            <p className="text-xs text-gray-500 text-center mt-4">Your device will prompt you to use your fingerprint, face, or PIN.</p>
        </div>
    );
};

export default PasskeyConnector;