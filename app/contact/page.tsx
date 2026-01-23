import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="relative min-h-screen pt-20">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
