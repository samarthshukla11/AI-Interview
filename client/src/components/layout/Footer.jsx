import { Link } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <FaRobot className="text-2xl text-cyan-400" />

              <span className="text-xl font-bold">
                <span className="text-cyan-400">Interview</span>
                <span className="text-white">AI</span>
              </span>
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
              AI-powered mock interviews to help you practice,
              improve and prepare with confidence.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6 text-sm text-slate-400">
            <a
              href="#features"
              className="transition hover:text-white"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="transition hover:text-white"
            >
              How It Works
            </a>

            <Link
              to="/login"
              className="transition hover:text-white"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="transition hover:text-white"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          © 2026 InterviewAI. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;