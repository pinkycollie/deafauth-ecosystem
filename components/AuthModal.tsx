
import React, { useState } from 'react';
import { AuthProviderType } from '../types';
import EmailConnector from './connectors/EmailConnector';
import GoogleConnector from './connectors/GoogleConnector';
import GitHubConnector from './connectors/GitHubConnector';
import DeafAuthConnector from './connectors/DeafAuthConnector';
import { EmailIcon } from './icons/EmailIcon';
import { XIcon } from './icons/XIcon';
import { GoogleIcon } from './icons/GoogleIcon';
import { GitHubIcon } from './icons/GitHubIcon';
import { DeafAuthIcon } from './icons/DeafAuthIcon';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type View = 'selector' | AuthProviderType;

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [view, setView] = useState<View>('selector');

  if (!isOpen) return null;

  const handleClose = () => {
    setView('selector');
    onClose();
  };

  const renderView = () => {
    switch (view) {
      case AuthProviderType.EMAIL:
        return <EmailConnector onBack={() => setView('selector')} onSuccess={handleClose} />;
      case AuthProviderType.GOOGLE:
        return <GoogleConnector onBack={() => setView('selector')} onSuccess={handleClose} />;
      case AuthProviderType.GITHUB:
        return <GitHubConnector onBack={() => setView('selector')} onSuccess={handleClose} />;
      case AuthProviderType.DEAF_AUTH:
        return <DeafAuthConnector onBack={() => setView('selector')} onSuccess={handleClose} />;
      default:
        return (
          <>
            <h2 className="text-2xl font-bold text-center text-white mb-6">Sign In / Sign Up</h2>
            <div className="space-y-3">
              <button
                  onClick={() => setView(AuthProviderType.DEAF_AUTH)}
                  className="flex items-center w-full p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 border border-blue-500"
              >
                  <span className="flex-shrink-0">
                      <DeafAuthIcon className="w-6 h-6 mr-4 text-white"/>
                  </span>
                  <span className="flex-grow text-center text-md font-semibold text-white">Continue with DeafAuth</span>
              </button>
              
              <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-gray-600"></div>
                  <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase">Or</span>
                  <div className="flex-grow border-t border-gray-600"></div>
              </div>

              <AuthProviderButton icon={<GitHubIcon className="w-6 h-6 mr-4"/>} label="Continue with GitHub" onClick={() => setView(AuthProviderType.GITHUB)} />
              <AuthProviderButton icon={<GoogleIcon className="w-6 h-6 mr-4"/>} label="Continue with Google" onClick={() => setView(AuthProviderType.GOOGLE)} />
              <AuthProviderButton icon={<EmailIcon className="w-6 h-6 mr-4 text-gray-300"/>} label="Continue with Email" onClick={() => setView(AuthProviderType.EMAIL)} />
            </div>
          </>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={handleClose}>
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-sm relative border border-gray-700" onClick={e => e.stopPropagation()}>
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition">
          <XIcon />
        </button>
        {renderView()}
      </div>
    </div>
  );
};

interface AuthProviderButtonProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
}

const AuthProviderButton: React.FC<AuthProviderButtonProps> = ({ icon, label, onClick }) => (
    <button
        onClick={onClick}
        className="flex items-center w-full p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200 border border-gray-600"
    >
        <span className="flex-shrink-0">{icon}</span>
        <span className="flex-grow text-center text-md font-semibold text-white">{label}</span>
    </button>
);


export default AuthModal;