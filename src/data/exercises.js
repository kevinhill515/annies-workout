// Exercise dictionary for Annie. Each entry has a clear how-to written
// for someone with no gym background, plus a "safety" note tailored to
// her conditions (hip OA, L4-L5 grade 1 anterolisthesis, mild disc
// height loss). No YouTube links — descriptions are enough.

export const EXERCISES = {
  // ===================== LEGS =====================
  'sit-to-stand': {
    name: 'Sit-to-stand',
    cue:
      'Sit on the front half of a sturdy chair, feet flat on the floor, knees over ankles. ' +
      'Lean forward slightly so your nose moves over your toes, then push through your heels to stand up tall. ' +
      'Squeeze your bottom at the top. Sit back down slowly under control — don\'t flop.',
    safety:
      'Keep your chest up and your back gently long. Don\'t let your knees cave inward. ' +
      'If you feel pinching in the front of your hip, stop a little higher (don\'t sit fully).',
  },
  'heel-raises': {
    name: 'Heel raises',
    cue:
      'Stand tall behind a sturdy chair with hands resting on the back. Press up onto the balls of your feet, ' +
      'lifting your heels as high as feels comfortable. Pause for one second. Lower slowly to the floor.',
    safety:
      'Use the chair only for balance — let your calves do the work. ' +
      'Keep your knees soft (not locked).',
  },
  'side-leg-raise': {
    name: 'Side leg raise (standing)',
    cue:
      'Stand tall behind a sturdy chair, hands resting on the back. Lift one leg straight out to the side, ' +
      'leading with the heel. Only go as high as you can without tilting your upper body. Lower slowly. Switch sides.',
    safety:
      'Keep your toes pointing forward (not up). Stop if you feel pinching in the hip. ' +
      'Body should stay tall — don\'t lean to the other side.',
  },
  'glute-bridge': {
    name: 'Glute bridge',
    cue:
      'Lie on your back, knees bent, feet flat on the floor about hip-width apart. ' +
      'Push through your heels to lift your hips toward the ceiling, squeezing your bottom. ' +
      'Your body should make a straight line from knees to shoulders. Lower slowly.',
    safety:
      'Don\'t arch your lower back at the top — stop when your hips are level with your knees. ' +
      'This is one of the safest exercises for your back and one of the best for your hips.',
  },
  'clamshell': {
    name: 'Clamshell (side-lying)',
    cue:
      'Lie on your side, knees bent in front of you (like sitting in a chair on your side), heels stacked. ' +
      'Keeping your feet together, lift your top knee toward the ceiling. Lower slowly. Switch sides.',
    safety:
      'Don\'t let your hips roll backward as you lift the knee — only the leg moves. ' +
      'Great for the side glutes that help prevent hip pain.',
  },
  'single-leg-balance': {
    name: 'Single-leg balance',
    cue:
      'Stand tall next to a sturdy chair or counter, fingertips resting lightly for support. ' +
      'Shift your weight onto one foot, lift the other foot just an inch off the floor. ' +
      'Hold. Lower and switch.',
    safety:
      'Eyes forward, not down. Use as little support as you need. ' +
      'If you feel steady, let go of the chair for a few seconds — but keep it within reach.',
  },
  'tandem-stance': {
    name: 'Heel-to-toe stand',
    cue:
      'Stand next to a sturdy chair. Place one foot directly in front of the other so the heel of the front foot ' +
      'touches the toes of the back foot. Hold. Switch feet.',
    safety:
      'Keep one hand on the chair until you\'re steady. Stare at a fixed point straight ahead.',
  },
  'heel-toe-walk': {
    name: 'Heel-to-toe walk',
    cue:
      'Walk forward in a straight line, placing the heel of each step directly in front of the toes of your other foot. ' +
      'Like walking a tightrope. Use a wall or counter beside you for safety.',
    safety:
      'Eyes forward, not on your feet. Start with 5–10 steps and build up.',
  },
  'wall-slide-squat': {
    name: 'Wall slide squat',
    cue:
      'Stand with your back against a wall, feet about 12 inches in front of you, hip-width apart. ' +
      'Slowly slide down the wall a few inches, as if starting to sit. Hold. Slide back up.',
    safety:
      'Go only as deep as feels comfortable — never more than about a quarter of the way down. ' +
      'Keep your knees behind your toes.',
  },
  'marching-in-place': {
    name: 'Marching in place',
    cue:
      'Stand tall, hands on a chair if needed. Lift one knee toward your waist (only as high as comfortable, ' +
      'not higher than 90°), then lower. Alternate.',
    safety:
      'Don\'t force the knee high — your hip will thank you. Keep your spine tall, don\'t lean back as the leg comes up.',
  },
  'mini-squat': {
    name: 'Mini squat',
    cue:
      'Stand tall behind a chair, hands lightly on the back. Push your hips back as if sitting into a chair, ' +
      'and bend your knees a few inches. Stand back up by pushing through your heels.',
    safety:
      'Shallow only — stop at a depth that feels easy. Knees track over middle toes. Chest stays up.',
  },
  'banded-hip-abduction': {
    name: 'Banded hip abduction',
    cue:
      'Place a resistance band around your thighs just above the knees. ' +
      'Stand tall with knees slightly bent. Press one knee out against the band, keeping foot flat. Slow back to start. Switch sides.',
    safety:
      'Don\'t let your upper body sway — make the glute do the work, not the lean. ' +
      'Use light band first.',
  },
  'step-up-small': {
    name: 'Step-up (small)',
    cue:
      'Stand in front of a low step (about 4 inches). Step up with one foot, bring the other up, then step back down. ' +
      'Lead with the same foot for a set of reps, then switch.',
    safety:
      'Hold a railing if possible. Keep the step LOW for your hips — no higher than 4 inches starting out. ' +
      'Step down softly, not heavily.',
  },

  // ===================== UPPER =====================
  'wall-pushup': {
    name: 'Wall push-up',
    cue:
      'Stand facing a wall, an arm\'s length away. Place your palms flat on the wall at chest height, shoulder-width apart. ' +
      'Slowly bend your elbows to bring your chest toward the wall. Push back to straight arms.',
    safety:
      'Keep your body in a straight line from heels to head — don\'t let your hips sag or stick out. ' +
      'Make it easier by standing closer to the wall, harder by stepping farther back.',
  },
  'counter-pushup': {
    name: 'Counter push-up',
    cue:
      'Place your hands shoulder-width on a sturdy counter or table edge. Step your feet back so your body is on a slant. ' +
      'Bend your elbows to lower your chest toward the counter. Push back up.',
    safety:
      'Keep a straight line from heels to head — engage your belly to keep your hips from sagging. ' +
      'The lower the surface, the harder it gets.',
  },
  'db-biceps-curl': {
    name: 'Dumbbell biceps curl',
    cue:
      'Stand or sit tall holding a dumbbell in each hand, arms at your sides, palms facing forward. ' +
      'Bend your elbows to curl the weights up toward your shoulders. Lower slowly.',
    safety:
      'Keep elbows pinned at your sides — don\'t let them swing forward. Don\'t arch your back.',
  },
  'db-hammer-curl': {
    name: 'Dumbbell hammer curl',
    cue:
      'Same as a regular curl, but hold the dumbbells with palms facing each other (thumbs up) the whole way. ' +
      'Curl up, slow down.',
    safety:
      'Same as a regular curl. Builds grip strength too.',
  },
  'db-lateral-raise': {
    name: 'Dumbbell side raise',
    cue:
      'Stand or sit tall, dumbbell in each hand, arms at your sides. ' +
      'Keeping your arms nearly straight, lift them out to the sides until your hands are at shoulder height. ' +
      'Lower slowly.',
    safety:
      'Lead with your elbows, not your hands. Don\'t lift higher than shoulder height. ' +
      'Lighter is better — quality over quantity.',
  },
  'db-shoulder-press-seated': {
    name: 'Dumbbell shoulder press (seated)',
    cue:
      'Sit in a sturdy chair with a back. Hold a dumbbell in each hand at shoulder height, palms facing forward. ' +
      'Press the weights straight up overhead. Lower back to start.',
    safety:
      'Don\'t arch your lower back — press your back into the chair. ' +
      'If your shoulder pinches at the top, stop before lockout.',
  },
  'db-row-supported': {
    name: 'Dumbbell row (one-arm, supported)',
    cue:
      'Place one hand and one knee on a sturdy chair or bench so your back is parallel to the floor (flat, not rounded). ' +
      'Hold a dumbbell in your free hand, arm hanging straight down. Pull the weight up to your hip, leading with your elbow. Lower slowly. Switch.',
    safety:
      'Back stays flat and long — no rounding, no arching. ' +
      'Pinch your shoulder blade toward your spine at the top.',
  },
  'db-triceps-kickback': {
    name: 'Dumbbell triceps kickback',
    cue:
      'Same setup as the supported row. With a dumbbell in your free hand, bend the elbow 90°. ' +
      'Keeping your upper arm still, straighten the elbow so the weight points behind you. Bend back to 90°.',
    safety:
      'Only the lower arm moves — the upper arm stays parallel to the floor. ' +
      'Light weight is fine — feel the back of the arm working.',
  },
  'banded-row-seated': {
    name: 'Banded row (seated)',
    cue:
      'Sit on the floor or a chair with legs out, a resistance band looped around your feet. ' +
      'Hold one handle in each hand, arms straight. Pull the handles toward your waist, squeezing shoulder blades together. ' +
      'Slow release.',
    safety:
      'Sit tall — don\'t round your back. ' +
      'Pull elbows close to your sides, not flared.',
  },
  'banded-chest-press': {
    name: 'Banded chest press',
    cue:
      'Anchor a resistance band behind you (around a sturdy chair or door anchor). ' +
      'Hold a handle in each hand at chest level. Press your hands forward until your arms are straight, then return.',
    safety:
      'Don\'t lock your elbows. Keep your shoulder blades pulled gently together throughout.',
  },
  'banded-face-pull': {
    name: 'Banded face pull',
    cue:
      'Anchor a band at eye level in front of you. Hold one end in each hand, arms straight out. ' +
      'Pull the handles toward your face, elbows wide and high. Squeeze the back of the shoulders.',
    safety:
      'Essential for posture and shoulder health. Move slowly.',
  },
  'banded-ext-rotation': {
    name: 'Banded shoulder rotation',
    cue:
      'Anchor a band at elbow height to your side. Stand with your elbow tucked to your side, bent at 90°, palm facing your belly. ' +
      'Rotate your forearm outward, keeping the elbow pinned to your side. Slow return. Switch sides.',
    safety:
      'Only the forearm moves. Elbow stays glued to your ribs. Light band only — this is shoulder maintenance.',
  },
  'db-carry-farmer': {
    name: 'Dumbbell carry (farmer hold)',
    cue:
      'Hold a dumbbell in each hand at your sides. Stand tall, shoulders back, walk slowly forward in a straight line. ' +
      'Or just stand and hold for time.',
    safety:
      'Squeeze the dumbbells hard the whole time — this is grip training. ' +
      'Walk on a clear path. Shoulders down, not shrugged.',
  },

  // ===================== GRIP =====================
  'towel-squeeze': {
    name: 'Towel squeeze',
    cue:
      'Hold a hand towel (or washcloth) and squeeze it as hard as you can. Hold for time, then release.',
    safety:
      'Easy and safe — do this while watching TV. Both hands at once or one at a time.',
  },
  'stress-ball-squeeze': {
    name: 'Stress ball squeeze',
    cue:
      'Squeeze a soft ball in your palm, holding for 2–3 seconds at peak squeeze. Release fully between reps.',
    safety:
      'Squeeze hard but not painfully. Builds grip strength and forearm endurance.',
  },
  'finger-extension-band': {
    name: 'Finger extension (with rubber band)',
    cue:
      'Loop a small rubber band around all five fingertips. Open your hand against the band\'s resistance. Close slowly.',
    safety:
      'Often forgotten — opens the hand to balance all the closing-grip work.',
  },
  'wrist-curl': {
    name: 'Wrist curl',
    cue:
      'Sit with forearms resting on your thighs, dumbbells in hand, palms up, wrists past your knees. ' +
      'Slowly curl the wrist up. Slow back down.',
    safety:
      'Forearms stay still — only the wrists move.',
  },
  'wrist-curl-reverse': {
    name: 'Reverse wrist curl',
    cue:
      'Same as wrist curl but with palms facing DOWN. Curl the back of the hand toward the ceiling. Slow down.',
    safety:
      'Forearms stay still — only the wrists move.',
  },
  'grip-hold-db': {
    name: 'Dumbbell grip hold',
    cue:
      'Hold a dumbbell in each hand at your sides, squeezing as hard as you can. Hold for time.',
    safety:
      'Stand tall, shoulders relaxed (not shrugged). Stop early if your grip gives — that\'s the point.',
  },

  // ===================== CORE & BALANCE =====================
  'dead-bug': {
    name: 'Dead bug',
    cue:
      'Lie on your back, knees bent 90° in the air, arms straight up over your shoulders. ' +
      'Slowly lower one arm overhead AND the opposite leg toward the floor — keeping your lower back pressed flat. ' +
      'Return. Switch sides.',
    safety:
      'This is the BEST exercise for your spine — it teaches your deep core muscles to keep the spine still. ' +
      'If your lower back lifts off the floor at any point, you went too far. Smaller range is better.',
  },
  'bird-dog': {
    name: 'Bird dog',
    cue:
      'Start on your hands and knees, hands under shoulders, knees under hips. ' +
      'Slowly extend one arm straight forward AND the opposite leg straight back, until they\'re parallel to the floor. ' +
      'Hold. Lower and switch.',
    safety:
      'Imagine balancing a glass of water on your low back — it shouldn\'t move. ' +
      'Better to stay short and steady than reach far and wobble. Excellent for spine stability.',
  },
  'pelvic-tilt': {
    name: 'Pelvic tilt',
    cue:
      'Lie on your back, knees bent, feet flat. Gently tighten your belly to press your lower back into the floor. ' +
      'Hold a few seconds. Release.',
    safety:
      'Tiny, gentle movement. Warms up your deep core.',
  },
  'modified-plank-knees': {
    name: 'Plank on knees',
    cue:
      'On your hands and knees, walk your hands forward until your body forms a straight line from knees to head. ' +
      'Tighten your belly and squeeze your bottom. Hold.',
    safety:
      'Don\'t let your hips sag or pike. ' +
      'Skip if it bothers your wrists — try wall plank instead.',
  },
  'wall-plank': {
    name: 'Wall plank',
    cue:
      'Stand a couple feet from a wall, lean forward and place your hands on the wall at shoulder height. ' +
      'Step back so your body is on a slight slant. Tighten your belly, squeeze your bottom. Hold.',
    safety:
      'Gentler than a floor plank. Same straight-line cue.',
  },
  'tall-sit-hold': {
    name: 'Tall sit (posture hold)',
    cue:
      'Sit on the front of a chair with feet flat. Lift the top of your head toward the ceiling, ' +
      'gently pull shoulders back and down (not pinched tight). Hold tall posture.',
    safety:
      'A "do nothing" exercise that does a lot. Anywhere, anytime.',
  },
  'wall-angel': {
    name: 'Wall angel',
    cue:
      'Stand with your back against a wall, feet a few inches out. Press your low back gently into the wall. ' +
      'Place the backs of your hands and elbows on the wall (like a goal post). Slowly slide them up and down ' +
      'while keeping contact with the wall.',
    safety:
      'You may not be able to keep full contact at first — that\'s normal. Go as high as feels good.',
  },

  // ===================== STRETCHES =====================
  'doorway-chest-stretch': {
    name: 'Doorway chest stretch',
    cue:
      'Stand in a doorway. Place your forearm on the doorframe at shoulder height (elbow bent 90°). ' +
      'Step the same-side foot through the doorway until you feel a gentle stretch in the chest. Hold. Switch.',
    safety:
      'Easy stretch — don\'t force it. Great for counteracting hunched posture.',
  },
  'hamstring-strap': {
    name: 'Hamstring stretch (lying)',
    cue:
      'Lie on your back with both knees bent. Loop a towel or belt around the ball of one foot. ' +
      'Straighten that leg toward the ceiling, gently pulling the towel to add a stretch behind the knee. Hold.',
    safety:
      'This is much safer for your back than touching your toes. ' +
      'Keep your other knee bent on the floor. Stretch to mild tension, not pain.',
  },
  'calf-wall-stretch': {
    name: 'Calf stretch (wall)',
    cue:
      'Stand facing a wall, palms on it. Step one foot back, keeping that heel pressed into the floor and that leg straight. ' +
      'Lean toward the wall until you feel a stretch in the back calf. Hold. Switch.',
    safety:
      'Comfortable shoes or barefoot. Don\'t bounce.',
  },
  'piriformis-stretch': {
    name: 'Piriformis stretch (figure-four)',
    cue:
      'Lie on your back, knees bent. Cross one ankle over the opposite knee (making a "4" shape). ' +
      'Reach behind the thigh of the bottom leg and gently pull it toward your chest. Hold. Switch.',
    safety:
      'Gentle pull only. Stop if it pinches in the front of the hip — back off and try the easier crossed-knee variation seated.',
  },
  'quad-stretch-standing': {
    name: 'Quad stretch (standing)',
    cue:
      'Stand tall holding a sturdy chair for balance. Bend one knee and grab that ankle behind you. ' +
      'Pull the heel gently toward your bottom until you feel a stretch in the front of the thigh. Hold. Switch.',
    safety:
      'Knees stay together. Keep your spine tall — don\'t arch your back.',
  },
  'cat-cow': {
    name: 'Cat-cow',
    cue:
      'On your hands and knees, slowly round your back up toward the ceiling (cat). ' +
      'Then slowly drop your belly and lift your chest and tailbone (cow). Move slowly between the two.',
    safety:
      'Stay in a gentle range — no need for big movement. Listen to your back.',
  },
  'neck-rolls': {
    name: 'Neck rolls',
    cue:
      'Sit or stand tall. Slowly tip your head to one side (ear toward shoulder), then roll forward, chin to chest, ' +
      'then to the other shoulder. Move slowly. Do a couple in each direction.',
    safety:
      'Never roll the head straight back. Move slowly and stop if you feel dizzy.',
  },
  'shoulder-rolls': {
    name: 'Shoulder rolls',
    cue:
      'Sit or stand tall. Roll your shoulders up, back, and down in a big circle. Do 5–10. Then reverse direction.',
    safety: 'Easy mobility — do these any time.',
  },

  // ===================== WALK (logged differently in WalkSheet) =====================
  'walk': {
    name: 'Walk',
    cue:
      'Walk at a comfortable pace, head up, shoulders relaxed, taking even strides. ' +
      'Aim for a flat path. Comfortable shoes. Bring water.',
    safety:
      'If anything hurts, stop and rest. Walking is one of the very best things for your hip, your spine, ' +
      'your bones, and your heart — but it does no good if you push through pain.',
  },
};

export function getExercise(id) {
  return EXERCISES[id] || { name: id, cue: '', safety: '' };
}
