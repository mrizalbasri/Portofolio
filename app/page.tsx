"use client";

import Navigation from "@/components/Navigation";
import GlobalParticles from "@/components/GlobalParticles";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import ProjectsMarquee from "@/components/ProjectsMarquee";
import SocialSidebar from "@/components/SocialSidebar";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen />

      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Main Content with Page Transition */}
      <div className="relative min-h-screen bg-black text-white">
        
        {/* Magic UI Particles Background - Overlay Mode */}
        <GlobalParticles />

        {/* Navigation */}
        <Navigation />

        {/* Social Sidebar */}
        <SocialSidebar />

        {/* Main Content */}
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <ProjectsMarquee />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

