'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useMemo, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaCode, FaRocket, FaTh, FaList, FaMobile, FaShoppingCart, FaChartLine, FaStar, FaCodeBranch, FaExclamationCircle } from 'react-icons/fa';
import { IconType } from 'react-icons';
import Image from 'next/image';
import ProjectModal from './ProjectModal';
import { fetchGitHubStats } from '@/lib/github';
import { Project } from '@/types/project';
import { projects } from '@/data/projects';

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

          {/* Filters Section - Clean & Minimal */}
          <div className="flex flex-col gap-4">
            {/* Filter by Technology */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-2 flex-wrap justify-center max-w-4xl">
                {allTechnologies.slice(0, 8).map((tech) => (
                  <motion.button
                    key={tech}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedTech(tech)}
                    suppressHydrationWarning
                    className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                      selectedTech === tech
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20 border border-purple-400/30'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20'
                    }`}
                  >
                    {tech}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* View Mode Toggle & Results Count */}
            <div className="flex items-center justify-center gap-6">
              {/* View Mode Toggle */}
              <div className="flex gap-1 bg-white/5 backdrop-blur-sm rounded-lg p-1 border border-white/10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('grid')}
                  suppressHydrationWarning
                  className={`px-3 py-1.5 rounded-md transition-all duration-300 flex items-center gap-2 ${
                    viewMode === 'grid' 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <FaTh className="text-xs" />
                  <span className="text-xs font-medium hidden sm:inline">Grid</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('list')}
                  suppressHydrationWarning
                  className={`px-3 py-1.5 rounded-md transition-all duration-300 flex items-center gap-2 ${
                    viewMode === 'list' 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <FaList className="text-xs" />
                  <span className="text-xs font-medium hidden sm:inline">List</span>
                </motion.button>
              </div>

              {/* Results Count */}
              <p className="text-gray-500 text-xs">
                <span className="text-white font-semibold">{filteredProjects.length}</span> {filteredProjects.length === 1 ? 'project' : 'projects'}
                {selectedTech !== 'All' && (
                  <span className="text-purple-400"> · {selectedTech}</span>
                )}
              </p>
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
                className="absolute inset-0"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </motion.div>
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

          {/* GitHub Stats - Show if has GitHub URL */}
          {project.githubUrl && project.githubUrl !== '#' && (
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
            aria-label={`View ${project.title} on GitHub`}
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
                aria-label={`View ${project.title} live demo`}
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
                aria-label={`View ${project.title} on GitHub`}
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
