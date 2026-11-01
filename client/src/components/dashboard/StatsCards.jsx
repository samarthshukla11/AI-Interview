import {
  Briefcase,
  Trophy,
  Target,
  Clock,
} from "lucide-react";

const StatsCards = ({ stats, isLoading }) => {
  const icons = [
    Briefcase,
    Trophy,
    Target,
    Clock,
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      {stats.map((item, index) => {
        const Icon = icons[index];

        return (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700 sm:p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-medium text-slate-400 sm:text-base">
                {item.title}
              </h3>

              <div className="rounded-xl bg-slate-800 p-2.5">
                <Icon
                  size={20}
                  className="text-cyan-400"
                />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              {isLoading ? "..." : item.value}
            </h2>

            <p className="mt-2 text-xs text-slate-500 sm:text-sm">
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;