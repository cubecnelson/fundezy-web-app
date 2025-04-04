import { useState } from 'react';
import { submitFeedback, type FeedbackSubmission } from '../services/feedbackService';

interface FeedbackFormProps {
  email?: string;
  onClose: () => void;
}

export const FeedbackForm = ({ email = '', onClose }: FeedbackFormProps) => {
  const [formData, setFormData] = useState<FeedbackSubmission>({
    name: '',
    email: email,
    reason: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    const result = await submitFeedback(formData);
    
    setFeedback({
      type: result.success ? 'success' : 'error',
      message: result.message,
    });
    
    setIsSubmitting(false);
    
    if (result.success) {
      setTimeout(() => {
        onClose();
      }, 3000);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Join Our Waiting List
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        We're currently at capacity for demo accounts. Please join our waiting list and we'll notify you as soon as a spot becomes available.
      </p>

      {feedback && (
        <div className={`mb-4 p-3 rounded ${
          feedback.type === 'success' 
            ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' 
            : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
        }`}>
          {feedback.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            id="name"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fundezy-red focus:ring-fundezy-red dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fundezy-red focus:ring-fundezy-red dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Why would you like to join?
          </label>
          <textarea
            id="reason"
            required
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fundezy-red focus:ring-fundezy-red dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-fundezy-red rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fundezy-red disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};