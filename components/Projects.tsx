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

import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";

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
        className="relative py-32 overflow-hidden bg-black/40 backdrop-blur-sm"
        ref={sectionRef}
        style={{ perspective: 1200 }}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 opacity-40">
           <StarsBackground starDensity={0.0002} allStarsTwinkle={true} />
           <ShootingStars minDelay={3000} maxDelay={5000} starColor="#ec4899" trailColor="#8b5cf6" />
        </div>

        <motion.div
          style={{
            y,
            opacity,
            scale,
            rotateX,
          }}
          ref={containerRef}
          className="relative z-10"
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
                {/* Featured Project - Hero Card - Responsive */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                    <div className="relative group">
                    <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center bg-zinc-900/40 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 border border-white/10 backdrop-blur-xl hover:border-cyan-500/30 transition-colors duration-500">
                      {/* Left: Project Info */}
                      <div className="space-y-4 md:space-y-6">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 md:p-3 rounded-xl bg-gradient-to-r ${displayProjects[0]?.gradient}`}>
                            {displayProjects[0] && React.createElement(displayProjects[0].icon, { className: "text-white text-xl md:text-2xl" })}
                          </div>
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-white">{displayProjects[0]?.title}</h3>
                            <p className="text-gray-400 text-sm md:text-base">Latest Project</p>
                          </div>
                        </div>
                        
                        <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                          {displayProjects[0]?.longDescription || displayProjects[0]?.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {displayProjects[0]?.tags.slice(0, 5).map((tag, i) => (
                            <span key={i} className="px-2.5 md:px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs md:text-sm text-gray-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedProject(displayProjects[0])}
                          className="group relative px-5 md:px-6 py-2.5 md:py-3 text-sm md:text-base bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-white font-semibold overflow-hidden w-full sm:w-auto"
                        >
                          {/* Animated gradient overlay */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          />
                          
                          {/* Shine effect */}
                          <motion.div
                            className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          />
                          
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            View Details
                            <motion.span
                              className="inline-block"
                              animate={{ x: [0, 3, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              →
                            </motion.span>
                          </span>
                          
                          {/* Glow effect */}
                          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-gradient-to-r from-cyan-500/50 to-blue-500/50 -z-10" />
                        </motion.button>
                      </div>
                      
                      {/* Right: Project Visual */}
                      <div className="relative order-first lg:order-last">
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

                {/* Other Projects - Clean Responsive Grid */}
                <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
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
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative px-8 py-4 bg-white/5 border border-white/20 rounded-2xl text-white font-medium text-lg flex items-center gap-3 backdrop-blur-sm group overflow-hidden"
                  >
                    {/* Animated gradient background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      style={{ backgroundSize: "200% 100%" }}
                    />
                    
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    />
                    
                    {/* Border glow */}
                    <div className="absolute inset-0 rounded-2xl border border-cyan-500/0 group-hover:border-cyan-500/50 transition-all duration-500" />
                    
                    <span className="relative z-10">View All Projects</span>
                    
                    <motion.div
                      className="relative z-10 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.div>
                  </motion.button>
                  
                  {/* Enhanced glow on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/30 to-blue-500/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
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
