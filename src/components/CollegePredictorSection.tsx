export default function CollegePredictorSection() {
  return (
    <section id="predictor" className="py-8 md:py-14" style={{ background: '#FCFCFC' }}>
      <div className="max-w-7xl mx-auto px-4">

        {/* Unacademy-style CTA Banner: "Get subscription to start your preparation" */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl px-8 py-8 mb-8 border"
          style={{ background: 'white', borderColor: '#E9EEF2' }}>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold leading-tight" style={{ color: '#3C4852' }}>
              Start your CLAT 2026<br className="hidden md:block" /> preparation today
            </h2>
            <div className="flex flex-wrap gap-5 mt-4">
              {[
                'Best for full-syllabus preparation',
                'Live & recorded online classes',
                'Curated by expert faculty',
              ].map(f => (
                <span key={f} className="flex items-center gap-1.5 text-sm" style={{ color: '#7A8B94' }}>
                  <span style={{ color: '#f77420' }}>✓</span> {f}
                </span>
              ))}
            </div>
          </div>
          <a href="/courses/offline"
            className="flex-shrink-0 px-7 py-3.5 rounded-lg font-bold text-white text-sm transition-opacity hover:opacity-90 whitespace-nowrap"
            style={{ background: '#f77420' }}>
            View All Courses →
          </a>
        </div>

        {/* College Predictor section */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div>
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#f77420' }}>AI-Powered Tool</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: '#3C4852' }}>
              NLU College Predictor
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: '#7A8B94' }}>
              Enter your expected CLAT rank and get instant admission chances across all 23 NLUs. Based on previous year cutoffs and category-wise seat data.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Predict chances for all 23 NLUs',
                'Category-wise seat availability',
                'Previous year cutoff analysis',
                'Updated with CLAT 2025 data',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm" style={{ color: '#5a6a75' }}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0"
                    style={{ background: '#f77420' }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <a href="/college-predictor"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-bold text-white text-sm transition-opacity hover:opacity-90"
              style={{ background: '#f77420' }}>
              🔮 Try Predictor Free →
            </a>
          </div>

          {/* Right: Predictor Card UI */}
          <div className="rounded-2xl border p-6 shadow-sm" style={{ background: 'white', borderColor: '#E9EEF2' }}>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                style={{ background: '#fff1e8' }}>🔮</div>
              <h3 className="font-bold" style={{ color: '#3C4852' }}>College Predictor</h3>
              <span className="ml-auto text-xs font-bold px-2.5 py-1 rounded-full text-white"
                style={{ background: '#f77420' }}>AI-Powered</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold block mb-1.5" style={{ color: '#7A8B94' }}>
                  Expected CLAT Rank
                </label>
                <div className="flex items-center border rounded-lg px-4 py-3 transition-colors"
                  style={{ borderColor: '#E9EEF2' }}>
                  <span className="text-sm mr-2" style={{ color: '#7A8B94' }}>#</span>
                  <input type="number" placeholder="e.g. 500" readOnly
                    className="flex-1 outline-none text-sm font-semibold bg-transparent"
                    style={{ color: '#3C4852' }} />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold block mb-1.5" style={{ color: '#7A8B94' }}>
                  Category
                </label>
                <select className="w-full border rounded-lg px-4 py-3 text-sm outline-none bg-white"
                  style={{ borderColor: '#E9EEF2', color: '#3C4852' }}>
                  <option>General</option>
                  <option>SC</option>
                  <option>ST</option>
                  <option>OBC</option>
                  <option>PWD</option>
                </select>
              </div>
              <a href="/college-predictor"
                className="block text-center py-3.5 rounded-lg font-bold text-white text-sm transition-opacity hover:opacity-90"
                style={{ background: '#3C4852' }}>
                🔍 Predict My College
              </a>
            </div>

            <p className="text-xs text-center mt-4" style={{ color: '#7A8B94' }}>
              Based on CLAT 2024 & 2025 cutoff data — 23 NLUs covered
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
