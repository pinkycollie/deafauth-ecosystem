import React, { useState } from 'react';
import { AuthProviderType } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { SpinnerIcon } from '../icons/SpinnerIcon';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import ErrorDisplay from '../ErrorDisplay';

interface ConnectorProps {
    onBack: () => void;
    onSuccess: () => void;
}

const EmailConnector: React.FC<ConnectorProps> = ({ onBack, onSuccess }) => {
    const [email, setEmail] = useState('');
    const [mfaCode, setMfaCode] = useState('');
    const [view, setView] = useState<'email' | 'mfa'>('email');
    const { login, loading, error } = useAuth();

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would trigger an API call to send the code.
        // Here, we just switch the view.
        setView('mfa');
    };

    const handleMfaSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
         await login(AuthProviderType.EMAIL, {
            email: email,
            mfaCode,
        });
    };

    return (
        <div>
            <button onClick={onBack} className="flex items-center text-sm text-gray-400 hover:text-white mb-4">
                <ArrowLeftIcon />
                Back
            </button>
            <h3 className="text-xl font-bold text-center text-white mb-2">Sign in with Email</h3>
            
            <ErrorDisplay message={error} />

            {view === 'email' ? (
                <>
                    <p className="text-center text-gray-400 text-sm mb-6">We'll send a secure login code to your email.</p>
                    <form onSubmit={handleEmailSubmit}>
                        <label htmlFor="email-input" className="sr-only">Email address</label>
                        <input
                            id="email-input"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full bg-gray-900 border border-gray-600 rounded-md p-3 mb-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
                            required
                        />
                        <button
                            type="submit"
                            disabled={loading || !email}
                            className="w-full flex items-center justify-center p-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors duration-200 text-white font-bold disabled:bg-purple-800 disabled:cursor-not-allowed"
                        >
                            {loading ? <SpinnerIcon /> : 'Continue'}
                        </button>
                    </form>
                </>
            ) : (
                <>
                    <p className="text-center text-gray-400 text-sm mb-6">
                        We've sent a code to <strong className="text-gray-200">{email}</strong>. Please enter it below.
                    </p>
                     <form onSubmit={handleMfaSubmit}>
                        <label htmlFor="mfa-input" className="sr-only">Verification Code</label>
                        <input
                            id="mfa-input"
                            type="text"
                            value={mfaCode}
                            onChange={(e) => setMfaCode(e.target.value)}
                            placeholder="123456"
                            maxLength={6}
                            className="w-full bg-gray-900 border border-gray-600 rounded-md p-3 mb-4 text-white text-center tracking-[0.5em] text-lg font-mono placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
                            required
                            autoComplete="one-time-code"
                            inputMode="numeric"
                        />
                        <button
                            type="submit"
                            disabled={loading || mfaCode.length < 6}
                            className="w-full flex items-center justify-center p-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors duration-200 text-white font-bold disabled:bg-purple-800 disabled:cursor-not-allowed"
                        >
                            {loading ? <SpinnerIcon /> : 'Verify & Sign In'}
                        </button>
                    </form>
                </>
            )}
        </div>
    );
};

export default EmailConnector;