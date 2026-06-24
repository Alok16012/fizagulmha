'use client';
import { useState } from 'react';

const faqs = [
  {
    q: 'What is the exam pattern for CLAT 2026?',
    a: 'CLAT 2026 is a 2-hour Computer Based Test (CBT) with 120 questions across five sections: English Language (22–26 Qs), Current Affairs & GK (28–32 Qs), Legal Reasoning (28–32 Qs), Logical Reasoning (22–26 Qs), and Quantitative Techniques (10–14 Qs). Each correct answer awards 1 mark; -0.25 for every wrong answer.',
  },
  {
    q: 'When is the CLAT 2026 exam scheduled?',
    a: 'CLAT 2026 is expected in December 2025. The official notification is typically released around August–September. CLATians keeps you updated with the latest dates and notifications.',
  },
  {
    q: 'What are the eligibility criteria for CLAT UG?',
    a: 'Candidates must have passed Class 12 or equivalent. General/OBC/NRI candidates need minimum 45% marks; SC/ST candidates need 40%. There is no upper age limit for the CLAT UG programme.',
  },
  {
    q: 'How many NLUs participate in CLAT?',
    a: 'Currently 23 National Law Universities participate in CLAT. This includes NLSIU Bangalore, NALSAR Hyderabad, NLIU Bhopal, WBNUJS Kolkata, NLU Jodhpur and many more — offering 2700+ UG seats combined.',
  },
  {
    q: 'Does CLATians provide mock tests for CLAT 2026?',
    a: 'Yes! CLATians offers 10, 20 and 40 full-length CLAT mock test bundles. Each test simulates the real exam with detailed solutions, section-wise analytics, all-India rank, and performance tracking.',
  },
  {
    q: 'Can I join CLATians if I am in Class 11?',
    a: 'Absolutely! CLATians\' Foundation batch (CLAT 2027) is designed for Class 11 students. Starting early gives you more time to build concepts, attempt more mocks, and secure a top NLU rank.',
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-8 md:py-14" style={{ background: '#F7F9FB' }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 px-4">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full" style={{ background: 'rgba(247,116,32,0.1)', border: '1px solid rgba(247,116,32,0.2)' }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#f77420' }} />
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#f77420' }}>FAQ</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold mb-2" style={{ color: '#0D1837' }}>
            Frequently Asked Questions
          </h2>
          <p className="text-sm" style={{ color: '#7A8B94' }}>
            Everything about CLAT preparation at CLATians.
          </p>
        </div>

        {/* FAQ accordion */}
        <div className="px-4 space-y-2.5">
          {faqs.map((faq, i) => (
            <div key={i}
              style={{
                borderRadius: '16px', overflow: 'hidden',
                border: `1.5px solid ${open === i ? '#f77420' : '#E9EEF2'}`,
                background: 'white',
                boxShadow: open === i ? '0 4px 16px rgba(247,116,32,0.1)' : '0 1px 4px rgba(0,0,0,0.04)',
                transition: 'all .2s ease',
              }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-4 text-left"
                style={{ background: open === i ? '#fff7ed' : 'white', border: 'none', cursor: 'pointer' }}>
                <span className="font-semibold text-sm pr-3 leading-snug" style={{ color: '#0D1837' }}>
                  {faq.q}
                </span>
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-lg font-bold transition-all"
                  style={{ background: open === i ? '#f77420' : '#F3F4F6', color: open === i ? 'white' : '#9CA3AF', minWidth: '28px' }}>
                  {open === i ? '−' : '+'}
                </span>
              </button>
              {open === i && (
                <div className="px-4 pb-4 pt-1 text-sm leading-relaxed border-t animate-fade-in"
                  style={{ borderColor: '#fff1e8', color: '#5a6a75', background: '#fff7ed' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA — App-style */}
        <div className="mx-4 mt-8 rounded-2xl p-5 text-center" style={{ background: 'linear-gradient(135deg,#0D1837,#1a2744)' }}>
          <div className="text-3xl mb-3">💬</div>
          <h3 className="font-black text-lg text-white mb-1">Still have questions?</h3>
          <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Free counselling for CLAT 2026 preparation.
          </p>
          <div className="flex gap-3">
            <a href="tel:8507700177"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-white text-sm"
              style={{ background: 'linear-gradient(135deg,#f77420,#d95f18)', boxShadow: '0 6px 16px rgba(247,116,32,0.35)' }}>
              📞 Call Now
            </a>
            <a href="/admission"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm"
              style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1.5px solid rgba(255,255,255,0.15)' }}>
              📝 Enroll Free
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
