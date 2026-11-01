import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-20 text-center">
      <h2 className="text-4xl font-bold">
        Ready to Ace Your Next Interview?
      </h2>

      <p className="mt-4 text-slate-400">
        Start practicing with AI today and receive instant personalized
        feedback.
      </p>

      <Link
        to="/register"
        className="inline-block mt-8 px-6 py-3 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition"
      >
        Get Started Free
      </Link>
    </section>
  );
};

export default CTA;