'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const nlus = [
  { name: 'NLSIU Bangalore', city: 'Bangalore', rank: 1, generalCutoff: 50, state: 'Karnataka' },
  { name: 'NALSAR Hyderabad', city: 'Hyderabad', rank: 2, generalCutoff: 200, state: 'Telangana' },
  { name: 'WBNUJS Kolkata', city: 'Kolkata', rank: 3, generalCutoff: 350, state: 'West Bengal' },
  { name: 'NLU Jodhpur', city: 'Jodhpur', rank: 4, generalCutoff: 500, state: 'Rajasthan' },
  { name: 'NLIU Bhopal', city: 'Bhopal', rank: 5, generalCutoff: 800, state: 'Madhya Pradesh' },
  { name: 'GNLU Gandhinagar', city: 'Gandhinagar', rank: 6, generalCutoff: 900, state: 'Gujarat' },
  { name: 'RMLNLU Lucknow', city: 'Lucknow', rank: 7, generalCutoff: 1000, state: 'Uttar Pradesh' },
  { name: 'HNLU Raipur', city: 'Raipur', rank: 8, generalCutoff: 1200, state: 'Chhattisgarh' },
  { name: 'RGNUL Patiala', city: 'Patiala', rank: 9, generalCutoff: 1400, state: 'Punjab' },
  { name: 'CNLU Patna', city: 'Patna', rank: 10, generalCutoff: 1500, state: 'Bihar' },
  { name: 'NLU Odisha', city: 'Cuttack', rank: 11, generalCutoff: 1700, state: 'Odisha' },
  { name: 'NUSRL Ranchi', city: 'Ranchi', rank: 12, generalCutoff: 1800, state: 'Jharkhand' },
  { name: 'NLU Assam', city: 'Guwahati', rank: 13, generalCutoff: 2000, state: 'Assam' },
  { name: 'DSNLU Visakhapatnam', city: 'Visakhapatnam', rank: 14, generalCutoff: 2100, state: 'Andhra Pradesh' },
  { name: 'MNLU Mumbai', city: 'Mumbai', rank: 15, generalCutoff: 900, state: 'Maharashtra' },
];

const multipliers: Record<string, number> = { General: 1, OBC: 1.5, SC: 2.5, ST: 3, EWS: 1.2, PWD: 2 };

export default function CollegePredictorPage() {
  const [rank, setRank] = useState('');
  const [category, setCategory] = useState('General');
  const [predicted, setPredicted] = useState<typeof nlus | null>(null);
  const [notPredicted, setNotPredicted] = useState<typeof nlus | null>(null);

  const predict = () => {
    const r = parseInt(rank);
    if (!r || r < 1) return;
    const mult = multipliers[category] ?? 1;
    const yes = nlus.filter((n) => r <= n.generalCutoff * mult);
    const no = nlus.filter((n) => r > n.generalCutoff * mult);
    setPredicted(yes);
    setNotPredicted(no);
  };

  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0">

        {/* Hero */}
        <div className="relative overflow-hidden py-10 md:py-20"
          style={{ background: 'linear-gradient(135deg, #060d1f, #0D1837)' }}>
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10" style={{ background: '#06b6d4' }} />
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="text-5xl mb-4">🔮</div>
            <h1 className="text-3xl md:text-5xl font-black text-white">College Predictor</h1>
            <p className="text-white/60 mt-3 text-base md:text-lg max-w-xl mx-auto">
              Enter your expected CLAT rank and predict your chances of getting into any of the 23 NLUs.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">

          {/* Predictor tool */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-10 mb-10 shadow-sm">
            <h2 className="text-2xl font-black mb-6" style={{ color: '#0D1837' }}>
              Predict Your NLU Admission Chances
            </h2>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Expected CLAT Rank *</label>
                <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 focus-within:border-orange-400 transition-colors">
                  <span className="text-gray-400 text-sm mr-2">#</span>
                  <input
                    type="number"
                    value={rank}
                    onChange={(e) => setRank(e.target.value)}
                    placeholder="e.g. 500"
                    min="1"
                    max="75000"
                    className="flex-1 outline-none text-sm font-semibold text-gray-700 bg-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-orange-400 transition-colors bg-white">
                  {Object.keys(multipliers).map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button onClick={predict}
                  className="w-full py-3 rounded-xl font-bold text-white text-sm transition-opacity hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #0D1837, #f77420)' }}>
                  🔍 Predict My Colleges
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-400">
              * Based on CLAT 2024-25 closing ranks. Actual cutoffs may vary. Use as reference only.
            </p>
          </div>

          {/* Results */}
          {predicted !== null && (
            <div className="space-y-8">
              {/* Likely to get */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <h3 className="text-lg font-black text-gray-900">
                    Likely to Get ({predicted.length} NLUs)
                  </h3>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white bg-orange-500">
                    RANK #{rank} · {category}
                  </span>
                </div>
                {predicted.length === 0 ? (
                  <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 text-center">
                    <p className="text-gray-500 text-sm">No NLUs predicted at this rank. Try improving your score!</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-3">
                    {predicted.map((nlu) => (
                      <div key={nlu.name}
                        className="flex items-center gap-4 p-4 bg-white border border-orange-100 rounded-xl">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                          style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}>
                          #{nlu.rank}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm text-gray-900 truncate">{nlu.name}</div>
                          <div className="text-xs text-gray-400">{nlu.city}, {nlu.state}</div>
                        </div>
                        <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full flex-shrink-0">
                          ✓ Likely
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* May not get */}
              {notPredicted && notPredicted.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <h3 className="text-lg font-black text-gray-900">
                      Need Higher Rank ({notPredicted.length} NLUs)
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {notPredicted.map((nlu) => (
                      <div key={nlu.name}
                        className="flex items-center gap-4 p-4 bg-white border border-red-100 rounded-xl opacity-60">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0 bg-gray-300">
                          #{nlu.rank}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm text-gray-700 truncate">{nlu.name}</div>
                          <div className="text-xs text-gray-400">{nlu.city}, {nlu.state}</div>
                        </div>
                        <span className="text-xs font-bold text-red-400 flex-shrink-0">
                          Need ~{Math.ceil(nlu.generalCutoff * (multipliers[category] ?? 1) * 0.8)} rank
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Counselling CTA */}
              <div className="rounded-2xl p-6 md:p-8"
                style={{ background: 'linear-gradient(135deg, #0D1837, #1f3160)' }}>
                <h3 className="font-black text-white text-xl mb-2">Need Expert College Guidance?</h3>
                <p className="text-white/60 text-sm mb-4">
                  Our counsellors help you select the best NLU based on your rank, preferences, and career goals.
                </p>
                <a href="tel:8507700177" style={{ background: '#f77420' }}
                  className="inline-block px-6 py-3 rounded-xl font-bold text-white text-sm">
                  📞 Book Free Counselling
                </a>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-10 p-5 bg-yellow-50 border border-yellow-100 rounded-2xl">
            <h4 className="font-bold text-yellow-800 text-sm mb-1">⚠️ Disclaimer</h4>
            <p className="text-yellow-700 text-xs leading-relaxed">
              This predictor is based on approximate closing ranks from CLAT 2024-25 and is for reference only. Actual cutoffs vary each year based on number of applicants, seat availability, and reservation policies. Always consult CLATians counsellors for accurate guidance.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
