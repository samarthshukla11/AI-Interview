import { BrainCircuit, Mic, MessageSquareCheck } from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI-Generated Questions",
    description:
      "Get personalized interview questions based on your role, company, interview type and difficulty.",
  },
  {
    icon: Mic,
    title: "Voice & Text Answers",
    description:
      "Answer questions using your microphone or type your response just like a real interview.",
  },
  {
    icon: MessageSquareCheck,
    title: "Instant AI Feedback",
    description:
      "Get scores, feedback, strengths and improvement suggestions for every answer.",
  },
];

const Features = () => {
  return (
    <section id="features" className="bg-slate-950 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">

        {/* Heading */}
        <div className="text-center">
          <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300">
            Features
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white sm:text-5xl">
            Everything You Need
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Practice interviews with AI and get useful feedback to improve
            your performance.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl border border-slate-800 bg-slate-900 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500 hover:shadow-xl hover:shadow-cyan-500/10"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10">
                  <Icon className="h-7 w-7 text-cyan-400 transition-transform duration-300 group-hover:scale-110" />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Features;