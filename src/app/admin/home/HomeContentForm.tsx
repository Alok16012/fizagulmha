'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminFetch } from '@/lib/adminFetch';
import type {
  AdmissionContent,
  HomeContent,
  HomeFaqItem,
  HomeHeroSlide,
  HomeHeroStat,
  HomeRankBadge,
  SitePageBanner,
  SiteLink,
  SiteSocial,
  HomeStatCard,
  HomeTestimonial,
  HomeTopper,
} from '@/data/homeContent';
import {
  FieldGroup,
  FormActions,
  NumberInput,
  SectionCard,
  StringArrayEditor,
  TextareaInput,
  TextInput,
  Toast,
} from '@/components/admin/AdminFormHelpers';

type ToastState = { msg: string; type: 'success' | 'error' } | null;

function ColorInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="color"
        value={value || '#f77420'}
        onChange={(e) => onChange(e.target.value)}
        className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer flex-shrink-0"
      />
      <TextInput value={value || ''} onChange={onChange} placeholder="#f77420" />
    </div>
  );
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="text-sm font-bold text-red-500 hover:bg-red-50 px-3 py-2 rounded-xl">
      Remove
    </button>
  );
}

function JsonTextarea<T>({ label, value, onChange }: { label: string; value: T; onChange: (value: T) => void }) {
  const [draft, setDraft] = useState(() => JSON.stringify(value, null, 2));
  const [error, setError] = useState('');

  function applyDraft() {
    try {
      onChange(JSON.parse(draft) as T);
      setError('');
    } catch {
      setError('Invalid JSON. Fix this field before saving.');
    }
  }

  return (
    <FieldGroup label={label} hint="Advanced list editor. Keep valid JSON format.">
      <TextareaInput value={draft} onChange={setDraft} rows={8} />
      <div className="mt-2 flex items-center gap-3">
        <button type="button" onClick={applyDraft} className="text-xs font-bold px-3 py-1.5 rounded-lg text-white" style={{ background: '#0D1837' }}>
          Apply JSON
        </button>
        {error && <span className="text-xs font-semibold text-red-500">{error}</span>}
      </div>
    </FieldGroup>
  );
}

