
import React from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { FibonroseIcon } from './icons/FibonroseIcon';

interface FibonroseInfoProps {
    onBack: () => void;
}

const FibonroseInfo: React.FC<FibonroseInfoProps> = ({ onBack }) => {
    return (
        <div>
            <button onClick={onBack} className="flex items-center text-sm text-gray-400 hover:text-white mb-4">
                <ArrowLeftIcon />
                Back
            </button>
            <div className="flex flex-col items-center text-center">
                 <FibonroseIcon className="w-12 h-12 text-yellow-400 mb-3" />
                <h3 className="text-xl font-bold text-white mb-2">Fibonrose Protocol</h3>
                <p className="text-gray-400 text-sm mb-6">
                    Fibonrose is not a login method. It is the trust, ethics, and valuation protocol that governs the entire Build Studio ecosystem. It ensures all contributions are valued fairly and all actions align with the community's principles.
                </p>
                <button
                    onClick={onBack}
                    className="w-full flex items-center justify-center p-3 bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors duration-200 text-white font-bold"
                >
                    Acknowledge
                </button>
            </div>
        </div>
    );
};

export default FibonroseInfo;