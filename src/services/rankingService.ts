import { getApiUrl } from '../config/env.config';

export interface Ranking {
  rank: number;
  teamName: string;
  mt5Login: string;
  equityBalance: number;
  challengeId: string;
  rankChange: number;
  updatedAt: Date;
}

export const getRankings = async (): Promise<Ranking[]> => {
  try {
    const response = await fetch(getApiUrl('RANKINGS'));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching rankings:', error);
    throw new Error('Failed to fetch rankings');
  }
}; 