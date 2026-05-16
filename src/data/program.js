// Annie's year-long progression. 5 phases over 52 weeks. Designed around
// moderate-severe hip OA, mild L4-5 disc loss + grade 1 anterolisthesis:
// neutral spine throughout, no back extension, no deep hip flexion, no
// impact, glute-strong, balance-heavy. Walks are a separate session.
//
// SESSION_TYPES is the canonical week — 4 rings to fill: 3 strength sessions
// + 1 walk. The walk only needs one entry to fill its ring.

export const SESSION_TYPES = ['Legs', 'Upper', 'Core', 'Walk'];

export const SESSION_META = {
  Legs:  { color: 'rose',   icon: '⬇', focus: 'Legs & balance — strength to stand, walk, and not fall' },
  Upper: { color: 'violet', icon: '↑', focus: 'Upper body & grip — shoulders, arms, hands for daily tasks' },
  Core:  { color: 'amber',  icon: '◆', focus: 'Core & stretch — back-friendly stability and flexibility' },
  Walk:  { color: 'sky',    icon: '↗', focus: 'Walk outdoors — for heart, hip, bones, and mind' },
};

export const PHASES = [
  // ============ PHASE 1 — Foundation ============
  {
    id: 1,
    name: 'Foundation',
    weekRange: [1, 4],
    goal:
      'Learn each movement. Build the weekly habit. No soreness, no rushing — every session should feel ' +
      'comfortable to repeat tomorrow.',
    note:
      'Start with these reps and times exactly. If anything pinches or hurts, stop that exercise and tell ' +
      'someone. Week 4 is a "reset" — half the volume so the body catches up.',
    sessions: {
      Legs: { items: [
        { ex: 'sit-to-stand',         dose: '2 sets × 5 reps' },
        { ex: 'heel-raises',          dose: '2 sets × 8 reps' },
        { ex: 'side-leg-raise',       dose: '2 sets × 5 each side' },
        { ex: 'glute-bridge',         dose: '2 sets × 8 reps' },
        { ex: 'single-leg-balance',   dose: '2 holds × 10 sec each side' },
        { ex: 'heel-toe-walk',        dose: '10 steps' },
      ]},
      Upper: { items: [
        { ex: 'wall-pushup',          dose: '2 sets × 5 reps' },
        { ex: 'banded-row-seated',    dose: '2 sets × 8 reps (light band)' },
        { ex: 'db-biceps-curl',       dose: '2 sets × 8 reps (2 lb)' },
        { ex: 'db-lateral-raise',     dose: '2 sets × 5 reps (2 lb)' },
        { ex: 'towel-squeeze',        dose: '3 holds × 15 sec' },
        { ex: 'grip-hold-db',         dose: '2 holds × 20 sec (2 lb each hand)' },
      ]},
      Core: { items: [
        { ex: 'dead-bug',             dose: '2 sets × 5 each side' },
        { ex: 'bird-dog',             dose: '2 sets × 5 each side' },
        { ex: 'pelvic-tilt',          dose: '2 sets × 8 reps' },
        { ex: 'tall-sit-hold',        dose: '2 holds × 30 sec' },
        { ex: 'doorway-chest-stretch',dose: '2 holds × 20 sec each side' },
        { ex: 'hamstring-strap',      dose: '2 holds × 20 sec each side' },
        { ex: 'cat-cow',              dose: '8 slow reps' },
      ]},
      Walk: { items: [
        { ex: 'walk', dose: '1 walk this week, 10–15 minutes (flat path)' },
      ]},
    },
  },

  // ============ PHASE 2 — Light Load ============
  {
    id: 2,
    name: 'Light Load',
    weekRange: [5, 12],
    goal:
      'Add gentle resistance now that the movements feel familiar. The 2-pound dumbbells and the LIGHT band ' +
      'do most of the work. We add a few new movements and one extra rep per set most weeks.',
    note:
      'Weeks 5–7 build, week 8 is a reset (cut sets in half). Weeks 9–11 build, week 12 is a reset. ' +
      'Goal by end of Phase 2: 10 sit-to-stands without pause, walks 15–20 minutes.',
    sessions: {
      Legs: { items: [
        { ex: 'sit-to-stand',         dose: '3 sets × 8 reps' },
        { ex: 'heel-raises',          dose: '3 sets × 10 reps' },
        { ex: 'side-leg-raise',       dose: '3 sets × 8 each side' },
        { ex: 'glute-bridge',         dose: '3 sets × 10 reps' },
        { ex: 'clamshell',            dose: '2 sets × 10 each side' },
        { ex: 'wall-slide-squat',     dose: '2 sets × 8 reps (shallow)' },
        { ex: 'single-leg-balance',   dose: '2 holds × 15 sec each side' },
        { ex: 'tandem-stance',        dose: '2 holds × 15 sec each lead' },
      ]},
      Upper: { items: [
        { ex: 'wall-pushup',          dose: '3 sets × 8 reps' },
        { ex: 'banded-row-seated',    dose: '3 sets × 10 reps (light band)' },
        { ex: 'db-biceps-curl',       dose: '3 sets × 8 reps (2 lb)' },
        { ex: 'db-lateral-raise',     dose: '3 sets × 6 reps (2 lb)' },
        { ex: 'db-row-supported',     dose: '2 sets × 8 each side (2 lb)' },
        { ex: 'banded-face-pull',     dose: '2 sets × 10 reps (light band)' },
        { ex: 'stress-ball-squeeze',  dose: '3 sets × 15 squeezes' },
        { ex: 'wrist-curl',           dose: '2 sets × 10 reps (2 lb)' },
      ]},
      Core: { items: [
        { ex: 'dead-bug',             dose: '3 sets × 6 each side' },
        { ex: 'bird-dog',             dose: '3 sets × 6 each side' },
        { ex: 'wall-plank',           dose: '2 holds × 20 sec' },
        { ex: 'tall-sit-hold',        dose: '2 holds × 45 sec' },
        { ex: 'wall-angel',           dose: '2 sets × 8 reps' },
        { ex: 'doorway-chest-stretch',dose: '2 holds × 30 sec each side' },
        { ex: 'hamstring-strap',      dose: '2 holds × 30 sec each side' },
        { ex: 'piriformis-stretch',   dose: '2 holds × 30 sec each side' },
        { ex: 'cat-cow',              dose: '10 slow reps' },
      ]},
      Walk: { items: [
        { ex: 'walk', dose: '1+ walks this week, 15–20 minutes' },
      ]},
    },
  },

  // ============ PHASE 3 — Building ============
  {
    id: 3,
    name: 'Building',
    weekRange: [13, 24],
    goal:
      'Real strength gains. Move up to 3-pound dumbbells on most exercises and the MEDIUM band on bigger movements. ' +
      'Introduce counter push-ups (a step harder than wall push-ups).',
    note:
      'Cycle: 3 weeks build, 1 week reset. Goal by end: 15 sit-to-stands, 5 counter push-ups, ' +
      '30-second single-leg balance without holding on, walks of 25–30 minutes.',
    sessions: {
      Legs: { items: [
        { ex: 'sit-to-stand',         dose: '3 sets × 12 reps' },
        { ex: 'mini-squat',           dose: '3 sets × 10 reps' },
        { ex: 'heel-raises',          dose: '3 sets × 15 reps (one-foot if steady)' },
        { ex: 'side-leg-raise',       dose: '3 sets × 10 each side' },
        { ex: 'glute-bridge',         dose: '3 sets × 12 reps' },
        { ex: 'clamshell',            dose: '3 sets × 12 each side' },
        { ex: 'banded-hip-abduction', dose: '3 sets × 10 each side (light band)' },
        { ex: 'single-leg-balance',   dose: '3 holds × 20 sec each side (try no hands)' },
        { ex: 'heel-toe-walk',        dose: '20 steps' },
      ]},
      Upper: { items: [
        { ex: 'counter-pushup',       dose: '3 sets × 5 reps' },
        { ex: 'banded-row-seated',    dose: '3 sets × 12 (medium band)' },
        { ex: 'db-row-supported',     dose: '3 sets × 8 each side (3 lb)' },
        { ex: 'db-biceps-curl',       dose: '3 sets × 10 reps (3 lb)' },
        { ex: 'db-hammer-curl',       dose: '2 sets × 10 reps (3 lb)' },
        { ex: 'db-lateral-raise',     dose: '3 sets × 8 reps (3 lb)' },
        { ex: 'db-shoulder-press-seated', dose: '2 sets × 8 reps (3 lb)' },
        { ex: 'banded-face-pull',     dose: '3 sets × 12 (medium band)' },
        { ex: 'banded-ext-rotation',  dose: '2 sets × 12 each side (light band)' },
        { ex: 'finger-extension-band',dose: '3 sets × 12 reps' },
        { ex: 'grip-hold-db',         dose: '3 holds × 30 sec (3 lb)' },
      ]},
      Core: { items: [
        { ex: 'dead-bug',             dose: '3 sets × 8 each side' },
        { ex: 'bird-dog',             dose: '3 sets × 8 each side (3 sec hold)' },
        { ex: 'modified-plank-knees', dose: '2 holds × 20 sec' },
        { ex: 'tall-sit-hold',        dose: '2 holds × 60 sec' },
        { ex: 'wall-angel',           dose: '3 sets × 10 reps' },
        { ex: 'doorway-chest-stretch',dose: '2 holds × 30 sec each side' },
        { ex: 'hamstring-strap',      dose: '2 holds × 30 sec each side' },
        { ex: 'piriformis-stretch',   dose: '2 holds × 30 sec each side' },
        { ex: 'quad-stretch-standing',dose: '2 holds × 20 sec each side' },
        { ex: 'cat-cow',              dose: '10 slow reps' },
      ]},
      Walk: { items: [
        { ex: 'walk', dose: '2 walks this week, 25–30 minutes' },
      ]},
    },
  },

  // ============ PHASE 4 — Stronger ============
  {
    id: 4,
    name: 'Stronger',
    weekRange: [25, 40],
    goal:
      'Step up to 4-pound dumbbells where the movement allows and the HEAVY band on rows / hip work. ' +
      'Introduce knee push-ups and dumbbell carries. This is where strength becomes visible day-to-day.',
    note:
      'If 4 lb feels too heavy for shoulder raises, stay at 3 lb — that one is hard. Cycle: 3 weeks build, 1 reset.',
    sessions: {
      Legs: { items: [
        { ex: 'sit-to-stand',         dose: '3 sets × 15 reps (or hold a 3 lb dumbbell at chest)' },
        { ex: 'mini-squat',           dose: '3 sets × 12 reps (holding 3 lb DBs at sides)' },
        { ex: 'step-up-small',        dose: '3 sets × 8 each side' },
        { ex: 'heel-raises',          dose: '3 sets × 15 (one-foot if steady)' },
        { ex: 'glute-bridge',         dose: '3 sets × 15 reps' },
        { ex: 'clamshell',            dose: '3 sets × 15 each side (with light band)' },
        { ex: 'banded-hip-abduction', dose: '3 sets × 12 each side (medium band)' },
        { ex: 'single-leg-balance',   dose: '3 holds × 30 sec each side, no hands' },
        { ex: 'tandem-stance',        dose: '2 holds × 30 sec each lead, eyes closed if steady' },
      ]},
      Upper: { items: [
        { ex: 'counter-pushup',       dose: '3 sets × 8 reps' },
        { ex: 'banded-chest-press',   dose: '3 sets × 10 (medium band)' },
        { ex: 'db-row-supported',     dose: '3 sets × 10 each side (4 lb)' },
        { ex: 'banded-row-seated',    dose: '3 sets × 12 (heavy band)' },
        { ex: 'db-biceps-curl',       dose: '3 sets × 10 reps (4 lb)' },
        { ex: 'db-hammer-curl',       dose: '3 sets × 10 reps (4 lb)' },
        { ex: 'db-lateral-raise',     dose: '3 sets × 10 reps (3 lb — stay light)' },
        { ex: 'db-shoulder-press-seated', dose: '3 sets × 10 reps (3 lb)' },
        { ex: 'db-triceps-kickback',  dose: '3 sets × 10 each side (3 lb)' },
        { ex: 'banded-face-pull',     dose: '3 sets × 15 (heavy band)' },
        { ex: 'db-carry-farmer',      dose: '3 holds × 30 sec walk (4 lb each)' },
        { ex: 'grip-hold-db',         dose: '3 holds × 45 sec (4 lb)' },
        { ex: 'finger-extension-band',dose: '3 sets × 15 reps' },
      ]},
      Core: { items: [
        { ex: 'dead-bug',             dose: '3 sets × 10 each side, slow' },
        { ex: 'bird-dog',             dose: '3 sets × 10 each side (5 sec hold)' },
        { ex: 'modified-plank-knees', dose: '3 holds × 30 sec' },
        { ex: 'wall-angel',           dose: '3 sets × 12 reps' },
        { ex: 'doorway-chest-stretch',dose: '2 holds × 30 sec each side' },
        { ex: 'hamstring-strap',      dose: '2 holds × 30 sec each side' },
        { ex: 'piriformis-stretch',   dose: '2 holds × 30 sec each side' },
        { ex: 'quad-stretch-standing',dose: '2 holds × 30 sec each side' },
        { ex: 'calf-wall-stretch',    dose: '2 holds × 30 sec each side' },
        { ex: 'cat-cow',              dose: '10 slow reps' },
      ]},
      Walk: { items: [
        { ex: 'walk', dose: '2–3 walks this week, 30–40 minutes' },
      ]},
    },
  },

  // ============ PHASE 5 — Maintain ============
  {
    id: 5,
    name: 'Maintain',
    weekRange: [41, 999],
    goal:
      'The gains are made. Keep doing what works. Pick your favorites from earlier phases, mix the weights ' +
      'across the 2-3-4 lb dumbbells and light-medium-heavy bands depending on the day and the movement.',
    note:
      'Lifetime mode. Three strength sessions and one walk per week is the floor — feel free to add an extra walk or stretch session any week.',
    sessions: {
      Legs: { items: [
        { ex: 'sit-to-stand',         dose: '3 × 15, holding a dumbbell at chest if feeling strong' },
        { ex: 'mini-squat',           dose: '3 × 12 with dumbbells' },
        { ex: 'step-up-small',        dose: '3 × 10 each side' },
        { ex: 'glute-bridge',         dose: '3 × 15' },
        { ex: 'banded-hip-abduction', dose: '3 × 15 each side' },
        { ex: 'single-leg-balance',   dose: '3 × 30 sec each side, no hands' },
        { ex: 'heel-raises',          dose: '3 × 15' },
      ]},
      Upper: { items: [
        { ex: 'counter-pushup',       dose: '3 × 10 (try a knee push-up if curious)' },
        { ex: 'db-row-supported',     dose: '3 × 10 each side (4 lb)' },
        { ex: 'banded-chest-press',   dose: '3 × 12 (medium or heavy)' },
        { ex: 'db-biceps-curl',       dose: '3 × 12 (4 lb)' },
        { ex: 'db-lateral-raise',     dose: '3 × 10 (3 lb)' },
        { ex: 'db-shoulder-press-seated', dose: '3 × 10 (3 lb)' },
        { ex: 'banded-face-pull',     dose: '3 × 15 (heavy band)' },
        { ex: 'db-carry-farmer',      dose: '3 × 45 sec (4 lb each)' },
        { ex: 'grip-hold-db',         dose: '3 × 60 sec (4 lb)' },
      ]},
      Core: { items: [
        { ex: 'dead-bug',             dose: '3 × 10 each side' },
        { ex: 'bird-dog',             dose: '3 × 10 each side' },
        { ex: 'modified-plank-knees', dose: '3 × 45 sec' },
        { ex: 'wall-angel',           dose: '3 × 12' },
        { ex: 'doorway-chest-stretch',dose: '2 × 30 sec each side' },
        { ex: 'hamstring-strap',      dose: '2 × 30 sec each side' },
        { ex: 'piriformis-stretch',   dose: '2 × 30 sec each side' },
        { ex: 'cat-cow',              dose: '10 slow reps' },
      ]},
      Walk: { items: [
        { ex: 'walk', dose: '3+ walks this week, any length you enjoy' },
      ]},
    },
  },
];

export function phaseForWeek(weekNumber, override) {
  if (override != null) return PHASES.find((p) => p.id === override) || PHASES[0];
  return PHASES.find((p) => weekNumber >= p.weekRange[0] && weekNumber <= p.weekRange[1]) || PHASES[PHASES.length - 1];
}

// 4-week cycle: every 4th week is a reset (cut sets in half).
export function isResetWeek(weekNumber) {
  return weekNumber > 0 && weekNumber % 4 === 0;
}
