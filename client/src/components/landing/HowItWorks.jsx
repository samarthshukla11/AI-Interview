import {
  Sparkles,
  Mic,
  BarChart3,
} from "lucide-react";

const steps = [
  {
    icon: Sparkles,
    title: "Create Interview",
    description:
      "Choose the company, role, interview type and difficulty.",
  },
  {
    icon: Sparkles,
    title: "AI Generates Questions",
    description:
      "AI creates personalized interview questions based on your selections.",
  },
  {
    icon: Mic,
    title: "Answer Questions",
    description:
      "Answer using text or your microphone just like a real interview.",
  },
  {
    icon: BarChart3,
    title: "Get AI Feedback",
    description:
      "Receive scores, feedback, strengths and areas for improvement.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-slate-900 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300">
            Workflow
          </span> 

          <h2 className="mt-6 text-5xl font-bold text-white">
            How It Works
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
  From creating your interview to receiving detailed AI feedback in four simple steps.
</p>
        </div>

        <div className="relative mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative rounded-3xl border border-slate-800 bg-slate-950 p-8 text-center transition duration-300 hover:-translate-y-2 hover:border-cyan-500"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10">
                  <Icon className="h-8 w-8 text-cyan-400" />
                </div>

                <div className="mt-5 text-sm font-semibold text-cyan-400">
                  Step {index + 1}
                </div>

                <h3 className="mt-3 text-2xl font-semibold text-white">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {step.description}
                </p>

                {index !== steps.length - 1 && (
                  <div className="absolute right-[-35px] top-1/2 hidden h-[2px] w-[70px] bg-cyan-500 lg:block"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;