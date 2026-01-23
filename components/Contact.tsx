"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useState } from "react";
// import MagneticButton from "./MagneticButton";
// import GsapScrollAnimation from "./GsapScrollAnimation";
// import CountUp from "./CountUp";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { MdWork } from "react-icons/md";
import { IconType } from "react-icons";
import { useLoading } from "@/hooks/useLoading";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax scroll effect - smooth 3D
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 50, damping: 20 };

  // Smooth 3D Parallax transforms
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]),
    springConfig
  );
  const y = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]),
    springConfig
  );
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.97]),
    springConfig
  );

  useEffect(() => {
    if (!titleRef.current) return;

    const ctx = gsap.context(() => {
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
          ease: "power2.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "", // Anti-spam field
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isLoading: isSending, executeAsync } = useLoading();
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.honeypot) {
      console.log("Spam detected");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");

    const result = await executeAsync(async () => {
      // Use our internal API route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error("Failed to send message");
      }

      return result;
    });

    if (result) {
      setIsSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", message: "", honeypot: "" });
      }, 3000);
    } else {
      setError(
        "Failed to send message. Please try again or contact me directly via email."
      );
    }
  };




  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen py-20 px-4"
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{
          y,
          opacity,
          scale,
          rotateX,
        }}
        className="max-w-6xl mx-auto"
      >
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
           
           {/* Left Column: Info & Text */}
           <motion.div
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
           >
              {/* Header */}
              <div className="mb-12">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
                    <span className="text-sm uppercase tracking-wider text-zinc-500 font-medium font-mono">
                      Contact
                    </span>
                 </div>
                 
                 <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    Let&apos;s build something <span className="text-cyan-500">extraordinary</span> together.
                 </h2>
                 
                 <p className="text-zinc-400 text-lg leading-relaxed">
                    Whether you have a specific project in mind or just want to explore possibilities, I&apos;m here to help translate your vision into digital reality.
                 </p>
              </div>

              {/* Contact Links */}
              <div className="space-y-6">
                 <a href="mailto:mrizalbasri@email.com" className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all group">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-500 group-hover:scale-110 transition-transform">
                       <FaEnvelope />
                    </div>
                    <div>
                        <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block mb-1">Email</span>
                        <span className="text-white font-medium group-hover:text-cyan-400 transition-colors">mrizalbasri@email.com</span>
                    </div>
                 </a>
                 
                 <a href="https://linkedin.com/in/m-rizal-basri/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all group">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                       <FaLinkedin />
                    </div>
                    <div>
                        <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block mb-1">LinkedIn</span>
                        <span className="text-white font-medium group-hover:text-blue-400 transition-colors">Let&apos;s connect</span>
                    </div>
                 </a>

                 <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                       <MdWork />
                    </div>
                    <div>
                        <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block mb-1">Availability</span>
                        <span className="text-white font-medium flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Open to Opportunities
                        </span>
                    </div>
                 </div>
              </div>
           </motion.div>

           {/* Right Column: Form */}
           <motion.div
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="relative"
           >
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 blur-[100px] -z-10 rounded-full opacity-50 pointer-events-none" />

              <form onSubmit={handleSubmit} className="bg-zinc-900/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
                  {/* Honeypot field */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="space-y-2">
                     <label htmlFor="name" className="text-xs font-mono text-zinc-500 uppercase tracking-wider ml-1">Name</label>
                     <input
                       type="text"
                       id="name"
                       value={formData.name}
                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                       className="w-full bg-black/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                       placeholder="How should I call you?"
                       required
                     />
                  </div>

                  <div className="space-y-2">
                     <label htmlFor="email" className="text-xs font-mono text-zinc-500 uppercase tracking-wider ml-1">Email</label>
                     <input
                       type="email"
                       id="email"
                       value={formData.email}
                       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                       className="w-full bg-black/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                       placeholder="you@example.com"
                       required
                     />
                  </div>

                  <div className="space-y-2">
                     <label htmlFor="message" className="text-xs font-mono text-zinc-500 uppercase tracking-wider ml-1">Message</label>
                     <textarea
                       id="message"
                       value={formData.message}
                       onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                       rows={5}
                       className="w-full bg-black/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none"
                       placeholder="Tell me about your project details..."
                       required
                     />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-white font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSending ? (
                        <span>Sending...</span>
                    ) : isSubmitted ? (
                        <span className="flex items-center gap-2"><FaCheckCircle /> Sent!</span>
                    ) : (
                        <>
                            <span>Send Message</span>
                            <FaPaperPlane className="text-sm group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                  </button>
                  
                  {error && (
                    <p className="text-red-400 text-sm text-center bg-red-500/10 p-2 rounded-lg border border-red-500/20">{error}</p>
                  )}
              </form>
           </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
