'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const socialLinks = [
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    url: 'https://www.linkedin.com/in/m-rizal-basri/',
    color: '#0077B5',
  },
  {
    name: 'WhatsApp',
    icon: FaWhatsapp,
    url: 'https://wa.me/6284668265398', // Ganti dengan nomor WhatsApp Anda (format: 62xxx tanpa +)
    color: '#25D366',
  },
  {
    name: 'Instagram',
    icon: FaInstagram,
    url: 'https://instagram.com/rizlbsri_', // Ganti dengan username Instagram Anda
    color: '#E4405F',
  },
  {
    name: 'GitHub',
    icon: FaGithub,
    url: 'https://github.com/mrizalbasri',
    color: '#333',
  },
];

export default function SocialSidebar() {
  const { scrollY } = useScroll();
  
  // Fade out when scrolling past hero section (approximately 100vh)
  const opacity = useTransform(scrollY, [0, 800], [1, 0]);
  const x = useTransform(scrollY, [0, 800], [0, -50]);

  return (
    <motion.div
      style={{ opacity, x }}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="fixed left-8 bottom-0 z-50 hidden md:flex flex-col items-center gap-6"
    >
      {/* Social Icons */}
      <div className="flex flex-col gap-4">
        {socialLinks.map((social, index) => {
          const Icon = social.icon;
          return (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              whileHover={{ 
                scale: 1.2, 
                y: -5,
                color: social.color,
              }}
              className="text-gray-400 hover:text-white transition-all duration-300 text-2xl"
              aria-label={social.name}
            >
              <Icon />
            </motion.a>
          );
        })}
      </div>

      {/* Vertical Line */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: 100 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="w-[2px] bg-gray-600"
      />
    </motion.div>
  );
}
