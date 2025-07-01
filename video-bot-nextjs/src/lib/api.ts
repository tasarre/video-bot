import { GenerateContentRequest, GenerateContentResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const api = {
  generateContent: async (data: GenerateContentRequest): Promise<GenerateContentResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/generate-content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }
    
    return response.json();
  },

  generateVideo: async (data: {
    script: string;
    settings: any;
  }) => {
    const response = await fetch(`${API_BASE_URL}/api/generate-video`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }
    
    return response.json();
  },

  getGenerationStatus: async (jobId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/generation-status/${jobId}`);
    
    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }
    
    return response.json();
  }
};