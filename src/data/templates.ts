export interface TemplateData {
  id: number;
  name: string;
  description: string;
  accentColor: string;
  style: 'classic' | 'modern' | 'creative' | 'minimal';
}

export const templates: TemplateData[] = [
  {
    id: 0,
    name: 'Classic Blue',
    description: 'Professional and traditional layout with blue accents',
    accentColor: 'template-blue',
    style: 'classic',
  },
  {
    id: 1,
    name: 'Modern Maroon',
    description: 'Contemporary design with clean sections',
    accentColor: 'template-maroon',
    style: 'modern',
  },
  {
    id: 2,
    name: 'Creative Purple',
    description: 'Eye-catching layout for creative professionals',
    accentColor: 'template-purple',
    style: 'creative',
  },
  {
    id: 3,
    name: 'Minimal Classic',
    description: 'Simple and elegant traditional resume',
    accentColor: 'foreground',
    style: 'minimal',
  },
];

export const years = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - i).toString());
