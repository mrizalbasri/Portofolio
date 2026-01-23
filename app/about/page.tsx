import About from "@/components/About";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="relative min-h-screen pt-20">
        <About />
      </main>
      <Footer />
    </>
  );
}
