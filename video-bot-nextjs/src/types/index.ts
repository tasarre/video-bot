export interface User {
  id: string;
  email: string;
  name: string;
  credits: number;
  plan: 'FREE' | 'BASIC' | 'PRO' | 'ENTERPRISE';
  createdAt: Date;
}

export interface VideoSettings {
  style: 'educational' | 'entertainment' | 'storytelling' | 'viral';
  duration: 15 | 30 | 60;
  language: 'fr' | 'en' | 'es';
  voice: 'masculine' | 'feminine' | 'child';
  pace: 'slow' | 'normal' | 'fast';
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  settings: VideoSettings;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  videos: Video[];
}

export type VideoStatus = 
  | 'pending'
  | 'analyzing-content'
  | 'generating-script' 
  | 'creating-audio'
  | 'generating-visuals'
  | 'assembling-video'
  | 'uploading'
  | 'ready'
  | 'error';

export interface Video {
  id: string;
  status: VideoStatus;
  progress: number;
  inputType: 'text' | 'url';
  inputContent: string;
  settings: VideoSettings;
  script?: string;
  audioUrl?: string;
  visualUrls: string[];
  subtitlesUrl?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  duration?: number;
  fileSize?: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  projectId?: string;
}

export interface GenerateRequest {
  input: {
    type: 'text' | 'url';
    content: string;
    url?: string;
  };
  settings: VideoSettings;
  branding?: {
    logo?: string;
    colors?: string[];
    watermark?: boolean;
  };
}

export interface StatusResponse {
  status: VideoStatus;
  progress: number;
  currentStep: string;
  estimatedTimeLeft: number;
  result?: {
    videoUrl: string;
    thumbnailUrl: string;
    duration: number;
    fileSize: number;
  };
  error?: {
    code: string;
    message: string;
    retryable: boolean;
  };
}

export interface GenerateContentRequest {
  prompt: string;
  videoType: string;
  duration: number;
  tone: string;
}

export interface GenerateContentResponse {
  success: boolean;
  script?: string;
  metadata?: {
    duration: number;
    tone: string;
    type: string;
    wordCount: number;
    estimatedReadingTime: number;
  };
  error?: string;
}