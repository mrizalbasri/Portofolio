'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch, FaExclamationCircle } from 'react-icons/fa';
import { useEffect } from 'react';
import Image from 'next/image';
import { Project } from '@/types/project';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl border border-white/10 shadow-2xl pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label={project.title}
              >
              {/* Header with Gradient */}
              <div className={`relative h-64 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 z-50 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-white transition-all duration-300 group"
                  aria-label="Close modal"
                >
                  <FaTimes className="text-xl group-hover:rotate-90 transition-transform duration-300" />
                </button>
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                  }} />
                </div>

                {/* Project Image/Icon */}
                <div className="relative h-full flex items-center justify-center">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                      <project.icon className="text-9xl text-white/30" />
                    </motion.div>
                  )}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative p-8 md:p-12 space-y-8">
                {/* Title & Description */}
                <div className="space-y-4">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold text-white"
                  >
                    {project.title}
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-gray-400"
                  >
                    {project.description}
                </motion.p>
                </div>

                {/* GitHub Stats & Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap items-center gap-4"
                >
                  {/* Stars - Only show if > 0 */}
                  {(project.githubStats?.stars ?? 0) > 0 && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-full border border-yellow-500/30">
                      <FaStar className="text-yellow-400" />
                      <span className="text-white font-semibold">{project.githubStats?.stars}</span>
                      <span className="text-gray-300 text-sm">stars</span>
                    </div>
                  )}

                  {/* Demo Link */}
                  {project.demoUrl && project.demoUrl !== '#' && (
                    <motion.a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r ${project.gradient} rounded-full shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      <FaExternalLinkAlt className="text-white" />
                      <span className="text-white font-semibold">Live Demo</span>
                    </motion.a>
                  )}
                </motion.div>

                {/* Long Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-bold text-white">About This Project</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {project.longDescription}
                  </p>
                </motion.div>

                {/* Features */}
                {project.features && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-4"
                  >
                    <h3 className="text-2xl font-bold text-white">Key Features</h3>
                    <ul className="grid md:grid-cols-2 gap-3">
                      {project.features.map((feature: string, index: number) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className="flex items-start gap-3 text-gray-300"
                        >
                          <span className={`mt-1 w-2 h-2 rounded-full bg-gradient-to-r ${project.gradient} flex-shrink-0`} />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Tech Stack */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-bold text-white">Tech Stack</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag: string, index: number) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.05 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className={`px-5 py-2.5 bg-gradient-to-r ${project.gradient} bg-opacity-10 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-white/20 hover:border-white/40 transition-all duration-300`}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-4 pt-4"
                >
                  {project.demoUrl && (
                    <motion.a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`group flex items-center gap-2 px-8 py-4 bg-gradient-to-r ${project.gradient} rounded-full text-white font-semibold hover:shadow-2xl transition-all duration-300`}
                      aria-label={`View ${project.title} live demo`}
                    >
                      <FaExternalLinkAlt className="group-hover:rotate-12 transition-transform duration-300" />
                      View Live Demo
                    </motion.a>
                  )}
                  
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="group flex items-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white font-semibold hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <FaGithub className="group-hover:rotate-12 transition-transform duration-300" />
                      View Source Code
                    </motion.a>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
