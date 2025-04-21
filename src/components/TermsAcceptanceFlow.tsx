import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

interface TermsAcceptanceFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const TermsAcceptanceFlow = ({ isOpen, onClose, onComplete }: TermsAcceptanceFlowProps) => {
  if (!isOpen) return null;

  const [currentStep, setCurrentStep] = useState<'tnc' | 'pics'>('tnc');
  const [acceptedTnC, setAcceptedTnC] = useState(false);
  const [acceptedPICS, setAcceptedPICS] = useState(false);

  const picsUrl = 'https://firebasestorage.googleapis.com/v0/b/fundezy-app.firebasestorage.app/o/Fundezy_PICS%20-%2020250414v3.docx.pdf?alt=media&token=74fcd393-69f8-4986-b594-86ed5f3b65d3';
  const tncUrl = 'https://firebasestorage.googleapis.com/v0/b/fundezy-app.firebasestorage.app/o/Fundezy_Challenge_TNC%20-%2020250415v2.docx.pdf?alt=media&token=f0b97d92-5858-462e-802d-3b2bb3d6bb11';

  const handleNext = () => {
    if (currentStep === 'tnc' && acceptedTnC) {
      setCurrentStep('pics');
    } else if (currentStep === 'pics' && acceptedPICS) {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative w-full max-w-4xl mx-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {currentStep === 'tnc' ? 'Challenge Terms and Conditions' : 'Personal Information Collection Statement'}
        </h2>

        <div className="h-[60vh] mb-6">
          <iframe
            src={currentStep === 'tnc' ? tncUrl : picsUrl}
            className="w-full h-full border border-gray-200 dark:border-gray-700 rounded-lg"
            title={currentStep === 'tnc' ? 'Terms and Conditions' : 'Personal Information Collection Statement'}
          />
        </div>

        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="accept-terms"
            checked={currentStep === 'tnc' ? acceptedTnC : acceptedPICS}
            onChange={(e) => currentStep === 'tnc' ? setAcceptedTnC(e.target.checked) : setAcceptedPICS(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-fundezy-red focus:ring-fundezy-red"
          />
          <label htmlFor="accept-terms" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            I have read and accept the {currentStep === 'tnc' ? 'Challenge Terms and Conditions' : 'Personal Information Collection Statement'}
          </label>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleNext}
            disabled={currentStep === 'tnc' ? !acceptedTnC : !acceptedPICS}
            className="bg-fundezy-red text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === 'tnc' ? 'Next' : 'Proceed to Payment'}
          </button>
        </div>
      </div>
    </div>
  );
}; 