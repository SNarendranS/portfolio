/**
 * PROJECTS REGISTRY
 * ─────────────────────────────────────────────────────────────
 * Fields:
 *   name, type, badge, stack[], desc
 *   github   — repo URL or null
 *   live     — live/demo URL or null
 *   linkedTo — { kind: 'experience'|'education', id } or null
 *
 * To link a project, set linkedTo.id to match the `id` field
 * in experienceRegistry or educationRegistry.
 * ─────────────────────────────────────────────────────────────
 */
export const PROJECTS = [
  {
    id: 'kelloggs',
    name: "Kellogg's Superstars — Nigeria",
    type: 'Professional',
    badge: 'International Client',
    stack: ['React.js', 'Strapi', 'Node.js', 'PostgreSQL', 'Face API'],
    desc: 'Scalable CMS platform with deep Strapi customization, transaction-safe backend logic, blog & reply thread system, identity verification via Face API, and automated cron-based email reminders.',
    github: null,
    live: null,
    linkedTo: { kind: 'experience', id: 'metayb' },
  },
  {
    id: 'qr-generator',
    name: 'Secure QR Code Generator & Printer',
    type: 'Professional',
    badge: 'Government Deployed',
    stack: ['C#', 'WPF', 'SQL Server'],
    desc: 'Desktop application for secure QR code generation and printing, deployed in government workflows across multiple offices.',
    github: null,
    live: null,
    linkedTo: { kind: 'experience', id: 'eagle-software' },
  },
  {
    id: 'news-portal',
    name: 'Online News Portal',
    type: 'Academic',
    badge: 'Full Stack',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    desc: 'Responsive news publishing platform with sorting, filtering, and commenting. REST APIs designed to handle high concurrent user loads efficiently.',
    github: null,
    live: null,
    linkedTo: null,
  },
]