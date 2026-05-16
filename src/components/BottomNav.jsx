const TABS = [
  { id: 'week',       label: 'Week',       icon: '◧' },
  { id: 'milestones', label: 'Milestones', icon: '★' },
  { id: 'history',    label: 'History',    icon: '☰' },
];

export default function BottomNav({ tab, setTab }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-stone-200 safe-bottom z-40 no-print">
      <div className="max-w-xl mx-auto grid grid-cols-3">
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex flex-col items-center gap-0.5 py-3 transition ${
                active ? 'text-violet-600' : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              <span className="text-xl leading-none">{t.icon}</span>
              <span className="text-[11px] font-medium tracking-wide">{t.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
