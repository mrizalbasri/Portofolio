'use client';

import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { FaTh, FaList, FaHome, FaExternalLinkAlt, FaCalendarAlt, FaCheckCircle, FaSpinner, FaClock } from 'react-icons/fa';

import Link from 'next/link';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import { BlogPost } from '@/types/blog';
import { blogPosts } from '@/data/blog';

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Get all unique statuses
  const allStatuses = ['All', 'Completed', 'In Progress', 'Pending'];

  // Filter posts
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesStatus = selectedStatus === 'All' || post.status === selectedStatus;
      return matchesStatus;
    });
  }, [selectedStatus]);

  return (
    <div className="min-h-screen bg-black text-white relative">
      <ParticleBackground />
      <Navigation />
      
      <main className="relative pt-32 pb-20 px-4 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb / Back */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <FaHome />
              <span>Back to Home</span>
            </Link>
          </motion.div>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Blog & Tugas
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Dokumentasi perjalanan belajar, tugas kuliah, dan catatan teknis lainnya.
            </p>
          </div>

          {/* Filters Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
            {/* Status Filters */}
            <div className="flex flex-wrap gap-3">
              {allStatuses.map((status) => (
                <motion.button
                  key={status}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    selectedStatus === status
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  {status}
                </motion.button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <FaTh />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <FaList />
              </button>
            </div>
          </div>

          {/* Posts Grid */}
          <div className={viewMode === 'grid' ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
              {filteredPosts.map((post, index) => (
                  viewMode === 'grid' ? (
                      <BlogPostCard
                          key={post.id}
                          post={post}
                          index={index}
                          onClick={() => setSelectedPost(post)}
                      />
                  ) : (
                      <BlogPostListItem
                          key={post.id}
                          post={post}
                          index={index}
                          onClick={() => setSelectedPost(post)}
                      />
                  )
              ))}
          </div>

            {/* Empty State */}
            {filteredPosts.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    Tidak ada postingan dengan status tersebut.
                </div>
            )}

        </div>
      </main>

      <Footer />

      {/* Basic Modal for Details */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedPost(null)}>
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="bg-gray-900 border border-white/10 rounded-2xl max-w-2xl w-full p-6 relative"
             onClick={e => e.stopPropagation()}
           >
              <button 
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                ✕
              </button>
              
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                 <selectedPost.icon className="text-purple-500" />
                 {selectedPost.title}
              </h2>
              
              <StatusBadge status={selectedPost.status} className="mb-4" />
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                {selectedPost.longDescription || selectedPost.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                 {selectedPost.tags.map(tag => (
                   <span key={tag} className="bg-white/10 px-3 py-1 rounded-full text-sm text-purple-300">
                     {tag}
                   </span>
                 ))}
              </div>

              {selectedPost.link && (
                 <a 
                   href={selectedPost.link}
                   target="_blank"
                   rel="noopener noreferrer" 
                   className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                 >
                   Open Link <FaExternalLinkAlt className="text-xs" />
                 </a>
              )}
           </motion.div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status, className = "" }: { status: string, className?: string }) {
  const getStatusColor = (s: string) => {
    switch (s) {
      case 'Completed': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'In Progress': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getStatusIcon = (s: string) => {
     switch (s) {
      case 'Completed': return <FaCheckCircle />;
      case 'In Progress': return <FaSpinner className="animate-spin" />;
      case 'Pending': return <FaClock />;
      default: return null;
    }
  };

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)} ${className}`}>
      {getStatusIcon(status)}
      {status}
    </span>
  );
}

interface BlogPostCardProps {
  post: BlogPost;
  index: number;
  onClick: () => void;
}

function BlogPostCard({ post, index, onClick }: BlogPostCardProps) {
  const IconComponent = post.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className="group relative cursor-pointer h-full bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 flex flex-col"
    >
      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-gray-900 to-black p-6 flex items-center justify-center">
        <IconComponent className="text-6xl text-white/20 group-hover:text-purple-500/50 transition-colors duration-500" />
        <div className="absolute top-4 right-4">
           <StatusBadge status={post.status} />
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-auto">
            <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{post.title}</h3>
            <p className="text-gray-400 text-sm line-clamp-2 mb-4">{post.description}</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
          {post.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs px-2 py-1 bg-white/10 rounded-full text-gray-300">
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="text-xs px-2 py-1 text-gray-500">+{post.tags.length - 3}</span>
          )}
        </div>

        {post.date && (
            <div className="flex items-center gap-2 text-xs text-gray-500 mt-4">
                <FaCalendarAlt /> {post.date}
            </div>
        )}
      </div>
    </motion.div>
  );
}

function BlogPostListItem({ post, index, onClick }: BlogPostCardProps) {
    const IconComponent = post.icon;
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={onClick}
            className="group flex flex-col md:flex-row gap-6 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/50 cursor-pointer transition-all hover:bg-white/10 items-center"
        >
             <div className="w-16 h-16 md:w-24 md:h-24 flex-shrink-0 rounded-xl bg-gray-900 flex items-center justify-center text-3xl">
                 <IconComponent className="text-purple-500/50 group-hover:text-purple-500 transition-colors" />
             </div>

             <div className="flex-1 w-full">
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-2">
                    <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors">{post.title}</h3>
                    <StatusBadge status={post.status} />
                 </div>
                 <p className="text-gray-400 mb-3 text-sm">{post.description}</p>
                 
                 <div className="flex items-center justify-between mt-2">
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                            <span key={tag} className="text-xs px-2 py-1 bg-black/30 rounded text-gray-300 border border-white/5">
                                {tag}
                            </span>
                        ))}
                    </div>
                    {post.date && (
                        <div className="flex items-center gap-2 text-xs text-gray-500 hidden md:flex">
                            <FaCalendarAlt /> {post.date}
                        </div>
                    )}
                 </div>
             </div>
        </motion.div>
    )
}
