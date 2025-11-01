
import React, { useState, useRef, useEffect } from 'react';
import { AuthProviderType } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { SpinnerIcon } from '../icons/SpinnerIcon';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import { CameraIcon } from '../icons/CameraIcon';

interface ConnectorProps {
    onBack: () => void;
    onSuccess: () => void;
}

type VerificationState = 'idle' | 'initializing' | 'permission_denied' | 'ready' | 'verifying';

const DeafAuthConnector: React.FC<ConnectorProps> = ({ onBack }) => {
    const { login, loading, error } = useAuth();
    const [verificationState, setVerificationState] = useState<VerificationState>('idle');
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
    };
    
    // Cleanup effect
    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    const startVerification = async () => {
        setVerificationState('initializing');
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                setVerificationState('ready');
            } catch (err) {
                console.error("Camera access denied:", err);
                setVerificationState('permission_denied');
            }
        } else {
            setVerificationState('permission_denied'); // Or a 'not_supported' state
        }
    };
    
    const handleLogin = async () => {
        setVerificationState('verifying');
        stopCamera();
        // Simulate a delay for AI processing
        await new Promise(resolve => setTimeout(resolve, 2500));
        
        const mockToken = 'deafauth-token-' + Date.now();
        // The context now handles how to process this custom auth type
        await login(AuthProviderType.DEAF_AUTH, { token: mockToken });
    };

    const renderContent = () => {
        switch (verificationState) {
            case 'idle':
                return (
                    <div className="text-center">
                        <p className="text-gray-400 text-sm mb-4">An ASL-first, visual authentication experience.</p>
                        <div className="text-center text-xs text-gray-500 border border-gray-700 rounded-md p-2 mb-6 bg-gray-900/50">
                            <p><strong className="font-semibold text-gray-400">Note:</strong> This simulates a real DeafAuth verification using your camera.</p>
                        </div>
                        <CameraIcon className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                        <button
                            onClick={startVerification}
                            className="w-full flex items-center justify-center p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-white font-bold"
                        >
                            Start Verification
                        </button>
                    </div>
                );
            case 'initializing':
                 return (
                    <div className="text-center py-8">
                        <SpinnerIcon className="w-10 h-10 mx-auto" />
                        <p className="mt-4 text-gray-400">Initializing camera...</p>
                    </div>
                );
            case 'permission_denied':
                 return (
                    <div className="text-center">
                         <p className="text-red-400 text-sm mb-4">Camera access was denied. Please enable camera permissions in your browser settings to use DeafAuth.</p>
                         <button onClick={onBack} className="w-full flex items-center justify-center p-3 bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors duration-200 text-white font-bold">
                            Go Back
                         </button>
                    </div>
                );
            case 'verifying':
                 return (
                    <div className="aspect-video bg-gray-900 rounded-md mb-6 flex items-center justify-center border border-gray-600 relative">
                        <video ref={videoRef} autoPlay playsInline muted className="absolute w-full h-full object-cover rounded-md opacity-30"></video>
                        <div className="z-10 text-center">
                           <SpinnerIcon className="w-10 h-10 mx-auto" />
                           <p className="mt-4 text-white font-semibold">Verifying with DeafAuth AI...</p>
                        </div>
                    </div>
                 );
            case 'ready':
                return (
                    <>
                        <div className="aspect-video bg-gray-900 rounded-md mb-6 flex items-center justify-center border border-gray-600 relative overflow-hidden">
                            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover"></video>
                            <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                CHALLENGE: Sign "Hello"
                            </div>
                        </div>
                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className="w-full flex items-center justify-center p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-white font-bold disabled:bg-blue-800 disabled:cursor-not-allowed"
                        >
                            {loading ? <SpinnerIcon /> : 'Confirm Identity'}
                        </button>
                    </>
                );
        }
    };


    return (
        <div>
            <button onClick={() => { stopCamera(); onBack(); }} className="flex items-center text-sm text-gray-400 hover:text-white mb-4">
                <ArrowLeftIcon />
                Back
            </button>
            <h3 className="text-xl font-bold text-center text-white mb-2">DeafAuth</h3>
            {error && <p className="text-red-400 text-center text-sm mb-4">{error}</p>}
            {renderContent()}
        </div>
    );
};

export default DeafAuthConnector;