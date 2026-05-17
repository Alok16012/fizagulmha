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
    title: 'Offline Course',
    icon: '🏫',
    color: '#06b6d4',
    bg: '#e0f9ff',
    tagline: 'Classroom learning at CLATians Patna center',
    overview: 'Our flagship offline classroom program at Patna is designed for students who thrive in a structured, face-to-face learning environment. With daily classes, direct faculty interaction, peer learning, and a disciplined study schedule, this is the most comprehensive CLAT preparation program available.',
    duration: '12 Months',
    batchSize: '30 Students',
    mode: 'In-person at Patna Center',
    fee: '₹75,000',
    emi: '₹6,250/month',
    features: [
      'Daily 4-hour live classes 6 days a week',
      'Direct interaction with expert faculty',
      'Comprehensive printed study material',
      'Weekly mock tests with detailed analysis',
      'Monthly parent-teacher meetings',
      'Dedicated doubt-clearing sessions',
      'Library access with law books & journals',
      'Personal attention in small batch size',
    ],
    includes: [
      { label: 'Live Classes', value: '800+ Hours', icon: '📚' },
      { label: 'Mock Tests', value: '50+ Full Tests', icon: '📝' },
      { label: 'Study Material', value: '8 Volumes', icon: '📖' },
      { label: 'Doubt Sessions', value: 'Daily', icon: '💬' },
      { label: 'GK Updates', value: 'Weekly', icon: '📰' },
      { label: 'Faculty Access', value: '20+ Experts', icon: '👨‍🏫' },
    ],
    curriculum: [
      { module: 'English Language', topics: ['Reading comprehension strategies', 'Grammar fundamentals', 'Vocabulary building', 'Speed reading techniques'] },
      { module: 'Legal Reasoning', topics: ['Introduction to legal concepts', 'Constitutional law', 'Torts and contracts', 'Criminal law basics', 'Application of legal principles'] },
      { module: 'Logical Reasoning', topics: ['Verbal reasoning', 'Analytical reasoning', 'Critical thinking', 'Puzzles and patterns', 'Syllogisms'] },
      { module: 'Current Affairs & GK', topics: ['Daily news coverage', 'Legal news analysis', 'Static GK', 'International affairs', 'Monthly GK magazine'] },
      { module: 'Quantitative Techniques', topics: ['Basic arithmetic', 'Data interpretation', 'Statistics', 'Percentage and ratios', 'Graphs and charts'] },
      { module: 'Mock Test Practice', topics: ['Weekly sectional tests', 'Full-length mock tests', 'Analysis sessions', 'Rank improvement strategies', 'Time management'] },
    ],
    whoFor: [
      'Students who prefer classroom environment',
      'Students based in or near Patna',
      'Students who want direct faculty guidance',
      'Students who need structured study schedule',
      'First-time CLAT aspirants',
    ],
    testimonial: {
      name: 'Aman Deep Singh',
      rank: 'AIR 23, CLAT 2024',
      college: 'NLU Delhi',
      quote: 'The offline program gave me the structure I needed. Daily classes and mock tests kept me on track throughout the year.',
      avatar: 'AD',
    },
  },
  {
    slug: 'online',
    title: 'Online Course',
    icon: '💻',
    color: '#818cf8',
    bg: '#eef2ff',
    tagline: 'Study from anywhere with live + recorded classes',
    overview: 'Our comprehensive online program brings the CLATians experience to your doorstep. With a blend of recorded lectures and live interactive sessions, students across India can access the same quality preparation as our offline students. Full digital access to study materials, tests, and mentor support is included.',
    duration: '12 Months',
    batchSize: '100 Students',
    mode: 'Online (Live + Recorded)',
    fee: '₹45,000',
    emi: '₹3,750/month',
    features: [
      'Live classes 5 days a week (2 hours each)',
      'Recorded lectures available 24/7',
      'Digital study material + PDF notes',
      '150+ online mock tests with AI analytics',
      'Weekly live doubt-clearing sessions',
      'WhatsApp study group access',
      'Monthly progress report',
      'Mobile app access for on-the-go learning',
    ],
    includes: [
      { label: 'Recorded Lectures', value: '600+ Hours', icon: '🎥' },
      { label: 'Live Classes', value: '200+ Hours', icon: '📡' },
      { label: 'Mock Tests', value: '150+ Tests', icon: '📝' },
      { label: 'Digital Notes', value: 'Complete PDFs', icon: '📄' },
      { label: 'Doubt Sessions', value: 'Weekly Live', icon: '💬' },
      { label: 'Validity', value: '15 Months', icon: '📅' },
    ],
    curriculum: [
      { module: 'English Language', topics: ['Video lectures on comprehension', 'Grammar rules explained', 'Vocabulary capsules', 'Speed reading exercises'] },
      { module: 'Legal Reasoning', topics: ['Concept videos with examples', 'Case-based questions', 'Practice exercises', 'Live application sessions'] },
      { module: 'Logical Reasoning', topics: ['Puzzle solving videos', 'Daily practice sets', 'Live reasoning sessions', 'Shortcut techniques'] },
      { module: 'Current Affairs & GK', topics: ['Daily news digest PDFs', 'Weekly live current affairs class', 'Monthly magazine', 'Legal news analysis'] },
      { module: 'Quantitative Techniques', topics: ['Concept videos', 'DI practice sets', 'Basic math revision', 'Statistics exercises'] },
      { module: 'Test Series', topics: ['AI-powered mock tests', 'Performance analytics dashboard', 'Rank predictor', 'Video solutions'] },
    ],
    whoFor: [
      'Students from cities without CLATians center',
      'Students who want flexibility in study timings',
      'Working students or those in Class 12',
      'Students who prefer self-paced learning',
      'Students repeating CLAT preparation',
    ],
    testimonial: {
      name: 'Priya Sharma',
      rank: 'AIR 47, CLAT 2024',
      college: 'NALSAR Hyderabad',
      quote: 'The online program was perfect for me. I could study at my own pace while still getting all the guidance I needed from mentors.',
      avatar: 'PS',
    },
  },
  {
    slug: 'mentorship',
    title: 'Mentorship Program',
    icon: '🎯',
    color: '#34d399',
    bg: '#ecfdf5',
    tagline: '1-on-1 personalized guidance from NLU toppers',
    overview: 'Our exclusive Mentorship Program pairs you with a dedicated NLU topper or experienced CLATian mentor for completely personalized CLAT preparation. Unlike group classes, this is a tailored program built around your unique strengths, weaknesses, and learning style.',
    duration: '6-12 Months',
    batchSize: '1-on-1',
    mode: 'Online (Private Sessions)',
    fee: '₹1,20,000',
    emi: '₹10,000/month',
    features: [
      'Dedicated personal mentor (NLU topper/alumni)',
      'Custom study plan based on your assessment',
      'Weekly 1-on-1 video sessions',
      'Unlimited WhatsApp/chat access to mentor',
      'Personalized mock test analysis',
      'Interview preparation for NLU admission',
      'College selection guidance',
      'Scholarship application assistance',
    ],
    includes: [
      { label: 'Personal Mentor', value: 'NLU Topper', icon: '🧑‍💼' },
      { label: '1-on-1 Sessions', value: '48 Sessions', icon: '🎯' },
      { label: 'Study Plan', value: 'Custom Made', icon: '📋' },
      { label: 'Chat Support', value: 'Unlimited', icon: '💬' },
      { label: 'Mock Analysis', value: 'Every Test', icon: '📊' },
      { label: 'Interview Prep', value: 'Included', icon: '🎤' },
    ],
    curriculum: [
      { module: 'Initial Assessment', topics: ['Strength & weakness analysis', 'Learning style assessment', 'Custom study plan creation', 'Target college selection'] },
      { module: 'Subject Mastery', topics: ['Section-wise focused sessions', 'Concept building', 'Application practice', 'Weekly progress review'] },
      { module: 'Mock Test Strategy', topics: ['Test-taking strategy', 'Time management', 'Attempting difficult questions', 'Accuracy improvement'] },
      { module: 'Rank Improvement', topics: ['Targeted weak area work', 'Score prediction', 'Last-mile preparation', 'Revision strategy'] },
      { module: 'College Guidance', topics: ['NLU selection based on rank', 'Branch preferences', 'Scholarship opportunities', 'Interview skills'] },
    ],
    whoFor: [
      'Students who want personalized attention',
      'Students with specific weak areas to target',
      'Repeat CLAT aspirants looking for a new approach',
      'Students aiming for top 100 ranks',
      'Students with inconsistent mock test performance',
    ],
    testimonial: {
      name: 'Rohan Gupta',
      rank: 'AIR 12, AILET 2024',
      college: 'NLU Delhi',
      quote: 'My mentor helped me identify my exact weak points. The personalized sessions made all the difference — I jumped from rank 200 to AIR 12!',
      avatar: 'RG',
    },
  },
  {
    slug: 'mock-tests',
    title: 'Mock Test Series',
    icon: '📝',
    color: '#fb923c',
    bg: '#fff7ed',
    tagline: '150+ full-length tests with AI analytics & rank prediction',
    overview: 'The CLATians Mock Test Series is India\'s most comprehensive CLAT mock test platform. With 150+ full-length tests, sectional tests, and previous year papers — all with detailed AI-powered analytics and all-India rank predictor — this is the complete testing solution for serious CLAT aspirants.',
    duration: '12 Months Access',
    batchSize: 'Unlimited',
    mode: 'Online Platform + App',
    fee: '₹8,999',
    emi: 'One-time or 3 months',
    features: [
      '150+ full-length CLAT mock tests',
      '500+ sectional practice tests',
      'Previous year papers (2010-2025)',
      'AI-powered performance analytics',
      'All-India rank predictor',
      'Detailed video solutions for every question',
      'Section-wise time management analysis',
      'Weak area identification & improvement tips',
    ],
    includes: [
      { label: 'Full Mock Tests', value: '150+', icon: '📋' },
      { label: 'Sectional Tests', value: '500+', icon: '📊' },
      { label: 'Previous Papers', value: '15 Years', icon: '📅' },
      { label: 'Video Solutions', value: 'All Questions', icon: '🎥' },
      { label: 'AI Analytics', value: 'Real-time', icon: '🤖' },
      { label: 'Validity', value: '12 Months', icon: '🗓️' },
    ],
    curriculum: [
      { module: 'Full-Length Tests', topics: ['CLAT pattern tests', 'AILET pattern tests', 'MH-CET pattern tests', 'CUET pattern tests', 'Previous year exact papers'] },
      { module: 'Sectional Tests', topics: ['English language', 'Legal reasoning', 'Logical reasoning', 'Current affairs & GK', 'Quantitative techniques'] },
      { module: 'Analytics Dashboard', topics: ['Score tracking over time', 'Section-wise performance', 'Time per question analysis', 'Accuracy rate tracking', 'Comparison with toppers'] },
      { module: 'Improvement Tools', topics: ['Weak area diagnosis', 'Personalized practice sets', 'Rank improvement tips', 'Study schedule suggestions'] },
    ],
    whoFor: [
      'Students already enrolled in offline/online coaching',
      'Self-study students who need test practice',
      'Students in final preparation phase',
      'Students who want to check their exam readiness',
      'Repeat aspirants improving from last year',
    ],
    testimonial: {
      name: 'Sneha Patel',
      rank: 'AIR 89, CLAT 2024',
      college: 'NLIU Bhopal',
      quote: 'The mock test analytics showed me exactly where I was losing marks. After focusing on those areas, my rank jumped dramatically in the final exam.',
      avatar: 'SP',
    },
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}
