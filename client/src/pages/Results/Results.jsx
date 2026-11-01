import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Loader2,
  CheckCircle,
  ArrowLeft,
  Award,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useInterview } from "@/hooks/useInterview";

const Results = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const interviewId = searchParams.get("interviewId");

  const {
    data,
    isLoading,
    isError,
  } = useInterview(interviewId);

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

  if (isError || !data?.interview) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[70vh] items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-xl font-bold text-white sm:text-2xl">
              Results not found
            </h1>

            <button
              onClick={() => navigate("/dashboard")}
              className="mt-5 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const interview = data.interview;
  const questions = interview.questions || [];

  const answeredQuestions = questions.filter(
    (question) =>
      question.answer && question.answer.trim()
  );

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-6xl">

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="mb-5 flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </button>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-medium text-cyan-400 sm:text-sm">
                INTERVIEW RESULTS
              </p>

              <h1 className="mt-1 wrap-break-word text-2xl font-bold text-white sm:text-3xl">
                {interview.role}
              </h1>

              <p className="mt-1 text-sm text-slate-400 sm:mt-2 sm:text-base">
                {interview.company}
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-3 text-emerald-400">
              <CheckCircle size={20} />

              <span className="text-sm font-semibold sm:text-base">
                {interview.status}
              </span>
            </div>
          </div>
        </div>

        {/* Score Overview */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">

          {/* Overall Score */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-cyan-500/10 p-3">
                <Award
                  size={24}
                  className="text-cyan-400"
                />
              </div>

              <div>
                <p className="text-sm text-slate-400">
                  Overall Score
                </p>

                <p className="text-2xl font-bold text-white sm:text-3xl">
                  {interview.score}
                  <span className="text-lg text-slate-500">
                    /10
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-500/10 p-3">
                <MessageSquare
                  size={24}
                  className="text-emerald-400"
                />
              </div>

              <div>
                <p className="text-sm text-slate-400">
                  Questions Answered
                </p>

                <p className="text-2xl font-bold text-white sm:text-3xl">
                  {answeredQuestions.length}
                  <span className="text-lg text-slate-500">
                    /{questions.length}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Difficulty */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-purple-500/10 p-3">
                <TrendingUp
                  size={24}
                  className="text-purple-400"
                />
              </div>

              <div>
                <p className="text-sm text-slate-400">
                  Difficulty
                </p>

                <p className="text-xl font-bold text-white sm:text-2xl">
                  {interview.difficulty}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Question Results */}
        <div className="mt-8">
          <h2 className="mb-5 text-xl font-bold text-white sm:text-2xl">
            Question-by-Question Results
          </h2>

          <div className="space-y-5 sm:space-y-6">
            {questions.map((question, index) => (
              <div
                key={question._id}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-6"
              >

                {/* Question Header */}
                <div className="flex flex-col gap-4">
                  <div className="flex min-w-0 gap-3 sm:gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-sm font-bold text-cyan-400 sm:h-9 sm:w-9">
                      {index + 1}
                    </div>

                    <h3 className="min-w-0 wrap-break-word text-sm font-semibold leading-relaxed text-white sm:text-base">
                      {question.question}
                    </h3>
                  </div>

                  <div className="flex w-fit items-center gap-2 rounded-xl bg-cyan-500/10 px-4 py-2">
                    <p className="text-xs text-slate-400">
                      Score
                    </p>

                    <p className="text-xl font-bold text-cyan-400">
                      {question.score}
                      <span className="text-sm text-slate-500">
                        /10
                      </span>
                    </p>
                  </div>
                </div>

                {/* Candidate Answer */}
                {question.answer && (
                  <div className="mt-6">
                    <h4 className="mb-2 font-semibold text-slate-300">
                      Your Answer
                    </h4>

                    <div className="rounded-xl bg-slate-950 p-4">
                      <p className="wrap-break-word text-sm leading-relaxed text-slate-400 sm:text-base">
                        {question.answer}
                      </p>
                    </div>
                  </div>
                )}

                {/* Feedback */}
                {question.feedback && (
                  <div className="mt-5">
                    <h4 className="mb-2 font-semibold text-white">
                      AI Feedback
                    </h4>

                    <p className="wrap-break-word text-sm leading-relaxed text-slate-400 sm:text-base">
                      {question.feedback}
                    </p>
                  </div>
                )}

                {/* Strengths */}
                {question.strengths && (
                  <div className="mt-5">
                    <h4 className="mb-2 font-semibold text-emerald-400">
                      Strengths
                    </h4>

                    <p className="wrap-break-word text-sm leading-relaxed text-slate-400 sm:text-base">
                      {question.strengths}
                    </p>
                  </div>
                )}

                {/* Improvements */}
                {question.improvements && (
                  <div className="mt-5">
                    <h4 className="mb-2 font-semibold text-amber-400">
                      Areas to Improve
                    </h4>

                    <p className="wrap-break-word text-sm leading-relaxed text-slate-400 sm:text-base">
                      {question.improvements}
                    </p>
                  </div>
                )}

                {/* Better Answer */}
                {question.betterAnswer && (
                  <div className="mt-5">
                    <h4 className="mb-2 font-semibold text-cyan-400">
                      Better Answer
                    </h4>

                    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                      <p className="wrap-break-word text-sm leading-relaxed text-slate-300 sm:text-base">
                        {question.betterAnswer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full rounded-xl bg-cyan-500 px-8 py-3 font-semibold text-black transition hover:bg-cyan-400 sm:w-auto"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Results;