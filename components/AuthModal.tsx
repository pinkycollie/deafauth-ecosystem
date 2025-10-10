
import React, { useState, useEffect, useRef } from 'react';
import { AuthProviderType } from '../types';
import WalletConnector from './connectors/WalletConnector';
import DeafAuthConnector from './connectors/DeafAuthConnector';
import EmailConnector from './connectors/EmailConnector';
import PasskeyConnector from './connectors/PasskeyConnector';
import FibonroseInfo from './FibonroseInfo';
import PersistIDInfo from './PersistIDInfo';
import GoogleConnector from './connectors/GoogleConnector';
import AzureConnector from './connectors/AzureConnector';
import OneAuthConnector from './connectors/OneAuthConnector';
import { WalletIcon } from './icons/WalletIcon';
import { DeafAuthIcon } from './icons/DeafAuthIcon';
import { EmailIcon } from './icons/EmailIcon';
import { PasskeyIcon } from './icons/PasskeyIcon';
import { FibonroseIcon } from './icons/FibonroseIcon';
import { PersistIDIcon } from './icons/PersistIDIcon';
import { XIcon } from './icons/XIcon';
import { GoogleIcon } from './icons/GoogleIcon';
import { AzureIcon } from './icons/AzureIcon';
import { OneAuthIcon } from './icons/OneAuthIcon';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type View = 'selector' | AuthProviderType;

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [view, setView] = useState<View>('selector');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose();
        }
        if (e.key === 'Tab') {
          const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (!focusableElements || focusableElements.length === 0) return;

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      // Set initial focus on the first focusable element.
      const firstFocusable = modalRef.current?.querySelector<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      firstFocusable?.focus();
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, view]);

  if (!isOpen) return null;

  const handleClose = () => {
    setView('selector');
    onClose();
  };

  const renderView = () => {
    switch (view) {
      case AuthProviderType.WALLET:
        return <WalletConnector onBack={() => setView('selector')} onSuccess={handleClose} />;
      case AuthProviderType.DEAF_AUTH:
        return <DeafAuthConnector onBack={() => setView('selector')} onSuccess={handleClose} />;
      case AuthProviderType.EMAIL:
        return <EmailConnector onBack={() => setView('selector')} onSuccess={handleClose} />;
      case AuthProviderType.PASSKEY:
        return <PasskeyConnector onBack={() => setView('selector')} onSuccess={handleClose} />;
      case AuthProviderType.GOOGLE:
        return <GoogleConnector onBack={() => setView('selector')} onSuccess={handleClose} />;
      case AuthProviderType.AZURE:
        return <AzureConnector onBack={() => setView('selector')} onSuccess={handleClose} />;
      case AuthProviderType.ONEAUTH:
        return <OneAuthConnector onBack={() => setView('selector')} onSuccess={handleClose} />;
      case AuthProviderType.FIBONROSE:
        return <FibonroseInfo onBack={() => setView('selector')} />;
      case AuthProviderType.PERSIST_ID:
        return <PersistIDInfo onBack={() => setView('selector')} />;
      default:
        return (
          <>
            <h2 id="auth-modal-title" className="text-2xl font-bold text-center text-white mb-6">Choose a provider</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AuthProviderButton icon={<WalletIcon />} label="Wallet" onClick={() => setView(AuthProviderType.WALLET)} />
              <AuthProviderButton icon={<DeafAuthIcon />} label="DeafAuth" onClick={() => setView(AuthProviderType.DEAF_AUTH)} />
              <AuthProviderButton icon={<EmailIcon />} label="Email" onClick={() => setView(AuthProviderType.EMAIL)} />
              <AuthProviderButton icon={<PasskeyIcon />} label="Passkey" onClick={() => setView(AuthProviderType.PASSKEY)} />
            </div>
            
            <div className="relative my-4">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-600" />
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-gray-800 px-2 text-sm text-gray-400">Corporate & Social</span>
                </div>
            </div>
             <div className="grid grid-cols-1 gap-4">
                <AuthProviderButton icon={<GoogleIcon />} label="Google" onClick={() => setView(AuthProviderType.GOOGLE)} />
                <AuthProviderButton icon={<AzureIcon />} label="Azure AD" onClick={() => setView(AuthProviderType.AZURE)} />
                <AuthProviderButton icon={<OneAuthIcon />} label="OneAuth (Zoho)" onClick={() => setView(AuthProviderType.ONEAUTH)} />
            </div>


            <div className="relative my-4">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-600" />
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-gray-800 px-2 text-sm text-gray-400">Ecosystem Protocols</span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AuthProviderButton icon={<FibonroseIcon className="text-yellow-400"/>} label="Fibonrose" onClick={() => setView(AuthProviderType.FIBONROSE)} />
              <AuthProviderButton icon={<PersistIDIcon className="text-cyan-400"/>} label="PersistID" onClick={() => setView(AuthProviderType.PERSIST_ID)} />
            </div>
          </>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={handleClose}>
      <div 
        ref={modalRef}
        className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md relative border border-gray-700" 
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition" aria-label="Close authentication modal">
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
        className="flex items-center justify-center w-full p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-pink-500"
    >
        <span className="w-6 h-6 mr-3" aria-hidden="true">{icon}</span>
        <span className="text-lg font-semibold text-white">{label}</span>
    </button>
);


export default AuthModal;
