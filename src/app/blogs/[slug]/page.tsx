import { notFound } from 'next/navigation';
import { getBlogs, getBlogBySlug } from '@/lib/getData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(decodeURIComponent(slug));
  if (!blog) return { title: 'Blog Not Found' };
  return {
    title: `${blog.title} | CLATians Blog`,
    description: blog.excerpt,
  };
}

function isHtmlContent(content: string): boolean {
  return /<(p|h2|h3|ul|ol|li|img|strong|em|blockquote|a|br)\b/i.test(content);
}

function renderContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-xl md:text-2xl font-black mt-8 mb-3" style={{ color: '#0D1837' }}>
          {line.replace('## ', '')}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-lg font-bold mt-5 mb-2 text-gray-800">
          {line.replace('### ', '')}
        </h3>
      );
    } else if (line.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].replace('- ', ''));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="space-y-1.5 my-3">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-gray-600 text-sm">
              <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#08BD80' }} />
              {item}
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (line.match(/^\d+\. /)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        items.push(lines[i].replace(/^\d+\. /, ''));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="space-y-2 my-3">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-sm text-gray-600">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ background: '#08BD80' }}>
                {j + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
      );
      continue;
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(
        <p key={i} className="font-bold text-gray-800 mt-4 mb-1">{line.replace(/\*\*/g, '')}</p>
      );
    } else if (line.trim()) {
      elements.push(
        <p key={i} className="text-gray-600 leading-relaxed text-sm md:text-base">
          {line}
        </p>
      );
    }
    i++;
  }
  return elements;
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const allBlogs = await getBlogs();
  const blog = allBlogs.find((b) => b.slug === decodedSlug || b.slug === slug);
  if (!blog) notFound();

  const relatedBlogs = allBlogs.filter((b) => b.slug !== decodedSlug && b.slug !== slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0">

        {/* Hero */}
        <div className="relative overflow-hidden py-14 md:py-20"
          style={{ background: 'linear-gradient(135deg, #060d1f, #0D1837)' }}>
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10"
            style={{ background: blog.categoryColor }} />
          <div className="max-w-4xl mx-auto px-4">
            <a href="/blogs" className="inline-flex items-center gap-1 text-white/50 text-sm mb-5 hover:text-white transition-colors">
              ← All Blogs
            </a>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold px-3 py-1.5 rounded-full text-white"
                style={{ background: blog.categoryColor }}>
                {blog.category}
              </span>
              <span className="text-white/40 text-sm">{blog.readTime}</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-white leading-tight">{blog.title}</h1>
            <p className="text-white/60 mt-3">{blog.excerpt}</p>
            <div className="flex items-center gap-3 mt-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                style={{ background: blog.categoryColor }}>
                {blog.authorAvatar}
              </div>
              <div>
                <div className="text-white font-semibold text-sm">{blog.author}</div>
                <div className="text-white/50 text-xs">{blog.date}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
          <div className="grid md:grid-cols-3 gap-10">

            {/* Article */}
            <article className="md:col-span-2">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-10">
                {isHtmlContent(blog.content) ? (
                  <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
                ) : (
                  <div className="space-y-2">{renderContent(blog.content)}</div>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {blog.tags.map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{ background: blog.categoryColor + '15', color: blog.categoryColor }}>
                    #{t}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8 rounded-2xl p-6 md:p-8"
                style={{ background: 'linear-gradient(135deg, #0D1837, #1f3160)' }}>
                <h3 className="font-black text-white text-xl mb-2">Start Your CLAT Journey with CLATians</h3>
                <p className="text-white/60 text-sm mb-5">
                  Expert coaching, 150+ mock tests, and personalized mentorship. Join 5000+ successful students.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <a href="/courses/online" style={{ background: '#08BD80' }}
                    className="px-6 py-2.5 rounded-xl font-bold text-white text-sm">
                    Enroll Now →
                  </a>
                  <a href="tel:8507700177"
                    className="px-6 py-2.5 rounded-xl font-bold text-white border border-white/20 text-sm hover:bg-white/10 transition-colors">
                    📞 Free Counselling
                  </a>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside>
              <div className="sticky top-20 space-y-5">

                {/* Enroll card */}
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                  <h3 className="font-black text-base mb-3" style={{ color: '#0D1837' }}>
                    Start CLAT Prep Today
                  </h3>
                  <div className="space-y-2">
                    <a href="/courses/offline" style={{ background: '#0D1837' }}
                      className="block text-center py-3 rounded-xl font-bold text-white text-sm">
                      Offline Course
                    </a>
                    <a href="/courses/online" style={{ background: '#08BD80' }}
                      className="block text-center py-3 rounded-xl font-bold text-white text-sm">
                      Online Course
                    </a>
                    <a href="/courses/mock-tests"
                      className="block text-center py-3 rounded-xl font-bold text-sm border-2"
                      style={{ borderColor: '#08BD80', color: '#08BD80' }}>
                      Mock Test Series
                    </a>
                  </div>
                  <p className="text-center text-xs text-gray-400 mt-3">
                    📞 8507700177 · Free counselling
                  </p>
                </div>

                {/* Related blogs */}
                <div className="bg-white border border-gray-100 rounded-2xl p-5">
                  <h3 className="font-bold text-sm mb-4" style={{ color: '#0D1837' }}>Related Articles</h3>
                  <div className="space-y-4">
                    {relatedBlogs.map((rb) => (
                      <a key={rb.slug} href={`/blogs/${rb.slug}`}
                        className="block group">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                            style={{ background: rb.categoryColor }}>
                            {rb.category}
                          </span>
                          <span className="text-[10px] text-gray-400">{rb.readTime}</span>
                        </div>
                        <p className="text-xs font-semibold text-gray-800 leading-snug group-hover:text-green-700 transition-colors">
                          {rb.title}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>

                {/* College Predictor */}
                <div className="rounded-2xl p-5"
                  style={{ background: 'linear-gradient(135deg, #0D1837, #1f3160)' }}>
                  <div className="text-2xl mb-2">🔮</div>
                  <h3 className="font-bold text-white text-sm mb-1">College Predictor</h3>
                  <p className="text-white/60 text-xs mb-3">Know your NLU chances based on expected rank.</p>
                  <a href="/college-predictor" style={{ background: '#08BD80' }}
                    className="block text-center py-2.5 rounded-xl font-bold text-white text-xs">
                    Try Free Predictor
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
