import {
  Award,
  Brain,
  Mic,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

const skills = [
  { title: "Communication", value: 92 },
  { title: "Technical Skills", value: 88 },
  { title: "Confidence", value: 95 },
  { title: "Grammar", value: 90 },
];

const feedback = [
  "Excellent communication throughout the interview.",
  "Use more real project examples while answering.",
  "Reduce filler words like 'umm' and 'actually'.",
  "Your confidence and eye-contact were strong.",
];

const DashboardPreview = () => {
  return (
    <section className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300">
            AI Dashboard
          </span>

          <h2 className="mt-6 text-5xl font-bold text-white">
            Your Interview Performance at a Glance
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-400">
            After every interview, AI generates a detailed report with
            performance scores and personalized improvement suggestions.
          </p>
        </div>

        <div className="mt-16 rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Left */}
            <div className="rounded-2xl bg-slate-950 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">
                  Overall Score
                </h3>

                <Award className="text-cyan-400" />
              </div>

              <div className="mt-8 flex items-center justify-center">
                <div className="flex h-40 w-40 items-center justify-center rounded-full border-[10px] border-cyan-400">
                  <span className="text-5xl font-bold text-white">
                    92
                  </span>
                </div>
              </div>

              <p className="mt-6 text-center text-slate-400">
                Excellent Performance
              </p>
            </div>

            {/* Middle */}
            <div className="rounded-2xl bg-slate-950 p-6">
              <div className="mb-8 flex items-center gap-3">
                <TrendingUp className="text-cyan-400" />

                <h3 className="text-xl font-semibold text-white">
                  Skills Analysis
                </h3>
              </div>

              {skills.map((skill) => (
                <div key={skill.title} className="mb-6">
                  <div className="mb-2 flex justify-between">
                    <span className="text-slate-300">
                      {skill.title}
                    </span>

                    <span className="text-cyan-400">
                      {skill.value}%
                    </span>
                  </div>

                  <div className="h-3 rounded-full bg-slate-700">
                    <div
                      className="h-3 rounded-full bg-cyan-400"
                      style={{ width: `${skill.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Right */}
            <div className="rounded-2xl bg-slate-950 p-6">
              <div className="mb-8 flex items-center gap-3">
                <Brain className="text-cyan-400" />

                <h3 className="text-xl font-semibold text-white">
                  AI Feedback
                </h3>
              </div>

              <div className="space-y-5">
                {feedback.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-slate-800 p-4"
                  >
                    <div className="flex gap-3">
                      {index % 2 === 0 ? (
                        <Mic className="mt-1 text-cyan-400" size={18} />
                      ) : (
                        <MessageSquare
                          className="mt-1 text-cyan-400"
                          size={18}
                        />
                      )}

                      <p className="text-sm leading-7 text-slate-300">
                        {item}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;