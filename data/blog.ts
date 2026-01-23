import { FaBook, FaCode, FaMobile } from 'react-icons/fa';
import { BlogPost } from '@/types/blog';

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Tugas Mobile Programming',
    description: 'Membuat aplikasi mobile sederhana menggunakan Flutter',
    longDescription: 'Tugas akhir mata kuliah Mobile Programming. Aplikasi mencakup fitur login, list data, dan detail detail.',
    status: 'Completed',
    tags: ['Flutter', 'Mobile', 'Dart'],
    icon: FaMobile,
    date: '2023-10-15',
  },
  {
    id: 2,
    title: 'Tugas Web Development',
    description: 'Redesign website portofolio',
    status: 'In Progress',
    tags: ['React', 'Next.js', 'Tailwind'],
    icon: FaCode,
    date: '2023-11-20',
  },
  {
    id: 3,
    title: 'Laporan Magang',
    description: 'Menyusun laporan kegiatan magang di perusahaan',
    status: 'Pending',
    tags: ['Doc', 'Writing'],
    icon: FaBook,
    date: '2023-12-01',
  },
];


