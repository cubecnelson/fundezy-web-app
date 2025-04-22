import { getApiUrl } from '../config/env.config';

export interface Tier {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  featured: boolean;
  isAvailable: boolean;
}

const API_BASE_URL = getApiUrl('TIERS');

export const tierService = {
  async getAllTiers(): Promise<Tier[]> {
    try {
      const response = await fetch(`${API_BASE_URL}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(response);
      const data = await response.json();
      return data as Tier[];
    } catch (error) {
      console.error('Error fetching tiers:', error);
      throw error;
    }
  },

  async getTierById(id: string): Promise<Tier> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data as Tier;
    } catch (error) {
      console.error(`Error fetching tier with id ${id}:`, error);
      throw error;
    }
  },

 
}; 