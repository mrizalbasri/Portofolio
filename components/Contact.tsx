'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import MagneticButton from './MagneticButton';
import { FaGithub, FaLinkedin, FaEnvelope, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';
import { MdWork } from 'react-icons/md';
import { IconType } from 'react-icons';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '', // Anti-spam field
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

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
      console.log('Spam detected');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSending(true);
    setError('');
    
    try {
      // Use our internal API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSending(false);
        setIsSubmitted(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', message: '', honeypot: '' });
        }, 3000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (err) {
      setIsSending(false);
      setError('Failed to send message. Please try again or contact me directly via email.');
      console.error('Form submission error:', err);
    }
  };

  const socialLinks: Array<{
    name: string;
    icon: IconType;
    url: string;
    color: string;
    hoverColor: string;
    description: string;
  }> = [
    { 
      name: 'GitHub', 
      icon: FaGithub, 
      url: 'https://github.com/mrizalbasri', // Ganti dengan username GitHub Anda
      color: 'from-gray-700 to-gray-900',
      hoverColor: 'hover:from-gray-600 hover:to-gray-800',
      description: 'Check out my repositories'
    },
    { 
      name: 'LinkedIn', 
      icon: FaLinkedin, 
      url: 'https://www.linkedin.com/in/m-rizal-basri/', // Ganti dengan username LinkedIn Anda
      color: 'from-blue-600 to-blue-800',
      hoverColor: 'hover:from-blue-500 hover:to-blue-700',
      description: 'Let\'s connect professionally'
    },
    { 
      name: 'Email', 
      icon: FaEnvelope, 
      url: 'mailto:rizalbasri800@gmail.com', // Ganti dengan email Anda
      color: 'from-purple-600 to-pink-600',
      hoverColor: 'hover:from-purple-500 hover:to-pink-500',
      description: 'Send me a direct email'
    },
  ];

  return (
    <section id="contact" className="relative min-h-screen py-20 px-4">
      {/* Scroll to top anchor */}
      <div id="contact-top" className="absolute top-0 left-0 w-full h-1" />
      
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          Get In Touch
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-300 text-lg mb-12"
        >
          Have a project in mind? Let's work together to create something amazing!
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot field - hidden from users */}
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
              
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                  required
                  suppressHydrationWarning
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                  required
                  suppressHydrationWarning
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 resize-none"
                  required
                  suppressHydrationWarning
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className={`w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center gap-2 ${isSending ? 'opacity-75 cursor-wait' : ''}`}
                suppressHydrationWarning
                aria-label={isSending ? "Sending message" : isSubmitted ? "Message sent" : "Send Message"}
              >
                {isSending ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <FaPaperPlane className="text-xl" />
                    </motion.div>
                    Sending...
                  </>
                ) : isSubmitted ? (
                  <>
                    <FaCheckCircle className="text-xl" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="text-xl" />
                    Send Message
                  </>
                )}
              </button>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}
            </form>

            {/* Success Animation */}
            {isSubmitted && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-gray-900/90 rounded-lg backdrop-blur-sm"
              >
                <motion.div
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: [0, 1.2, 1], rotate: [0, 360] }}
                  transition={{ duration: 0.6 }}
                  className="text-6xl"
                >
                  <FaCheckCircle className="text-green-500" />
                </motion.div>
              </motion.div>
            )}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Connect With Me</h3>
            
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className={`group flex items-center gap-4 p-5 bg-gradient-to-r ${social.color} ${social.hoverColor} rounded-xl hover:shadow-2xl hover:shadow-${social.name.toLowerCase()}/30 transition-all duration-300 cursor-pointer relative overflow-hidden`}
                  aria-label={`Visit my ${social.name} profile - ${social.description}`}
                >
                  {/* Animated background effect */}
                  <motion.div
                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    initial={false}
                  />
                  
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl text-white z-10 relative"
                  >
                    <IconComponent />
                  </motion.div>
                  
                  <div className="z-10 relative">
                    <h4 className="text-lg font-semibold text-white">{social.name}</h4>
                    <p className="text-sm text-gray-200 opacity-90">{social.description}</p>
                  </div>
                  
                  {/* Arrow indicator */}
                  <motion.div
                    className="ml-auto text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    →
                  </motion.div>
                </motion.a>
              );
            })}

            {/* Additional Info */}
            <div className="mt-8 p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <HiLocationMarker className="text-2xl text-purple-400" />
                <div>
                  <h4 className="text-lg font-semibold text-white">Location</h4>
                  <p className="text-gray-400">Pekanbaru, Indonesia</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MdWork className="text-2xl text-green-400" />
                <div>
                  <h4 className="text-lg font-semibold text-white">Availability</h4>
                  <p className="text-gray-400 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Open to new opportunities
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
