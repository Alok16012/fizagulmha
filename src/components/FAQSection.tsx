'use client';
import { useState } from 'react';

const faqs = [
  {
    q: 'What is the exam pattern for CLAT 2025?',
    a: 'CLAT 2025 is a 2-hour Computer Based Test (CBT) with 150 questions across five sections: English Language, Current Affairs & General Knowledge, Legal Reasoning, Logical Reasoning, and Quantitative Techniques. Each correct answer awards 1 mark, while there is a negative marking of 0.25 for every incorrect answer.',
  },
  {
    q: 'When is the CLAT 2025 exam scheduled?',
    a: 'CLAT 2025 is scheduled for December 1, 2024. The exam is conducted by the Consortium of NLUs. The admit card is released approximately 2 weeks before the exam date.',
  },
  {
    q: 'What are the eligibility criteria for CLAT UG?',
    a: 'To be eligible for CLAT UG, candidates must have passed 10+2 or equivalent exam. For General category, a minimum of 45% marks is required. For SC/ST candidates, the minimum is 40%. There is no age limit for appearing in CLAT.',
  },
  {
    q: 'How many NLUs are covered under CLAT?',
    a: 'Currently, 23 National Law Universities participate in CLAT for their UG (BA LLB) and PG (LLM) admissions. This includes prestigious institutions like NLSIU Bangalore, NLU Delhi (through AILET), NALSAR Hyderabad, WBNUJS Kolkata, and NLU Jodhpur among others.',
  },
  {
    q: 'Does CLATians provide mock tests?',
    a: 'Yes! CLATians provides a comprehensive series of 150+ full-length mock tests that closely simulate the actual CLAT exam pattern. Each mock test comes with detailed analytics, section-wise performance breakdown, all-India rank, and complete solutions with explanations.',
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="chip mb-3">FAQ</span>
          <h2 className="section-title">{"Let's Clear Up Some Doubts"}</h2>
          <p className="section-subtitle">Common questions answered by our experts.</p>
        </div>

        {/* FAQ accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i}
              className="border rounded-2xl overflow-hidden transition-all"
              style={{ borderColor: open === i ? 'var(--cyan)' : '#e5e7eb' }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 md:px-6 py-4 md:py-5 text-left transition-colors hover:bg-cyan-50/50"
                style={{ background: open === i ? '#f0fdff' : 'white' }}>
                <span className="font-semibold text-gray-900 text-sm md:text-base pr-4">{faq.q}</span>
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold transition-all"
                  style={{ background: open === i ? 'var(--cyan)' : '#d1d5db' }}>
                  {open === i ? '−' : '+'}
                </span>
              </button>
              {open === i && (
                <div className="px-5 md:px-6 pb-5 pt-1 text-sm md:text-base text-gray-600 leading-relaxed border-t border-cyan-50 bg-cyan-50/20 animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* View more */}
        <div className="text-center mt-8">
          <a href="#"
            className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-xl border-2 transition-all hover:bg-cyan-50"
            style={{ borderColor: 'var(--cyan)', color: 'var(--cyan)' }}>
            View More FAQs →
          </a>
        </div>

        {/* Ask a question CTA */}
        <div
          className="mt-10 rounded-2xl p-6 md:p-8 text-center"
          style={{ background: 'linear-gradient(135deg, #f0fdff, #e0f9ff)' }}>
          <div className="text-3xl mb-3">💬</div>
          <h3 className="font-black text-xl md:text-2xl" style={{ color: 'var(--navy)' }}>
            Every query is essential.
          </h3>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Our team of experts, or experienced individuals, will answer it within 24 hours.
          </p>
          <a href="tel:8507700177"
            className="mt-5 inline-block px-8 py-3 rounded-xl font-bold text-white text-sm"
            style={{ background: 'var(--navy)' }}>
            Ask any Question →
          </a>
        </div>
      </div>
    </section>
  );
}
