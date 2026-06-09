'use client';
import { useEffect, useState } from 'react';
import { blogs as staticBlogs, type Blog } from '@/data/blogs';

export default function BlogsScrollSection() {
  const [blogs, setBlogs] = useState<Blog[]>(staticBlogs);

  useEffect(() => {
    fetch('/api/blogs').then(r => r.json()).then(setBlogs).catch(() => {});
  }, []);

  // Duplicate for seamless infinite loop
  const items = [...blogs, ...blogs];

  return (
    <section className="py-8 md:py-14 overflow-hidden" style={{ background: '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
              style={{ background: '#E6FAF4', color: '#08BD80' }}>
              The CLATians Journal
            </span>
            <h2 className="mt-2 font-black text-xl md:text-3xl" style={{ color: '#0D1837' }}>
              Read &amp; Learn
            </h2>
          </div>
          <a href="/blogs" className="text-sm font-bold" style={{ color: '#08BD80' }}>
            See All →
          </a>
        </div>
      </div>

      {/* Scrolling track */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #F8FAFC, transparent)' }} />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #F8FAFC, transparent)' }} />

        <div
          className="flex gap-4 blogs-scroll-track"
          style={{ width: 'max-content', paddingLeft: '16px', paddingRight: '16px' }}
        >
          {items.map((blog, i) => (
            <a
              key={`${blog.slug}-${i}`}
              href={`/blogs/${blog.slug}`}
              className="flex-shrink-0 rounded-2xl overflow-hidden flex flex-col"
              style={{
                width: '260px',
                background: 'white',
                border: '1px solid #E9EEF2',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              }}
            >
              {/* Category bar */}
              <div className="px-4 pt-4 pb-2">
                <span className="text-[10px] font-black px-2.5 py-1 rounded-full"
                  style={{ background: `${blog.categoryColor}18`, color: blog.categoryColor }}>
                  {blog.category}
                </span>
              </div>

              {/* Title */}
              <div className="px-4 pb-3 flex-1">
                <h3 className="font-black text-sm leading-snug line-clamp-2" style={{ color: '#0D1837' }}>
                  {blog.title}
                </h3>
                <p className="text-xs mt-1.5 line-clamp-2" style={{ color: '#6B7280' }}>
                  {blog.excerpt}
                </p>
              </div>

              {/* Footer */}
              <div className="px-4 pb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img src="/logo.png" alt="CLATians" className="w-full h-full object-contain p-px" />
                  </div>
                  <span className="text-[11px] font-semibold truncate" style={{ color: '#374151' }}>
                    {blog.author}
                  </span>
                </div>
                <span className="text-[10px] font-medium" style={{ color: '#9CA3AF' }}>
                  {blog.readTime}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .blogs-scroll-track {
          animation: blogsScroll 30s linear infinite;
        }
        .blogs-scroll-track:hover {
          animation-play-state: paused;
        }
        @keyframes blogsScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
