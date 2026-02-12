"use client";

import React from "react";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import ProjectModal from "./ProjectModal";
import ThreeDProjectCard from "./ThreeDProjectCard";
import MagneticButton from "./MagneticButton";
import { Project } from "@/types/project";
import { projects } from "@/data/projects";
import { useLoading } from "@/hooks/useLoading";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { HeroProjectSkeleton, ProjectCardSkeleton } from "@/components/ui/skeleton";
import { ProjectErrorBoundary } from "@/components/ui/error-boundary";


gsap.registerPlugin(ScrollTrigger);

import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  // Disable initial loading/skeleton since we have local data and want instant render
  const { isLoading } = useLoading({ initialLoading: false }); 
  const [featuredProjects] = useState<Project[]>(projects.slice(0, 3));
  
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Parallax scroll effect - smooth 3D
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 30 };

  // Simple fade effect only
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.8, 1, 1, 0.8]),
    springConfig
  );



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
      ctx.revert();
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
      >
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 opacity-40">
           <StarsBackground starDensity={0.0002} allStarsTwinkle={true} />
           <ShootingStars minDelay={3000} maxDelay={5000} starColor="#ec4899" trailColor="#8b5cf6" />
        </div>

        <motion.div
          style={{ opacity }}
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
                        
                        <MagneticButton
                          strength={0.2}
                          as="div"
                          className="w-fit cursor-pointer"
                          onClick={() => setSelectedProject(displayProjects[0])}
                        >
                          <InteractiveHoverButton 
                            className="bg-transparent border-white/20 text-white hover:bg-white/10"
                          >
                            View Details
                          </InteractiveHoverButton>
                        </MagneticButton>
                      </div>
                      
                      {/* Right: Project Visual */}
                      <div className="relative order-first lg:order-last">
                        <ProjectErrorBoundary>
                          <ThreeDProjectCard
                            project={displayProjects[0]}
                            onClick={() => setSelectedProject(displayProjects[0])}
                            hideShowDetailsButton={true}
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
              <Link href="/projects" className="relative group">
                <MagneticButton strength={0.4} className="group relative">
                  <div className="relative px-8 py-4 bg-white/5 border border-white/20 rounded-2xl text-white font-medium text-lg flex items-center gap-3 backdrop-blur-sm overflow-hidden transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/30 group-hover:scale-105">
                    
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] animate-gradient-x" />
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    
                    <span className="relative z-10 group-hover:text-cyan-400 transition-colors">View All Projects</span>
                    
                    {/* Arrow Icon */}
                    <motion.span 
                      className="relative z-10 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      →
                    </motion.span>
                  </div>
                  
                  {/* Enhanced glow on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/30 to-blue-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-90 group-hover:scale-110" />
                </MagneticButton>
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
