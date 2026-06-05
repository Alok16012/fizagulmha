import { getBlogs } from '@/lib/getData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogsList from './BlogsList';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'CLAT Preparation Blogs & Study Tips | CLATians',
  description: 'Expert articles on CLAT, AILET, MH-CET preparation strategy, NLU cutoffs, legal reasoning tips and more from CLATians faculty.',
};

export default async function BlogsPage() {
  const blogs = await getBlogs();
  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0">

        {/* Hero */}
        <div className="relative overflow-hidden py-10 md:py-20"
          style={{ background: 'linear-gradient(135deg, #060d1f, #0D1837)' }}>
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

        <BlogsList blogs={blogs} />
      </main>
      <Footer />
    </>
  );
}
