import { useStore } from '../store.jsx';

// First-launch screen — friendly welcome + safety disclaimer.
// Shown until Annie taps "Got it, let's start".
export default function Welcome() {
  const { actions } = useStore();
  return (
    <div className="min-h-full flex flex-col items-center justify-center px-6 py-10 fade-in">
      <div className="w-20 h-20 rounded-3xl bg-violet-100 border border-violet-200 flex items-center justify-center mb-5">
        <span className="text-violet-600 text-4xl">♥</span>
      </div>
      <h1 className="text-3xl font-bold text-stone-900 mb-2">Hi Annie!</h1>
      <p className="text-stone-600 text-center max-w-md mb-8 leading-relaxed">
        This is your year-long strength and balance program. Four short sessions a week — three quick workouts and one walk.
        Each phase builds gently on the last.
      </p>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 max-w-md mb-8">
        <h2 className="font-bold text-amber-900 text-base mb-2">Before you start, a few promises:</h2>
        <ul className="text-sm text-amber-900 space-y-1.5 leading-relaxed">
          <li>• Always stop if anything <strong>hurts</strong> (different from "this feels hard").</li>
          <li>• Move slowly and breathe — there are no points for speed.</li>
          <li>• A sturdy chair next to you is your safety partner.</li>
          <li>• Skip a day if you're not feeling well. The program waits for you.</li>
          <li>• This app is a guide, not medical advice — keep your doctor in the loop.</li>
        </ul>
      </div>

      <button
        onClick={actions.ackDisclaimer}
        className="w-full max-w-md bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-2xl py-4 text-lg"
      >
        Got it — let's get started
      </button>
    </div>
  );
}
