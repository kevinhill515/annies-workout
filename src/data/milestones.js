// Strength milestones for Annie — replaces the "skill ladders" idea from
// the calisthenics app. Each milestone is a measurable thing she can do.
// Best-ever values are pulled from her logs by exerciseId.

export const MILESTONES = [
  {
    id: 'sit-to-stand',
    name: 'Sit-to-stand',
    color: 'rose',
    why: 'The single best test of leg strength as we age. Strong sit-to-stand = independent living.',
    levels: [
      { exerciseId: 'sit-to-stand', label: '5 reps in a row',  target: 5,  unit: 'rep' },
      { exerciseId: 'sit-to-stand', label: '10 reps in a row', target: 10, unit: 'rep' },
      { exerciseId: 'sit-to-stand', label: '15 reps in a row', target: 15, unit: 'rep' },
      { exerciseId: 'sit-to-stand', label: '20 reps in a row', target: 20, unit: 'rep' },
      { exerciseId: 'sit-to-stand', label: '25 reps in a row', target: 25, unit: 'rep' },
    ],
  },
  {
    id: 'wall-pushup',
    name: 'Push-up',
    color: 'violet',
    why: 'Builds upper-body push strength — opening doors, getting up off the floor, pushing a vacuum.',
    levels: [
      { exerciseId: 'wall-pushup',    label: 'Wall · 5 reps',     target: 5,  unit: 'rep' },
      { exerciseId: 'wall-pushup',    label: 'Wall · 10 reps',    target: 10, unit: 'rep' },
      { exerciseId: 'counter-pushup', label: 'Counter · 5 reps',  target: 5,  unit: 'rep' },
      { exerciseId: 'counter-pushup', label: 'Counter · 10 reps', target: 10, unit: 'rep' },
    ],
  },
  {
    id: 'balance',
    name: 'Single-leg balance',
    color: 'sky',
    why: 'Better balance = lower fall risk. The single biggest factor in healthy aging.',
    levels: [
      { exerciseId: 'single-leg-balance', label: '10 sec with chair',  target: 10, unit: 'sec' },
      { exerciseId: 'single-leg-balance', label: '20 sec with chair',  target: 20, unit: 'sec' },
      { exerciseId: 'single-leg-balance', label: '15 sec, no hands',   target: 15, unit: 'sec' },
      { exerciseId: 'single-leg-balance', label: '30 sec, no hands',   target: 30, unit: 'sec' },
      { exerciseId: 'single-leg-balance', label: '60 sec, no hands',   target: 60, unit: 'sec' },
    ],
  },
  {
    id: 'grip',
    name: 'Grip strength',
    color: 'amber',
    why: 'The most important muscle for catching a fall — and a strong predictor of overall health.',
    levels: [
      { exerciseId: 'grip-hold-db', label: 'Hold 2 lb DBs · 20 sec', target: 20, unit: 'sec' },
      { exerciseId: 'grip-hold-db', label: 'Hold 3 lb DBs · 30 sec', target: 30, unit: 'sec' },
      { exerciseId: 'grip-hold-db', label: 'Hold 4 lb DBs · 45 sec', target: 45, unit: 'sec' },
      { exerciseId: 'grip-hold-db', label: 'Hold 4 lb DBs · 60 sec', target: 60, unit: 'sec' },
    ],
  },
  {
    id: 'glute-bridge',
    name: 'Glute bridge',
    color: 'emerald',
    why: 'Strong glutes protect both the hips and the lower back. This is the most important exercise on the list.',
    levels: [
      { exerciseId: 'glute-bridge', label: '8 reps',  target: 8,  unit: 'rep' },
      { exerciseId: 'glute-bridge', label: '12 reps', target: 12, unit: 'rep' },
      { exerciseId: 'glute-bridge', label: '15 reps', target: 15, unit: 'rep' },
      { exerciseId: 'glute-bridge', label: '20 reps', target: 20, unit: 'rep' },
    ],
  },
  {
    id: 'plank',
    name: 'Plank hold',
    color: 'orange',
    why: 'Total-body stability. Builds a strong torso that protects your back during everyday tasks.',
    levels: [
      { exerciseId: 'wall-plank',           label: 'Wall · 30 sec',  target: 30, unit: 'sec' },
      { exerciseId: 'modified-plank-knees', label: 'Knees · 20 sec', target: 20, unit: 'sec' },
      { exerciseId: 'modified-plank-knees', label: 'Knees · 30 sec', target: 30, unit: 'sec' },
      { exerciseId: 'modified-plank-knees', label: 'Knees · 60 sec', target: 60, unit: 'sec' },
    ],
  },
];
