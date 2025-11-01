

import React, { useState } from 'react';
import { AuthProviderType } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { SpinnerIcon } from '../icons/SpinnerIcon';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';

interface ConnectorProps {
    onBack: () => void;
    onSuccess: () => void;
}

const EmailConnector: React.FC<ConnectorProps> = ({ onBack, onSuccess }) => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const { login, loading, error } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(AuthProviderType.EMAIL, { email });
        // We check for *no* error from the context before setting submitted state
        const { error: authError } = useAuth();
        if (!authError) {
            setSubmitted(true);
        }
    };

    return (
        <div>
            <button onClick={onBack} className="flex items-center text-sm text-gray-400 hover:text-white mb-4">
                <ArrowLeftIcon />
                Back
            </button>
            <h3 className="text-xl font-bold text-center text-white mb-2">Sign in with Email</h3>
            
            {error && <p className="text-red-400 text-center text-sm my-4">{error}</p>}

            {!submitted ? (
                <>
                    <p className="text-center text-gray-400 text-sm mb-6">We'll send a secure magic link to your email.</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full bg-gray-900 border border-gray-600 rounded-md p-3 mb-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
                            required
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center p-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors duration-200 text-white font-bold disabled:bg-purple-800 disabled:cursor-not-allowed"
                        >
                            {loading ? <SpinnerIcon /> : 'Send Magic Link'}
                        </button>
                    </form>
                </>
            ) : (
                <div className="text-center">
                    <p className="text-gray-300">Magic link sent to <strong>{email}</strong>.</p>
                    <p className="text-gray-400 mt-2">Please check your inbox and click the link to sign in.</p>
                </div>
            )}
        </div>
    );
};

export default EmailConnector;