import { Play, FileText, History } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Start Interview",
      icon: Play,
      path: "/setup",
      color: "bg-cyan-500",
    },
    {
      title: "View History",
      icon: History,
      path: "/history",
      color: "bg-purple-500",
    },
    {
      title: "My Profile",
      icon: FileText,
      path: "/profile",
      color: "bg-emerald-500",
    },
  ];

  return (
    <div>
      <h2 className="mb-5 text-2xl font-bold">Quick Actions</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={() => navigate(action.path)}
              className="rounded-2xl bg-slate-900 p-6 text-left transition hover:-translate-y-1 hover:bg-slate-800"
            >
              <div
                className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${action.color}`}
              >
                <Icon size={26} />
              </div>

              <h3 className="text-xl font-semibold">
                {action.title}
              </h3>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;