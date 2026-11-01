const FAQ = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
        <p className="mt-4 text-slate-400">
          Find answers to the most common questions about InterviewAI.
        </p>

        <div className="mt-12 space-y-6 text-left">
          <div className="rounded-xl border border-slate-700 p-6">
            <h3 className="text-xl font-semibold">
              Is InterviewAI free to use?
            </h3>
            <p className="mt-2 text-slate-400">
              Yes. You can practice interviews for free with our basic plan.
            </p>
          </div>

          <div className="rounded-xl border border-slate-700 p-6">
            <h3 className="text-xl font-semibold">
              Can I practice technical interviews?
            </h3>
            <p className="mt-2 text-slate-400">
              Yes. We provide technical, HR, behavioral, and mixed interview
              practice.
            </p>
          </div>

          <div className="rounded-xl border border-slate-700 p-6">
            <h3 className="text-xl font-semibold">
              Does the platform support voice answers?
            </h3>
            <p className="mt-2 text-slate-400">
              Yes. You can answer using either text or voice, and AI will
              evaluate your response.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;