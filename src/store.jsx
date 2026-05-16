// Single-user store for Annie. localStorage is source of truth; Supabase
// syncs in the background. No identity picker, no friend comparison.

import { createContext, useContext, useEffect, useMemo, useReducer, useRef, useCallback, useState } from 'react';
import { fetchUser, upsertUser, SUPA_CONFIGURED } from './api/supabase.js';
import { weekId, parseDate } from './utils/dates.js';
import { uid } from './utils/ids.js';

const LS_DATA = 'annie.data';
const TODAY = () => new Date().toISOString().slice(0, 10);

const DEFAULT_DATA = () => ({
  startDate: TODAY(),
  phaseOverride: null,
  // weeks: { "2026-05-09": { Legs: true, Upper: false, Core: true, Walk: true } }
  weeks: {},
  // logs: array of { id, date, weekId, sessionType, exerciseId, sets, reps, hold, load, notes, side }
  logs: [],
  // walks: array of { id, date, weekId, miles, minutes, notes }
  walks: [],
  // milestones currently in focus (per family)
  milestoneCurrent: {},
  // setting: home-screen note acknowledgment for the medical disclaimer
  ackDisclaimer: false,
});

function isEssentiallyEmpty(d) {
  if (!d) return true;
  return Object.keys(d.weeks || {}).length === 0
      && (d.logs || []).length === 0
      && (d.walks || []).length === 0;
}

function reducer(state, action) {
  switch (action.type) {
    case 'hydrate': return { ...state, ...action.payload, hydrated: true };
    case 'setData': return { ...state, data: action.data };
    case 'patch': {
      const cur = state.data || DEFAULT_DATA();
      return { ...state, data: action.fn(cur) };
    }
    default: return state;
  }
}

const StoreCtx = createContext(null);

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { hydrated: false, data: DEFAULT_DATA() });

  // ---- hydrate from localStorage ----
  useEffect(() => {
    let data = DEFAULT_DATA();
    try {
      const raw = localStorage.getItem(LS_DATA);
      if (raw) data = { ...DEFAULT_DATA(), ...JSON.parse(raw) };
    } catch { /* keep defaults */ }
    dispatch({ type: 'hydrate', payload: { data } });
  }, []);

  // ---- pull from supabase + readyToPush gate (same pattern as calis app) ----
  const [readyToPush, setReadyToPush] = useState(false);
  const lastPulled = useRef(0);

  const pull = useCallback(async () => {
    if (!SUPA_CONFIGURED) { setReadyToPush(true); return; }
    const row = await fetchUser();
    if (row) {
      const remote = row.data || {};
      const local = JSON.parse(localStorage.getItem(LS_DATA) || '{}');
      const localTs = local._touched || 0;
      const remoteTs = new Date(row.updated_at || 0).getTime();
      const localEmpty = isEssentiallyEmpty(local);
      const remoteHasData = !isEssentiallyEmpty(remote);
      if (remoteTs >= localTs || (localEmpty && remoteHasData)) {
        const merged = { ...DEFAULT_DATA(), ...remote, _touched: remoteTs };
        localStorage.setItem(LS_DATA, JSON.stringify(merged));
        dispatch({ type: 'setData', data: merged });
      }
    }
    lastPulled.current = Date.now();
    setReadyToPush(true);
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    pull();
    const onFocus = () => { if (Date.now() - lastPulled.current > 15_000) pull(); };
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [state.hydrated, pull]);

  // ---- persist self changes (debounced) ----
  const pushTimer = useRef(null);
  useEffect(() => {
    if (!state.hydrated || !state.data || !readyToPush) return;
    const stamped = { ...state.data, _touched: Date.now() };
    localStorage.setItem(LS_DATA, JSON.stringify(stamped));
    if (pushTimer.current) clearTimeout(pushTimer.current);
    pushTimer.current = setTimeout(() => upsertUser(stamped), 800);
  }, [state.data, state.hydrated, readyToPush]);

  // ---- actions ----
  const patch = useCallback((fn) => dispatch({ type: 'patch', fn }), []);

  const toggleSession = useCallback((wid, sessionType) => {
    patch((d) => {
      const wk = { ...(d.weeks[wid] || {}) };
      wk[sessionType] = !wk[sessionType];
      return { ...d, weeks: { ...d.weeks, [wid]: wk } };
    });
  }, [patch]);

  const addLog = useCallback((entry) => {
    patch((d) => {
      const date = entry.date || TODAY();
      const wid = weekId(parseDate(date));
      return {
        ...d,
        logs: [
          ...d.logs,
          { id: uid(), sessionType: null, ...entry, date, weekId: wid },
        ],
      };
    });
  }, [patch]);

  const removeLog = useCallback((id) => {
    patch((d) => ({ ...d, logs: d.logs.filter((l) => l.id !== id) }));
  }, [patch]);

  const addWalk = useCallback((entry) => {
    patch((d) => {
      const date = entry.date || TODAY();
      const wid = weekId(parseDate(date));
      const walk = { id: uid(), ...entry, date, weekId: wid };
      // Adding a walk automatically fills the Walk ring for that week.
      const wk = { ...(d.weeks[wid] || {}) };
      wk.Walk = true;
      return {
        ...d,
        walks: [...(d.walks || []), walk],
        weeks: { ...d.weeks, [wid]: wk },
      };
    });
  }, [patch]);

  const removeWalk = useCallback((id) => {
    patch((d) => {
      const next = (d.walks || []).filter((w) => w.id !== id);
      // If no walks remain for this week, auto-uncheck the Walk ring.
      const walksByWeek = next.reduce((acc, w) => {
        acc[w.weekId] = (acc[w.weekId] || 0) + 1;
        return acc;
      }, {});
      const weeks = { ...d.weeks };
      for (const wid of Object.keys(weeks)) {
        if (weeks[wid]?.Walk && !walksByWeek[wid]) {
          weeks[wid] = { ...weeks[wid], Walk: false };
        }
      }
      return { ...d, walks: next, weeks };
    });
  }, [patch]);

  const setStartDate = useCallback((iso) => patch((d) => ({ ...d, startDate: iso })), [patch]);
  const setPhaseOverride = useCallback((p) => patch((d) => ({ ...d, phaseOverride: p })), [patch]);
  const ackDisclaimer = useCallback(() => patch((d) => ({ ...d, ackDisclaimer: true })), [patch]);

  const forceRestoreFromCloud = useCallback(async () => {
    if (!SUPA_CONFIGURED) return false;
    const row = await fetchUser();
    if (!row) return false;
    const remote = row.data || {};
    const merged = { ...DEFAULT_DATA(), ...remote, _touched: Date.now() };
    localStorage.setItem(LS_DATA, JSON.stringify(merged));
    dispatch({ type: 'setData', data: merged });
    setReadyToPush(true);
    return true;
  }, []);

  const value = useMemo(() => ({
    ...state,
    actions: {
      toggleSession, addLog, removeLog, addWalk, removeWalk,
      setStartDate, setPhaseOverride, ackDisclaimer,
      pull, forceRestoreFromCloud,
    },
  }), [state, toggleSession, addLog, removeLog, addWalk, removeWalk, setStartDate, setPhaseOverride, ackDisclaimer, pull, forceRestoreFromCloud]);

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>');
  return ctx;
}
