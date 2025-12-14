import Navigation from '@/components/Navigation';
import ParticleBackground from '@/components/ParticleBackground';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import SocialSidebar from '@/components/SocialSidebar';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import ScrollProgress from '@/components/ScrollProgress';
import PageTransition from '@/components/PageTransition';
import ScrollToTop from '@/components/ScrollToTop';

export default function Home() {
  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen />
      
      {/* Scroll Progress Bar */}
      <ScrollProgress />
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
      
      {/* Main Content with Page Transition */}
      <PageTransition>
        <div className="relative min-h-screen bg-black text-white">
          {/* Particle Background */}
          <ParticleBackground />
          
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
            <Contact />
          </main>

          {/* Enhanced Footer */}
          <Footer />
        </div>
      </PageTransition>
    </>
  );
}
