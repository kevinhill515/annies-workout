import { useState } from 'react';
import { StoreProvider, useStore } from './store.jsx';
import Welcome from './components/Welcome.jsx';
import BottomNav from './components/BottomNav.jsx';
import WeekView from './components/WeekView.jsx';
import MilestonesView from './components/MilestonesView.jsx';
import HistoryView from './components/HistoryView.jsx';
import SettingsSheet from './components/SettingsSheet.jsx';

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}

function Shell() {
  const { hydrated, data } = useStore();
  const [tab, setTab] = useState('week');
  const [settings, setSettings] = useState(false);

  if (!hydrated) {
    return <div className="h-full flex items-center justify-center text-stone-400">…</div>;
  }
  if (!data?.ackDisclaimer) return <Welcome />;

  return (
    <div className="min-h-full flex flex-col">
      <TopBar onSettings={() => setSettings(true)} />
      <main className="flex-1">
        {tab === 'week'       && <WeekView />}
        {tab === 'milestones' && <MilestonesView />}
        {tab === 'history'    && <HistoryView />}
      </main>
      <BottomNav tab={tab} setTab={setTab} />
      <SettingsSheet open={settings} onClose={() => setSettings(false)} />
    </div>
  );
}

function TopBar({ onSettings }) {
  return (
    <header className="safe-top sticky top-0 bg-stone-50/90 backdrop-blur z-30 border-b border-stone-200 no-print">
      <div className="max-w-xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-violet-100 border border-violet-200 flex items-center justify-center text-violet-600">♥</span>
          <span className="text-base font-semibold text-stone-900">Annie's Workout</span>
        </div>
        <button
          onClick={onSettings}
          className="w-10 h-10 rounded-full bg-white border border-stone-200 hover:bg-stone-100 flex items-center justify-center text-stone-600"
          aria-label="Settings"
        >⚙</button>
      </div>
    </header>
  );
}
