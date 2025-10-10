import React from 'react';
import { LogoIcon } from './icons/LogoIcon';

const Header: React.FC = () => {
  return (
    <header className="w-full p-4 border-b border-gray-700/50 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <LogoIcon className="h-8 w-8 text-pink-500" />
          <h1 className="text-xl font-bold tracking-tight text-white">
            DeafAuth <span className="text-gray-400">Ecosystem</span>
          </h1>
        </div>
        <div className="hidden sm:block text-sm font-medium text-gray-400">
            Fibonrose • PersistID
        </div>
      </div>
    </header>
  );
};

export default Header;