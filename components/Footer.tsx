'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter, FaInstagram } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';
import { MdWork } from 'react-icons/md';

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' },
  ];

  const socialLinks = [
    { name: 'GitHub', icon: FaGithub, url: 'https://github.com/mrizalbasri', color: 'hover:text-gray-400' },
    { name: 'LinkedIn', icon: FaLinkedin, url: 'https://www.linkedin.com/in/m-rizal-basri/', color: 'hover:text-blue-400' },
    { name: 'Email', icon: FaEnvelope, url: 'mailto:rizalbasri800@gmail.com', color: 'hover:text-purple-400' },
    { name: 'Twitter', icon: FaTwitter, url: '#', color: 'hover:text-sky-400' },
    { name: 'Instagram', icon: FaInstagram, url: '#', color: 'hover:text-pink-400' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-black via-gray-900 to-black border-t border-white/10">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              M. Rizal Basri
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Full Stack Developer passionate about creating beautiful, functional, and user-centered digital experiences.
            </p>
            
            {/* Location & Availability */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-2 text-gray-400">
                <HiLocationMarker className="text-purple-400" />
                <span className="text-sm">Pekanbaru, Indonesia</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <MdWork className="text-green-400" />
                <span className="text-sm flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Available for work
                </span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-bold text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-purple-400 group-hover:w-4 transition-all duration-300"></span>
                    {link.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services/Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-bold text-white">Services</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                Web Development
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                Mobile Development
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                UI/UX Design
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                API Development
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                Consulting
              </li>
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-bold text-white">Connect</h4>
            
            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-gray-400 ${social.color} transition-all duration-300 hover:border-white/30`}
                    aria-label={social.name}
                  >
                    <IconComponent className="text-xl" />
                  </motion.a>
                );
              })}
            </div>

            {/* Contact Email */}
            <div className="pt-4">
              <a
                href="mailto:rizalbasri800@gmail.com"
                className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2"
              >
                <FaEnvelope />
                rizalbasri800@gmail.com
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 text-sm flex items-center gap-2"
          >
            © {currentYear} M. Rizal Basri — Optimized for performance.
          
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 text-sm text-gray-400"
          >
            <button
              onClick={() => scrollToSection('contact')}
              className="hover:text-purple-400 transition-colors duration-300"
            >
              Privacy Policy
            </button>
            <span className="text-gray-600">•</span>
            <button
              onClick={() => scrollToSection('contact')}
              className="hover:text-purple-400 transition-colors duration-300"
            >
              Terms of Service
            </button>
          </motion.div>
        </div>
      </div>

      {/* Animated Gradient Line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </footer>
  );
}
