import { FaCode, FaChartLine, FaShoppingCart, FaMobile } from 'react-icons/fa';
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: 1,
    title: 'QuizApp - Desktop Quiz Application',
    description: 'Comprehensive desktop quiz application with secure exam proctoring and admin management',
    longDescription: 'A full-featured desktop quiz application built with Java Swing and SQLite. Features secure exam proctoring with kiosk mode, comprehensive admin panel for managing users and quizzes, real-time scoring, and advanced security features including focus monitoring and keyboard shortcut blocking. Perfect for educational institutions and online assessments.',
    tags: ['Java', 'SQLite', 'Swing', 'Desktop App', 'Security'],
    color: 'orange',
    gradient: 'from-orange-600 via-red-600 to-pink-600',
    icon: FaCode,
    githubUrl: 'https://github.com/mrizalbasri/QuizApp',
    features: [
      'Secure kiosk mode with full-screen exam environment',
      'User authentication with role-based access (student/admin)',
      'Quiz management: create, edit, delete quizzes and questions',
      'Multiple question types: Multiple Choice and True/False',
      'Real-time timer and automatic scoring system',
      'Focus monitoring with 3-strike warning system',
      'Keyboard shortcut blocking (Alt+Tab, Ctrl+W, etc)',
      'Admin panel for user and quiz management',
      'Results tracking with CSV export functionality',
      'Security logging for all violations',
      'Advanced search and filter for results',
      'Print functionality for quiz results'
    ],
    githubStats: {
      stars: 0,
      forks: 0,
      issues: 0
    }
  },
  {
    id: 2,
    title: 'Weather App',
    description: 'Aplikasi ramalan cuaca modern dengan data real-time',
    longDescription: 'Aplikasi ramalan cuaca modern yang dibangun dengan React, Vite, dan Tailwind CSS. Menggunakan OpenWeatherMap API untuk mendapatkan data cuaca real-time dan prakiraan cuaca 5 hari. Dilengkapi dengan fitur pencarian kota dan UI yang responsif dengan gradient menarik.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'JavaScript', 'API'],
    color: 'cyan',
    gradient: 'from-cyan-600 via-blue-600 to-purple-600',
    icon: FaChartLine,
    demoUrl: '#',
    githubUrl: 'https://github.com/mrizalbasri/WeatherApp',
    image: '/projects/weather-app.png',
    features: [
      'Cuaca real-time dengan data akurat',
      'Prakiraan cuaca 5 hari ke depan',
      'Pencarian kota di seluruh dunia',
      'UI modern dengan gradient dinamis',
      'Ikon cuaca yang berbeda untuk setiap kondisi',
      'Performa cepat dengan Vite'
    ],
    githubStats: {
      stars: 0,
      forks: 0,
      issues: 0
    }
  },
  {
    id: 3,
    title: 'InvTracker - Inventory Management',
    description: 'Sistem manajemen inventori berbasis web dengan tracking transaksi real-time',
    longDescription: 'Sistem manajemen inventori komprehensif yang dibangun dengan PHP dan MySQL. Fitur lengkap untuk tracking barang, transaksi masuk/keluar, manajemen supplier, dan monitoring stok real-time. Dilengkapi dengan dashboard analytics, filter advanced, dan sistem autentikasi yang aman.',
    tags: ['PHP', 'MySQL', 'Bootstrap', 'PDO', 'Object-Oriented'],
    color: 'green',
    gradient: 'from-green-600 via-emerald-600 to-teal-600',
    icon: FaShoppingCart,
    demoUrl: '#',
    githubUrl: 'https://github.com/mrizalbasri/inventory',
    features: [
      'CRUD lengkap untuk items, suppliers, dan transactions',
      'Dashboard dengan total inventory dan value calculation',
      'Low stock alerts dan monitoring real-time',
      'Advanced filtering (kategori, harga, tanggal, status)',
      'Transaction tracking dengan audit trail lengkap',
      'User authentication with password hashing',
      'Auto-reverse stock saat delete transaction',
      'Responsive design dengan Bootstrap 5'
    ],
    githubStats: {
      stars: 0,
      forks: 0,
      issues: 0
    }
  },
  {
    id: 4,
    title: 'GreenFetch Mobile',
    description: 'Eco-friendly mobile application for waste management and point tracking',
    longDescription: 'A comprehensive mobile application built with Java (Android Native) designed to revolutionize waste management. Users can fetch/schedule waste pickups, earn points for recycling, and track their environmental impact. Features include a real-time leaderboard, points redemption system, and secure authentication.',
    tags: ['Android', 'Java', 'XML', 'Retrofit', 'Laravel'],
    color: 'emerald',
    gradient: 'from-emerald-600 via-green-600 to-lime-600',
    icon: FaMobile,
    demoUrl: '#',
    githubUrl: 'https://github.com/mrizalbasri/GreenFetch-Mobile',
    image: '/MobileAppGrennFetch.png',
    features: [
      'User Authentication & Profile Management',
      'Real-time Leaderboard & Points System',
      'Waste Pickup Scheduling',
      'Retrofit Integration with Laravel Backend',
      'Interactive UI with XML Layouts',
      'Earnings & Transaction History'
    ],
    githubStats: {
      stars: 0,
      forks: 0,
      issues: 0
    }
  },
];
