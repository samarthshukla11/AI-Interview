import { useNavigate } from "react-router-dom";
import {
  Loader2,
  History as HistoryIcon,
  Eye,
  CalendarDays,
} from "lucide-react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useMyInterviews } from "@/hooks/useInterview";

const History = () => {
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
  } = useMyInterviews();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[70vh] items-center justify-center">
          <Loader2
            size={40}
            className="animate-spin text-cyan-400"
          />
        </div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[70vh] items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-xl font-bold text-white sm:text-2xl">
              Unable to load interview history
            </h1>

            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Please try again later.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const interviews = data?.interviews || [];

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-6xl">

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <p className="text-xs font-medium text-cyan-400 sm:text-sm">
            YOUR PROGRESS
          </p>

          <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
            Interview History
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Review your previous AI mock interviews and
            track your progress.
          </p>
        </div>

        {/* Empty State */}
        {interviews.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center sm:p-12">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/10">
              <HistoryIcon
                size={30}
                className="text-cyan-400"
              />
            </div>

            <h2 className="mt-5 text-xl font-bold text-white">
              No interviews yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400 sm:text-base">
              Start your first AI mock interview and your
              results will appear here.
            </p>

            <button
              onClick={() => navigate("/setup")}
              className="mt-6 w-full rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400 sm:w-auto"
            >
              Start Mock Interview
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {interviews.map((interview) => {
              const createdDate = interview.createdAt
                ? new Date(
                    interview.createdAt
                  ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "Unknown date";

              return (
                <div
                  key={interview._id}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-4 transition hover:border-slate-700 sm:p-6"
                >
                  <div className="flex flex-col gap-5">

                    {/* Interview Information */}
                    <div className="flex min-w-0 gap-3 sm:gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 sm:h-12 sm:w-12">
                        <HistoryIcon
                          size={22}
                          className="text-cyan-400 sm:h-6 sm:w-6"
                        />
                      </div>

                      <div className="min-w-0">
                        <h2 className="wrap-break-word text-base font-bold text-white sm:text-lg">
                          {interview.role}
                        </h2>

                        <p className="mt-1 wrap-break-word text-sm text-slate-400">
                          {interview.company}
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-500 sm:text-sm">
                          <span>
                            {interview.interviewType}
                          </span>

                          <span>•</span>

                          <span>
                            {interview.difficulty}
                          </span>

                          <span>•</span>

                          <span className="flex items-center gap-1">
                            <CalendarDays size={14} />
                            {createdDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Score + Status + Button */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                      {/* Score */}
                      <div className="rounded-xl bg-slate-950 px-5 py-3 text-center">
                        <p className="text-xs text-slate-500">
                          Score
                        </p>

                        <p className="text-2xl font-bold text-cyan-400">
                          {interview.score}
                          <span className="text-sm text-slate-500">
                            /10
                          </span>
                        </p>
                      </div>

                      {/* Status */}
                      <div
                        className={`flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold ${
                          interview.status === "Completed"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : interview.status === "In Progress"
                            ? "bg-amber-500/10 text-amber-400"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {interview.status}
                      </div>

                      {/* Action */}
                      {interview.status === "Completed" ? (
                        <button
                          onClick={() =>
                            navigate(
                              `/results?interviewId=${interview._id}`
                            )
                          }
                          className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black transition hover:bg-cyan-400"
                        >
                          <Eye size={18} />
                          View Results
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            navigate(
                              `/interview/${interview._id}`
                            )
                          }
                          className="rounded-xl bg-amber-500 px-5 py-3 font-semibold text-black transition hover:bg-amber-400"
                        >
                          Continue Interview
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default History;