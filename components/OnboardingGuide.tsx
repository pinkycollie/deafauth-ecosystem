

import React from 'react';

interface OnboardingGuideProps {
    onComplete: () => void;
}

export const OnboardingGuide: React.FC<OnboardingGuideProps> = ({ onComplete }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-lg relative border border-gray-700 text-white">
                <h2 className="text-2xl font-bold text-center mb-4">Welcome to the DeafAuth Ecosystem!</h2>
                <p className="text-gray-300 mb-6 text-center">Here's a quick guide to get you started:</p>
                <ul className="space-y-4 text-gray-300">
                    <li className="flex items-start">
                        <span className="text-cyan-400 font-bold mr-3 text-lg">1.</span>
                        <div>
                            <h3 className="font-semibold text-white">Create Your PersistID</h3>
                            <p className="text-sm">Mint your permanent, self-sovereign digital identity on the blockchain. This is your key to the ecosystem.</p>
                        </div>
                    </li>
                    <li className="flex items-start">
                        <span className="text-cyan-400 font-bold mr-3 text-lg">2.</span>
                        <div>
                            <h3 className="font-semibold text-white">Submit Your Ideas</h3>
                            <p className="text-sm">Have a brilliant idea? Upload it as a JSON file or use our AI Builder to structure it. Your submission is timestamped, securing your provenance.</p>
                        </div>
                    </li>
                     <li className="flex items-start">
                        <span className="text-cyan-400 font-bold mr-3 text-lg">3.</span>
                        <div>
                            <h3 className="font-semibold text-white">Manage Your Profile</h3>
                            <p className="text-sm">Keep your profile details up-to-date to personalize your experience within the ecosystem.</p>
                        </div>
                    </li>
                </ul>
                <button
                    onClick={onComplete}
                    className="w-full mt-8 px-4 py-2 bg-pink-600 text-white font-bold rounded-lg hover:bg-pink-700 transition-transform transform hover:scale-105"
                >
                    Get Started
                </button>
            </div>
        </div>
    );
};