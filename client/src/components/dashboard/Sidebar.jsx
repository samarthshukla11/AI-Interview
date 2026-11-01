import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Mic,
  History,
  User,
  X,
} from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  const links = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Mock Interview",
      icon: Mic,
      path: "/setup",
    },
    {
      name: "History",
      icon: History,
      path: "/history",
    },
    {
      name: "Profile",
      icon: User,
      path: "/profile",
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}

      {/* Desktop + Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-800 bg-slate-900 transition-transform duration-300 md:static md:block md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-800 p-6">
          <h1 className="text-2xl font-bold text-cyan-400">
            InterviewAI
          </h1>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white md:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-2 p-4">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                    isActive
                      ? "bg-cyan-500 font-semibold text-black"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <Icon size={20} />
                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;