/**
 * EXPERIENCE REGISTRY
 * ─────────────────────────────────────────────────────────────
 * `id` is used by projectsRegistry linkedTo to map projects.
 * ─────────────────────────────────────────────────────────────
 */
export const EXPERIENCE = [
  {
    id: 'metayb',
    role: 'Full Stack Developer',
    company: 'Metayb',
    period: 'Oct 2025 – Present',
    location: 'Chennai',
    current: true,
    points: [
      'Customized Strapi CMS with custom controllers & transaction-safe services',
      'Built RESTful APIs for blogs, comments & nested reply threads',
      'Automated email reminders via cron jobs for user engagement',
      'Integrated Face API in React for identity verification in online quizzes',
    ],
    tags: ['React', 'Strapi', 'PostgreSQL', 'Node.js'],
  },
  {
    id: 'eagle-software',
    role: 'Database Administrator & C# Developer',
    company: 'Eagle Software',
    period: 'Dec 2024 – Jul 2025',
    location: 'Chennai',
    current: false,
    points: [
      'Optimized SQL Server queries — 40% faster on 1M+ record datasets',
      'Automated backup & recovery workflows — 85% less manual effort',
      'Built secure C# WPF/WinForms apps for government data processing',
      'Designed QR code generation & inventory tracking system',
    ],
    tags: ['C#', 'SQL Server', 'WPF', 'WinForms'],
  },
  {
    id: 'trillion-thoughts',
    role: 'Software & Game Developer Intern',
    company: 'Trillion Thoughts Technologies',
    period: 'Jun 2024 – Oct 2024',
    location: 'Chennai',
    current: false,
    points: [
      'Built VR horror game prototype using Unreal Engine',
      'Developed reusable UI systems for rapid iteration cycles',
      'Contributed to React.js modules & Unity mini-projects',
    ],
    tags: ['Unreal Engine', 'Unity', 'React.js', 'VR'],
  },
  {
    id: 'teachsub',
    role: 'Software Intern',
    company: 'TeachSub Technologies',
    period: 'May 2022 – Jun 2022',
    location: 'Chennai',
    current: false,
    points: [
      'Assisted migration to cloud-based SaaS / PaaS / IaaS solutions',
      'Documented workflows for smoother system adoption',
    ],
    tags: ['Cloud', 'SaaS', 'Documentation'],
  },
]