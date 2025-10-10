
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import UserProfile from './UserProfile';
import AuthModal from './AuthModal';
import { SpinnerIcon } from './icons/SpinnerIcon';

const MainContent: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <SpinnerIcon className="w-12 h-12 mb-4" />
        <p className="text-lg text-gray-400">Verifying session...</p>
      </div>
    );
  }
  
  if (isAuthenticated) {
    return <UserProfile />;
  }

  return (
    <>
      <div className="text-center">
        <h2 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
          DeafAuth Ecosystem
        </h2>
        <p className="mt-4 max-w-md mx-auto text-lg text-gray-400 sm:text-xl md:mt-5 md:max-w-3xl">
          A suite of protocols for identity, ethics, and persistence. Securely connect to begin.
        </p>
        <div className="mt-8">
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 md:py-4 md:text-lg md:px-10 transform transition-transform duration-200 hover:scale-105"
          >
            Connect & Sign In
          </button>
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default MainContent;