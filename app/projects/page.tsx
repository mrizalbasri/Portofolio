'use client';

import { motion } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaTh, FaList, FaStar, FaHome } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import ProjectModal from '@/components/ProjectModal';
import { fetchGitHubStats } from '@/lib/github';
import { Project } from '@/types/project';
import { projects } from '@/data/projects';

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [liveGitHubStats, setLiveGitHubStats] = useState<Record<number, { stars: number }>>({});

  // Fetch GitHub stats
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
    <div className="min-h-screen bg-black text-white relative">
      <ParticleBackground />
      <Navigation />
      
      <main className="relative pt-32 pb-20 px-4 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb / Back */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <FaHome />
              <span>Back to Home</span>
            </Link>
          </motion.div>

          {/* Filters Section */}
          <div className="flex flex-col gap-8 mb-16">
            {/* Tech Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {allTechnologies.map((tech) => (
                <motion.button
                  key={tech}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTech(tech)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    selectedTech === tech
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  {tech}
                </motion.button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex justify-end">
              <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <FaTh />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <FaList />
                </button>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className={viewMode === 'grid' ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
              {filteredProjects.map((project, index) => (
                  viewMode === 'grid' ? (
                      <ProjectCard
                          key={project.id}
                          project={project}
                          index={index}
                          onClick={() => setSelectedProject(project)}
                          liveStats={liveGitHubStats[project.id]}
                      />
                  ) : (
                      <ProjectListItem
                          key={project.id}
                          project={project}
                          index={index}
                          onClick={() => setSelectedProject(project)}
                          liveStats={liveGitHubStats[project.id]}
                      />
                  )
              ))}
          </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    No projects found with the selected technology.
                </div>
            )}

        </div>
      </main>

      <Footer />

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

// Reusing the sub-components from the original file, slightly modified if needed
// (Included inline to ensure it works without exports)

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
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className="group relative cursor-pointer h-full bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10"
    >
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-900 to-black">
        {project.image ? (
            <div className="relative h-full w-full">
               <Image 
                src={project.image} 
                alt={project.title} fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110" 
               />
               <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
            </div>
        ) : (
             <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`} />
        )}
        
        <div className="absolute inset-0 flex items-center justify-center">
             {!project.image && <IconComponent className="text-6xl text-white/80 drop-shadow-lg" />}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{project.title}</h3>
        <p className="text-gray-400 text-sm line-clamp-2 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs px-2 py-1 bg-white/10 rounded-full text-gray-300">
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-xs px-2 py-1 text-gray-500">+{project.tags.length - 3}</span>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-white/10">
           <div className="flex gap-4">
              {project.githubUrl && project.githubUrl !== '#' && (
                 <span className="flex items-center gap-1 hover:text-white transition-colors">
                    <FaGithub /> {(liveStats?.stars ?? project.githubStats?.stars) || 0}
                 </span>
              )}
           </div>
           <span className="flex items-center gap-1 text-purple-400 font-medium group-hover:translate-x-1 transition-transform">
             Details <FaExternalLinkAlt className="text-xs" />
           </span>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectListItem({ project, index, onClick, liveStats }: ProjectCardProps) {
    const IconComponent = project.icon;
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={onClick}
            className="group flex flex-col md:flex-row gap-6 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/50 cursor-pointer transition-all hover:bg-white/10"
        >
             <div className="w-full md:w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-900 relative">
                 {project.image ? (
                     <Image src={project.image} alt={project.title} fill className="object-cover" />
                 ) : (
                     <div className={`w-full h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                        <IconComponent className="text-4xl text-white/50" />
                     </div>
                 )}
             </div>

             <div className="flex-1">
                 <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold group-hover:text-purple-400 transition-colors">{project.title}</h3>
                    {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" onClick={e => e.stopPropagation()} className="text-gray-400 hover:text-white">
                            <FaGithub className="text-xl" />
                        </a>
                    )}
                 </div>
                 <p className="text-gray-400 mb-4">{project.description}</p>
                 <div className="flex flex-wrap gap-2">
                     {project.tags.map(tag => (
                         <span key={tag} className="text-xs px-2 py-1 bg-black/30 rounded text-gray-300 border border-white/5">
                             {tag}
                         </span>
                     ))}
                 </div>
             </div>
        </motion.div>
    )
}
