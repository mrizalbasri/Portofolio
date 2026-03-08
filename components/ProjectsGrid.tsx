"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { Project } from "@/types/project";
import ProjectModal from "./ProjectModal";
import { FaGithub, FaExternalLinkAlt, FaCode } from "react-icons/fa";
import Image from "next/image";
import { FADE_IN_UP, SCALE_IN, STAGGER_ITEM } from "@/constants/animations";

export default function ProjectsGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  // Get unique categories
  const categories = [
    "all",
    ...Array.from(new Set(projects.flatMap((p) => p.tags.slice(0, 2)))),
  ];

  useEffect(() => {
    if (filter === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((p) => p.tags.includes(filter)));
    }
  }, [filter]);

  return (
    <section className="relative min-h-screen py-20 px-4 bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-black to-black pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          {...FADE_IN_UP}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400">
              Creative
            </span>{" "}
            Work
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            A collection of projects showcasing my expertise in full-stack
            development, security, and modern web technologies.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          {...STAGGER_ITEM}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.slice(0, 8).map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 overflow-hidden group ${
                filter === category
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
                  : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
              }`}
            >
              {filter === category && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 capitalize">{category}</span>

              {/* Glow effect for active */}
              {filter === category && (
                <div className="absolute inset-0 rounded-full blur-xl bg-gradient-to-r from-cyan-500/50 to-blue-500/50 -z-10" />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              {...SCALE_IN}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="relative bg-zinc-900/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all duration-500">
                {/* Project Image/Icon */}
                <div
                  className={`relative h-48 bg-gradient-to-br ${project.gradient} overflow-hidden`}
                >
                  {/* Animated background pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      backgroundImage:
                        "linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.1) 75%, rgba(255,255,255,0.1)), linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.1) 75%, rgba(255,255,255,0.1))",
                      backgroundSize: "20px 20px",
                      backgroundPosition: "0 0, 10px 10px",
                    }}
                  />

                  {/* Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="text-white text-6xl opacity-80"
                    >
                      {React.createElement(project.icon)}
                    </motion.div>
                  </div>

                  {/* Hover overlay */}
                  <motion.div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaGithub className="text-xl" />
                      </motion.a>
                    )}
                    {project.demoUrl && (
                      <motion.a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaExternalLinkAlt className="text-xl" />
                      </motion.a>
                    )}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2.5 py-1 text-xs text-cyan-400 font-mono">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* View Details Button */}
                  <motion.button
                    onClick={() => setSelectedProject(project)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/50 rounded-xl text-white text-sm font-medium transition-all duration-300 overflow-hidden group/btn"
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <FaCode className="text-cyan-400" />
                      View Details
                    </span>
                  </motion.button>
                </div>

                {/* Card glow effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 -z-10" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-lg">
              No projects found in this category.
            </p>
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
