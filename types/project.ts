import { IconType } from 'react-icons';

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  color: string;
  gradient: string;
  icon: IconType;
  demoUrl?: string;
  githubUrl?: string;
  image?: string;
  features?: string[];
  githubStats?: {
    stars: number;
    forks: number;
    issues: number;
  };
}
