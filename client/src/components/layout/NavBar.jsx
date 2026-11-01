import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaRobot } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <FaRobot className="text-2xl text-cyan-400" />

          <span className="text-2xl font-bold">
            <span className="text-cyan-400">Interview</span>
            <span className="text-white">AI</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <a
            href="#features"
            className="transition-colors hover:text-white"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="transition-colors hover:text-white"
          >
            How It Works
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button>
              Login
            </Button>
          </Link>

          <Link to="/register">
            <Button>
              Get Started
            </Button>
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Navbar;