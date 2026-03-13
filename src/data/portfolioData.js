export const ROLES = [
  'Full Stack Developer',
  'Game Developer (Unity / Unreal)',
  'Backend Engineer',
  'React Specialist',
  'Problem Solver',
]

export const SKILLS = [
  { cat: 'Frontend',   items: ['React.js', 'HTML5', 'Tailwind CSS', 'Material UI', 'CSS3'] },
  { cat: 'Backend',    items: ['Node.js', 'Express.js', 'Strapi CMS', 'REST APIs', 'Cron Jobs'] },
  { cat: 'Databases',  items: ['PostgreSQL', 'MongoDB', 'SQL Server'] },
  { cat: 'Languages',  items: ['JavaScript', 'SQL', 'Java', 'C#'] },
  { cat: 'Game Dev',   items: ['Unreal Engine', 'Unity', 'VR Dev', 'Game Prototyping'] },
  { cat: 'Tools',      items: ['Git', 'WPF / WinForms', 'Face API', 'QR Systems'] },
]

export const EXPERIENCE = [
  {
    role: 'Full Stack Developer',
    company: 'Metayb',
    period: 'Oct 2025 – Present',
    location: 'Chennai',
    points: [
      'Customized Strapi CMS with custom controllers & transaction-safe services',
      'Built RESTful APIs for blogs, comments & nested reply threads',
      'Automated email reminders via cron jobs for user engagement',
      'Integrated Face API in React for identity verification in online quizzes',
    ],
    tags: ['React', 'Strapi', 'PostgreSQL', 'Node.js'],
    current: true,
  },
  {
    role: 'Database Administrator & C# Developer',
    company: 'Eagle Software',
    period: 'Dec 2024 – Jul 2025',
    location: 'Chennai',
    points: [
      'Optimized SQL Server queries — 40% faster on 1M+ record datasets',
      'Automated backup & recovery workflows — 85% less manual effort',
      'Built secure C# WPF/WinForms apps for government data processing',
      'Designed QR code generation & inventory tracking system',
    ],
    tags: ['C#', 'SQL Server', 'WPF', 'WinForms'],
    current: false,
  },
  {
    role: 'Software & Game Developer Intern',
    company: 'Trillion Thoughts Technologies',
    period: 'Jun 2024 – Oct 2024',
    location: 'Chennai',
    points: [
      'Built VR horror game prototype using Unreal Engine',
      'Developed reusable UI systems for rapid iteration cycles',
      'Contributed to React.js modules & Unity mini-projects',
    ],
    tags: ['Unreal Engine', 'Unity', 'React.js', 'VR'],
    current: false,
  },
  {
    role: 'Software Intern',
    company: 'TeachSub Technologies',
    period: 'May 2022 – Jun 2022',
    location: 'Chennai',
    points: [
      'Assisted migration to cloud-based SaaS / PaaS / IaaS solutions',
      'Documented workflows for smoother system adoption',
    ],
    tags: ['Cloud', 'SaaS', 'Documentation'],
    current: false,
  },
]

export const PROJECTS = [
  {
    name: "Kellogg's Superstars — Nigeria",
    type: 'Professional',
    badge: 'International Client',
    stack: ['React.js', 'Strapi', 'Node.js', 'PostgreSQL', 'Face API'],
    desc: 'Scalable CMS platform with deep Strapi customization, transaction-safe backend logic, blog & reply thread system, identity verification via Face API, and automated cron-based email reminders.',
  },
  {
    name: 'Secure QR Code Generator & Printer',
    type: 'Professional',
    badge: 'Government Deployed',
    stack: ['C#', 'WPF', 'SQL Server'],
    desc: 'Desktop application for secure QR code generation and printing, deployed in government workflows across multiple offices.',
  },
  {
    name: 'Online News Portal',
    type: 'Academic',
    badge: 'Full Stack',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    desc: 'Responsive news publishing platform with sorting, filtering, and commenting. REST APIs designed to handle high concurrent user loads efficiently.',
  },
]

export const EDUCATION = [
  {
    degree: 'MCA',
    inst: 'Centre for Distance Education, Anna University',
    year: 'Result Pending',
    icon: '🎓',
    type: 'Masters',
  },
  {
    degree: 'B.Sc. Computer Science',
    inst: 'DDGD Vaishnav College, Chennai',
    year: '2023',
    icon: '🎓',
    type: 'Bachelors',
  },
  {
    degree: 'Certified Full Stack Developer',
    inst: 'Imarticus Learning, Chennai',
    year: '2024',
    icon: '🏅',
    type: 'Certification',
  },
  {
    degree: 'SQL & Python',
    inst: 'Imarticus Learning',
    year: '2024',
    icon: '🏅',
    type: 'Certification',
  },
]

export const CONTACT_LINKS = [
  { label: 'EMAIL',         value: 'narendran061102@gmail.com',           href: 'mailto:narendran061102@gmail.com' },
  { label: 'PHONE',         value: '+91 6379954042',                      href: 'tel:+916379954042' },
  { label: 'LINKEDIN',      value: 'narendran-saravanan',                 href: 'https://in.linkedin.com/in/narendran-saravanan-32169b23b' },
  { label: 'GITHUB',        value: 'github.com/narendran',               href: 'https://github.com' },
  { label: 'ITCH.IO GAMES', value: 'narendran-s.itch.io',               href: 'https://narendran-s.itch.io' },
]

export const NAV_LINKS = ['About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact']
