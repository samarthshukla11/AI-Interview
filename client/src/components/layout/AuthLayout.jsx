import { Link } from "react-router-dom";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <Link
          to="/"
          className="mb-8 block text-center text-3xl font-bold"
        >
          <span className="text-cyan-400">Interview</span>
          <span className="text-white">AI</span>
        </Link>

        <h1 className="text-3xl font-bold text-white">
          {title}
        </h1>

        <p className="mt-2 text-slate-400">
          {subtitle}
        </p>

        <div className="mt-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;