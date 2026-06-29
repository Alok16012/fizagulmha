export type HomeHeroSlide = {
  exam: string;
  tag: string;
  heading: string;
  highlight: string;
  sub: string;
  cta: string;
  ctaLink: string;
  secondaryCta: string;
  secondaryCtaLink: string;
  pill: string;
};

export type HomeHeroStat = {
  val: string;
  label: string;
};

export type HomeTopper = {
  name: string;
  rank: string;
  college: string;
  avatar: string;
  color: string;
};

export type HomeHeroContent = {
  slides: HomeHeroSlide[];
  examPills: string[];
  mobileExamPills: string[];
  stats: HomeHeroStat[];
  toppers: HomeTopper[];
  mobileToppers: HomeTopper[];
  toppersTitle: string;
  toppersYear: string;
  prepareForLabel: string;
  counsellingLabel: string;
  counsellingLink: string;
};

export type HomeStatCard = {
  num: number;
  suffix: string;
  label: string;
  icon: string;
  color: string;
  bg: string;
  border: string;
  isDecimal?: boolean;
};

export type HomeCoursesHeader = {
  eyebrow: string;
  title: string;
  subtitle: string;
  mobileEyebrow: string;
  mobileTitle: string;
  seeAllLabel: string;
  seeAllLink: string;
};

export type HomeTestimonial = {
  name: string;
  rank: string;
  college: string;
  year: string;
  avatar: string;
  color: string;
  quote: string;
  stars: number;
};

export type HomeRankBadge = {
  label: string;
  count: string;
  bg: string;
  color: string;
  icon: string;
};

export type HomeTestimonialsContent = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  badges: HomeRankBadge[];
  testimonials: HomeTestimonial[];
  statsBar: string[];
};

export type HomeFaqItem = {
  q: string;
  a: string;
};

export type HomeFaqContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: HomeFaqItem[];
  ctaIcon: string;
  ctaTitle: string;
  ctaText: string;
  primaryLabel: string;
  primaryLink: string;
  secondaryLabel: string;
  secondaryLink: string;
};

export type HomePredictorContent = {
  bannerTitle: string;
  bannerFeatures: string[];
  bannerCtaLabel: string;
  bannerCtaLink: string;
  eyebrow: string;
  title: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaLink: string;
  cardIcon: string;
  cardTitle: string;
  cardBadge: string;
  rankLabel: string;
  rankPlaceholder: string;
  categoryLabel: string;
  categories: string[];
  cardButtonLabel: string;
  cardButtonLink: string;
  footnote: string;
};

export type SiteLink = {
  label: string;
  href: string;
  icon?: string;
  color?: string;
  children?: SiteLink[];
};

export type SiteSocial = {
  label: string;
  href: string;
  icon: string;
  color: string;
  bg: string;
};

export type SitePageBanner = {
  key: string;
  enabled: boolean;
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
};

export type SiteSettings = {
  logoSrc: string;
  logoAlt: string;
  phone: string;
  whatsapp: string;
  desktopNav: SiteLink[];
  mobileMenu: SiteLink[];
  mobileBottomNav: SiteLink[];
  desktopCtas: SiteLink[];
  mobilePredictorLabel: string;
  mobilePredictorHref: string;
  footerDescription: string;
  footerMobileDescription: string;
  footerCopyright: string;
  footerCoursesTitle: string;
  footerExamsTitle: string;
  footerQuickLinksTitle: string;
  footerCourses: SiteLink[];
  footerExams: SiteLink[];
  footerQuickLinks: SiteLink[];
  socials: SiteSocial[];
  pageBanners: SitePageBanner[];
};

export type HomeContent = {
  site: SiteSettings;
  hero: HomeHeroContent;
  stats: HomeStatCard[];
  courses: HomeCoursesHeader;
  testimonials: HomeTestimonialsContent;
  faq: HomeFaqContent;
  predictor: HomePredictorContent;
};

