
import React from 'react';
import { AuthProviderType } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { SpinnerIcon } from '../icons/SpinnerIcon';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import ErrorDisplay from '../ErrorDisplay';

interface ConnectorProps {
    onBack: () => void;
    onSuccess: () => void;
}

const DeafAuthConnector: React.FC<ConnectorProps> = ({ onBack, onSuccess }) => {
    const { login, loading, error } = useAuth();
    
    const handleLogin = async () => {
        // This simulates receiving a signed token from a DeafAuth provider
        const mockToken = 'deafauth-token-' + Date.now();
        await login(AuthProviderType.DEAF_AUTH, { token: mockToken });
    };

    return (
        <div>
            <button onClick={onBack} className="flex items-center text-sm text-gray-400 hover:text-white mb-4">
                <ArrowLeftIcon />
                Back
            </button>
            <h3 className="text-xl font-bold text-center text-white mb-2">DeafAuth</h3>
            <p className="text-center text-gray-400 text-sm mb-4">An ASL-first, visual authentication experience.</p>

            <div className="text-center text-xs text-gray-500 border border-gray-700 rounded-md p-2 mb-4 bg-gray-900/50">
                <p><strong className="font-semibold text-gray-400">Note:</strong> DeafAuth provides secure authentication. For a persistent, decentralized identifier (DID), consider its sibling service, <span className="font-semibold text-gray-400">PersistID</span>.</p>
            </div>

            <div className="aspect-video bg-gray-900 rounded-md mb-6 flex items-center justify-center border border-gray-600">
                <p className="text-gray-500">[Simulated ASL Video Prompt]</p>
            </div>
            
            <ErrorDisplay message={error} />
            
            <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-white font-bold disabled:bg-blue-800 disabled:cursor-not-allowed"
            >
                {loading ? <SpinnerIcon /> : 'Confirm with DeafAuth'}
            </button>
        </div>
    );
};

export default DeafAuthConnector;