import Link from 'next/link';
import type { Course } from '@/data/courses';
import type { Batch } from '@/data/batches';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClatNavigatorLeadForm from '@/app/mentorship-programs/clat-navigator/ClatNavigatorLeadForm';

const defaultCourse = {
  title: 'CLAT Navigator™',
  tagline: 'Your Personal Guide from Preparation to Selection.',
  overview:
    'Preparing for CLAT without proper guidance often leads to confusion, inconsistency, and unnecessary stress. CLAT Navigator™ ensures that you always have an experienced mentor to guide your preparation, monitor your progress, and help you make the right decisions at the right time.',
  duration: 'Till CLAT Examination',
  mode: 'Online + Offline',
  batchSize: 'Limited Intake',
  fee: 'Call for Fee',
  color: '#08BD80',
};

const highlights = [
  'Dedicated Personal Mentor',
  'Weekly Strategy Sessions',
  'Monthly One-to-One Reviews',
  'AI-Powered Progress Tracking',
  'Mock Test Analysis',
  'Daily Study Planning',
  'WhatsApp Support',
  'Parent Progress Reports',
  'Goal Monitoring System',
  'NLU Alumni Guidance Sessions',
];

const audience = [
  ['Class 12 Students', 'Students balancing boards and CLAT preparation.'],
  ['Self-Study Aspirants', 'Students seeking guidance without enrolling in full classroom programs.'],
  ['Serious Aspirants', 'Students who want continuous monitoring and strategic support.'],
  ['Students Feeling Stuck', 'Those struggling with consistency, mock performance, or planning.'],
];

const problems = [
  ['No Clear Study Plan', 'Students often study randomly without priorities.'],
  ['Poor Mock Utilisation', 'Taking mocks without analysing mistakes limits improvement.'],
  ['Lack of Accountability', 'Consistency becomes difficult without supervision.'],
  ['Exam Anxiety', 'Stress and uncertainty affect performance.'],
  ['Decision Fatigue', "Students often don't know what to study, revise, or prioritise."],
];

const benefits = [
  ['Dedicated Personal Mentor', 'One mentor who understands your preparation journey.'],
  ['Weekly Strategy Sessions', 'Structured guidance to optimise preparation.'],
  ['Monthly One-to-One Reviews', 'Detailed discussions on progress and improvements.'],
  ['Personal Study Planner', 'Targets aligned with your strengths and weaknesses.'],
  ['Mock Test Analysis', 'Identify recurring mistakes and improvement opportunities.'],
  ['AI-Powered Dashboard', 'Track preparation trends and performance growth.'],
  ['WhatsApp Guidance', 'Quick support and updates whenever required.'],
  ['Parent Updates', 'Monthly communication regarding progress and goals.'],
  ['Motivation & Accountability', 'Helping you stay disciplined throughout preparation.'],
];

const roadmap = [
  ['Phase 1: Diagnostic Assessment', 'Weeks 1-2', ['Preparation audit', 'Goal setting', 'Strength analysis', 'Weakness identification']],
  ['Phase 2: Strategic Planning', 'Month 1', ['Study roadmap creation', 'Time management planning', 'Resource optimisation']],
  ['Phase 3: Consistent Execution', 'Months 2-6', ['Weekly targets', 'Mentor reviews', 'Habit development', 'Performance monitoring']],
  ['Phase 4: Performance Optimisation', 'Months 7-9', ['Advanced mock analysis', 'Revision refinement', 'Accuracy improvement']],
  ['Phase 5: Final Push', 'Last 60-90 Days', ['Rank improvement strategy', 'Stress management', 'Exam temperament building', 'Last-minute planning']],
];

const tracking = ['Performance Trends', 'Subject-Wise Analysis', 'Weakness Detection', 'Revision Recommendations', 'Improvement Tracking', 'Goal Monitoring', 'Rank Forecasting'];

const support = [
  ['Strategy Sessions', 'Weekly'],
  ['One-to-One Reviews', 'Monthly'],
  ['WhatsApp Support', 'Ongoing'],
  ['Parent Updates', 'Monthly'],
  ['Goal Monitoring', 'Continuous'],
  ['Mock Analysis', 'After Scheduled Tests'],
];

const differentiators = ['12+ Years of Excellence', 'Student-Centric Approach', 'Experienced Faculty Team', 'NLU Alumni Network', 'AI-Enhanced Learning Systems', 'Personalised Attention', 'Proven Guidance Methodology'];

