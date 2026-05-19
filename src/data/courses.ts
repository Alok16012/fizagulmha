export interface Course {
  slug: string;
  title: string;
  icon: string;
  color: string;
  bg: string;
  tagline: string;
  overview: string;
  duration: string;
  batchSize: string;
  mode: string;
  fee: string;
  emi: string;
  features: string[];
  includes: { label: string; value: string; icon: string }[];
  curriculum: { module: string; topics: string[] }[];
  whoFor: string[];
  testimonial: { name: string; rank: string; college: string; quote: string; avatar: string };
}

export const courses: Course[] = [
  {
    slug: 'offline',
    title: 'Offline CLAT Course',
    icon: '🏫',
    color: '#0050e0',
    bg: '#e8eeff',
    tagline: 'Classroom coaching at CLATians Patna center — India\'s leading law entrance institute',
    overview: 'Are you searching for the best offline CLAT coaching institute to ace the Common Law Admission Test (CLAT)? Look no further! CLATians, India\'s leading CLAT preparation institute, offers expert-led classroom training designed for top NLU admissions. With personalized mentorship, structured study material, and real-time mock tests, our Offline CLAT Course ensures focused, interactive learning to maximize your success. Get hands-on guidance from experienced faculty and CLAT toppers, master the CLAT syllabus with in-depth coverage, and stay ahead with our exam-oriented approach.',
    duration: '12–24 Months',
    batchSize: '20–30 Students',
    mode: 'In-person at Patna Center',
    fee: '₹95,000',
    emi: '₹8,000/month',
    features: [
      'Daily live classroom sessions 6 days a week',
      'Direct interaction with A.K. Singh & expert faculty',
      'Comprehensive printed study material included',
      'Weekly mock tests with detailed performance analysis',
      'Monthly parent-teacher meetings',
      'Dedicated doubt-clearing sessions daily',
      'Library access with law books & journals',
      'Personal attention in small batch of 20–30 students',
      'Hinglish medium for better understanding',
      'Free access to online test series',
    ],
    includes: [
      { label: 'Live Classes', value: '800+ Hours', icon: '📚' },
      { label: 'Mock Tests', value: '50+ Full Tests', icon: '📝' },
      { label: 'Study Material', value: '8 Volumes', icon: '📖' },
      { label: 'Doubt Sessions', value: 'Daily', icon: '💬' },
      { label: 'GK Updates', value: 'Weekly', icon: '📰' },
      { label: 'Faculty Access', value: '15+ Years Exp.', icon: '👨‍🏫' },
    ],
    curriculum: [
      { module: 'English Language', topics: ['Reading comprehension strategies', 'Grammar fundamentals', 'Vocabulary building', 'Speed reading techniques', 'Sentence correction'] },
      { module: 'Legal Reasoning', topics: ['Introduction to legal concepts', 'Constitutional law basics', 'Torts and contracts', 'Criminal law principles', 'Application of legal principles to passages'] },
      { module: 'Logical Reasoning', topics: ['Verbal reasoning', 'Analytical reasoning', 'Critical thinking', 'Puzzles and patterns', 'Syllogisms and deductions'] },
      { module: 'Current Affairs & GK', topics: ['Daily news coverage', 'Legal events and judgments', 'Static GK — India & World', 'International affairs', 'Monthly GK magazine'] },
      { module: 'Quantitative Techniques', topics: ['Basic arithmetic & algebra', 'Data interpretation', 'Percentage and ratios', 'Graphs and charts', 'Statistics basics'] },
      { module: 'Mock Test Practice', topics: ['Weekly sectional tests', 'Full-length CLAT mocks', 'Performance analysis sessions', 'Rank improvement strategies', 'Time management drills'] },
    ],
    whoFor: [
      'Students who prefer structured classroom environment',
      'Students based in or near Patna, Bihar',
      'Students who want direct mentorship from A.K. Singh',
      'First-time CLAT aspirants targeting 2026 & 2027',
      'Droppers seeking focused repeat preparation',
      'Students targeting top 10 NLUs',
    ],
    testimonial: {
      name: 'Aman Deep Singh',
      rank: 'AIR 23, CLAT 2024',
      college: 'NLU Delhi',
      quote: 'The offline program at CLATians gave me the structure I needed. Daily classes, mock tests, and A.K. Sir\'s mentorship kept me on track throughout the year.',
      avatar: 'AD',
    },
  },
  {
    slug: 'online',
    title: 'Online CLAT Course',
    icon: '💻',
    color: '#0050e0',
    bg: '#e8eeff',
    tagline: 'Live interactive online coaching — study from anywhere across India',
    overview: 'Looking for the best online CLAT coaching to ace the Common Law Admission Test (CLAT)? Join CLATians, India\'s leading CLAT preparation platform, offering live interactive classes, expert mentorship, structured study material, and real-time mock tests. Our Online CLAT Course ensures flexible learning, AI-driven performance analysis, and 24/7 access to study resources, helping you secure a seat in the top NLUs (National Law Universities) from the comfort of your home.',
    duration: '8–12 Months',
    batchSize: '50–100 Students',
    mode: 'Online (Live + Recorded)',
    fee: '₹15,000',
    emi: '₹2,500/month',
    features: [
      'Live interactive classes in Hinglish medium',
      'Recorded lectures available 24/7 on the app',
      'Digital study material + PDF notes',
      'Real-time mock tests with AI analytics',
      'Weekly live doubt-clearing sessions',
      'WhatsApp study group access',
      'Monthly progress reports',
      'Mobile app for on-the-go learning',
      'Premium features included',
      'AI-driven performance analysis dashboard',
    ],
    includes: [
      { label: 'Recorded Lectures', value: '600+ Hours', icon: '🎥' },
      { label: 'Live Classes', value: '200+ Hours', icon: '📡' },
      { label: 'Mock Tests', value: '150+ Tests', icon: '📝' },
      { label: 'Digital Notes', value: 'Complete PDFs', icon: '📄' },
      { label: 'Doubt Sessions', value: 'Weekly Live', icon: '💬' },
      { label: 'Validity', value: 'Till Nov 2025', icon: '📅' },
    ],
    curriculum: [
      { module: 'English Language', topics: ['Video lectures on comprehension', 'Grammar rules with examples', 'Vocabulary capsules', 'Speed reading exercises', 'Sentence correction practice'] },
      { module: 'Legal Reasoning', topics: ['Concept videos with case examples', 'Legal passage-based questions', 'Practice exercises daily', 'Live application sessions', 'Judgment analysis'] },
      { module: 'Logical Reasoning', topics: ['Puzzle solving videos', 'Daily practice sets', 'Live reasoning sessions', 'Shortcut techniques', 'Critical thinking exercises'] },
      { module: 'Current Affairs & GK', topics: ['Daily news digest PDFs', 'Weekly live current affairs class', 'Monthly GK magazine', 'Legal news analysis', 'Important judgments'] },
      { module: 'Quantitative Techniques', topics: ['Concept videos', 'DI practice sets', 'Basic math revision', 'Statistics exercises', 'Data interpretation drills'] },
      { module: 'Test Series', topics: ['AI-powered mock tests', 'Performance analytics dashboard', 'All-India rank predictor', 'Video solutions', 'Sectional tests'] },
    ],
    whoFor: [
      'Students from cities without CLATians center',
      'Students who want flexibility in study timings',
      'Class 12 students juggling board exams and CLAT',
      'Students who prefer self-paced digital learning',
      'Repeat CLAT aspirants looking for affordable coaching',
      'Students targeting CLAT 2026',
    ],
    testimonial: {
      name: 'Priya Sharma',
      rank: 'AIR 47, CLAT 2024',
      college: 'NALSAR Hyderabad',
      quote: 'The online program was perfect for me. I could study at my own pace while still getting all the guidance I needed. The live sessions with faculty were extremely helpful.',
      avatar: 'PS',
    },
  },
  {
    slug: 'mentorship',
    title: 'OLET — Other Law Entrance Tests',
    icon: '⚖️',
    color: '#0050e0',
    bg: '#e8eeff',
    tagline: 'Expert coaching for AILET, CUET-LAW, MH-CET, LSAT, AIL-LET & more',
    overview: 'At CLATians, we understand the challenges of cracking AILET, CUET-LAW, MH-CET-LAW, LSAT and AIL Entrance Exam. Our OLET (Other Law Entrance Tests) Coaching is designed to provide you with an immersive, results-driven approach to help you achieve your law school dreams. Maximize your chances of success — our expert mentors will guide you through each step of your preparation journey, ensuring that you are fully prepared to take on any challenge during your exam. With a strategic approach and a focus on exam-relevant content, CLATians helps you gain the confidence and knowledge needed to secure a seat in the top law universities.',
    duration: '10–12 Months',
    batchSize: '20 Students',
    mode: 'Offline + Online (Hybrid)',
    fee: '₹95,000',
    emi: '₹8,000/month',
    features: [
      'Covers AILET, CUET-LAW, MH-CET, LSAT, AIL-LET',
      'Dedicated faculty for each exam pattern',
      'Exam-specific study material for all law entrance tests',
      'Full-length mock tests for each exam',
      'NLU Delhi specific AILET preparation',
      'Maharashtra law college MH-CET strategy',
      'LSAT India preparation with analytical skills',
      'AIL-LET coaching for Army Institute of Law',
      'Hinglish medium for better comprehension',
      'Small batch — only 20 students',
    ],
    includes: [
      { label: 'Exams Covered', value: '5+ Exams', icon: '📋' },
      { label: 'Mock Tests', value: '80+ Full Tests', icon: '📝' },
      { label: 'Study Material', value: 'Exam-wise', icon: '📖' },
      { label: 'Doubt Sessions', value: 'Daily', icon: '💬' },
      { label: 'Batch Size', value: '20 Students', icon: '👥' },
      { label: 'Expert Faculty', value: '15+ Years', icon: '👨‍🏫' },
    ],
    curriculum: [
      { module: 'AILET Preparation', topics: ['GK & Current Affairs', 'Legal Aptitude', 'Reasoning', 'Elementary Mathematics', 'English Language', 'NLU Delhi-specific strategy'] },
      { module: 'CUET-LAW Preparation', topics: ['General Test', 'Language proficiency', 'Domain subject', 'Legal awareness', 'Section-wise strategy'] },
      { module: 'MH-CET Law Preparation', topics: ['Legal aptitude', 'General knowledge', 'Logical reasoning', 'English', 'Maharashtra-specific legal knowledge'] },
      { module: 'LSAT India Preparation', topics: ['Analytical reasoning', 'Logical reasoning', 'Reading comprehension', 'US-style legal reasoning', 'Strategy for LSAT India'] },
      { module: 'AIL-LET Preparation', topics: ['Army Institute of Law entrance', 'Legal knowledge', 'Reasoning', 'Current affairs', 'GK for defence law'] },
    ],
    whoFor: [
      'Students targeting NLU Delhi (AILET)',
      'Students targeting Maharashtra law colleges (MH-CET)',
      'Students targeting CUET-LAW universities',
      'Students targeting LSAT India universities',
      'Students targeting Army Institute of Law (AIL-LET)',
      'Students appearing in multiple law entrance exams',
    ],
    testimonial: {
      name: 'Rohan Gupta',
      rank: 'AIR 12, AILET 2024',
      college: 'NLU Delhi',
      quote: 'The OLET program covered every exam I needed. The dedicated AILET preparation was incredible — I got into NLU Delhi on my first attempt!',
      avatar: 'RG',
    },
  },
  {
    slug: 'mock-tests',
    title: 'Mock Test Series',
    icon: '📝',
    color: '#0050e0',
    bg: '#e8eeff',
    tagline: 'Offline & online mock tests — CLAT 2026 full-length practice with detailed solutions',
    overview: 'Practice with our comprehensive mock tests designed to simulate the actual CLAT exam experience and improve your performance. CLATians offers both offline (printable PDF) and online mock test series for CLAT 2026, with detailed solutions, performance analytics, and national rank predictions. Choose from our 10, 20, or 40 mock test bundles based on your preparation level.',
    duration: '12 Months Access',
    batchSize: 'Unlimited',
    mode: 'Online Platform + PDF Download',
    fee: '₹8,999',
    emi: 'One-time payment',
    features: [
      'CLAT Mock Test Series — 10, 20 or 40 Full Mocks',
      'Printable PDF format for offline practice anywhere',
      'Detailed solutions and explanations for every question',
      'No internet required for PDF tests',
      'Perfect for simulating actual CLAT exam conditions',
      'Comprehensive answer keys included',
      'Free performance report after every test',
      'Monthly GK & Legal Current Affairs updates',
      'Sectional performance analytics',
      'AI-powered performance tracking (40 Mock bundle)',
    ],
    includes: [
      { label: 'Full Mock Tests', value: 'Up to 40', icon: '📋' },
      { label: 'Sectional Tests', value: '200+', icon: '📊' },
      { label: 'Previous Papers', value: '10 Years', icon: '📅' },
      { label: 'Answer Keys', value: 'All Tests', icon: '✅' },
      { label: 'PDF Downloads', value: 'Unlimited', icon: '📥' },
      { label: 'Validity', value: '12 Months', icon: '🗓️' },
    ],
    curriculum: [
      { module: 'CLAT Mock Test Series — 10 Mocks', topics: ['10 full-length mocks based on latest CLAT pattern', 'Detailed solutions & explanations', 'Free performance report after every test', 'Ideal for early self-assessment', 'Beginner level — Easy difficulty'] },
      { module: 'CLAT Mock Test Series — 20 Mocks', topics: ['20 expertly designed mocks covering all CLAT sections', 'Monthly GK & Legal Current Affairs updates', 'Sectional performance analytics', 'Best for intermediate preparation', 'Medium difficulty level'] },
      { module: 'CLAT Mock Test Series — 40 Mocks', topics: ['40 full-length mocks for ultimate CLAT readiness', 'AI-powered performance tracking', 'All India Ranking & leaderboard', 'Free final revision tests', 'Access to exclusive topper strategy sessions'] },
      { module: 'Sectional Practice', topics: ['English Language tests', 'Legal Reasoning tests', 'Logical Reasoning tests', 'Current Affairs & GK tests', 'Quantitative Techniques tests'] },
    ],
    whoFor: [
      'Students already enrolled in offline or online coaching',
      'Self-study students who need structured test practice',
      'Students in the final 3–6 months of CLAT preparation',
      'Students wanting to check exam readiness and rank',
      'Repeat CLAT aspirants improving scores from last year',
      'Students preparing for CLAT 2026',
    ],
    testimonial: {
      name: 'Sneha Patel',
      rank: 'AIR 89, CLAT 2024',
      college: 'NLIU Bhopal',
      quote: 'The CLATians mock tests were exactly like the real exam. The detailed solutions helped me understand where I was going wrong and fix it before the actual exam.',
      avatar: 'SP',
    },
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}
