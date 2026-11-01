import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatsCards from "@/components/dashboard/StatsCards";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentInterviews from "@/components/dashboard/RecentInterviews";
import { useMyInterviews } from "@/hooks/useInterview";

const Dashboard = () => {
  const { data, isLoading } = useMyInterviews();

  const interviews = data?.interviews || [];

  const completedInterviews = interviews.filter(
    (interview) => interview.status === "Completed"
  );

  const totalInterviews = interviews.length;

  const averageScore =
    completedInterviews.length > 0
      ? (
          completedInterviews.reduce(
            (sum, interview) => sum + interview.score,
            0
          ) / completedInterviews.length
        ).toFixed(1)
      : "0.0";

  const bestScore =
    completedInterviews.length > 0
      ? Math.max(
          ...completedInterviews.map(
            (interview) => interview.score
          )
        )
      : 0;

  const stats = [
    {
      title: "Total Interviews",
      value: totalInterviews,
      description: "Mock interviews created",
    },
    {
      title: "Completed",
      value: completedInterviews.length,
      description: "Finished interviews",
    },
    {
      title: "Average Score",
      value: `${averageScore}/10`,
      description: "Across completed interviews",
    },
    {
      title: "Best Score",
      value: `${bestScore}/10`,
      description: "Your highest score",
    },
  ];

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-cyan-400">
            AI INTERVIEW PLATFORM
          </p>

          <h1 className="mt-1 text-3xl font-bold text-white">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-400">
            Track your interview preparation and improve your performance.
          </p>
        </div>

        {/* Stats */}
        <StatsCards
          stats={stats}
          isLoading={isLoading}
        />

        {/* Quick Actions */}
        <div className="mt-8">
          <QuickActions />
        </div>

        {/* Recent Interviews */}
        <div className="mt-8">
          <RecentInterviews
            interviews={interviews.slice(0, 5)}
            isLoading={isLoading}
          />
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Dashboard;