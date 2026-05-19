import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact CLATians – Get Free Counselling | 8507700177',
  description: 'Contact CLATians for free CLAT counselling. Visit us in Patna or call 8507700177. We\'re here to help you crack CLAT 2026.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0">

        {/* Hero */}
        <div className="relative overflow-hidden py-14 md:py-20"
          style={{ background: 'linear-gradient(135deg, #060d1f, #0D1837)' }}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-black text-white">Get in Touch</h1>
            <p className="text-white/60 mt-3 max-w-xl mx-auto">
              Have questions about CLAT preparation? Our experts are here to help. Reach us anytime.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">

            {/* Contact Info */}
            <div className="space-y-5">
              {[
                { icon: '📞', title: 'Call Us', lines: ['8507700177', 'Mon–Sat: 9 AM – 7 PM'], href: 'tel:8507700177', cta: 'Call Now' },
                { icon: '📍', title: 'Visit Us', lines: ['2nd Floor, Gangotri Palace', 'Boring Rd, Patna, Bihar 800001'], href: '#', cta: 'Get Directions' },
                { icon: '📱', title: 'WhatsApp', lines: ['Quick response on WhatsApp', 'Available 9 AM – 9 PM'], href: 'https://wa.me/918507700177', cta: 'Chat on WhatsApp' },
                { icon: '🌐', title: 'Social Media', lines: ['Follow us for daily updates', 'GK, tips & success stories'], href: '#', cta: 'Follow CLATians' },
              ].map((c) => (
                <div key={c.title} className="bg-white border border-gray-100 rounded-2xl p-5 card-hover">
                  <div className="text-3xl mb-3">{c.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-1">{c.title}</h3>
                  {c.lines.map((l, i) => (
                    <p key={i} className="text-sm text-gray-500">{l}</p>
                  ))}
                  <a href={c.href}
                    className="mt-3 inline-block text-sm font-semibold"
                    style={{ color: '#08BD80' }}>
                    {c.cta} →
                  </a>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-black mb-2" style={{ color: '#0D1837' }}>Send Us a Message</h2>
                <p className="text-gray-500 text-sm mb-6">Our team will respond within 24 hours.</p>

                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">Full Name *</label>
                      <input type="text" placeholder="Your name"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-400 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">Phone Number *</label>
                      <input type="tel" placeholder="10-digit mobile number"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-400 transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Email Address</label>
                    <input type="email" placeholder="your@email.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-400 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">I am interested in</label>
                    <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-400 transition-colors bg-white text-gray-700">
                      <option>Select a program</option>
                      <option>Offline Course (Patna)</option>
                      <option>Online Course</option>
                      <option>Mentorship Program</option>
                      <option>Mock Test Series</option>
                      <option>Free Counselling</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Target Exam</label>
                    <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-400 transition-colors bg-white text-gray-700">
                      <option>Select exam</option>
                      <option>CLAT 2026</option>
                      <option>AILET 2026</option>
                      <option>MH-CET Law 2026</option>
                      <option>CUET 2026</option>
                      <option>All of the above</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Your Message</label>
                    <textarea rows={4} placeholder="Tell us about your preparation, doubts, or questions..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-400 transition-colors resize-none" />
                  </div>
                  <button type="submit"
                    className="w-full py-4 rounded-xl font-bold text-white text-sm transition-opacity hover:opacity-90"
                    style={{ background: '#0D1837' }}>
                    Send Message →
                  </button>
                  <p className="text-xs text-center text-gray-400">
                    By submitting, you agree to receive a callback from CLATians team.
                  </p>
                </form>
              </div>
            </div>
          </div>

          {/* Free counselling CTA */}
          <div className="mt-12 rounded-2xl p-8 md:p-10 text-center"
            style={{ background: 'linear-gradient(135deg, #0D1837, #1f3160)' }}>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Free 1-on-1 Counselling</h2>
            <p className="text-white/60 max-w-xl mx-auto text-sm md:text-base">
              Not sure which program is right for you? Our counsellors will assess your current preparation level and recommend the best path forward.
            </p>
            <a href="tel:8507700177" style={{ background: '#08BD80' }}
              className="mt-6 inline-block px-8 py-3.5 rounded-xl font-bold text-white text-sm">
              📞 Call 8507700177 for Free Counselling
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
