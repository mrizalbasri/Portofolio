import { IconType } from 'react-icons';

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  tags: string[];
  icon: IconType;
  image?: string;
  link?: string;
  date?: string;
}
