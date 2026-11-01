import { useNavigate } from "react-router-dom";
import { Eye, ArrowRight } from "lucide-react";

const RecentInterviews = ({
  interviews,
  isLoading,
}) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Recent Interviews
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your latest interview activity
          </p>
        </div>

        <button
          onClick={() => navigate("/history")}
          className="flex shrink-0 items-center gap-1 text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
        >
          <span className="hidden sm:inline">
            View All
          </span>

          <ArrowRight size={16} />
        </button>
      </div>

      {isLoading ? (
        <div className="py-8 text-center text-slate-400">
          Loading interviews...
        </div>
      ) : interviews.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 py-10 text-center">
          <p className="text-slate-400">
            No interviews yet.
          </p>

          <button
            onClick={() => navigate("/setup")}
            className="mt-4 rounded-xl bg-cyan-500 px-5 py-2.5 font-semibold text-black transition hover:bg-cyan-400"
          >
            Start Your First Interview
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {interviews.map((interview) => (
            <div
              key={interview._id}
              className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-800/50 p-4 transition hover:border-slate-700 sm:flex-row sm:items-center sm:justify-between"
            >
              {/* Interview information */}
              <div className="min-w-0">
                <h3 className="truncate font-semibold text-white">
                  {interview.company}
                </h3>

                <p className="truncate text-sm text-slate-400">
                  {interview.role}
                </p>

                <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                  <span>{interview.interviewType}</span>
                  <span>•</span>
                  <span>{interview.difficulty}</span>
                  <span>•</span>
                  <span>{interview.status}</span>
                </div>
              </div>

              {/* Score + action */}
              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <span className="text-lg font-bold text-cyan-400 sm:text-xl">
                  {interview.score}/10
                </span>

                <button
                  onClick={() =>
                    navigate(
                      interview.status === "Completed"
                        ? `/results?interviewId=${interview._id}`
                        : `/interview/${interview._id}`
                    )
                  }
                  className="flex items-center gap-2 rounded-lg bg-slate-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-600"
                >
                  <Eye size={16} />

                  <span>
                    {interview.status === "Completed"
                      ? "View"
                      : "Continue"}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentInterviews;