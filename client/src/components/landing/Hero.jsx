import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#06b6d422,transparent_35%),radial-gradient(circle_at_bottom_left,#7c3aed22,transparent_35%)]"></div>

      <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl"></div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center gap-16 px-6 py-20 lg:flex-row lg:gap-20 lg:px-8">
        
        {/* Left Section */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300">
            🤖 AI Powered Mock Interviews
          </div>

          <h1 className="mt-8 text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">
            Ace Your
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              Dream Interview
            </span>
            <br />
            With AI
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400 sm:text-xl">
            Practice realistic interviews with AI and get instant feedback
            to improve your performance.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/register"
              className="flex items-center gap-2 rounded-xl bg-cyan-500 px-7 py-3.5 font-semibold text-black transition duration-300 hover:scale-105 hover:bg-cyan-400"
            >
              Start Free
              <FaArrowRight />
            </Link>

            <button
              type="button"
              className="rounded-xl border border-slate-700 px-7 py-3.5 font-semibold text-white transition duration-300 hover:border-cyan-500 hover:bg-slate-900"
            >
              ▶ Watch Demo
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative w-full max-w-md">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 opacity-30 blur-2xl"></div>

          <div className="relative rounded-3xl border border-slate-800 bg-slate-900/90 p-6 backdrop-blur-xl sm:p-8">
            
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">
                  🤖 AI Interview
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Mock Interview Session
                </p>
              </div>

              <span className="rounded-full bg-green-500/20 px-3 py-1.5 text-xs font-medium text-green-400">
                ● Live
              </span>
            </div>

            <div className="rounded-2xl bg-slate-800 p-5">
              <p className="text-sm text-slate-400">
                Interview Question
              </p>

              <h3 className="mt-3 text-lg font-semibold leading-7 text-white">
                Explain a challenging project you worked on.
              </h3>
            </div>

            <div className="mt-5 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-cyan-300">
                  🎤 AI Listening...
                </p>

                <span className="text-xs text-slate-400">
                  Recording
                </span>
              </div>

              <div className="mt-4 flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-cyan-400"></div>
                <div className="h-2 w-2 rounded-full bg-cyan-400"></div>
                <div className="h-2 w-2 rounded-full bg-cyan-400"></div>
                <div className="h-2 w-8 rounded-full bg-cyan-400"></div>
                <div className="h-2 w-4 rounded-full bg-slate-700"></div>
                <div className="h-2 w-10 rounded-full bg-slate-700"></div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-2xl bg-slate-800 p-5">
              <div>
                <p className="text-sm text-slate-400">
                  AI Feedback
                </p>

                <p className="mt-1 font-semibold text-white">
                  Great answer!
                </p>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-cyan-400">
                  9.2
                </p>

                <p className="text-xs text-slate-500">
                  / 10
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;