export default function HomeContentForm({ initialContent }: { initialContent: HomeContent }) {
  const router = useRouter();
  const [data, setData] = useState<HomeContent>(initialContent);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  function showToast(msg: string, type: 'success' | 'error') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  function setHero<K extends keyof HomeContent['hero']>(key: K, value: HomeContent['hero'][K]) {
    setData((current) => ({ ...current, hero: { ...current.hero, [key]: value } }));
  }

  function setCourses<K extends keyof HomeContent['courses']>(key: K, value: HomeContent['courses'][K]) {
    setData((current) => ({ ...current, courses: { ...current.courses, [key]: value } }));
  }

  function setTestimonials<K extends keyof HomeContent['testimonials']>(key: K, value: HomeContent['testimonials'][K]) {
    setData((current) => ({ ...current, testimonials: { ...current.testimonials, [key]: value } }));
  }

  function setFaq<K extends keyof HomeContent['faq']>(key: K, value: HomeContent['faq'][K]) {
    setData((current) => ({ ...current, faq: { ...current.faq, [key]: value } }));
  }

  function setPredictor<K extends keyof HomeContent['predictor']>(key: K, value: HomeContent['predictor'][K]) {
    setData((current) => ({ ...current, predictor: { ...current.predictor, [key]: value } }));
  }

  function setSite<K extends keyof HomeContent['site']>(key: K, value: HomeContent['site'][K]) {
    setData((current) => ({ ...current, site: { ...current.site, [key]: value } }));
  }

  function setAdmission(value: AdmissionContent) {
    setData((current) => ({ ...current, admission: value }));
  }

  function updateList<T>(items: T[], index: number, nextItem: T): T[] {
    return items.map((item, i) => (i === index ? nextItem : item));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await adminFetch('/api/admin/home-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const payload = await res.json().catch(() => null) as { error?: string } | null;
        throw new Error(payload?.error || 'Failed to save home content');
      }
      const saved = (await res.json()) as HomeContent;
      setData(saved);
      showToast('Home page saved!', 'success');
      router.refresh();
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Error saving home page', 'error');
    }
    setLoading(false);
  }

  const addHeroSlide = () => setHero('slides', [...data.hero.slides, {
    exam: '',
    tag: '',
    heading: '',
    highlight: '',
    sub: '',
    cta: 'Start Preparation',
    ctaLink: '#courses',
    secondaryCta: 'View Demo Class',
    secondaryCtaLink: '#demo',
    pill: '',
  }]);

  const addTopper = (key: 'toppers' | 'mobileToppers') => setHero(key, [...data.hero[key], {
    name: '',
    rank: '',
    college: '',
    avatar: '',
    color: '#f77420',
  }]);

  const addStatCard = () => setData((current) => ({
    ...current,
    stats: [...current.stats, {
      num: 0,
      suffix: '+',
      label: '',
      icon: '🏆',
      color: '#f77420',
      bg: 'linear-gradient(135deg,#fff7ed,#ffd4ba)',
      border: '#fdba74',
    }],
  }));

  const addTestimonial = () => setTestimonials('testimonials', [...data.testimonials.testimonials, {
    name: '',
    rank: '',
    college: '',
    year: '',
    avatar: '',
    color: '#f77420',
    quote: '',
    stars: 5,
  }]);

  const addBadge = () => setTestimonials('badges', [...data.testimonials.badges, {
    label: '',
    count: '',
    bg: '#fff1e8',
    color: '#c95516',
    icon: '🏛️',
  }]);

  const addFaq = () => setFaq('items', [...data.faq.items, { q: '', a: '' }]);

  return (
    <div>
      {toast && <Toast message={toast.msg} type={toast.type} />}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Home Page Content</h1>
          <p className="text-sm text-gray-500 mt-1">Update homepage text, slides, stats, testimonials, FAQ and CTA content.</p>
        </div>
        <a href="/" target="_blank" className="text-sm font-bold px-4 py-2 rounded-xl text-white" style={{ background: '#0D1837' }}>
          View Home
        </a>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-6xl">
        <SectionCard title="Global Website Settings">
          <div className="rounded-xl border border-orange-100 bg-orange-50 px-4 py-3 text-sm font-semibold text-orange-800">
            These settings update shared website items like navbar, footer, phone number, WhatsApp number, logo, social links and global CTAs.
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <FieldGroup label="Logo URL">
              <TextInput value={data.site.logoSrc} onChange={(v) => setSite('logoSrc', v)} placeholder="/logo.png" />
            </FieldGroup>
            <FieldGroup label="Logo alt text">
              <TextInput value={data.site.logoAlt} onChange={(v) => setSite('logoAlt', v)} placeholder="CLATians" />
            </FieldGroup>
            <FieldGroup label="Phone">
              <TextInput value={data.site.phone} onChange={(v) => setSite('phone', v)} placeholder="8507700177" />
            </FieldGroup>
            <FieldGroup label="WhatsApp with country code">
              <TextInput value={data.site.whatsapp} onChange={(v) => setSite('whatsapp', v)} placeholder="918507700177" />
            </FieldGroup>
            <FieldGroup label="Mobile predictor label">
              <TextInput value={data.site.mobilePredictorLabel} onChange={(v) => setSite('mobilePredictorLabel', v)} placeholder="🔮 Predictor" />
            </FieldGroup>
            <FieldGroup label="Mobile predictor link">
              <TextInput value={data.site.mobilePredictorHref} onChange={(v) => setSite('mobilePredictorHref', v)} placeholder="/college-predictor" />
            </FieldGroup>
          </div>
          <FieldGroup label="Footer desktop description">
            <TextareaInput value={data.site.footerDescription} onChange={(v) => setSite('footerDescription', v)} rows={3} />
          </FieldGroup>
          <FieldGroup label="Footer mobile description">
            <TextareaInput value={data.site.footerMobileDescription} onChange={(v) => setSite('footerMobileDescription', v)} rows={3} />
          </FieldGroup>
          <div className="grid md:grid-cols-4 gap-4">
            <FieldGroup label="Footer copyright">
              <TextInput value={data.site.footerCopyright} onChange={(v) => setSite('footerCopyright', v)} />
            </FieldGroup>
            <FieldGroup label="Footer courses title">
              <TextInput value={data.site.footerCoursesTitle} onChange={(v) => setSite('footerCoursesTitle', v)} />
            </FieldGroup>
            <FieldGroup label="Footer exams title">
              <TextInput value={data.site.footerExamsTitle} onChange={(v) => setSite('footerExamsTitle', v)} />
            </FieldGroup>
            <FieldGroup label="Footer quick links title">
              <TextInput value={data.site.footerQuickLinksTitle} onChange={(v) => setSite('footerQuickLinksTitle', v)} />
            </FieldGroup>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <JsonTextarea<SiteLink[]> label="Desktop Navbar Links" value={data.site.desktopNav} onChange={(v) => setSite('desktopNav', v)} />
            <JsonTextarea<SiteLink[]> label="Desktop CTA Buttons" value={data.site.desktopCtas} onChange={(v) => setSite('desktopCtas', v)} />
            <JsonTextarea<SiteLink[]> label="Mobile Menu Links" value={data.site.mobileMenu} onChange={(v) => setSite('mobileMenu', v)} />
            <JsonTextarea<SiteLink[]> label="Mobile Bottom Nav" value={data.site.mobileBottomNav} onChange={(v) => setSite('mobileBottomNav', v)} />
            <JsonTextarea<SiteLink[]> label="Footer Course Links" value={data.site.footerCourses} onChange={(v) => setSite('footerCourses', v)} />
            <JsonTextarea<SiteLink[]> label="Footer Exam Links" value={data.site.footerExams} onChange={(v) => setSite('footerExams', v)} />
            <JsonTextarea<SiteLink[]> label="Footer Quick Links" value={data.site.footerQuickLinks} onChange={(v) => setSite('footerQuickLinks', v)} />
            <JsonTextarea<SiteSocial[]> label="Social Links" value={data.site.socials} onChange={(v) => setSite('socials', v)} />
            <JsonTextarea<SitePageBanner[]> label="Managed Page Banners" value={data.site.pageBanners} onChange={(v) => setSite('pageBanners', v)} />
          </div>
        </SectionCard>

        <SectionCard title="Admission Page Content">
          <div className="rounded-xl border border-orange-100 bg-orange-50 px-4 py-3 text-sm font-semibold text-orange-800">
            This updates the full Admission page: hero text, live enrollment popups, form options, scholarship section, FAQs, testimonials, free resources, final CTA and mobile sticky buttons.
          </div>
          <JsonTextarea<AdmissionContent>
            label="Admission Page Full Content"
            value={data.admission}
            onChange={setAdmission}
          />
        </SectionCard>

        <SectionCard title="Hero Slides">
          <div className="grid md:grid-cols-2 gap-4">
            <FieldGroup label="Topper card title">
              <TextInput value={data.hero.toppersTitle} onChange={(v) => setHero('toppersTitle', v)} placeholder="🏆 Recent Toppers" />
            </FieldGroup>
            <FieldGroup label="Topper year badge">
              <TextInput value={data.hero.toppersYear} onChange={(v) => setHero('toppersYear', v)} placeholder="CLAT 2024" />
            </FieldGroup>
            <FieldGroup label="Prepare label">
              <TextInput value={data.hero.prepareForLabel} onChange={(v) => setHero('prepareForLabel', v)} placeholder="Prepare For" />
            </FieldGroup>
            <FieldGroup label="Counselling button">
              <TextInput value={data.hero.counsellingLabel} onChange={(v) => setHero('counsellingLabel', v)} placeholder="Get Free Counselling" />
            </FieldGroup>
            <FieldGroup label="Counselling link">
              <TextInput value={data.hero.counsellingLink} onChange={(v) => setHero('counsellingLink', v)} placeholder="/admission" />
            </FieldGroup>
          </div>

          <StringArrayEditor label="Desktop exam pills" items={data.hero.examPills} onChange={(items) => setHero('examPills', items)} placeholder="CLAT" />
          <StringArrayEditor label="Mobile exam pills" items={data.hero.mobileExamPills} onChange={(items) => setHero('mobileExamPills', items)} placeholder="MH-CET" />

          <div className="space-y-4">
            {data.hero.slides.map((slide, index) => (
              <div key={index} className="rounded-2xl border border-gray-100 p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-gray-900">Slide {index + 1}</h3>
                  <RemoveButton onClick={() => setHero('slides', data.hero.slides.filter((_, i) => i !== index))} />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {(['exam', 'pill', 'tag', 'heading', 'highlight', 'cta', 'ctaLink', 'secondaryCta', 'secondaryCtaLink'] as (keyof HomeHeroSlide)[]).map((key) => (
                    <FieldGroup key={key} label={key}>
                      <TextInput value={String(slide[key] || '')} onChange={(v) => setHero('slides', updateList(data.hero.slides, index, { ...slide, [key]: v }))} />
                    </FieldGroup>
                  ))}
                </div>
                <FieldGroup label="Sub text">
                  <TextareaInput value={slide.sub} onChange={(v) => setHero('slides', updateList(data.hero.slides, index, { ...slide, sub: v }))} rows={3} />
                </FieldGroup>
              </div>
            ))}
          </div>
          <button type="button" onClick={addHeroSlide} className="text-sm font-semibold px-3 py-2 rounded-lg border-2 border-dashed" style={{ borderColor: '#f77420', color: '#f77420' }}>
            + Add Slide
          </button>
        </SectionCard>

        <SectionCard title="Hero Stats & Toppers">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {data.hero.stats.map((stat, index) => (
              <div key={index} className="rounded-xl border border-gray-100 p-3 space-y-3">
                <FieldGroup label="Value">
                  <TextInput value={stat.val} onChange={(v) => setHero('stats', updateList(data.hero.stats, index, { ...stat, val: v }))} />
                </FieldGroup>
                <FieldGroup label="Label">
                  <TextInput value={stat.label} onChange={(v) => setHero('stats', updateList(data.hero.stats, index, { ...stat, label: v }))} />
                </FieldGroup>
                <RemoveButton onClick={() => setHero('stats', data.hero.stats.filter((_, i) => i !== index))} />
              </div>
            ))}
          </div>
          <button type="button" onClick={() => setHero('stats', [...data.hero.stats, { val: '', label: '' }])} className="text-sm font-semibold px-3 py-2 rounded-lg border-2 border-dashed" style={{ borderColor: '#f77420', color: '#f77420' }}>
            + Add Hero Stat
          </button>

          {(['toppers', 'mobileToppers'] as const).map((key) => (
            <div key={key} className="space-y-3">
              <h3 className="font-black text-gray-900">{key === 'toppers' ? 'Desktop Toppers' : 'Mobile Toppers'}</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {data.hero[key].map((topper, index) => (
                  <div key={index} className="rounded-xl border border-gray-100 p-3 space-y-3">
                    <div className="grid md:grid-cols-2 gap-3">
                      {(['name', 'rank', 'college', 'avatar'] as (keyof HomeTopper)[]).map((field) => (
                        <FieldGroup key={field} label={field}>
                          <TextInput value={String(topper[field] || '')} onChange={(v) => setHero(key, updateList(data.hero[key], index, { ...topper, [field]: v }))} />
                        </FieldGroup>
                      ))}
                      <FieldGroup label="color">
                        <ColorInput value={topper.color} onChange={(v) => setHero(key, updateList(data.hero[key], index, { ...topper, color: v }))} />
                      </FieldGroup>
                    </div>
                    <RemoveButton onClick={() => setHero(key, data.hero[key].filter((_, i) => i !== index))} />
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => addTopper(key)} className="text-sm font-semibold px-3 py-2 rounded-lg border-2 border-dashed" style={{ borderColor: '#f77420', color: '#f77420' }}>
                + Add {key === 'toppers' ? 'Desktop' : 'Mobile'} Topper
              </button>
            </div>
          ))}
        </SectionCard>

        <SectionCard title="Stats Section">
          <div className="grid md:grid-cols-2 gap-3">
            {data.stats.map((stat, index) => (
              <div key={index} className="rounded-xl border border-gray-100 p-4 space-y-3">
                <div className="flex justify-between gap-3">
                  <h3 className="font-black text-gray-900">Stat Card {index + 1}</h3>
                  <RemoveButton onClick={() => setData((current) => ({ ...current, stats: current.stats.filter((_, i) => i !== index) }))} />
                </div>
                <div className="grid md:grid-cols-3 gap-3">
                  <FieldGroup label="Number"><NumberInput value={stat.num} onChange={(v) => setData((current) => ({ ...current, stats: updateList(current.stats, index, { ...stat, num: v }) }))} /></FieldGroup>
                  <FieldGroup label="Suffix"><TextInput value={stat.suffix} onChange={(v) => setData((current) => ({ ...current, stats: updateList(current.stats, index, { ...stat, suffix: v }) }))} /></FieldGroup>
                  <FieldGroup label="Label"><TextInput value={stat.label} onChange={(v) => setData((current) => ({ ...current, stats: updateList(current.stats, index, { ...stat, label: v }) }))} /></FieldGroup>
                  <FieldGroup label="Icon"><TextInput value={stat.icon} onChange={(v) => setData((current) => ({ ...current, stats: updateList(current.stats, index, { ...stat, icon: v }) }))} /></FieldGroup>
                  <FieldGroup label="Color"><ColorInput value={stat.color} onChange={(v) => setData((current) => ({ ...current, stats: updateList(current.stats, index, { ...stat, color: v }) }))} /></FieldGroup>
                  <FieldGroup label="Border"><ColorInput value={stat.border} onChange={(v) => setData((current) => ({ ...current, stats: updateList(current.stats, index, { ...stat, border: v }) }))} /></FieldGroup>
                </div>
                <FieldGroup label="Background CSS">
                  <TextInput value={stat.bg} onChange={(v) => setData((current) => ({ ...current, stats: updateList(current.stats, index, { ...stat, bg: v }) }))} placeholder="linear-gradient(...)" />
                </FieldGroup>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <input type="checkbox" checked={Boolean(stat.isDecimal)} onChange={(e) => setData((current) => ({ ...current, stats: updateList(current.stats, index, { ...stat, isDecimal: e.target.checked }) }))} />
                  Decimal number
                </label>
              </div>
            ))}
          </div>
          <button type="button" onClick={addStatCard} className="text-sm font-semibold px-3 py-2 rounded-lg border-2 border-dashed" style={{ borderColor: '#f77420', color: '#f77420' }}>
            + Add Stat Card
          </button>
        </SectionCard>

        <SectionCard title="Courses Section Heading">
          <div className="grid md:grid-cols-2 gap-4">
            {(['eyebrow', 'title', 'mobileEyebrow', 'mobileTitle', 'seeAllLabel', 'seeAllLink'] as (keyof HomeContent['courses'])[]).map((key) => (
              <FieldGroup key={key} label={key}>
                <TextInput value={String(data.courses[key])} onChange={(v) => setCourses(key, v)} />
              </FieldGroup>
            ))}
          </div>
          <FieldGroup label="Subtitle">
            <TextareaInput value={data.courses.subtitle} onChange={(v) => setCourses('subtitle', v)} rows={3} />
          </FieldGroup>
        </SectionCard>

        <SectionCard title="Testimonials">
          <div className="grid md:grid-cols-2 gap-4">
            {(['eyebrow', 'titleLine1', 'titleLine2', 'subtitle'] as (keyof HomeContent['testimonials'])[]).map((key) => (
              <FieldGroup key={key} label={key}>
                <TextInput value={String(data.testimonials[key])} onChange={(v) => setTestimonials(key, v)} />
              </FieldGroup>
            ))}
          </div>
          <StringArrayEditor label="Stats bar items" items={data.testimonials.statsBar} onChange={(items) => setTestimonials('statsBar', items)} />
          <div className="grid md:grid-cols-2 gap-3">
            {data.testimonials.badges.map((badge, index) => (
              <div key={index} className="rounded-xl border border-gray-100 p-3 space-y-3">
                <div className="grid md:grid-cols-2 gap-3">
                  {(['icon', 'label', 'count'] as (keyof HomeRankBadge)[]).map((field) => (
                    <FieldGroup key={field} label={field}>
                      <TextInput value={String(badge[field] || '')} onChange={(v) => setTestimonials('badges', updateList(data.testimonials.badges, index, { ...badge, [field]: v }))} />
                    </FieldGroup>
                  ))}
                  <FieldGroup label="Background"><ColorInput value={badge.bg} onChange={(v) => setTestimonials('badges', updateList(data.testimonials.badges, index, { ...badge, bg: v }))} /></FieldGroup>
                  <FieldGroup label="Color"><ColorInput value={badge.color} onChange={(v) => setTestimonials('badges', updateList(data.testimonials.badges, index, { ...badge, color: v }))} /></FieldGroup>
                </div>
                <RemoveButton onClick={() => setTestimonials('badges', data.testimonials.badges.filter((_, i) => i !== index))} />
              </div>
            ))}
          </div>
          <button type="button" onClick={addBadge} className="text-sm font-semibold px-3 py-2 rounded-lg border-2 border-dashed" style={{ borderColor: '#f77420', color: '#f77420' }}>
            + Add Rank Badge
          </button>

          <div className="grid md:grid-cols-2 gap-3">
            {data.testimonials.testimonials.map((item, index) => (
              <div key={index} className="rounded-xl border border-gray-100 p-4 space-y-3">
                <div className="flex justify-between gap-3">
                  <h3 className="font-black text-gray-900">Student {index + 1}</h3>
                  <RemoveButton onClick={() => setTestimonials('testimonials', data.testimonials.testimonials.filter((_, i) => i !== index))} />
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {(['name', 'rank', 'college', 'year', 'avatar'] as (keyof HomeTestimonial)[]).map((field) => (
                    <FieldGroup key={field} label={field}>
                      <TextInput value={String(item[field] || '')} onChange={(v) => setTestimonials('testimonials', updateList(data.testimonials.testimonials, index, { ...item, [field]: v }))} />
                    </FieldGroup>
                  ))}
                  <FieldGroup label="Color"><ColorInput value={item.color} onChange={(v) => setTestimonials('testimonials', updateList(data.testimonials.testimonials, index, { ...item, color: v }))} /></FieldGroup>
                  <FieldGroup label="Stars"><NumberInput value={item.stars} onChange={(v) => setTestimonials('testimonials', updateList(data.testimonials.testimonials, index, { ...item, stars: v }))} min={1} /></FieldGroup>
                </div>
                <FieldGroup label="Quote">
                  <TextareaInput value={item.quote} onChange={(v) => setTestimonials('testimonials', updateList(data.testimonials.testimonials, index, { ...item, quote: v }))} rows={3} />
                </FieldGroup>
              </div>
            ))}
          </div>
          <button type="button" onClick={addTestimonial} className="text-sm font-semibold px-3 py-2 rounded-lg border-2 border-dashed" style={{ borderColor: '#f77420', color: '#f77420' }}>
            + Add Testimonial
          </button>
        </SectionCard>

        <SectionCard title="FAQ Section">
          <div className="grid md:grid-cols-3 gap-4">
            {(['eyebrow', 'title', 'subtitle', 'ctaIcon', 'ctaTitle', 'ctaText', 'primaryLabel', 'primaryLink', 'secondaryLabel', 'secondaryLink'] as (keyof HomeContent['faq'])[]).map((key) => (
              <FieldGroup key={key} label={key}>
                <TextInput value={String(data.faq[key])} onChange={(v) => setFaq(key, v)} />
              </FieldGroup>
            ))}
          </div>
          <div className="space-y-3">
            {data.faq.items.map((faq, index) => (
              <div key={index} className="rounded-xl border border-gray-100 p-4 space-y-3">
                <div className="flex justify-between gap-3">
                  <h3 className="font-black text-gray-900">FAQ {index + 1}</h3>
                  <RemoveButton onClick={() => setFaq('items', data.faq.items.filter((_, i) => i !== index))} />
                </div>
                <FieldGroup label="Question">
                  <TextInput value={faq.q} onChange={(v) => setFaq('items', updateList<HomeFaqItem>(data.faq.items, index, { ...faq, q: v }))} />
                </FieldGroup>
                <FieldGroup label="Answer">
                  <TextareaInput value={faq.a} onChange={(v) => setFaq('items', updateList<HomeFaqItem>(data.faq.items, index, { ...faq, a: v }))} rows={3} />
                </FieldGroup>
              </div>
            ))}
          </div>
          <button type="button" onClick={addFaq} className="text-sm font-semibold px-3 py-2 rounded-lg border-2 border-dashed" style={{ borderColor: '#f77420', color: '#f77420' }}>
            + Add FAQ
          </button>
        </SectionCard>

        <SectionCard title="Predictor & Bottom CTA">
          <div className="grid md:grid-cols-2 gap-4">
            {(['bannerTitle', 'bannerCtaLabel', 'bannerCtaLink', 'eyebrow', 'title', 'ctaLabel', 'ctaLink', 'cardIcon', 'cardTitle', 'cardBadge', 'rankLabel', 'rankPlaceholder', 'categoryLabel', 'cardButtonLabel', 'cardButtonLink', 'footnote'] as (keyof HomeContent['predictor'])[]).map((key) => (
              <FieldGroup key={key} label={key}>
                <TextInput value={String(data.predictor[key])} onChange={(v) => setPredictor(key, v)} />
              </FieldGroup>
            ))}
          </div>
          <FieldGroup label="Description">
            <TextareaInput value={data.predictor.description} onChange={(v) => setPredictor('description', v)} rows={3} />
          </FieldGroup>
          <StringArrayEditor label="Banner feature points" items={data.predictor.bannerFeatures} onChange={(items) => setPredictor('bannerFeatures', items)} />
          <StringArrayEditor label="Predictor feature points" items={data.predictor.features} onChange={(items) => setPredictor('features', items)} />
          <StringArrayEditor label="Category dropdown options" items={data.predictor.categories} onChange={(items) => setPredictor('categories', items)} />
        </SectionCard>

        <FormActions loading={loading} onCancel={() => router.push('/admin')} saveLabel="Save Home Page" />
      </form>
    </div>
  );
}
