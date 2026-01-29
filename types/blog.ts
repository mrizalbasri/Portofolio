import { IconType } from 'react-icons';

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  tags: string[];
  icon: IconType;
  image?: string;
  images?: string[]; // Multiple images for gallery
  link?: string;
  date?: string;
}
