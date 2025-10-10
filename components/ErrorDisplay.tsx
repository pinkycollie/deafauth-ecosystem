import React from 'react';
import { ExclamationTriangleIcon } from './icons/ExclamationTriangleIcon';

interface ErrorDisplayProps {
  message: string | null;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div role="alert" className="p-3 mb-4 bg-red-500/10 border border-red-500/30 rounded-lg">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-red-400">{message}</p>
        </div>
      </div>
       <div className="mt-2 text-xs text-right">
            <a href="mailto:support@deafauth.com" className="font-medium text-red-400 hover:text-red-300 underline">Contact Support</a>
        </div>
    </div>
  );
};

export default ErrorDisplay;
