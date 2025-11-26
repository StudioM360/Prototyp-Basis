import React from 'react';

export type Language = 'de' | 'en';
export type View = 'installer' | 'studio' | 'admin';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
}

export interface ServiceCategory {
  id: string;
  title: string;
  replaces: string;
  iconKey: string;
  features: string[];
}

export interface AIModel {
  category: string;
  model: string;
  use: string;
}

export interface TechStackComponent {
  component: string;
  technology: string;
  details: string;
}

export interface USP {
  title: string;
  description: string;
  iconKey: string;
}

export interface TechItem {
  area: string;
  tool: string;
  license: string;
}

export interface ServiceOffer {
  title: string;
  iconKey: string;
}

export interface IntegrationItem {
  name: string;
  type: string;
  description: string;
  iconKey: string;
}

export interface StudioAction {
  label: string;
  iconKey: string;
  prompt: string;
}
