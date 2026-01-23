import Skills from "@/components/Skills";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function SkillsPage() {
  return (
    <>
      <Navigation />
      <main className="relative min-h-screen pt-20">
        <Skills />
      </main>
      <Footer />
    </>
  );
}
