// Lightweight route-level loading skeleton shown while a lazy chunk loads.
const RouteFallback = () => (
  <div
    role="status"
    aria-live="polite"
    className="flex min-h-[40vh] items-center justify-center"
  >
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-safety-orange/30 border-t-safety-orange" />
    <span className="sr-only">Loading…</span>
  </div>
);

export default RouteFallback;
