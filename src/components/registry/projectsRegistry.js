/**
 * PROJECTS REGISTRY
 * ─────────────────────────────────────────────────────────────
 * Each entry = one project card.
 * Fields: name, type, badge, stack[], desc
 * ─────────────────────────────────────────────────────────────
 */
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