/**
 * ASSETS REGISTRY
 * ─────────────────────────────────────────────────────────────
 * All asset imports live HERE only.
 * Other registries import from this file — keeping them clean.
 *
 * Usage in other registries:
 *   import { ASSETS } from './assetsRegistry'
 *   ...
 *   url: ASSETS.certs.sqlCert
 *
 * To add a new asset:
 *   1. Drop the file in the appropriate src/assets/ subfolder
 *   2. Import it below
 *   3. Add it to the ASSETS object under the right category
 * ─────────────────────────────────────────────────────────────
 */

// ── Certificates ──────────────────────────────────────────────
// import sqlCert        from '../assets/certificates/sql-cert.png'
// import pythonCert     from '../assets/certificates/python-cert.png'
// import fullstackCert  from '../assets/certificates/fullstack-cert.png'
// import degreeCert     from '../assets/certificates/degree-cert.png'
// import consolidatedMarks from '../assets/certificates/consolidated-marks.pdf'

// ── Profile / Hero ────────────────────────────────────────────
// import profilePhoto   from '../assets/profile/narendran.jpg'

// ── Project screenshots ───────────────────────────────────────
// import kelloggsBanner from '../assets/projects/kelloggs.png'
// import qrAppBanner    from '../assets/projects/qr-app.png'
// import newsPortalBanner from '../assets/projects/news-portal.png'

export const ASSETS = {
  certs: {
    // sqlCert,
    // pythonCert,
    // fullstackCert,
    // degreeCert,
    // consolidatedMarks,
  },
  profile: {
    // profilePhoto,
  },
  projects: {
    // kelloggsBanner,
    // qrAppBanner,
    // newsPortalBanner,
  },
}