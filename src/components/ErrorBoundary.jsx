// =============================================================================
//  KWES — ErrorBoundary
// -----------------------------------------------------------------------------
//  Top-level safety net. If any route or child component throws, we show a
//  branded crash screen instead of a blank white page. Reset returns the user
//  home so a single bad page never traps them.
// =============================================================================

import React from "react";

class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // In production this is where you'd ship to Sentry / Logtail.
    console.error("[KWES] Render crash:", error, info?.componentStack);
  }

  handleReset = () => {
    this.setState({ error: null });
    window.location.assign("/");
  };

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="flex min-h-screen items-center justify-center bg-ngo-cream px-6 text-center dark:bg-slate-950">
        <div className="max-w-md">
          <h1 className="text-2xl font-extrabold text-forest-green dark:text-white">
            Something flickered.
          </h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            One section of the site stumbled. The rest is fine — let's get you
            back to the home page.
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-safety-orange px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-500/40 transition hover:scale-105"
          >
            Take me home
          </button>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
