import DashboardLayout from "@/components/dashboard/DashboardLayout";
import InterviewForm from "@/components/interview/InterviewForm";

const InterviewSetup = () => {
  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-6 sm:mb-8">
          <p className="mb-2 text-sm font-medium text-cyan-400">
            MOCK INTERVIEW
          </p>

          <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Create AI Interview
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Configure your interview and let AI generate
            personalized questions for you.
          </p>
        </div>

        <InterviewForm />
      </div>
    </DashboardLayout>
  );
};

export default InterviewSetup;