const journey = [
  ['Join', 'Book a counselling session.'],
  ['Assess', 'Evaluate current preparation.'],
  ['Plan', 'Create your roadmap.'],
  ['Execute', 'Receive continuous mentorship.'],
  ['Improve', 'Optimise through data and reviews.'],
  ['Perform', 'Approach CLAT with confidence.'],
];

const faqs = [
  ['Who can join CLAT Navigator™?', 'Class 12 students, droppers, and self-study aspirants preparing for CLAT.'],
  ['Is this different from classroom coaching?', 'Yes. Navigator focuses specifically on guidance, accountability, planning, and strategic support.'],
  ['Do I get a dedicated mentor?', 'Yes. Students receive personalised mentorship support.'],
  ['How often are mentor sessions conducted?', 'Weekly strategy sessions and monthly one-to-one reviews are included.'],
  ['Is WhatsApp support available?', 'Yes. Students can seek guidance through designated support channels.'],
  ['Will parents receive updates?', 'Yes. Monthly progress updates are shared with parents.'],
  ['Can existing CLATians students enrol?', 'Absolutely. Navigator can complement existing CLAT preparation.'],
  ['Is this available online?', 'Yes. Support is available in both online and offline formats.'],
];

export const clatNavigatorFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(([question, answer]) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
};

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4">
      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-black text-white" style={{ background: '#08BD80' }}>✓</span>
      <span className="text-sm font-semibold text-gray-700">{text}</span>
    </div>
  );
}

