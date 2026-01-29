'use client';

import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { FaTh, FaList, FaHome, FaExternalLinkAlt, FaCalendarAlt } from 'react-icons/fa';

import Link from 'next/link';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { StarsBackground } from '@/components/ui/stars-background';
import { ShootingStars } from '@/components/ui/shooting-stars';
import { BlogPost } from '@/types/blog';
import { blogPosts } from '@/data/blog';

export default function BlogPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="min-h-screen bg-black text-white relative">
      <div className="fixed inset-0 z-0">
        <StarsBackground starDensity={0.0002} allStarsTwinkle={true} />
        <ShootingStars minDelay={3000} maxDelay={5000} starColor="#06b6d4" trailColor="#3b82f6" />
      </div>
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
              Blog
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Catatan perjalanan, artikel teknologi, dan dokumentasi project.
            </p>
          </div>

          {/* Posts Grid */}
          <div className={viewMode === 'grid' ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
              {blogPosts.map((post, index) => (
                  <Link href={`/blog/${post.slug}`} key={post.id} className="block h-full">
                      {viewMode === 'grid' ? (
                          <BlogPostCard
                              post={post}
                              index={index}
                          />
                      ) : (
                          <BlogPostListItem
                              post={post}
                              index={index}
                          />
                      )}
                  </Link>
              ))}
          </div>

            {/* Empty State */}
            {blogPosts.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    Tidak ada postingan dengan status tersebut.
                </div>
            )}

        </div>
      </main>

      <Footer />
    </div>
  );
}



interface BlogPostCardProps {
  post: BlogPost;
  index: number;
}

function BlogPostCard({ post, index }: BlogPostCardProps) {
  const displayImage = post.images?.[0] || post.image;
  const hasMultipleImages = post.images && post.images.length > 1;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative h-full bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 flex flex-col"
    >
      {/* Blog Thumbnail Image */}
      <div className="relative h-48 w-full overflow-hidden bg-zinc-800">
        {displayImage ? (
            <>
              <img 
                src={displayImage} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {hasMultipleImages && (
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white border border-white/20 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                  {post.images!.length} Photos
                </div>
              )}
            </>
        ) : (
            <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center">
               <span className="text-zinc-700 font-bold text-4xl opacity-20">No Image</span>
            </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4 flex items-center gap-2 text-xs text-cyan-400 font-medium tracking-wide uppercase">
             {post.date && (
                 <>
                   <FaCalendarAlt />
                   <span>{post.date}</span>
                 </>
             )}
             <span className="text-zinc-600">•</span>
             <span>Tech</span>
        </div>

        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors leading-snug">
            {post.title}
        </h3>
        
        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
            {post.description}
        </p>
        
        <div className="mt-auto pt-4 border-t border-white/5 flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs px-2.5 py-1 bg-white/5 border border-white/5 rounded-full text-gray-400">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function BlogPostListItem({ post, index }: BlogPostCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group flex flex-col md:flex-row gap-6 p-4 bg-zinc-900/50 border border-white/10 rounded-2xl hover:border-cyan-500/50 transition-all hover:bg-zinc-900 items-start md:items-center"
        >
             {/* Thumbnail */}
             <div className="w-full md:w-64 h-48 md:h-40 flex-shrink-0 rounded-xl overflow-hidden bg-zinc-800 relative">
                {post.image ? (
                    <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-700 font-bold">No Image</div>
                )}
             </div>

             <div className="flex-1 w-full py-2">
                 <div className="flex items-center gap-3 text-xs text-cyan-400 font-medium mb-2 upppercase">
                    {post.date && (
                        <span>{post.date}</span>
                    )}
                 </div>

                 <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {post.title}
                 </h3>
                 
                 <p className="text-gray-400 mb-4 text-sm leading-relaxed line-clamp-2">
                    {post.description}
                 </p>
                 
                 <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                        <span key={tag} className="text-xs px-2.5 py-1 bg-white/5 rounded-full text-gray-400 border border-white/5">
                            #{tag}
                        </span>
                    ))}
                 </div>
             </div>
        </motion.div>
    )
}
