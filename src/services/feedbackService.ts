import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface FeedbackSubmission {
  name: string;
  email: string;
  reason: string;
  createdAt?: Date;
}

export const submitFeedback = async (feedback: FeedbackSubmission): Promise<{ success: boolean; message: string }> => {
  try {
    const feedbackWithTimestamp = {
      ...feedback,
      createdAt: new Date()
    };

    const feedbackRef = collection(db, 'feedback');
    await addDoc(feedbackRef, feedbackWithTimestamp);

    return {
      success: true,
      message: 'Thank you for your feedback! We will get back to you soon.',
    };
  } catch (error: any) {
    console.error('Error submitting feedback:', error);
    return {
      success: false,
      message: error.message || 'Failed to submit feedback',
    };
  }
};