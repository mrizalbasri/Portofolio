'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useMemo, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaCode, FaRocket, FaTh, FaList, FaMobile, FaShoppingCart, FaChartLine, FaStar, FaCodeBranch, FaExclamationCircle } from 'react-icons/fa';
import { IconType } from 'react-icons';
import ProjectModal from './ProjectModal';
import { fetchGitHubStats } from '@/lib/github';

interface Project {
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

const projects: Project[] = [
  {
    id: 1,
    title: 'Weather App',
    description: 'Aplikasi ramalan cuaca modern dengan data real-time',
    longDescription: 'Aplikasi ramalan cuaca modern yang dibangun dengan React, Vite, dan Tailwind CSS. Menggunakan OpenWeatherMap API untuk mendapatkan data cuaca real-time dan prakiraan cuaca 5 hari. Dilengkapi dengan fitur pencarian kota dan UI yang responsif dengan gradient menarik.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Axios', 'OpenWeatherMap API'],
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
    id: 2,
    title: 'E-Commerce Platform',
    description: 'Full-stack solution with seamless payment integration',
    longDescription: 'A comprehensive e-commerce platform featuring real-time inventory management, secure payment processing with Stripe, and an intuitive admin dashboard for managing products and orders. Built with modern technologies to ensure scalability and performance.',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'MongoDB', 'Tailwind CSS'],
    color: 'purple',
    gradient: 'from-purple-600 via-blue-600 to-purple-600',
    icon: FaShoppingCart,
    demoUrl: '#',
    githubUrl: '#',
    features: [
      'Real-time inventory management',
      'Secure payment processing with Stripe',
      'Admin dashboard with analytics',
      'Product search and filtering',
      'Order tracking system',
      'Responsive design for all devices'
    ],
    githubStats: {
      stars: 245,
      forks: 67,
      issues: 12
    }
  },
  {
    id: 3,
    title: 'Social Media App',
    description: 'Real-time social platform with instant messaging',
    longDescription: 'A modern social media application with real-time chat functionality, post sharing, likes, comments, and push notifications. Built with scalability in mind using microservices architecture.',
    tags: ['React', 'Node.js', 'Socket.io', 'PostgreSQL', 'Redis'],
    color: 'cyan',
    gradient: 'from-cyan-600 via-blue-600 to-cyan-600',
    icon: FaMobile,
    demoUrl: '#',
    githubUrl: '#',
    features: [
      'Real-time messaging with Socket.io',
      'Post sharing with media upload',
      'Like, comment, and share functionality',
      'Push notifications',
      'User authentication and profiles',
      'News feed algorithm'
    ],
    githubStats: {
      stars: 189,
      forks: 45,
      issues: 8
    }
  },
  {
    id: 4,
    title: 'AI Analytics Dashboard',
    description: 'Analytics powered by machine learning insights',
    longDescription: 'An intelligent analytics dashboard that leverages AI to provide predictive insights, data visualization, and automated reporting for business intelligence. Features advanced charting and real-time data processing.',
    tags: ['Next.js', 'Python', 'TensorFlow', 'D3.js', 'FastAPI'],
    color: 'blue',
    gradient: 'from-blue-600 via-purple-600 to-blue-600',
    icon: FaChartLine,
    demoUrl: '#',
    githubUrl: '#',
    features: [
      'Predictive analytics with ML models',
      'Interactive data visualizations',
      'Automated report generation',
      'Real-time data processing',
      'Custom dashboard builder',
      'Export to multiple formats'
    ],
    githubStats: {
      stars: 312,
      forks: 89,
      issues: 15
    }
  },
  {
    id: 5,
    title: 'Portfolio Builder',
    description: 'Drag-and-drop portfolio creation tool',
    longDescription: 'Create stunning portfolios without code using our intuitive drag-and-drop builder. Choose from customizable templates and deploy instantly to your custom domain with one-click deployment.',
    tags: ['React', 'Tailwind CSS', 'Framer Motion', 'Firebase'],
    color: 'pink',
    gradient: 'from-pink-600 via-purple-600 to-pink-600',
    icon: FaCode,
    demoUrl: '#',
    githubUrl: '#',
    features: [
      'Drag-and-drop interface',
      'Pre-built templates',
      'Custom domain support',
      'One-click deployment',
      'SEO optimization',
      'Analytics integration'
    ],
    githubStats: {
      stars: 156,
      forks: 34,
      issues: 6
    }
  },
  {
    id: 6,
    title: 'Task Management System',
    description: 'Collaborative workspace for teams',
    longDescription: 'A powerful task management system with kanban boards, team collaboration features, time tracking, and project analytics. Perfect for agile teams and project managers.',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'tRPC', 'PostgreSQL'],
    color: 'green',
    gradient: 'from-green-600 via-cyan-600 to-green-600',
    icon: FaRocket,
    demoUrl: '#',
    githubUrl: '#',
    features: [
      'Kanban board interface',
      'Team collaboration tools',
      'Time tracking',
      'Project analytics',
      'Sprint planning',
      'Integration with GitHub/Jira'
    ],
    githubStats: {
      stars: 278,
      forks: 72,
      issues: 10
    }
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [liveGitHubStats, setLiveGitHubStats] = useState<Record<number, { stars: number }>>({});
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Fetch GitHub stats for all projects with valid GitHub URLs
  useEffect(() => {
    const fetchAllStats = async () => {
      const statsPromises = projects.map(async (project) => {
        if (project.githubUrl && project.githubUrl !== '#') {
          const stats = await fetchGitHubStats(project.githubUrl);
          return { id: project.id, stats };
        }
        return { id: project.id, stats: null };
      });

      const results = await Promise.all(statsPromises);
      
      const newStats: Record<number, { stars: number }> = {};
      results.forEach(({ id, stats }) => {
        if (stats) {
          newStats[id] = stats;
        }
      });

      setLiveGitHubStats(newStats);
    };

    fetchAllStats();
  }, []);

  // Get all unique technologies
  const allTechnologies = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach(project => {
      project.tags.forEach(tag => techs.add(tag));
    });
    return ['All', ...Array.from(techs).sort()];
  }, []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesTech = selectedTech === 'All' || project.tags.includes(selectedTech);
      return matchesTech;
    });
  }, [selectedTech]);

  return (
    <section id="projects" className="relative bg-black py-20" ref={containerRef}>
      {/* Header */}
      <div className="sticky top-0 z-20 bg-gradient-to-b from-black via-black/95 to-transparent py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Explore my latest work and creative solutions
            </p>
          </div>

          {/* Filters - Centered */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            {/* Tech Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              {allTechnologies.slice(0, 8).map((tech) => (
                <motion.button
                  key={tech}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTech(tech)}
                  suppressHydrationWarning
                  className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                    selectedTech === tech
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {tech}
                </motion.button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2 bg-white/5 backdrop-blur-sm rounded-full p-1 border border-white/10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('grid')}
                suppressHydrationWarning
                className={`p-3 rounded-full transition-all duration-300 ${
                  viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-400'
                }`}
              >
                <FaTh />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('list')}
                suppressHydrationWarning
                className={`p-3 rounded-full transition-all duration-300 ${
                  viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-400'
                }`}
              >
                <FaList />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Projects Grid/List */}
      <div className="max-w-7xl mx-auto px-4">
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
                liveStats={liveGitHubStats[project.id]}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredProjects.map((project, index) => (
              <ProjectListItem
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
                liveStats={liveGitHubStats[project.id]}
              />
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-xl">No projects found matching your criteria</p>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
  liveStats?: { stars: number };
}

function ProjectCard({ project, index, onClick, liveStats }: ProjectCardProps) {
  const IconComponent = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className="group relative cursor-pointer h-full"
    >
      {/* Animated Glow Effect */}
      <motion.div 
        className={`absolute -inset-1 bg-gradient-to-r ${project.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500`}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Card Container */}
      <div className="relative h-full bg-gradient-to-br from-gray-900/90 via-black to-gray-900/90 backdrop-blur-xl rounded-2xl border border-white/10 group-hover:border-white/30 overflow-hidden transition-all duration-500 group-hover:scale-[1.02]">
        
        {/* Header Image/Visual */}
        <div className="relative h-64 overflow-hidden">
          {/* Image or Gradient Background */}
          {project.image ? (
            <>
              {/* Project Image with Parallax */}
              <motion.div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${project.image})` }}
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              {/* Multi-layer Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60" />
              <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-30 mix-blend-overlay`} />
            </>
          ) : (
            <>
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}>
                {/* Animated Pattern */}
                <motion.div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '40px 40px',
                  }}
                  animate={{
                    backgroundPosition: ['0px 0px', '40px 40px'],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>

              {/* Icon with Animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute inset-0 bg-white/10 rounded-full blur-2xl"
                    style={{ width: '200px', height: '200px', left: '-50px', top: '-50px' }}
                  />
                  <IconComponent className="text-8xl text-white/90 relative z-10 drop-shadow-2xl" />
                </motion.div>
              </div>
            </>
          )}

          {/* Enhanced Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          
          {/* Shimmer Effect on Hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />

          {/* Floating Particles */}
          <motion.div
            className="absolute top-10 right-10 w-3 h-3 bg-white rounded-full"
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 left-10 w-2 h-2 bg-white rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </div>

        {/* Content Section */}
        <div className="relative p-8 space-y-5">
          {/* Title with Gradient on Hover */}
          <motion.h3 
            className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300"
            whileHover={{ x: 5 }}
          >
            {project.title}
          </motion.h3>
          
          {/* Description */}
          <p className="text-gray-400 line-clamp-2 leading-relaxed text-base">
            {project.description}
          </p>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2.5 pt-3">
            {project.tags.slice(0, 3).map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i }}
                whileHover={{ scale: 1.15, y: -3 }}
                className={`relative px-4 py-2 bg-gradient-to-r ${project.gradient} bg-opacity-20 backdrop-blur-sm text-white text-xs font-bold rounded-lg border border-white/30 hover:border-white/60 transition-all duration-300 shadow-lg hover:shadow-xl group/tag`}
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover/tag:opacity-50 blur-md rounded-lg transition-opacity duration-300`} />
                <span className="relative z-10">{tag}</span>
              </motion.span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-3 py-1.5 text-gray-400 text-xs font-semibold flex items-center">
                +{project.tags.length - 3} more
              </span>
            )}
          </div>

          {/* GitHub Stats - Only show if has stars */}
          {((liveStats?.stars ?? project.githubStats?.stars ?? 0) > 0) && (
            <div className="flex items-center gap-4 pt-3 border-t border-white/5">
              <motion.div 
                className="flex items-center gap-2 text-sm"
                whileHover={{ scale: 1.05 }}
              >
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <FaStar className="text-yellow-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">{liveStats?.stars ?? project.githubStats?.stars ?? 0}</p>
                  <p className="text-gray-500 text-xs">Stars</p>
                </div>
              </motion.div>
            </div>
          )}

          {/* View Details Button */}
          <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            suppressHydrationWarning
            className={`w-full mt-4 py-4 bg-gradient-to-r ${project.gradient} rounded-xl text-white font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group/btn relative overflow-hidden`}
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
            
            <FaExternalLinkAlt className="text-base relative z-10" />
            <span className="relative z-10">View Details</span>
            
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              →
            </motion.div>
          </motion.button>
        </div>

        {/* Floating GitHub Button - Top Right */}
        {project.githubUrl && project.githubUrl !== '#' && (
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1, rotate: 360 }}
            whileTap={{ scale: 0.9 }}
            transition={{ 
              opacity: { delay: 0.3 },
              scale: { delay: 0.3 },
              rotate: { duration: 0.6 }
            }}
            className="absolute top-4 right-4 z-30 p-3 bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-white/20 hover:border-white/40 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 group/github"
            onClick={(e) => e.stopPropagation()}
          >
            <FaGithub className="text-white text-xl" />
            
            {/* Tooltip */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover/github:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              View on GitHub
            </div>
          </motion.a>
        )}

        {/* Hover Overlay Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </motion.div>
  );
}

interface ProjectListItemProps {
  project: Project;
  index: number;
  onClick: () => void;
  liveStats?: { stars: number };
}

function ProjectListItem({ project, index, onClick, liveStats }: ProjectListItemProps) {
  const IconComponent = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ x: 8 }}
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      {/* Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`} />
      
      {/* Card */}
      <div className="relative bg-gradient-to-r from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 group-hover:border-white/20 overflow-hidden transition-all duration-300">
        <div className="flex flex-col md:flex-row gap-6 p-6">
          {/* Icon */}
          <div className={`flex-shrink-0 w-24 h-24 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
            <IconComponent className="text-4xl text-white" />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-3">
            <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
              {project.title}
            </h3>
            
            <p className="text-gray-400">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/5 backdrop-blur-sm text-gray-300 text-xs font-semibold rounded-full border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex-shrink-0 flex flex-col justify-center gap-3">
            {project.githubStats && (
              <div className="flex gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <span>⭐</span>
                  <span>{project.githubStats.stars}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaGithub />
                  <span>{project.githubStats.forks}</span>
                </div>
              </div>
            )}
            
            <div className="flex gap-2">
              <motion.a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-white transition-all duration-300"
              >
                <FaExternalLinkAlt />
              </motion.a>
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-white transition-all duration-300"
              >
                <FaGithub />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
