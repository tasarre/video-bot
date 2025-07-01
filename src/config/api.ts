// Determine the appropriate protocol based on the current page protocol
const getApiBaseUrl = () => {
  const currentProtocol = window.location.protocol;
  const isDevelopment = import.meta.env.DEV;
  
  // If we're in development and using HTTPS, we need to handle this carefully
  if (isDevelopment && currentProtocol === 'https:') {
    // Try to use the same protocol as the current page
    return import.meta.env.VITE_API_URL || 'https://localhost:3001';
  }
  
  // Default to HTTP for development
  return import.meta.env.VITE_API_URL || 'http://localhost:3001';
};

const API_BASE_URL = getApiBaseUrl();

const makeRequest = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    // If HTTPS request fails and we're in development, try HTTP fallback
    if (error instanceof TypeError && error.message.includes('fetch') && url.startsWith('https://localhost')) {
      const httpUrl = url.replace('https://', 'http://');
      console.warn('HTTPS request failed, trying HTTP fallback:', httpUrl);
      
      const fallbackResponse = await fetch(httpUrl, options);
      
      if (!fallbackResponse.ok) {
        throw new Error(`Erreur ${fallbackResponse.status}: ${fallbackResponse.statusText}`);
      }
      
      return fallbackResponse.json();
    }
    
    throw error;
  }
};

export const api = {
  generateContent: async (data: {
    prompt: string;
    videoType: string;
    duration: number;
    tone: string;
  }) => {
    return makeRequest(`${API_BASE_URL}/api/generate-content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },

  generateVideo: async (data: {
    script: string;
    settings: any;
  }) => {
    return makeRequest(`${API_BASE_URL}/api/generate-video`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },

  getGenerationStatus: async (jobId: string) => {
    return makeRequest(`${API_BASE_URL}/api/generation-status/${jobId}`);
  },

  healthCheck: async () => {
    return makeRequest(`${API_BASE_URL}/health`);
  }
};