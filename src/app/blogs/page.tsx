import { blogs } from '@/data/blogs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CLAT Preparation Blogs & Study Tips | CLATians',
  description: 'Expert articles on CLAT, AILET, MH-CET preparation strategy, NLU cutoffs, legal reasoning tips and more from CLATians faculty.',
};

const categories = ['All', 'CLAT Guide', 'NLU Cutoffs', 'Exam Comparison', 'Strategy', 'Legal Reasoning', 'NLU Life'];

export default function BlogsPage() {
  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0">

        {/* Hero */}
        <div className="relative overflow-hidden py-14 md:py-20"
          style={{ background: 'linear-gradient(135deg, var(--navy-dark), var(--navy))' }}>
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10" style={{ background: '#06b6d4' }} />
          <div className="max-w-7xl mx-auto px-4 text-center">
            <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full text-white mb-4"
              style={{ background: 'rgba(6,182,212,0.3)', border: '1px solid rgba(6,182,212,0.5)' }}>
              📝 Blog & Resources
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white">
              CLAT Prep Insights
            </h1>
            <p className="text-white/60 mt-3 text-base md:text-lg max-w-xl mx-auto">
              Expert articles, strategy guides, and insights from CLATians faculty — updated regularly.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">

          {/* Category filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
            {categories.map((cat) => (
              <button key={cat}
                className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all border"
                style={{
                  background: cat === 'All' ? 'var(--navy)' : 'white',
                  color: cat === 'All' ? 'white' : 'var(--text)',
                  borderColor: cat === 'All' ? 'var(--navy)' : '#e5e7eb',
                }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Featured post */}
          <div className="mb-10">
            <a href={`/blogs/${blogs[0].slug}`}
              className="group grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-gray-100 bg-white card-hover">
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full text-white"
                    style={{ background: blogs[0].categoryColor }}>
                    {blogs[0].category}
                  </span>
                  <span className="text-xs text-gray-400">{blogs[0].readTime}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-black text-gray-900 leading-tight group-hover:text-cyan-700 transition-colors">
                  {blogs[0].title}
                </h2>
                <p className="text-gray-500 text-sm mt-3 leading-relaxed">{blogs[0].excerpt}</p>
                <div className="flex items-center gap-3 mt-6">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                    style={{ background: blogs[0].categoryColor }}>
                    {blogs[0].authorAvatar}
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-gray-900">{blogs[0].author}</div>
                    <div className="text-xs text-gray-400">{blogs[0].date}</div>
                  </div>
                  <span className="ml-auto text-sm font-semibold text-cyan-600 group-hover:gap-2 transition-all">
                    Read More →
                  </span>
                </div>
              </div>
              <div className="hidden md:flex items-center justify-center p-10"
                style={{ background: `linear-gradient(135deg, ${blogs[0].categoryColor}15, ${blogs[0].categoryColor}08)` }}>
                <div className="text-center">
                  <div className="text-7xl mb-4">📚</div>
                  <div className="text-4xl font-black" style={{ color: blogs[0].categoryColor }}>
                    {blogs[0].tags[0]}
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Blog grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogs.slice(1).map((blog) => (
              <a key={blog.slug} href={`/blogs/${blog.slug}`}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden card-hover flex flex-col">
                {/* Color top bar */}
                <div className="h-1.5" style={{ background: blog.categoryColor }} />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                      style={{ background: blog.categoryColor }}>
                      {blog.category}
                    </span>
                    <span className="text-xs text-gray-400">{blog.readTime}</span>
                  </div>
                  <h2 className="font-black text-gray-900 leading-snug group-hover:text-cyan-700 transition-colors">
                    {blog.title}
                  </h2>
                  <p className="text-gray-500 text-sm mt-2 leading-relaxed flex-1 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {blog.tags.slice(0, 2).map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: blog.categoryColor + '15', color: blog.categoryColor }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-50">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-[10px]"
                      style={{ background: blog.categoryColor }}>
                      {blog.authorAvatar}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-xs text-gray-800">{blog.author}</div>
                      <div className="text-[10px] text-gray-400">{blog.date}</div>
                    </div>
                    <span className="text-xs font-semibold" style={{ color: blog.categoryColor }}>Read →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
