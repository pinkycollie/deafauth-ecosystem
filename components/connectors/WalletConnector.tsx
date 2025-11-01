import React from 'react';
import { AuthProviderType } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { SpinnerIcon } from '../icons/SpinnerIcon';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';

interface ConnectorProps {
    onBack: () => void;
    onSuccess: () => void;
}

const WalletConnector: React.FC<ConnectorProps> = ({ onBack, onSuccess }) => {
    const { login, loading, error } = useAuth();
    
    const handleConnect = async () => {
        // In a real app, this would use ethers.js or web3.js to get a signer and sign a message.
        const mockSignature = '0x' + Array(130).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
        const mockAddress = '0x1234567890123456789012345678901234567890';
        
        await login(AuthProviderType.WALLET, {
            message: "Please sign this message to authenticate.",
            signature: mockSignature,
            address: mockAddress,
        });

        // The onSuccess call is now implicitly handled by the AuthContext state change
        // which will close the modal. We can still call it if needed for other side effects.
        // onSuccess();
    };

    return (
        <div>
            <button onClick={onBack} className="flex items-center text-sm text-gray-400 hover:text-white mb-4">
                <ArrowLeftIcon />
                Back
            </button>
            <h3 className="text-xl font-bold text-center text-white mb-2">Connect Wallet</h3>
            <p className="text-center text-gray-400 text-sm mb-6">Please sign the message with your wallet to continue.</p>

            {error && <p className="text-red-400 text-center text-sm mb-4">{error}</p>}
            
            <button
                onClick={handleConnect}
                disabled={loading}
                className="w-full flex items-center justify-center p-3 bg-pink-600 rounded-lg hover:bg-pink-700 transition-colors duration-200 text-white font-bold disabled:bg-pink-800 disabled:cursor-not-allowed"
            >
                {loading ? <SpinnerIcon /> : 'Sign & Authenticate'}
            </button>
        </div>
    );
};

export default WalletConnector;