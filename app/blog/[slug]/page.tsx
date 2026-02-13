"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";
import ReactMarkdown from 'react-markdown';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blog";

export default function BlogPostBySlug() {
  const params = useParams();
  
  // Explicitly cast params.slug to string since useParams returns string | string[]
  const slugString = Array.isArray(params?.slug) ? params?.slug[0] : (params?.slug || '');
  
  const post = blogPosts.find((p) => p.slug === slugString);

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-cyan-400 hover:text-cyan-300">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = post.icon;

  return (
    <div className="min-h-screen bg-zinc-950 text-white relative">
      <Navigation />

      <main className="relative pt-32 pb-20 px-4 min-h-screen z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="max-w-4xl mx-auto"
        >
          {/* Standard Blog Header */}
          <header className="mb-10">
             <div className="flex flex-wrap gap-4 items-center mb-6 text-sm text-gray-400">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 hover:text-cyan-400 transition-colors"
                >
                  <FaArrowLeft />
                  <span>Back to Blog</span>
                </Link>
                <span>•</span>
                <span className="flex items-center gap-2">
                    <FaCalendarAlt />
                    {post.date || 'No Date'}
                </span>
             </div>

             <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                {post.title}
             </h1>

             <div className="flex flex-wrap gap-2">
                 {post.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300">
                        #{tag}
                    </span>
                 ))}
             </div>
          </header>

          {/* Featured Images Gallery */}
          {post.images && post.images.length > 0 ? (
            <div className="mb-12 space-y-6">
              {/* Main Featured Image */}
              <div className="w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/10">
                <img 
                  src={post.images[0]} 
                  alt={`${post.title} - Main`} 
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* Additional Images Grid */}
              {post.images.length > 1 && (
                <div className={`grid gap-6 ${post.images.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2'}`}>
                  {post.images.slice(1).map((img, idx) => (
                    <div key={idx} className="rounded-xl overflow-hidden bg-zinc-900 border border-white/10 hover:border-cyan-500/50 transition-all cursor-pointer group">
                      <img 
                        src={img} 
                        alt={`${post.title} - Image ${idx + 2}`} 
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : post.image ? (
            <div className="w-full mb-12 rounded-2xl overflow-hidden bg-zinc-900 border border-white/10">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-auto object-cover"
              />
            </div>
          ) : (
            <div className="w-full h-[400px] mb-12 rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black">
              <IconComponent className="text-6xl text-cyan-500/20" />
            </div>
          )}

          {/* Content Layout - Section Based */}
          <div className="max-w-6xl mx-auto">
             {/* Lead Description */}
             <div className="mb-16 max-w-4xl">
                <p className="text-xl text-gray-300 leading-relaxed">
                   {post.description}
                </p>
             </div>

             {/* Main Article Content - Section by Section */}
             <article className="space-y-16">
                {/* Full Markdown Content */}
                <section className="prose prose-invert prose-lg max-w-none
                  prose-headings:text-white prose-headings:font-bold
                  prose-h2:text-4xl prose-h2:mb-8 prose-h2:mt-16 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-4
                  prose-h3:text-2xl prose-h3:mb-6 prose-h3:mt-10
                  prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
                  prose-strong:text-white prose-strong:font-semibold
                  prose-ul:text-gray-300 prose-ul:space-y-2 prose-ul:my-6
                  prose-li:text-gray-300
                  prose-code:text-cyan-400 prose-code:bg-white/5 prose-code:px-2 prose-code:py-1 prose-code:rounded
                  prose-img:rounded-xl prose-img:my-12 prose-img:border prose-img:border-white/10
                  prose-hr:border-white/10 prose-hr:my-12
                ">
                   <ReactMarkdown
                     components={{
                       h2: ({...props}) => <h2 className="text-4xl font-bold text-white mb-8 mt-16 pb-4 border-b border-white/10" {...props} />,
                       h3: ({...props}) => <h3 className="text-2xl font-bold text-white mb-6 mt-10" {...props} />,
                       p: ({node, children, ...props}) => {
                         // Check if paragraph contains an image
                         const hasImage = node?.children?.some((child: any) => child.tagName === 'img');
                         if (hasImage) {
                           return <div className="my-12">{children}</div>;
                         }
                         return <p className="text-gray-300 leading-relaxed mb-6" {...props}>{children}</p>;
                       },
                       strong: ({...props}) => <strong className="text-white font-semibold" {...props} />,
                       img: ({...props}) => (
                         <img className="rounded-xl border border-white/10 w-full h-auto object-cover" alt="" {...props} />
                       ),
                       hr: ({...props}) => <hr className="border-white/10 my-12" {...props} />,
                       ul: ({...props}) => <ul className="text-gray-300 space-y-2 my-6 list-disc pl-6" {...props} />,
                       li: ({...props}) => <li className="text-gray-300" {...props} />,
                     }}
                   >
                     {post.longDescription || ''}
                   </ReactMarkdown>
                </section>

                {/* Tags Section */}
                <div className="border-t border-white/10 pt-8">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Topics Covered</h4>
                  <div className="flex flex-wrap gap-3">
                    {post.tags.map(tag => (
                      <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:border-cyan-500/50 hover:text-cyan-400 transition-all cursor-pointer">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
             </article>
          </div>

        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

