import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admission 2026 – Enroll in CLATians CLAT Coaching',
  description: 'Apply for CLATians 2026 batch. Offline, Online, Mentorship and Mock Test programs available. Limited seats. Call 8507700177.',
};

const steps = [
  { step: '01', title: 'Call or Fill Form', desc: 'Contact us at 8507700177 or fill the admission form below. Our counsellor will call you within 24 hours.' },
  { step: '02', title: 'Free Counselling', desc: 'Attend a free 30-minute session where our expert assesses your current level and recommends the right program.' },
  { step: '03', title: 'Select Program', desc: 'Choose from Offline, Online, Mentorship, or Mock Test Series based on your preparation needs and schedule.' },
  { step: '04', title: 'Pay & Enroll', desc: 'Complete the admission process with payment. EMI options available. Access starts immediately after enrollment.' },
];

const programs = [
  { name: 'Offline Course', duration: '12 Months', fee: '₹75,000', seats: '30 seats', color: '#06b6d4', slug: 'offline', popular: false },
  { name: 'Online Course', duration: '12 Months', fee: '₹45,000', seats: 'Open', color: '#818cf8', slug: 'online', popular: true },
  { name: 'Mentorship', duration: '6-12 Months', fee: '₹1,20,000', seats: '10 seats', color: '#34d399', slug: 'mentorship', popular: false },
  { name: 'Mock Tests', duration: '12 Months', fee: '₹8,999', seats: 'Open', color: '#fb923c', slug: 'mock-tests', popular: false },
];

export default function AdmissionPage() {
  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0">

        {/* Hero */}
        <div className="relative overflow-hidden py-14 md:py-20"
          style={{ background: 'linear-gradient(135deg, #060d1f, #0D1837)' }}>
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10" style={{ background: '#06b6d4' }} />
          <div className="max-w-7xl mx-auto px-4 text-center">
            <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full text-white mb-4"
              style={{ background: 'rgba(6,182,212,0.3)', border: '1px solid rgba(6,182,212,0.5)' }}>
              🎓 Admissions Open
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white">CLATians Admission 2026</h1>
            <p className="text-white/60 mt-3 text-base md:text-lg max-w-xl mx-auto">
              Enroll in India's most trusted CLAT coaching. Limited seats in offline batch — apply now.
            </p>
            <div className="flex justify-center gap-4 mt-6 flex-wrap">
              <a href="tel:8507700177" style={{ background: '#08BD80' }}
                className="px-7 py-3.5 rounded-xl font-bold text-white text-sm">
                📞 Call to Apply
              </a>
              <a href="#form"
                className="px-7 py-3.5 rounded-xl font-bold text-white border border-white/20 text-sm hover:bg-white/10 transition-colors">
                Fill Application Form
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">

          {/* How to Apply */}
          <div className="mb-14">
            <div className="text-center mb-10">
              <h2 className="section-title">How to Apply</h2>
              <p className="section-subtitle">Simple 4-step admission process</p>
            </div>
            <div className="grid md:grid-cols-4 gap-5">
              {steps.map((s) => (
                <div key={s.step} className="text-center">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl mx-auto mb-4"
                    style={{ background: '#0D1837' }}>
                    {s.step}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div className="mb-14">
            <div className="text-center mb-10">
              <h2 className="section-title">Choose Your Program</h2>
            </div>
            <div className="grid md:grid-cols-4 gap-5">
              {programs.map((p) => (
                <div key={p.name}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden card-hover relative">
                  {p.popular && (
                    <div className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full text-white"
                      style={{ background: '#08BD80' }}>
                      Most Popular
                    </div>
                  )}
                  <div className="h-1.5" style={{ background: p.color }} />
                  <div className="p-5">
                    <h3 className="font-black text-lg text-gray-900">{p.name}</h3>
                    <div className="mt-3">
                      <span className="text-2xl font-black" style={{ color: p.color }}>{p.fee}</span>
                    </div>
                    <div className="mt-3 space-y-1.5 text-sm text-gray-500">
                      <div>⏱️ Duration: {p.duration}</div>
                      <div>🪑 Seats: {p.seats}</div>
                    </div>
                    <a href={`/courses/${p.slug}`}
                      className="mt-4 block text-center py-2.5 rounded-xl font-bold text-sm"
                      style={{ background: p.color + '15', color: p.color }}>
                      View Details →
                    </a>
                    <a href="tel:8507700177"
                      className="mt-2 block text-center py-2.5 rounded-xl font-bold text-white text-sm"
                      style={{ background: p.color }}>
                      Enroll Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Application Form */}
          <div id="form" className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl font-black mb-3" style={{ color: '#0D1837' }}>Online Application Form</h2>
              <p className="text-gray-500 mb-6 text-sm">Fill in your details and our admission counsellor will call you within 24 hours.</p>

              <form className="space-y-4">
                {[
                  { label: 'Full Name *', type: 'text', placeholder: 'Your full name' },
                  { label: 'Mobile Number *', type: 'tel', placeholder: '10-digit number' },
                  { label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
                  { label: 'City / State', type: 'text', placeholder: 'e.g. Patna, Bihar' },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-400 transition-colors" />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Program Interested In *</label>
                  <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-400 transition-colors bg-white text-gray-700">
                    <option>Select program</option>
                    <option>Offline Course — ₹75,000</option>
                    <option>Online Course — ₹45,000</option>
                    <option>Mentorship — ₹1,20,000</option>
                    <option>Mock Test Series — ₹8,999</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Current Class / Year</label>
                  <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-400 transition-colors bg-white text-gray-700">
                    <option>Select</option>
                    <option>Class 11</option>
                    <option>Class 12</option>
                    <option>Dropper / Repeat</option>
                    <option>Graduate</option>
                  </select>
                </div>
                <button type="submit"
                  className="w-full py-4 rounded-xl font-bold text-white text-sm"
                  style={{ background: '#0D1837' }}>
                  Submit Application →
                </button>
              </form>
            </div>

            {/* Why CLATians */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <h3 className="text-xl font-black mb-5" style={{ color: '#0D1837' }}>Why Choose CLATians?</h3>
              <div className="space-y-4">
                {[
                  { icon: '🏆', title: '5000+ NLU Selections', desc: 'Track record speaks for itself. Students from every batch have cracked top NLUs.' },
                  { icon: '👨‍🏫', title: 'NLU Alumni Faculty', desc: '20+ expert faculty who are NLU graduates, advocates, and CLAT toppers themselves.' },
                  { icon: '📝', title: '150+ Mock Tests', desc: 'Most comprehensive mock test series — the only way to crack CLAT is to practice.' },
                  { icon: '🎯', title: 'Personalized Approach', desc: 'Small batches ensure individual attention. Not just another coaching number.' },
                  { icon: '💰', title: 'EMI Options Available', desc: 'Don\'t let fees be a barrier. Flexible payment options for all programs.' },
                  { icon: '📱', title: 'App + Web Access', desc: 'Study anywhere, anytime. Mobile app and web platform available.' },
                ].map((w) => (
                  <div key={w.title} className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{w.icon}</span>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">{w.title}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{w.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-gray-50 text-center">
                <a href="tel:8507700177" style={{ background: '#08BD80' }}
                  className="inline-block px-6 py-3 rounded-xl font-bold text-white text-sm">
                  📞 Call: 8507700177
                </a>
                <p className="text-xs text-gray-400 mt-2">Free counselling · Mon–Sat, 9 AM–7 PM</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
