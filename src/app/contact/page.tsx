'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PROGRAMS = [
  'Select a program',
  'Offline Course (Patna)',
  'Online Course',
  'Mentorship Program',
  'Mock Test Series',
  'Free Counselling',
];

const EXAMS = [
  'Select exam',
  'CLAT 2026',
  'AILET 2026',
  'MH-CET Law 2026',
  'CUET 2026',
  'All of the above',
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    program: '',
    exam: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [phoneError, setPhoneError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'phone') setPhoneError('');
  }

  function validatePhone(phone: string) {
    return /^\d{10}$/.test(phone.trim());
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    if (!validatePhone(form.phone)) {
      setPhoneError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          program: form.program === 'Select a program' ? '' : form.program,
          exam: form.exam === 'Select exam' ? '' : form.exam,
          message: form.message.trim(),
          source: 'contact',
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus('success');
      setForm({ name: '', phone: '', email: '', program: '', exam: '', message: '' });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    border: '1.5px solid #e5e7eb',
    borderRadius: '12px',
    padding: '12px 16px',
    fontSize: '14px',
    outline: 'none',
    background: '#fff',
    color: '#1a1a2e',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  };

  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0">

        {/* Hero */}
        <div
          className="relative overflow-hidden py-10 md:py-20"
          style={{ background: 'linear-gradient(135deg, #060d1f 0%, #0D1837 100%)' }}
        >
          <div
            className="absolute"
            style={{ width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(8,189,128,0.12), transparent)', top: -60, right: -60, pointerEvents: 'none' }}
          />
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: 'rgba(8,189,128,0.15)', color: '#08BD80' }}>
              <span>📞</span> Free Counselling Available
            </div>
            <h1 className="text-2xl md:text-5xl font-black text-white mb-3">Get in Touch</h1>
            <p className="text-white/60 max-w-xl mx-auto text-sm md:text-base">
              Have questions about CLAT preparation? Our experts are here to help.
            </p>
            {/* Mobile quick action buttons */}
            <div className="md:hidden flex gap-3 mt-5 justify-center">
              <a href="tel:8507700177"
                style={{ flex: 1, maxWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '12px 16px', borderRadius: '16px', background: '#08BD80', color: 'white', fontWeight: 800, fontSize: '13px', textDecoration: 'none' }}>
                📞 Call Now
              </a>
              <a href="https://wa.me/918507700177" target="_blank" rel="noopener noreferrer"
                style={{ flex: 1, maxWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '12px 16px', borderRadius: '16px', background: '#25D366', color: 'white', fontWeight: 800, fontSize: '13px', textDecoration: 'none' }}>
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Mobile: horizontal scroll contact cards */}
        <div className="md:hidden px-4 py-5" style={{ background: '#F8FAFC' }}>
          <div style={{ overflowX: 'auto', display: 'flex', gap: '12px', paddingBottom: '4px' }} className="scrollbar-none">
            {[
              { icon: '📞', title: 'Call Us', sub: 'Mon–Sat 9AM–7PM', href: 'tel:8507700177', bg: '#E6FAF4', color: '#08BD80' },
              { icon: '📍', title: 'Visit Us', sub: 'Boring Rd, Patna', href: 'https://maps.google.com/?q=Gangotri+Palace+Boring+Road+Patna', bg: '#EEF2FF', color: '#6366F1' },
              { icon: '💬', title: 'WhatsApp', sub: '9AM–9PM', href: 'https://wa.me/918507700177', bg: '#F0FFF4', color: '#22C55E' },
              { icon: '🌐', title: 'Social', sub: 'Daily updates', href: '#', bg: '#FFF7ED', color: '#F97316' },
            ].map((c) => (
              <a key={c.title} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{ flexShrink: 0, width: '120px', background: 'white', borderRadius: '16px', padding: '14px 12px', border: '1.5px solid #F0F0F0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textDecoration: 'none', display: 'block' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', marginBottom: '8px' }}>{c.icon}</div>
                <div style={{ fontWeight: 800, fontSize: '12px', color: '#0D1837', marginBottom: '2px' }}>{c.title}</div>
                <div style={{ fontSize: '10px', color: '#9CA3AF' }}>{c.sub}</div>
                <div style={{ marginTop: '8px', fontSize: '10px', fontWeight: 700, color: c.color }}>Tap →</div>
              </a>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6 md:py-12">
          <div className="grid md:grid-cols-3 gap-8">

            {/* Left Sidebar: Contact Info — desktop only */}
            <div className="hidden md:block space-y-4">
              {[
                { icon: '📞', title: 'Call Us', lines: ['8507700177', 'Mon–Sat: 9 AM – 7 PM'], href: 'tel:8507700177', cta: 'Call Now' },
                { icon: '📍', title: 'Visit Us', lines: ['2nd Floor, Gangotri Palace', 'Boring Rd, Patna, Bihar 800001'], href: 'https://maps.google.com/?q=Gangotri+Palace+Boring+Road+Patna', cta: 'Get Directions' },
                { icon: '💬', title: 'WhatsApp', lines: ['Quick response on WhatsApp', 'Available 9 AM – 9 PM'], href: 'https://wa.me/918507700177', cta: 'Chat on WhatsApp' },
                { icon: '🌐', title: 'Social Media', lines: ['Follow us for daily updates', 'GK, tips & success stories'], href: '#', cta: 'Follow CLATians' },
              ].map((c) => (
                <div key={c.title} className="bg-white rounded-2xl p-5" style={{ border: '1.5px solid #f0f0f0', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3" style={{ background: 'rgba(8,189,128,0.1)' }}>{c.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-1 text-sm">{c.title}</h3>
                  {c.lines.map((l, i) => <p key={i} className="text-xs text-gray-500">{l}</p>)}
                  <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="mt-3 inline-block text-xs font-semibold" style={{ color: '#08BD80' }}>
                    {c.cta} →
                  </a>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <div
                className="bg-white rounded-2xl p-6 md:p-8"
                style={{ border: '1.5px solid #f0f0f0', boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}
              >
                {status === 'success' ? (
                  /* Success State */
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                      style={{ background: 'rgba(8,189,128,0.12)' }}
                    >
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <circle cx="20" cy="20" r="20" fill="#08BD80" fillOpacity="0.15" />
                        <path
                          d="M12 20.5L17.5 26L28 14"
                          stroke="#08BD80"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-black mb-2" style={{ color: '#0D1837' }}>
                      Message Sent!
                    </h2>
                    <p className="text-gray-500 text-sm max-w-xs mb-2">
                      We&apos;ll call you within 24 hours!
                    </p>
                    <p className="text-xs text-gray-400 mb-6">
                      Our counsellor will reach out to help you with your CLAT journey.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white"
                      style={{ background: '#08BD80' }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-black mb-1" style={{ color: '#0D1837' }}>
                      Send Us a Message
                    </h2>
                    <p className="text-gray-400 text-sm mb-6">Our team will respond within 24 hours.</p>

                    {status === 'error' && (
                      <div
                        className="mb-4 px-4 py-3 rounded-xl text-sm"
                        style={{ background: '#fff1f1', color: '#dc2626', border: '1px solid #fecaca' }}
                      >
                        {errorMsg || 'Something went wrong. Please try again.'}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label
                            className="block text-xs font-semibold mb-1.5"
                            style={{ color: '#6b7280' }}
                          >
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            required
                            style={inputStyle}
                            onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = '#08BD80'; }}
                            onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = '#e5e7eb'; }}
                          />
                        </div>
                        <div>
                          <label
                            className="block text-xs font-semibold mb-1.5"
                            style={{ color: '#6b7280' }}
                          >
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="10-digit mobile number"
                            maxLength={10}
                            required
                            style={{
                              ...inputStyle,
                              borderColor: phoneError ? '#dc2626' : '#e5e7eb',
                            }}
                            onFocus={(e) => {
                              if (!phoneError) (e.target as HTMLInputElement).style.borderColor = '#08BD80';
                            }}
                            onBlur={(e) => {
                              if (!phoneError) (e.target as HTMLInputElement).style.borderColor = '#e5e7eb';
                            }}
                          />
                          {phoneError && (
                            <p className="text-xs mt-1" style={{ color: '#dc2626' }}>{phoneError}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label
                          className="block text-xs font-semibold mb-1.5"
                          style={{ color: '#6b7280' }}
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          style={inputStyle}
                          onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = '#08BD80'; }}
                          onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = '#e5e7eb'; }}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label
                            className="block text-xs font-semibold mb-1.5"
                            style={{ color: '#6b7280' }}
                          >
                            I am interested in
                          </label>
                          <select
                            name="program"
                            value={form.program}
                            onChange={handleChange}
                            style={inputStyle}
                            onFocus={(e) => { (e.target as HTMLSelectElement).style.borderColor = '#08BD80'; }}
                            onBlur={(e) => { (e.target as HTMLSelectElement).style.borderColor = '#e5e7eb'; }}
                          >
                            {PROGRAMS.map((p) => (
                              <option key={p} value={p === 'Select a program' ? '' : p}>
                                {p}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label
                            className="block text-xs font-semibold mb-1.5"
                            style={{ color: '#6b7280' }}
                          >
                            Target Exam
                          </label>
                          <select
                            name="exam"
                            value={form.exam}
                            onChange={handleChange}
                            style={inputStyle}
                            onFocus={(e) => { (e.target as HTMLSelectElement).style.borderColor = '#08BD80'; }}
                            onBlur={(e) => { (e.target as HTMLSelectElement).style.borderColor = '#e5e7eb'; }}
                          >
                            {EXAMS.map((ex) => (
                              <option key={ex} value={ex === 'Select exam' ? '' : ex}>
                                {ex}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label
                          className="block text-xs font-semibold mb-1.5"
                          style={{ color: '#6b7280' }}
                        >
                          Your Message
                        </label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Tell us about your preparation, doubts, or questions..."
                          style={{ ...inputStyle, resize: 'none' }}
                          onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = '#08BD80'; }}
                          onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = '#e5e7eb'; }}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full py-4 rounded-xl font-bold text-white text-sm transition-opacity"
                        style={{
                          background: status === 'loading'
                            ? '#6b7280'
                            : 'linear-gradient(135deg, #0D1837, #1a2f5e)',
                          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                        }}
                      >
                        {status === 'loading' ? 'Sending...' : 'Send Message →'}
                      </button>

                      <p className="text-xs text-center text-gray-400">
                        By submitting, you agree to receive a callback from CLATians team.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Free Counselling CTA */}
          <div
            className="mt-12 rounded-2xl p-8 md:p-10 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0D1837 0%, #1f3160 100%)' }}
          >
            <div
              className="absolute"
              style={{
                width: 200, height: 200, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(8,189,128,0.15), transparent)',
                top: -40, right: -40, pointerEvents: 'none',
              }}
            />
            <div className="relative z-10">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
                style={{ background: 'rgba(8,189,128,0.2)', color: '#08BD80' }}
              >
                Free Session
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
                Free 1-on-1 Counselling
              </h2>
              <p className="text-white/60 max-w-xl mx-auto text-sm md:text-base mb-6">
                Not sure which program is right for you? Our counsellors will assess your current
                preparation level and recommend the best path forward.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href="tel:8507700177"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-white text-sm text-center"
                  style={{ background: '#08BD80' }}>
                  📞 Call 8507700177
                </a>
                <a href="https://wa.me/918507700177" target="_blank" rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-white text-sm text-center"
                  style={{ background: '#25D366' }}>
                  💬 WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
