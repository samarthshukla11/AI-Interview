import { Bell, Menu } from "lucide-react";

const Topbar = ({ onMenuClick }) => {
  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg bg-slate-800 p-2.5 transition hover:bg-slate-700 md:hidden"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        <div>
          <p className="text-xs font-medium text-cyan-400 md:hidden">
            INTERVIEWAI
          </p>

          <h2 className="text-xl font-bold sm:text-2xl">
            Dashboard
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <button
          type="button"
          aria-label="Notifications"
          className="rounded-full bg-slate-800 p-2.5 transition hover:bg-slate-700 sm:p-3"
        >
          <Bell size={18} />
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500 text-sm font-bold text-black sm:h-10 sm:w-10 sm:text-base">
            S
          </div>

          <div className="hidden sm:block">
            <p className="font-semibold">
              Samarth
            </p>

            <p className="text-sm text-slate-400">
              Candidate
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;