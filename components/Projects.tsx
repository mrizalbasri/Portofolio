"use client";

import React from "react";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import ProjectModal from "./ProjectModal";
import ThreeDProjectCard from "./ThreeDProjectCard";
import { Project } from "@/types/project";
import { projects } from "@/data/projects";
import { useLoading } from "@/hooks/useLoading";
import { HeroProjectSkeleton, ProjectCardSkeleton } from "@/components/ui/skeleton";
import { ProjectErrorBoundary } from "@/components/ui/error-boundary";
import { FollowerPointerCard } from "./ui/following-pointer";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { isLoading, executeAsync } = useLoading({ initialLoading: true, delay: 800 });
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Parallax scroll effect - smooth 3D
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 50, damping: 20 };

  // Smooth 3D Parallax transforms
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [6, 0, -6]),
    springConfig
  );
  const y = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [70, 0, -70]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]),
    springConfig
  );
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]),
    springConfig
  );

  useEffect(() => {
    // Simulate loading projects (in real app, this would be an API call)
    executeAsync(async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFeaturedProjects(projects.slice(0, 3));
      return projects;
    });
  }, [executeAsync]);

  useEffect(() => {
    if (isLoading || featuredProjects.length === 0) return;

    // Create a context for proper cleanup
    const ctx = gsap.context(() => {
      // Animate title with GSAP
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 50 },
          {
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          }
        );
      }

      // Animate project cards with stagger
      if (containerRef.current) {
        const cards = containerRef.current.querySelectorAll(
          "[data-project-card]"
        );
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60 },
          {
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
          }
        );
      }
    }, containerRef);

    // Cleanup function - very important!
    return () => {
      ctx.revert(); // This will kill all GSAP animations and ScrollTriggers created in this context
    };
  }, [isLoading, featuredProjects]);

  // Take only first 3 projects for the home page preview
  const displayProjects = isLoading ? [] : featuredProjects;

  return (
    <ProjectErrorBoundary>
      <section
        id="projects"
        className="relative bg-black py-20"
        ref={sectionRef}
        style={{ perspective: 1200 }}
      >
        <motion.div
          style={{
            y,
            opacity,
            scale,
            rotateX,
          }}
          ref={containerRef}
        >
          {/* Clean Modern Header - Minimal */}
          <div className="relative z-20 px-4 mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-7xl mx-auto"
            >
              {/* Subtle Section Indicator */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></div>
                <span className="text-sm uppercase tracking-wider text-zinc-500 font-medium">
                  Selected Work
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Projects Showcase - Hero + Grid Layout */}
          <div className="max-w-7xl mx-auto px-4 mb-12">
            {isLoading ? (
              // Loading State
              <>
                <div className="mb-8">
                  <HeroProjectSkeleton />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <ProjectCardSkeleton />
                  <ProjectCardSkeleton />
                </div>
              </>
            ) : (
              // Loaded Content
              <>
                {/* Featured Project - Hero Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                    <div className="relative group">
                    <div className="grid lg:grid-cols-2 gap-8 items-center bg-zinc-900/40 rounded-3xl p-8 border border-white/10 backdrop-blur-xl hover:border-cyan-500/30 transition-colors duration-500">
                      {/* Left: Project Info */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${displayProjects[0]?.gradient}`}>
                            {displayProjects[0] && React.createElement(displayProjects[0].icon, { className: "text-white text-2xl" })}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white">{displayProjects[0]?.title}</h3>
                            <p className="text-gray-400">Latest Project</p>
                          </div>
                        </div>
                        
                        <p className="text-gray-300 text-lg leading-relaxed">
                          {displayProjects[0]?.longDescription || displayProjects[0]?.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {displayProjects[0]?.tags.slice(0, 5).map((tag, i) => (
                            <span key={i} className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm text-gray-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedProject(displayProjects[0])}
                          className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                        >
                          View Details →
                        </motion.button>
                      </div>
                      
                      {/* Right: Project Visual */}
                      <div className="relative">
                        <ProjectErrorBoundary>
                          <ThreeDProjectCard
                            project={displayProjects[0]}
                            onClick={() => setSelectedProject(displayProjects[0])}
                          />
                        </ProjectErrorBoundary>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Other Projects - Clean 2-Column Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {displayProjects.slice(1).map((project, index) => (
                    <motion.div
                      key={project.id}
                      data-project-card
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (index + 1) * 0.1 }}
                      className="group relative"
                    >
                      <ProjectErrorBoundary>
                        <ThreeDProjectCard
                          project={project}
                          onClick={() => setSelectedProject(project)}
                        />
                      </ProjectErrorBoundary>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Clean View All Button */}
          {!isLoading && (
            <div className="flex justify-center pb-20">
              <Link href="/projects">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="group relative"
                >
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-2xl text-white font-medium text-lg transition-all duration-300 flex items-center gap-3 backdrop-blur-sm group overflow-hidden"
                  >
                    {/* Simple hover background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <span className="relative z-10">View All Projects</span>
                    
                    <motion.div
                      className="relative z-10 text-gray-400 group-hover:text-white transition-colors"
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      →
                    </motion.div>
                  </motion.button>
                  
                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-600/20 to-blue-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </motion.div>
              </Link>
            </div>
          )}

          {/* Project Modal */}
          <ProjectModal
            project={selectedProject}
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        </motion.div>
      </section>
    </ProjectErrorBoundary>
  );
}
