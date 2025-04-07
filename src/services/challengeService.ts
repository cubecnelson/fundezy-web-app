interface Timestamp {
  _seconds: number;
  _nanoseconds: number;
}

export interface Challenge {
  id: string;
  startDate: Timestamp;
  endDate: Timestamp;
  displayDashboard: boolean;
  isEducation: boolean;
  name: string;
}

const API_BASE_URL = 'https://us-central1-fundezy-app.cloudfunctions.net/api';

export const challengeService = {
  async getAllChallenges(): Promise<Challenge[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/challenges`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data as Challenge[];
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
