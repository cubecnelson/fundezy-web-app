import { FeedbackForm } from './FeedbackForm';

interface WaitingListModalProps {
  isOpen: boolean;
  onClose: () => void;
  email?: string;
}

export const WaitingListModal = ({ isOpen, onClose, email }: WaitingListModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative w-full max-w-md mx-4">
        <FeedbackForm email={email} onClose={onClose} />
      </div>
    </div>
  );
};