import React from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { PersistIDIcon } from './icons/PersistIDIcon';

interface PersistIDInfoProps {
    onBack: () => void;
}

const PersistIDInfo: React.FC<PersistIDInfoProps> = ({ onBack }) => {
    return (
        <div>
            <button onClick={onBack} className="flex items-center text-sm text-gray-400 hover:text-white mb-4">
                <ArrowLeftIcon />
                Back
            </button>
            <div className="flex flex-col items-center text-center">
                 <PersistIDIcon className="w-12 h-12 text-cyan-400 mb-3" />
                <h3 className="text-xl font-bold text-white mb-2">PersistID Protocol</h3>
                <p className="text-gray-400 text-sm mb-6">
                    PersistID is not a login method. It is a protocol for creating a persistent, self-sovereign decentralized identifier (DID). It works in tandem with authentication methods like DeafAuth to provide you with a permanent, portable online identity.
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

export default PersistIDInfo;
