'use client';
import { useState, useMemo } from 'react';
import type { Blog } from '@/data/blogs';

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

const MONTH_MAP: Record<string, number> = {
  jan:0, feb:1, mar:2, apr:3, may:4, jun:5,
  jul:6, aug:7, sep:8, oct:9, nov:10, dec:11,
  january:0, february:1, march:2, april:3, june:5,
  july:6, august:7, september:8, october:9, november:10, december:11,
};

function parseBlogDate(dateStr: string): Date | null {
  if (!dateStr) return null;

  // "DD Mon YYYY" or "DD Mon, YYYY"  →  "05 Jun 2026", "15 May, 2026"
  const ddMonYYYY = dateStr.match(/^(\d{1,2})\s+([A-Za-z]+),?\s+(\d{4})$/);
  if (ddMonYYYY) {
    const mo = MONTH_MAP[ddMonYYYY[2].toLowerCase()];
    if (mo !== undefined) return new Date(+ddMonYYYY[3], mo, +ddMonYYYY[1]);
  }

  // "Mon DD, YYYY"  →  "May 10, 2026", "April 28, 2026"
  const monDDYYYY = dateStr.match(/^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})$/);
  if (monDDYYYY) {
    const mo = MONTH_MAP[monDDYYYY[1].toLowerCase()];
    if (mo !== undefined) return new Date(+monDDYYYY[3], mo, +monDDYYYY[2]);
  }

  // ISO / anything else
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d;
}

export default function BlogsList({ blogs, categories }: { blogs: Blog[]; categories?: { name: string; color: string }[] }) {
  const now = new Date();
  const [activeCategory, setActiveCategory] = useState('All');
  // -1 = All Months; default = current month
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [selectedYear, setSelectedYear]   = useState(now.getFullYear());

  // Years that have at least one blog (+ current year always present)
  const availableYears = useMemo(() => {
    const set = new Set<number>([now.getFullYear()]);
    blogs.forEach((b) => { const d = parseBlogDate(b.date); if (d) set.add(d.getFullYear()); });
    return Array.from(set).sort((a, b) => b - a);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogs]);

  // Category list from prop or derived from blogs
  const categoryList = useMemo(() => {
    if (categories && categories.length) return categories;
    const seen = new Set<string>();
    const list: { name: string; color: string }[] = [];
    blogs.forEach((b) => {
      if (b.category && !seen.has(b.category)) {
        seen.add(b.category);
        list.push({ name: b.category, color: b.categoryColor });
      }
    });
    return list;
  }, [blogs, categories]);

  const filtered = useMemo(() => {
    let result = blogs;
    if (activeCategory !== 'All') result = result.filter((b) => b.category === activeCategory);
    result = result.filter((b) => {
      const d = parseBlogDate(b.date);
      if (!d) return selectedMonth === -1; // unknown date only in "All Months"
      if (d.getFullYear() !== selectedYear) return false;
      if (selectedMonth === -1) return true;  // any month of this year
      return d.getMonth() === selectedMonth;
    });
    // Most recent first, then chronologically descending. Undated posts sink to the bottom.
    result = [...result].sort((a, b) => {
      const da = parseBlogDate(a.date);
      const db = parseBlogDate(b.date);
      if (!da && !db) return 0;
      if (!da) return 1;
      if (!db) return -1;
      return db.getTime() - da.getTime();
    });
    return result;
  }, [blogs, activeCategory, selectedMonth, selectedYear]);

  const featured = filtered[0];
  const rest     = filtered.slice(1);

  const selectBase =
    'w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 ' +
    'focus:outline-none focus:border-green-400 cursor-pointer appearance-none pr-8';

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">

      {/* ── Filters ── */}
      <div className="mb-8 space-y-4">

        {/* Month + Year dropdowns */}
        <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5 shadow-sm">
          <div className="grid grid-cols-2 gap-3">

            {/* Month */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-0.5">Select Month</label>
              <div className="relative">
                <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))} className={selectBase}>
                  <option value={-1}>All Months</option>
                  {MONTH_NAMES.map((name, idx) => (
                    <option key={idx} value={idx}>{name}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▾</span>
              </div>
            </div>

            {/* Year */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-0.5">Select Year</label>
              <div className="relative">
                <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} className={selectBase}>
                  {availableYears.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▾</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {['All', ...categoryList.map((c) => c.name)].map((cat) => {
            const isActive = cat === activeCategory;
            const color = categoryList.find((c) => c.name === cat)?.color;
            return (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all border"
                style={{
                  background: isActive ? (color || '#0D1837') : 'white',
                  color: isActive ? 'white' : '#374151',
                  borderColor: isActive ? (color || '#0D1837') : '#e5e7eb',
                }}>
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📭</div>
          <p className="text-gray-500 mb-1 font-semibold">No articles for {selectedMonth === -1 ? 'All Months' : MONTH_NAMES[selectedMonth]} {selectedYear}</p>
          <p className="text-gray-400 text-sm mb-4">Try a different month or view all articles.</p>
          <button
            onClick={() => { setSelectedMonth(-1); setActiveCategory('All'); }}
            className="text-sm font-semibold px-5 py-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50">
            Show All Articles
          </button>
        </div>
      ) : (
        <>
          {/* Featured post */}
          {featured && (
            <div className="mb-10">
              <a href={`/blogs/${encodeURIComponent(featured.slug)}`}
                className="group grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-gray-100 bg-white card-hover">
                <div className="p-5 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full text-white"
                      style={{ background: featured.categoryColor || '#08BD80' }}>
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
                      style={{ background: featured.categoryColor || '#08BD80' }}>
                      {featured.authorAvatar}
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-gray-900">{featured.author}</div>
                      <div className="text-xs text-gray-400">{featured.date}</div>
                    </div>
                    <span className="ml-auto text-sm font-semibold text-green-600 transition-all">Read More →</span>
                  </div>
                </div>
                <div className="hidden md:flex items-center justify-center p-10"
                  style={{ background: `linear-gradient(135deg, ${featured.categoryColor || '#08BD80'}15, ${featured.categoryColor || '#08BD80'}08)` }}>
                  <div className="text-center">
                    <div className="text-7xl mb-4">📚</div>
                    {(featured.tags ?? []).length > 0 && (
                      <div className="text-4xl font-black" style={{ color: featured.categoryColor || '#08BD80' }}>
                        {featured.tags[0]}
                      </div>
                    )}
                  </div>
                </div>
              </a>
            </div>
          )}

          {/* Blog grid */}
          {rest.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
              {rest.map((blog) => (
                <a key={blog.slug} href={`/blogs/${encodeURIComponent(blog.slug)}`}
                  className="group bg-white border border-gray-100 rounded-2xl overflow-hidden card-hover flex flex-col">
                  <div className="h-1.5" style={{ background: blog.categoryColor || '#08BD80' }} />
                  <div className="p-3 md:p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="text-[9px] md:text-xs font-bold px-2 py-0.5 rounded-full text-white"
                        style={{ background: blog.categoryColor || '#08BD80' }}>
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
                        style={{ background: blog.categoryColor || '#08BD80' }}>
                        {blog.authorAvatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-[9px] md:text-xs text-gray-800 truncate">{blog.author.split(' ').slice(-1)[0]}</div>
                      </div>
                      <span className="text-[9px] md:text-xs font-semibold flex-shrink-0" style={{ color: blog.categoryColor || '#08BD80' }}>→</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
