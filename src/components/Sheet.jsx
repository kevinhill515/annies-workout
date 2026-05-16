import { useEffect } from 'react';

// Light-theme bottom sheet. Tap backdrop or × to dismiss.
export default function Sheet({ open, onClose, title, children, fullHeight = false }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      <div className="absolute inset-0 bg-stone-900/40 fade-in" onClick={onClose} />
      <div className={`relative mt-auto bg-white rounded-t-3xl border-t border-stone-200 shadow-2xl sheet-enter flex flex-col ${fullHeight ? 'h-[92vh]' : 'max-h-[92vh]'}`}>
        <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-stone-200">
          <h2 className="text-xl font-bold text-stone-900">{title}</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center text-lg"
            aria-label="Close"
          >×</button>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain pb-8">{children}</div>
      </div>
    </div>
  );
}