export const defaultHomeContent: HomeContent = {
  site: {
    logoSrc: '/logo.png',
    logoAlt: 'CLATians',
    phone: '8507700177',
    whatsapp: '918507700177',
    desktopNav: [
      { label: 'Home', href: '/' },
      {
        label: 'Courses',
        href: '/courses',
        children: [
          { label: '🏫 Offline Course', href: '/courses?cat=offline' },
          { label: '💻 Online Course', href: '/courses?cat=online' },
          { label: '🎯 Mentorship', href: '/courses?cat=mentorship' },
          { label: '📝 Mock Tests', href: '/courses?cat=mock' },
        ],
      },
      {
        label: 'Exams',
        href: '/exams/clat',
        children: [
          { label: '🏛️ CLAT', href: '/exams/clat' },
          { label: '⚖️ AILET', href: '/exams/ailet' },
          { label: '📍 MH-CET Law', href: '/exams/mh-cet-law' },
          { label: '🎓 CUET', href: '/exams/cuet' },
          { label: '🎖️ AIL-LET', href: '/exams/ail-let' },
          { label: '🌐 LSAT India', href: '/exams/lsat' },
        ],
      },
      { label: 'Admission', href: '/admission' },
      { label: 'The CLATians Journal', href: '/blogs' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    mobileMenu: [
      { label: 'Courses', href: '/courses', icon: '📚' },
      { label: 'Exams', href: '/exams/clat', icon: '🏛️' },
      { label: 'Admission', href: '/admission', icon: '🎓' },
      { label: 'The CLATians Journal', href: '/blogs', icon: '✍️' },
      { label: 'About', href: '/about', icon: '👥' },
      { label: 'Contact', href: '/contact', icon: '📞' },
    ],
    mobileBottomNav: [
      { label: 'Home', href: '/', icon: 'home', color: '#06b6d4' },
      { label: 'Courses', href: '/courses', icon: 'courses', color: '#8b5cf6' },
      { label: 'Exams', href: '/exams/clat', icon: 'exams', color: '#f59e0b' },
      { label: 'Admission', href: '/admission', icon: 'admission', color: '#f97316' },
      { label: 'More', href: '/about', icon: 'more', color: '#ec4899' },
    ],
    desktopCtas: [
      { label: 'College Predictor', href: '/college-predictor' },
      { label: 'Admission 2026', href: '/admission' },
    ],
    mobilePredictorLabel: '🔮 Predictor',
    mobilePredictorHref: '/college-predictor',
    footerDescription: 'Your trusted institute for CLAT, AILET, and all major law entrance exams. Expert guidance by NLU alumni and advocates.',
    footerMobileDescription: "India's #1 CLAT coaching — 1.25L+ students, 5000+ NLU selections since 2012.",
    footerCopyright: '© 2026 CLATians – All rights reserved.',
    footerCoursesTitle: 'Courses',
    footerExamsTitle: 'Exams',
    footerQuickLinksTitle: 'Quick Links',
    footerCourses: [
      { label: 'Offline Course', href: '/courses?cat=offline' },
      { label: 'Online Course', href: '/courses?cat=online' },
      { label: 'CLAT Navigator™', href: '/courses/clat-mentorship-program/clat-navigator' },
      { label: 'Mock Tests', href: '/courses?cat=mock' },
    ],
    footerExams: [
      { label: 'CLAT', href: '/exams/clat' },
      { label: 'AILET', href: '/exams/ailet' },
      { label: 'MH-CET Law', href: '/exams/mh-cet-law' },
      { label: 'CUET', href: '/exams/cuet' },
      { label: 'AIL-LET', href: '/exams/ail-let' },
      { label: 'LSAT', href: '/exams/lsat' },
    ],
    footerQuickLinks: [
      { label: 'About Us', href: '/about' },
      { label: 'Faculty', href: '/faculty' },
      { label: 'Admission', href: '/admission' },
      { label: 'The CLATians Journal', href: '/blogs' },
      { label: 'College Predictor', href: '/college-predictor' },
    ],
    socials: [
      { label: 'Facebook', href: '#', icon: 'f', color: '#1877f2', bg: 'rgba(24,119,242,0.15)' },
      { label: 'YouTube', href: '#', icon: '▶', color: '#ff0000', bg: 'rgba(255,0,0,0.12)' },
      { label: 'Instagram', href: '#', icon: '📷', color: '#e1306c', bg: 'rgba(225,48,108,0.12)' },
      { label: 'LinkedIn', href: '#', icon: 'in', color: '#0a66c2', bg: 'rgba(10,102,194,0.15)' },
    ],
    pageBanners: [
      { key: 'about', enabled: false, eyebrow: 'About CLATians', title: 'Learn, Practice, Achieve', subtitle: 'Add a custom about page announcement or intro from admin.', ctaLabel: 'Explore Courses', ctaHref: '/courses' },
      { key: 'admission', enabled: false, eyebrow: 'Admission Open', title: 'Start your CLAT journey', subtitle: 'Add a custom admission message from admin.', ctaLabel: 'Call Now', ctaHref: 'tel:8507700177' },
      { key: 'contact', enabled: false, eyebrow: 'Contact CLATians', title: 'Speak to our counsellors', subtitle: 'Add contact page instructions or offer text from admin.', ctaLabel: 'WhatsApp Us', ctaHref: 'https://wa.me/918507700177' },
      { key: 'college-predictor', enabled: false, eyebrow: 'College Predictor', title: 'Check your NLU chances', subtitle: 'Add predictor page copy from admin.', ctaLabel: 'Try Now', ctaHref: '/college-predictor' },
      { key: 'blogs', enabled: false, eyebrow: 'CLATians Journal', title: 'Latest preparation insights', subtitle: 'Add blog page intro or announcement from admin.', ctaLabel: 'View Courses', ctaHref: '/courses' },
      { key: 'faculty', enabled: false, eyebrow: 'Faculty', title: 'Meet our mentors', subtitle: 'Add faculty page intro or announcement from admin.', ctaLabel: 'Get Counselling', ctaHref: '/admission' },
    ],
  },
  hero: {
    slides: [
      {
        exam: 'CLAT 2026',
        tag: '🏛️ Gateway to Top NLUs',
        heading: 'Crack CLAT with',
        highlight: 'Expert Coaching',
        sub: 'Your gateway to top National Law Universities. Join thousands of successful CLATians who secured their dream college.',
        cta: 'Start Preparation',
        ctaLink: '#courses',
        secondaryCta: 'View Demo Class',
        secondaryCtaLink: '#demo',
        pill: 'CLAT 2026',
      },
      {
        exam: 'AILET',
        tag: '⚖️ NLU Delhi Preparation',
        heading: 'Crack AILET with',
        highlight: 'Focused Mentorship',
        sub: "Your path to NLU Delhi — one of India's most prestigious law schools. Expert guidance from NLU Alumni.",
        cta: 'Start Preparation',
        ctaLink: '#courses',
        secondaryCta: 'View Demo Class',
        secondaryCtaLink: '#demo',
        pill: 'AILET',
      },
      {
        exam: 'MH-CET Law',
        tag: '📍 Maharashtra Law Colleges',
        heading: 'Ace MH-CET with',
        highlight: 'Proven Strategies',
        sub: 'Top law colleges in Maharashtra are within your reach. Our MH-CET specialists ensure comprehensive preparation.',
        cta: 'Start Preparation',
        ctaLink: '#courses',
        secondaryCta: 'View Demo Class',
        secondaryCtaLink: '#demo',
        pill: 'MH-CET',
      },
      {
        exam: 'CUET 2026',
        tag: '🎓 Top University Entrance',
        heading: 'Prepare for CUET with',
        highlight: 'Complete Guidance',
        sub: 'Gateway to top central universities across India. Comprehensive CUET Law preparation designed for success.',
        cta: 'Start Preparation',
        ctaLink: '#courses',
        secondaryCta: 'View Demo Class',
        secondaryCtaLink: '#demo',
        pill: 'CUET',
      },
    ],
    examPills: ['CLAT', 'AILET', 'MH-CET Law', 'CUET', 'AIL-LET', 'LSAT'],
    mobileExamPills: ['CLAT', 'AILET', 'MH-CET', 'CUET', 'AIL-LET', 'LSAT'],
    stats: [
      { val: '15,000+', label: 'Students' },
      { val: '1000+', label: 'NLU Selections' },
      { val: '15+', label: 'Years Experience' },
      { val: '25+', label: 'Expert Faculty' },
    ],
    toppers: [
      { name: 'Aman Deep Singh', rank: 'AIR 23', college: 'NLU Delhi', avatar: 'AD', color: '#6366f1' },
      { name: 'Priya Sharma', rank: 'AIR 47', college: 'NALSAR', avatar: 'PS', color: '#ec4899' },
      { name: 'Rohan Gupta', rank: 'AIR 12', college: 'NLU Delhi (AILET)', avatar: 'RG', color: '#f59e0b' },
      { name: 'Kavya Reddy', rank: 'AIR 34', college: 'NALSAR', avatar: 'KR', color: '#f97316' },
    ],
    mobileToppers: [
      { name: 'Aman Deep', rank: 'AIR 23', college: 'NLU Delhi', avatar: 'AD', color: '#6366f1' },
      { name: 'Priya Sharma', rank: 'AIR 47', college: 'NALSAR', avatar: 'PS', color: '#ec4899' },
      { name: 'Rohan Gupta', rank: 'AIR 12', college: 'NLU Delhi', avatar: 'RG', color: '#f59e0b' },
      { name: 'Kavya Reddy', rank: 'AIR 34', college: 'NALSAR', avatar: 'KR', color: '#f97316' },
    ],
    toppersTitle: '🏆 Recent Toppers',
    toppersYear: 'CLAT 2024',
    prepareForLabel: 'Prepare For',
    counsellingLabel: 'Get Free Counselling',
    counsellingLink: '/admission',
  },
  stats: [
    {
      num: 15000,
      suffix: '+',
      label: 'Success Stories',
      icon: '🏆',
      color: '#2563eb',
      bg: 'linear-gradient(135deg,#eff6ff,#dbeafe)',
      border: '#bfdbfe',
    },
    {
      num: 23,
      suffix: ' NLUs',
      label: 'Top NLU Access',
      icon: '🏛️',
      color: '#ea580c',
      bg: 'linear-gradient(135deg,#fff7ed,#fed7aa)',
      border: '#fdba74',
    },
    {
      num: 25,
      suffix: '+',
      label: 'Expert Faculty',
      icon: '👨‍🏫',
      color: '#f77420',
      bg: 'linear-gradient(135deg,#fff7ed,#ffd4ba)',
      border: '#fdba74',
    },
    {
      num: 4.9,
      suffix: '/5',
      label: 'Student Trust',
      icon: '⭐',
      color: '#ca8a04',
      bg: 'linear-gradient(135deg,#fefce8,#fef08a)',
      border: '#fde047',
      isDecimal: true,
    },
  ],
  courses: {
    eyebrow: 'OUR PROGRAMS',
    title: 'Courses for Every Aspirant',
    subtitle: 'Offline, Online, Mentorship, or Mock Tests — find the right program for your CLAT journey.',
    mobileEyebrow: 'Our Programs',
    mobileTitle: 'Courses for You',
    seeAllLabel: 'See All →',
    seeAllLink: '/courses',
  },
  testimonials: {
    eyebrow: 'Student Success',
    titleLine1: '15,000+ Students',
    titleLine2: 'Trust CLATians',
    subtitle: 'Real students, real NLU selections. Their success is our greatest achievement.',
    badges: [
      { label: 'AIR 1–50', count: '47 students', bg: '#fef3c7', color: '#92400e', icon: '🥇' },
      { label: 'AIR 51–100', count: '112 students', bg: '#fff1e8', color: '#c95516', icon: '🥈' },
      { label: 'AIR 101–500', count: '389 students', bg: '#e0f2fe', color: '#0369a1', icon: '🥉' },
      { label: 'NLU Selections', count: '1,000+', bg: '#ede9fe', color: '#5b21b6', icon: '🏛️' },
    ],
    testimonials: [
      { name: 'Aman Deep Singh', rank: 'AIR 23', college: 'NLU Delhi', year: 'CLAT 2024', avatar: 'AD', color: '#6366f1', quote: "CLATians gave me the structure, mentors, and mock tests I needed. A.K. Sir's teaching of legal reasoning is absolutely unmatched.", stars: 5 },
      { name: 'Priya Sharma', rank: 'AIR 47', college: 'NALSAR Hyderabad', year: 'CLAT 2024', avatar: 'PS', color: '#ec4899', quote: 'The online program was incredibly flexible. I could study from home while still getting personalized mentorship. Mock test analytics helped me improve 40 ranks.', stars: 5 },
      { name: 'Rohan Gupta', rank: 'AIR 12', college: 'NLU Delhi', year: 'AILET 2024', avatar: 'RG', color: '#f59e0b', quote: 'AILET preparation at CLATians is top-notch. The specialized legal reasoning classes and focused GK sessions made all the difference.', stars: 5 },
      { name: 'Sneha Patel', rank: 'AIR 89', college: 'NLIU Bhopal', year: 'CLAT 2024', avatar: 'SP', color: '#14b8a6', quote: 'From a small town in Bihar to NLIU Bhopal — CLATians made my dream possible. The faculty is truly dedicated to every student.', stars: 5 },
      { name: 'Vikram Mishra', rank: 'AIR 156', college: 'GNLU Gandhinagar', year: 'CLAT 2024', avatar: 'VM', color: '#f77420', quote: "I was a dropper who had failed CLAT twice. CLATians' personalized approach completely changed my strategy. Third attempt — AIR 156.", stars: 5 },
      { name: 'Kavya Reddy', rank: 'AIR 34', college: 'NALSAR Hyderabad', year: 'CLAT 2025', avatar: 'KR', color: '#f97316', quote: 'The study material quality is exceptional. 8 volumes covering every topic in depth. Combined with daily GK sessions, I scored 98/120 in current affairs.', stars: 5 },
      { name: 'Arjun Tiwari', rank: 'AIR 67', college: 'RMLNLU Lucknow', year: 'CLAT 2024', avatar: 'AT', color: '#8b5cf6', quote: "Joined CLATians in Class 11. Two years of consistent preparation with A.K. Sir's guidance. Best decision of my life.", stars: 5 },
      { name: 'Riya Bose', rank: 'AIR 203', college: 'CNLU Patna', year: 'CLAT 2024', avatar: 'RB', color: '#ef4444', quote: 'As a girl from a small family, fees were a concern. CLATians offered scholarship which made it possible. Extremely grateful for the support.', stars: 5 },
    ],
    statsBar: ['1000+ NLU Selections', '23+ NLUs Covered', '15+ Years Track Record'],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Frequently Asked Questions',
    subtitle: 'Everything about CLAT preparation at CLATians.',
    items: [
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
        a: "Absolutely! CLATians' Foundation batch (CLAT 2027) is designed for Class 11 students. Starting early gives you more time to build concepts, attempt more mocks, and secure a top NLU rank.",
      },
    ],
    ctaIcon: '💬',
    ctaTitle: 'Still have questions?',
    ctaText: 'Free counselling for CLAT 2026 preparation.',
    primaryLabel: '📞 Call Now',
    primaryLink: 'tel:8507700177',
    secondaryLabel: '📝 Enroll Free',
    secondaryLink: '/admission',
  },
  predictor: {
    bannerTitle: 'Start your CLAT 2026 preparation today',
    bannerFeatures: [
      'Best for full-syllabus preparation',
      'Live & recorded online classes',
      'Curated by expert faculty',
    ],
    bannerCtaLabel: 'View All Courses →',
    bannerCtaLink: '/courses/offline',
    eyebrow: 'AI-Powered Tool',
    title: 'NLU College Predictor',
    description: 'Enter your expected CLAT rank and get instant admission chances across all 23 NLUs. Based on previous year cutoffs and category-wise seat data.',
    features: [
      'Predict chances for all 23 NLUs',
      'Category-wise seat availability',
      'Previous year cutoff analysis',
      'Updated with CLAT 2025 data',
    ],
    ctaLabel: '🔮 Try Predictor Free →',
    ctaLink: '/college-predictor',
    cardIcon: '🔮',
    cardTitle: 'College Predictor',
    cardBadge: 'AI-Powered',
    rankLabel: 'Expected CLAT Rank',
    rankPlaceholder: 'e.g. 500',
    categoryLabel: 'Category',
    categories: ['General', 'SC', 'ST', 'OBC', 'PWD'],
    cardButtonLabel: '🔍 Predict My College',
    cardButtonLink: '/college-predictor',
    footnote: 'Based on CLAT 2024 & 2025 cutoff data — 23 NLUs covered',
  },
};
