import ProjectsGrid from "@/components/ProjectsGrid";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ProjectsPage() {
  return (
    <>
      <Navigation />
      <main className="relative min-h-screen pt-20">
        <ProjectsGrid />
      </main>
      <Footer />
    </>
  );
}
