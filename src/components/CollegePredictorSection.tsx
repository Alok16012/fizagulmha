export default function CollegePredictorSection() {
  return (
    <section id="predictor" className="py-12 md:py-20" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Students stat banner */}
        <div
          className="rounded-2xl p-8 md:p-12 mb-10 md:mb-12 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, var(--navy-dark), var(--navy))' }}>
          {/* BG decoration */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10" style={{ background: '#06b6d4' }} />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full opacity-5" style={{ background: '#818cf8' }} />

          <div className="relative z-10">
            <div className="text-5xl md:text-6xl font-black text-white mb-2">1.25 Lakh+</div>
            <h3 className="text-xl md:text-2xl font-bold text-white/80">
              Students Made A Choice That Opened the Right Doors
            </h3>
            <p className="text-white/50 text-sm mt-2">Join the CLATians community and unlock your potential</p>

            {/* Avatar row (decorative) */}
            <div className="flex justify-center items-center gap-2 mt-6">
              {['AD', 'PS', 'RG', 'NK', 'SM', 'PK', 'VR'].map((initials, i) => (
                <div key={i}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white font-bold text-xs border-2 border-white/20 -ml-2 first:ml-0"
                  style={{
                    background: ['#06b6d4', '#818cf8', '#34d399', '#fb923c', '#f43f5e', '#a855f7', '#06b6d4'][i],
                  }}>
                  {initials}
                </div>
              ))}
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold -ml-2 border-2 border-white/20">
                +99k
              </div>
            </div>
          </div>
        </div>

        {/* College Predictor card */}
        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* Left: info */}
          <div>
            <span className="chip mb-4">AI-Powered Tool</span>
            <h2 className="section-title mb-4">College Predictor</h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              Predict your chances of getting into your dream college with our AI-powered tool.
              Enter your expected CLAT rank and get instant predictions for all 23 NLUs.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                '✅ Predict chances for all 23 NLUs',
                '✅ Category-wise seat availability',
                '✅ Previous year cutoff analysis',
                '✅ Real-time rank predictions',
              ].map((item) => (
                <li key={item} className="text-sm text-gray-600">{item}</li>
              ))}
            </ul>
            <a href="#"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90"
              style={{ background: 'var(--cyan)' }}>
              🔮 Try Predictor Now →
            </a>
          </div>

          {/* Right: predictor UI mockup */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                style={{ background: '#e0f9ff' }}>🔮</div>
              <h3 className="font-bold text-gray-900">College Predictor</h3>
              <span className="ml-auto text-xs font-bold px-2 py-1 rounded-full text-white"
                style={{ background: 'var(--cyan)' }}>AI-Powered</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">Expected CLAT Rank</label>
                <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 focus-within:border-cyan-400 transition-colors">
                  <span className="text-gray-400 text-sm mr-2">#</span>
                  <input type="number" placeholder="e.g. 500" readOnly
                    className="flex-1 outline-none text-sm font-semibold text-gray-700 bg-transparent" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">Category</label>
                <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-cyan-400 transition-colors bg-white">
                  <option>General</option>
                  <option>SC</option>
                  <option>ST</option>
                  <option>OBC</option>
                  <option>PWD</option>
                </select>
              </div>
              <a href="#"
                className="block text-center py-3 rounded-xl font-bold text-white text-sm"
                style={{ background: 'linear-gradient(135deg, var(--navy), var(--navy-light))' }}>
                🔍 Predict My College
              </a>
            </div>

            <p className="text-xs text-center text-gray-400 mt-4">
              Based on previous year cutoffs & rank data
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
