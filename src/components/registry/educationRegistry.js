/**
 * EDUCATION REGISTRY
 * ─────────────────────────────────────────────────────────────
 * `id`          — used by projectsRegistry linkedTo
 * `certificates`— array of certificate/file entries for the
 *                 3D carousel inside each education card.
 *
 * Certificate fields:
 *   label   — display name
 *   type    — 'image' | 'pdf' | 'placeholder'
 *   url     — file URL or null (placeholder shown when null)
 *   issued  — date string
 * ─────────────────────────────────────────────────────────────
 */
export const EDUCATION = [
  {
    id: 'mca',
    degree: 'MCA',
    inst: 'Centre for Distance Education, Anna University',
    year: 'Result Pending',
    icon: '🎓',
    type: 'Masters',
    certificates: [
      { label: 'Enrollment Certificate', type: 'placeholder', url: null, issued: '2023' },
      { label: 'Marksheet Sem 1',        type: 'placeholder', url: null, issued: '2023' },
      { label: 'Marksheet Sem 2',        type: 'placeholder', url: null, issued: '2024' },
    ],
  },
  {
    id: 'bsc',
    degree: 'B.Sc. Computer Science',
    inst: 'DDGD Vaishnav College, Chennai',
    year: '2023',
    icon: '🎓',
    type: 'Bachelors',
    certificates: [
      { label: 'Degree Certificate',  type: 'placeholder', url: null, issued: '2023' },
      { label: 'Consolidated Marks',  type: 'placeholder', url: null, issued: '2023' },
      { label: 'Transfer Certificate',type: 'placeholder', url: null, issued: '2023' },
    ],
  },
  {
    id: 'fullstack-cert',
    degree: 'Certified Full Stack Developer',
    inst: 'Imarticus Learning, Chennai',
    year: '2024',
    icon: '🏅',
    type: 'Certification',
    certificates: [
      { label: 'Full Stack Certificate', type: 'placeholder', url: null, issued: 'Feb 2024' },
    ],
  },
  {
    id: 'sql-python-cert',
    degree: 'SQL & Python',
    inst: 'Imarticus Learning',
    year: '2024',
    icon: '🏅',
    type: 'Certification',
    certificates: [
      { label: 'SQL Certificate',    type: 'placeholder', url: null, issued: 'Jan 2024' },
      { label: 'Python Certificate', type: 'placeholder', url: null, issued: 'Jan 2024' },
    ],
  },
]