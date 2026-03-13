import Avatar3D from '../../components/three/Avatar3D'
import SpaceShooter from '../../components/three/SpaceShooter'

/**
 * CARD REGISTRY
 * ─────────────────────────────────────────────────────────────
 * Controls the CubicCarousel in the Hero section.
 * To add a new card:
 *   1. Create your component anywhere in src/
 *   2. Import it above
 *   3. Add a new entry below — the carousel auto-adapts
 * ─────────────────────────────────────────────────────────────
 */
export const CARDS = [
  {
    id: 'planet',
    label: '3D Planet',
    icon: '🪐',
    hint: 'DRAG · SCROLL ZOOM · CLICK MOONS',
    component: Avatar3D,
  },
  {
    id: 'game',
    label: 'Space Shooter',
    icon: '🚀',
    hint: 'MOUSE AIM · CLICK SHOOT · W THRUST',
    component: SpaceShooter,
  },
  // ── Add more cards here ──────────────────────────────────────
  // {
  //   id: 'my-card',
  //   label: 'My Card',
  //   icon: '🎮',
  //   hint: 'Hint text here',
  //   component: MyComponent,
  // },
]