function BatchSummary({ course, batches }: { course: Course; batches: Batch[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
      <div className="rounded-2xl border border-gray-100 bg-white p-5 md:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#08BD80' }}>Available Batches</span>
            <h2 className="mt-2 text-2xl font-black" style={{ color: '#0D1837' }}>{course.title}</h2>
            <p className="mt-1 text-sm text-gray-500">{batches.length} active {batches.length === 1 ? 'batch' : 'batches'} for this mentorship program.</p>
          </div>
          <a href="#lead-form" className="rounded-xl px-5 py-3 text-sm font-black text-white" style={{ background: course.color || '#08BD80' }}>Get Admission Help</a>
        </div>
        {batches.length > 0 ? (
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {batches.map((batch) => (
              <a key={batch.slug} href={`/courses/${course.slug}/${batch.slug}`} className="rounded-xl border border-gray-100 p-4 transition-colors hover:bg-gray-50">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-black text-gray-900">{batch.name}</h3>
                    <p className="mt-1 text-xs text-gray-500">{batch.schedule}</p>
                  </div>
                  <span className="rounded-full px-2 py-1 text-[10px] font-black" style={{ background: '#E6FAF4', color: '#08BD80' }}>{batch.status}</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-gray-500">{batch.startDate}</span>
                  <span className="font-black" style={{ color: course.color || '#08BD80' }}>{batch.fee}</span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-xl border border-dashed border-gray-200 p-6 text-center">
            <p className="font-bold text-gray-500">Batches coming soon. Course details and counselling are available now.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default function ClatNavigatorPageContent({ course, batches = [] }: { course?: Course; batches?: Batch[] }) {
  const pageCourse = course ?? defaultCourse;
  const adminHighlights = (course?.features || []).map((item) => item.trim()).filter(Boolean);
  const adminAudience = (course?.whoFor || []).map((item) => item.trim()).filter(Boolean);
  const adminBenefits = (course?.includes || []).filter((item) => item.label?.trim() || item.value?.trim());
  const adminRoadmap = (course?.curriculum || [])
    .map((item, index) => ({
      phase: item.module?.trim() || `Stage ${index + 1}`,
      time: `Stage ${index + 1}`,
      items: (item.topics || []).map((topic) => topic.trim()).filter(Boolean),
    }))
    .filter((item) => item.phase || item.items.length > 0);

  const pageHighlights = adminHighlights.length > 0 ? adminHighlights : highlights;
  const pageAudience = adminAudience.length > 0
    ? adminAudience.map((item) => [item, 'Personal mentorship support designed around this need.'])
    : audience;
  const pageBenefits = adminBenefits.length > 0
    ? adminBenefits.map((item) => [item.label || 'Program Benefit', item.value || 'Included'])
    : benefits;
  const pageRoadmap = adminRoadmap.length > 0
    ? adminRoadmap.map((item) => [item.phase, item.time, item.items.length > 0 ? item.items : ['Personal mentor guidance']])
    : roadmap;
  const programDetails = [
    ['Program Type', 'Personal Mentorship'],
    ['Eligibility', 'Class 12 Students, Self-Study Aspirants & Droppers'],
    ['Duration', pageCourse.duration || defaultCourse.duration],
    ['Mode', pageCourse.mode || defaultCourse.mode],
    ['Mentor Access', 'Dedicated Mentor'],
    ['Parent Updates', 'Included'],
    ['Seats', pageCourse.batchSize || defaultCourse.batchSize],
    ['Fee', pageCourse.fee || defaultCourse.fee],
  ];

  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0" style={{ background: '#F8FAFC' }}>
        <section className="relative overflow-hidden" style={{ background: '#081226' }}>
          <div className="absolute inset-0 opacity-20">
            <img src="/mentorship-page.png" alt="" className="h-full w-full object-cover" />
          </div>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(8,18,38,0.98), rgba(8,18,38,0.82), rgba(8,18,38,0.74))' }} />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.08fr_0.92fr] md:py-20">
            <div>
              <Link href="/courses?cat=mentorship" className="mb-6 inline-flex text-sm font-semibold text-white/50 hover:text-white">← Back to Mentorship Programs</Link>
              <span className="inline-flex rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider" style={{ background: 'rgba(8,189,128,0.18)', color: '#5DE2B2', border: '1px solid rgba(93,226,178,0.28)' }}>Personal Mentorship</span>
              <h1 className="mt-5 text-4xl font-black leading-tight text-white md:text-6xl">{pageCourse.title}</h1>
              <p className="mt-3 text-xl font-bold text-white/85 md:text-2xl">{pageCourse.tagline || defaultCourse.tagline}</p>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/62">{pageCourse.overview || defaultCourse.overview}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#lead-form" className="rounded-xl px-6 py-3 text-sm font-black text-white" style={{ background: '#08BD80' }}>Book Free Counselling</a>
                <a href="tel:8507700177" className="rounded-xl border border-white/20 px-6 py-3 text-sm font-bold text-white hover:bg-white/10">Talk to a Mentor</a>
                <a href="#roadmap" className="rounded-xl border border-white/20 px-6 py-3 text-sm font-bold text-white hover:bg-white/10">View Roadmap</a>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
              <h2 className="mb-4 text-lg font-black text-white">Program Details</h2>
              <div className="divide-y divide-white/10">
                {programDetails.map(([label, value]) => (
                  <div key={label} className="flex items-start justify-between gap-4 py-3">
                    <span className="text-sm text-white/50">{label}</span>
                    <span className="max-w-[60%] text-right text-sm font-bold text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {course && <BatchSummary course={course} batches={batches} />}

        <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
          <div className="mb-6">
            <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#08BD80' }}>Quick Highlights</span>
            <h2 className="mt-2 text-2xl font-black md:text-3xl" style={{ color: '#0D1837' }}>Why Students Choose CLAT Navigator™</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {pageHighlights.map((item) => <CheckItem key={item} text={item} />)}
          </div>
        </section>

        <section className="bg-white py-10 md:py-14">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-[0.95fr_1.05fr]">
            <div>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#08BD80' }}>About CLAT Navigator™</span>
              <h2 className="mt-2 text-2xl font-black leading-tight md:text-4xl" style={{ color: '#0D1837' }}>Because Preparation Without Direction Can Cost a Dream.</h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Many CLAT aspirants study hard but fail to achieve their desired ranks because they lack a structured preparation strategy, someone to review their progress, accountability to maintain consistency, and expert advice during difficult phases.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                CLAT Navigator™ bridges this gap by combining personalised mentorship with data-driven insights. Whether you study at CLATians or independently, this mentorship program ensures that you never prepare alone.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {pageAudience.map(([title, desc]) => (
                <div key={title} className="rounded-2xl border border-gray-100 p-5" style={{ background: '#F8FAFC' }}>
                  <h3 className="font-black" style={{ color: '#0D1837' }}>{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#08BD80' }}>The Problems We Solve</span>
              <h2 className="mt-2 text-2xl font-black md:text-3xl" style={{ color: '#0D1837' }}>Common Challenges Faced by CLAT Aspirants</h2>
              <div className="mt-6 space-y-3">
                {problems.map(([title, desc]) => (
                  <div key={title} className="rounded-2xl border border-gray-100 bg-white p-5">
                    <h3 className="font-black" style={{ color: '#0D1837' }}>{title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#08BD80' }}>What You Will Get</span>
              <h2 className="mt-2 text-2xl font-black md:text-3xl" style={{ color: '#0D1837' }}>Personalised Mentorship Benefits</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {pageBenefits.map(([title, desc]) => (
                  <div key={title} className="rounded-2xl border border-gray-100 bg-white p-4">
                    <h3 className="text-sm font-black" style={{ color: '#0D1837' }}>{title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-gray-500">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="roadmap" className="bg-white py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4">
            <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#08BD80' }}>Roadmap</span>
            <h2 className="mt-2 text-2xl font-black md:text-3xl" style={{ color: '#0D1837' }}>The CLAT Navigator™ Roadmap</h2>
            <div className="mt-7 grid gap-4 lg:grid-cols-5">
              {pageRoadmap.map(([phase, time, items], idx) => (
                <div key={phase as string} className="rounded-2xl border border-gray-100 p-5" style={{ background: idx % 2 ? '#F8FAFC' : '#F0FDF9' }}>
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl text-sm font-black text-white" style={{ background: '#08BD80' }}>{idx + 1}</div>
                  <h3 className="text-sm font-black" style={{ color: '#0D1837' }}>{phase as string}</h3>
                  <p className="mt-1 text-xs font-bold" style={{ color: '#08BD80' }}>{time as string}</p>
                  <ul className="mt-4 space-y-2">
                    {(items as string[]).map((item) => <li key={item} className="text-xs leading-relaxed text-gray-600">✓ {item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:grid-cols-2 md:py-14">
          <div className="rounded-2xl p-6 text-white" style={{ background: 'linear-gradient(135deg,#0D1837,#0f766e)' }}>
            <h2 className="text-2xl font-black">Study Smarter with Data-Driven Insights</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/65">Our AI-supported systems help you understand your preparation better.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {tracking.map((item) => <div key={item} className="rounded-xl bg-white/10 px-4 py-3 text-sm font-bold">✓ {item}</div>)}
            </div>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6">
            <h2 className="text-2xl font-black" style={{ color: '#0D1837' }}>Continuous Guidance Throughout Your Journey</h2>
            <div className="mt-5 divide-y divide-gray-100">
              {support.map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 py-3">
                  <span className="text-sm text-gray-500">{label}</span>
                  <span className="text-sm font-black" style={{ color: '#0D1837' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-10 md:py-14">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#08BD80' }}>Parent Partnership</span>
              <h2 className="mt-2 text-2xl font-black md:text-3xl" style={{ color: '#0D1837' }}>Keeping Parents Informed</h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Parents often wish to support their children but do not know how. CLAT Navigator™ includes structured communication so families understand preparation progress, strengths and weaknesses, areas requiring support, and realistic expectations.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {differentiators.map((item) => <CheckItem key={item} text={item} />)}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
          <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#08BD80' }}>Student Journey</span>
          <h2 className="mt-2 text-2xl font-black md:text-3xl" style={{ color: '#0D1837' }}>From Confusion to Confidence</h2>
          <div className="mt-7 grid gap-3 md:grid-cols-6">
            {journey.map(([title, desc], idx) => (
              <div key={title} className="rounded-2xl border border-gray-100 bg-white p-4">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-xl text-xs font-black text-white" style={{ background: '#08BD80' }}>{idx + 1}</div>
                <h3 className="font-black" style={{ color: '#0D1837' }}>{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white py-10 md:py-14">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[1fr_0.85fr]">
            <div>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#08BD80' }}>FAQs</span>
              <h2 className="mt-2 text-2xl font-black md:text-3xl" style={{ color: '#0D1837' }}>Frequently Asked Questions</h2>
              <div className="mt-6 space-y-3">
                {faqs.map(([q, a], idx) => (
                  <details key={q} className="rounded-2xl border border-gray-100 bg-white p-5" open={idx === 0}>
                    <summary className="cursor-pointer select-none font-black" style={{ color: '#0D1837' }}>{q}</summary>
                    <p className="mt-3 text-sm leading-relaxed text-gray-500">{a}</p>
                  </details>
                ))}
              </div>
            </div>
            <div id="lead-form" className="lg:sticky lg:top-24 self-start">
              <ClatNavigatorLeadForm />
            </div>
          </div>
        </section>

        <section className="px-4 py-10 md:py-14">
          <div className="mx-auto max-w-7xl rounded-2xl p-8 md:p-10" style={{ background: 'linear-gradient(135deg,#060d1f,#0D1837)' }}>
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 className="text-2xl font-black text-white md:text-4xl">Do Not Let Preparation Become Guesswork.</h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/60">
                  The difference between an average attempt and an exceptional attempt often lies in having the right mentor. With CLAT Navigator™, you will gain clarity, consistency, accountability, and confidence throughout your CLAT journey.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="#lead-form" className="rounded-xl px-5 py-3 text-sm font-black text-white" style={{ background: '#08BD80' }}>Enroll Now</a>
                <a href="tel:8507700177" className="rounded-xl border border-white/20 px-5 py-3 text-sm font-bold text-white">Talk to a Mentor</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
