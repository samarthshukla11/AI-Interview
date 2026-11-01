import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Loader2,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Mic,
  MicOff,
} from "lucide-react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  useInterview,
  useSubmitAnswer,
  useCompleteInterview,
} from "@/hooks/useInterview";

const Interview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [evaluation, setEvaluation] = useState(null);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useInterview(id);

  const submitAnswerMutation = useSubmitAnswer();
  const completeInterviewMutation = useCompleteInterview();

  useEffect(() => {
    if (!data?.interview) return;

    const questions = data.interview.questions || [];

    if (currentQuestion === null) {
      const firstUnansweredIndex = questions.findIndex(
        (question) =>
          !question.answer || !question.answer.trim()
      );

      setCurrentQuestion(
        firstUnansweredIndex !== -1
          ? firstUnansweredIndex
          : 0
      );

      return;
    }

    const question = questions[currentQuestion];

    setAnswer(question?.answer || "");

    if (question?.score > 0 || question?.feedback) {
      setEvaluation({
        score: question.score,
        feedback: question.feedback,
        strengths: question.strengths || "",
        improvements: question.improvements || "",
        betterAnswer: question.betterAnswer || "",
      });
    } else {
      setEvaluation(null);
    }
  }, [data, currentQuestion]);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition;
    const speechRecognition = new SpeechRecognition();

    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.lang = "en-US";

    speechRecognition.onresult = (event) => {
      let finalTranscript = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        const transcript =
          event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        }
      }

      if (finalTranscript) {
        setAnswer((prev) =>
          `${prev} ${finalTranscript}`.trim()
        );
      }
    };

    speechRecognition.onend = () => {
      setIsListening(false);
    };

    speechRecognition.onerror = (event) => {
      console.error(
        "Speech recognition error:",
        event
      );

      setIsListening(false);

      toast.error(
        "Unable to access microphone. Please try again."
      );
    };

    setRecognition(speechRecognition);

    return () => {
      speechRecognition.stop();
    };
  }, []);

  const startRecording = () => {
    if (!recognition) {
      alert(
        "Speech recognition is not supported. Please use Google Chrome or Microsoft Edge."
      );
      return;
    }

    try {
      recognition.start();
      setIsListening(true);
    } catch (error) {
      console.log("Recognition already running.");
    }
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
    }

    setIsListening(false);
  };

  const handleSaveAnswer = async () => {
    if (!answer.trim()) {
      toast.error(
        "Please record or enter an answer first."
      );
      return;
    }

    const question =
      data.interview.questions[currentQuestion];

    try {
      const result =
        await submitAnswerMutation.mutateAsync({
          interviewId: id,
          questionId: question._id,
          answer,
        });

      setEvaluation(result.evaluation);

      toast.success(
        "Answer evaluated successfully!"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to evaluate answer."
      );
    }
  };

  const handleFinishInterview = async () => {
    try {
      await completeInterviewMutation.mutateAsync(id);

      navigate(`/results?interviewId=${id}`);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to complete interview."
      );
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (
      currentQuestion <
      data.interview.questions.length - 1
    ) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

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
    console.error(error);

    return (
      <DashboardLayout>
        <div className="flex min-h-[70vh] items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">
              Interview not found
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
  const question = questions[currentQuestion];

  if (!question) {
    return (
      <DashboardLayout>
        <div className="p-8 text-center text-white">
          No question found.
        </div>
      </DashboardLayout>
    );
  }

  const isLastQuestion =
    currentQuestion === questions.length - 1;

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-5xl">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-medium text-cyan-400 sm:text-sm">
              AI MOCK INTERVIEW
            </p>

            <h1 className="mt-1 wrap-break-word text-2xl font-bold text-white sm:text-3xl">
              {interview.role}
            </h1>

            <p className="mt-1 text-sm text-slate-400 sm:mt-2 sm:text-base">
              {interview.company}
            </p>
          </div>

          <div className="w-fit rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 sm:px-5 sm:py-3">
            <span className="text-sm text-slate-400">
              Question{" "}
            </span>

            <span className="font-bold text-cyan-400">
              {currentQuestion + 1}
            </span>

            <span className="text-sm text-slate-400">
              {" "}
              / {questions.length}
            </span>
          </div>
        </div>

        {/* Main Interview Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:rounded-3xl sm:p-6 lg:p-8">

          {/* Question */}
          <div>
            <span className="inline-block rounded-lg bg-cyan-500/10 px-3 py-2 text-xs font-medium text-cyan-400 sm:text-sm">
              Question {currentQuestion + 1}
            </span>

            <h2 className="mt-4 wrap-break-word text-xl font-semibold leading-relaxed text-white sm:mt-6 sm:text-2xl">
              {question.question}
            </h2>
          </div>

          {/* Voice Answer */}
          <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950 p-4 sm:mt-8 sm:p-6">
            <div className="flex flex-col items-center">

              {/* Microphone */}
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-full sm:h-20 sm:w-20 ${
                  isListening
                    ? "bg-red-500/20"
                    : "bg-cyan-500/10"
                }`}
              >
                {isListening ? (
                  <MicOff
                    size={28}
                    className="text-red-400 sm:h-8 sm:w-8"
                  />
                ) : (
                  <Mic
                    size={28}
                    className="text-cyan-400 sm:h-8 sm:w-8"
                  />
                )}
              </div>

              <h3 className="mt-4 text-base font-semibold text-white sm:text-lg">
                {isListening
                  ? "Listening..."
                  : "Your Answer"}
              </h3>

              <p className="mt-2 max-w-md text-center text-xs leading-5 text-slate-500 sm:text-sm">
                {isListening
                  ? "Speak clearly. Your answer will appear below."
                  : "Click the microphone and answer the question."}
              </p>

              {!isListening ? (
                <button
                  type="button"
                  onClick={startRecording}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black transition hover:bg-cyan-400 sm:mt-6 sm:w-auto sm:px-6"
                >
                  <Mic size={20} />
                  Start Answer
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopRecording}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-400 sm:mt-6 sm:w-auto sm:px-6"
                >
                  <MicOff size={20} />
                  Stop Recording
                </button>
              )}
            </div>

            {/* Answer textarea */}
            <textarea
              value={answer}
              onChange={(e) =>
                setAnswer(e.target.value)
              }
              placeholder="Your answer will appear here..."
              className="mt-6 min-h-40 w-full resize-y rounded-xl border border-slate-700 bg-slate-900 p-4 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 sm:mt-8 sm:text-base"
            />

            <button
              type="button"
              onClick={handleSaveAnswer}
              disabled={
                submitAnswerMutation.isPending ||
                !answer.trim()
              }
              className="mt-4 w-full rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40 sm:text-base"
            >
              {submitAnswerMutation.isPending
                ? "AI Evaluating..."
                : "Save & Evaluate Answer"}
            </button>
          </div>

          {/* AI Evaluation */}
          {evaluation && (
            <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-slate-950 p-4 sm:mt-8 sm:p-6">

              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-xl font-bold text-white">
                  AI Evaluation
                </h3>

                <div className="w-full rounded-xl bg-cyan-500/10 px-5 py-3 text-center sm:w-auto">
                  <p className="text-xs text-slate-400">
                    Score
                  </p>

                  <p className="text-3xl font-bold text-cyan-400">
                    {evaluation.score}
                    <span className="text-lg text-slate-500">
                      /10
                    </span>
                  </p>
                </div>
              </div>

              <div className="space-y-5">

                <div>
                  <h4 className="mb-2 font-semibold text-white">
                    Feedback
                  </h4>

                  <p className="wrap-break-word leading-relaxed text-slate-400">
                    {evaluation.feedback}
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold text-emerald-400">
                    Strengths
                  </h4>

                  <p className="wrap-break-word leading-relaxed text-slate-400">
                    {evaluation.strengths}
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold text-amber-400">
                    Areas to Improve
                  </h4>

                  <p className="wrap-break-word leading-relaxed text-slate-400">
                    {evaluation.improvements}
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold text-cyan-400">
                    Better Answer
                  </h4>

                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                    <p className="wrap-break-word leading-relaxed text-slate-300">
                      {evaluation.betterAnswer}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:justify-between">

            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 px-5 py-3 text-sm text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:text-base"
            >
              <ChevronLeft size={20} />
              Previous
            </button>

            {isLastQuestion ? (
              <button
                type="button"
                onClick={handleFinishInterview}
                disabled={
                  completeInterviewMutation.isPending
                }
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                <CheckCircle size={20} />

                {completeInterviewMutation.isPending
                  ? "Completing..."
                  : "Finish Interview"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400 sm:w-auto"
              >
                Next Question
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Interview;