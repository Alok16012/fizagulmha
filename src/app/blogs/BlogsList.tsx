'use client';
import { useState } from 'react';
import type { Blog } from '@/data/blogs';
import { BLOG_CATEGORIES } from '@/data/blogCategories';

const FILTERS = ['All', ...BLOG_CATEGORIES];

export default function BlogsList({ blogs }: { blogs: Blog[] }) {
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? blogs : blogs.filter((b) => b.category === active);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
        {FILTERS.map((cat) => {
          const isActive = cat === active;
          return (
            <button key={cat}
              onClick={() => setActive(cat)}
              className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all border"
              style={{
                background: isActive ? '#0D1837' : 'white',
                color: isActive ? 'white' : 'var(--text)',
                borderColor: isActive ? '#0D1837' : '#e5e7eb',
              }}>
              {cat}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">No articles in this category yet.</div>
      ) : (
        <>
          {/* Featured post */}
          {featured && (
            <div className="mb-10">
              <a href={`/blogs/${featured.slug}`}
                className="group grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-gray-100 bg-white card-hover">
                <div className="p-5 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full text-white"
                      style={{ background: featured.categoryColor }}>
                      {featured.category}
                    </span>
                    <span className="text-xs text-gray-400">{featured.readTime}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-black text-gray-900 leading-tight group-hover:text-green-700 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-gray-500 text-sm mt-3 leading-relaxed">{featured.excerpt}</p>
                  <div className="flex items-center gap-3 mt-6">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                      style={{ background: featured.categoryColor }}>
                      {featured.authorAvatar}
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-gray-900">{featured.author}</div>
                      <div className="text-xs text-gray-400">{featured.date}</div>
                    </div>
                    <span className="ml-auto text-sm font-semibold text-green-600 group-hover:gap-2 transition-all">
                      Read More →
                    </span>
                  </div>
                </div>
                <div className="hidden md:flex items-center justify-center p-10"
                  style={{ background: `linear-gradient(135deg, ${featured.categoryColor}15, ${featured.categoryColor}08)` }}>
                  <div className="text-center">
                    <div className="text-7xl mb-4">📚</div>
                    <div className="text-4xl font-black" style={{ color: featured.categoryColor }}>
                      {featured.tags[0]}
                    </div>
                  </div>
                </div>
              </a>
            </div>
          )}

          {/* Blog grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
            {rest.map((blog) => (
              <a key={blog.slug} href={`/blogs/${blog.slug}`}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden card-hover flex flex-col">
                <div className="h-1.5" style={{ background: blog.categoryColor }} />
                <div className="p-3 md:p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-[9px] md:text-xs font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ background: blog.categoryColor }}>
                      {blog.category}
                    </span>
                    <span className="text-[9px] md:text-xs text-gray-400 hidden sm:inline">{blog.readTime}</span>
                  </div>
                  <h2 className="font-black text-xs md:text-base text-gray-900 leading-snug group-hover:text-green-700 transition-colors line-clamp-3">
                    {blog.title}
                  </h2>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed flex-1 line-clamp-2 hidden md:block">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-gray-50">
                    <div className="w-5 h-5 md:w-7 md:h-7 rounded-full flex items-center justify-center text-white font-bold text-[8px] flex-shrink-0"
                      style={{ background: blog.categoryColor }}>
                      {blog.authorAvatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[9px] md:text-xs text-gray-800 truncate">{blog.author.split(' ').slice(-1)[0]}</div>
                    </div>
                    <span className="text-[9px] md:text-xs font-semibold flex-shrink-0" style={{ color: blog.categoryColor }}>→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
