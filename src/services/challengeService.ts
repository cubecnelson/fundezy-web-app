import { Timestamp } from 'firebase/firestore';
import { getApiUrl } from '../config/env.config';



export interface Challenge {

  id: string;
  startDate: Timestamp;
  endDate: Timestamp;
  profitTarget?: number;
  displayDashboard: boolean;
  isEducation: boolean;
  status?: 'active' | 'completed' | 'failed';
  userId?: string;
  name: string;
}

const API_BASE_URL = getApiUrl('CHALLENGES');

export const challengeService = {
  async getAllChallenges(): Promise<Challenge[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/challenges`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.map((challenge: any) => ({
        ...challenge,
        startDate: new Timestamp(challenge.startDate._seconds, challenge.startDate._nanoseconds),
        endDate: new Timestamp(challenge.endDate._seconds, challenge.endDate._nanoseconds),
      })) as Challenge[];
    } catch (error) {
      console.error('Error fetching challenges:', error);
      throw error;
    }
  },

  async getChallengeById(id: string): Promise<Challenge> {
    try {
      const response = await fetch(`${API_BASE_URL}/challenges/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data as Challenge;
    } catch (error) {
      console.error(`Error fetching challenge with id ${id}:`, error);
      throw error;
    }
  }
};
