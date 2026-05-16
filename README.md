# Annie's Workout

A year-long strength & balance program designed for Annie. Same React/Vite/Tailwind stack as `calisthenics-tracker`, but single-user, friendlier tone, and a program built around hip OA + L4-L5 grade 1 anterolisthesis constraints.

## Weekly rings

- **Legs** — sit-to-stand, heel raises, single-leg balance, glute bridges, etc.
- **Upper** — wall/counter push-ups, dumbbell work, grip
- **Core** — dead bug, bird dog, stretches (all neutral-spine)
- **Walk** — distance + time. One walk fills the ring; more is welcome.

## Phases (52 weeks)

| Phase | Weeks | Load |
|---|---|---|
| 1. Foundation | 1–4 | Bodyweight + chair-assist |
| 2. Light Load | 5–12 | 2 lb DB + light band |
| 3. Building | 13–24 | 3 lb DB + medium band |
| 4. Stronger | 25–40 | 4 lb DB + heavy band |
| 5. Maintain | 41+ | Mix |

## Setup

```bash
npm install
cp .env.example .env
# Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
npm run dev
```

Always run from `Y:\annies-workout` (network share has the same H:/Y: drive quirk as the other project).

## Supabase

Create a fresh free project. Run this in SQL Editor:

```sql
create table if not exists annie_user (
  name        text primary key,
  data        jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now()
);

alter table annie_user enable row level security;

drop policy if exists "anon_read" on annie_user;
create policy "anon_read" on annie_user for select using (true);

drop policy if exists "anon_insert" on annie_user;
create policy "anon_insert" on annie_user
  for insert with check (name = 'annie');

drop policy if exists "anon_update" on annie_user;
create policy "anon_update" on annie_user
  for update using (name = 'annie');

insert into annie_user (name) values ('annie') on conflict do nothing;
```

Add the two API values (Project URL + publishable key) to GitHub repo → Settings → Secrets and variables → Actions, as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

## Deploy

Push to `main` and the GitHub Action builds and deploys to `gh-pages`. Site lives at `https://<your-username>.github.io/annies-workout/`.

Same nav permission fix as the other repo: workflow already grants `contents: write`.
