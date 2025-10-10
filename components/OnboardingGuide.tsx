import React, { useState, useLayoutEffect, useEffect } from 'react';

interface OnboardingStep {
  targetId: string;
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const steps: OnboardingStep[] = [
  {
    targetId: 'mint-pass-section',
    title: 'Mint Your DeafAuth Pass',
    content: 'This is your on-chain credential. Minting a pass solidifies your membership in the ecosystem.',
    position: 'bottom',
  },
  {
    targetId: 'submit-idea-section',
    title: 'Submit Your Ideas',
    content: 'Have an idea? Submit it as a JSON file to create a timestamped, provable record of your contribution.',
    position: 'top',
  },
];

interface OnboardingGuideProps {
  onComplete: () => void;
}

interface ElementRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export const OnboardingGuide: React.FC<OnboardingGuideProps> = ({ onComplete }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<ElementRect | null>(null);

  useLayoutEffect(() => {
    const currentStep = steps[stepIndex];
    const element = document.getElementById(currentStep.targetId);
    if (element) {
      const rect = element.getBoundingClientRect();
      setTargetRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [stepIndex]);
  
  // Handle window resizing
  useEffect(() => {
    function handleResize() {
        const currentStep = steps[stepIndex];
        const element = document.getElementById(currentStep.targetId);
        if (element) {
          const rect = element.getBoundingClientRect();
          setTargetRect({ top: rect.top, left: rect.left, width: rect.width, height: rect.height });
        }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [stepIndex]);


  const handleNext = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  }

  const currentStep = steps[stepIndex];

  const tooltipPosition = () => {
    if (!targetRect) return {};
    const offset = 16; // 1rem
    switch (currentStep.position) {
      case 'top':
        return { bottom: `calc(100% - ${targetRect.top}px + ${offset}px)`, left: `${targetRect.left + targetRect.width / 2}px`, transform: 'translateX(-50%)' };
      case 'bottom':
        return { top: `${targetRect.top + targetRect.height + offset}px`, left: `${targetRect.left + targetRect.width / 2}px`, transform: 'translateX(-50%)' };
      case 'left':
         return { top: `${targetRect.top + targetRect.height / 2}px`, right: `calc(100% - ${targetRect.left}px + ${offset}px)`, transform: 'translateY(-50%)' };
      case 'right':
          return { top: `${targetRect.top + targetRect.height / 2}px`, left: `${targetRect.left + targetRect.width + offset}px`, transform: 'translateY(-50%)' };
      default:
        return { top: `${targetRect.top + targetRect.height + offset}px`, left: `${targetRect.left + targetRect.width / 2}px`, transform: 'translateX(-50%)' };
    }
  };

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70" onClick={onComplete} />
      
      {/* Highlight */}
      {targetRect && (
        <div
          className="absolute rounded-lg transition-all duration-300"
          style={{
            top: targetRect.top - 8,
            left: targetRect.left - 8,
            width: targetRect.width + 16,
            height: targetRect.height + 16,
            boxShadow: '0 0 0 9999px rgba(0,0,0,0.7)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Tooltip */}
      {targetRect && (
        <div
          className="absolute bg-gray-800 border border-gray-600 rounded-lg p-4 w-full max-w-xs shadow-2xl transition-all duration-300"
          style={tooltipPosition()}
        >
          <h3 className="text-lg font-bold text-pink-400 mb-2">{currentStep.title}</h3>
          <p className="text-gray-300 text-sm mb-4">{currentStep.content}</p>
          <div className="flex justify-between items-center">
            <button onClick={onComplete} className="text-xs text-gray-400 hover:text-white transition-colors">Skip</button>
            <div className="flex items-center space-x-2">
              {stepIndex > 0 && <button onClick={handlePrev} className="px-3 py-1 text-sm bg-gray-600 rounded-md hover:bg-gray-500 transition-colors">Back</button>}
              <button onClick={handleNext} className="px-4 py-1 text-sm bg-pink-600 rounded-md hover:bg-pink-700 transition-colors">
                {stepIndex === steps.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
