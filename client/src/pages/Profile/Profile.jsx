import {
  User,
  Mail,
  Briefcase,
  Trophy,
  LogOut,
  Loader2,
} from "lucide-react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  useCurrentUser,
  useLogout,
} from "@/hooks/useAuth";
import { useMyInterviews } from "@/hooks/useInterview";

const Profile = () => {
  const {
    data: userData,
    isLoading: userLoading,
  } = useCurrentUser();

  const {
    data: interviewData,
    isLoading: interviewsLoading,
  } = useMyInterviews();

  const logoutMutation = useLogout();

  const user = userData?.user;
  const interviews = interviewData?.interviews || [];

  const completedInterviews = interviews.filter(
    (interview) => interview.status === "Completed"
  );

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

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();

      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (userLoading || interviewsLoading) {
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

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-cyan-400">
            ACCOUNT
          </p>

          <h1 className="mt-1 text-3xl font-bold text-white">
            Profile
          </h1>

          <p className="mt-2 text-slate-400">
            Manage your account and view your interview progress.
          </p>
        </div>

        {/* Profile Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

          <div className="flex flex-col items-center gap-5 sm:flex-row">

            {/* Avatar */}
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-cyan-500/10">
              <User
                size={42}
                className="text-cyan-400"
              />
            </div>

            {/* User Information */}
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-white">
                {user?.name || "User"}
              </h2>

              <div className="mt-2 flex items-center justify-center gap-2 text-slate-400 sm:justify-start">
                <Mail size={16} />

                <span>
                  {user?.email || "Email not available"}
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Statistics */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* Total Interviews */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">
                Total Interviews
              </p>

              <Briefcase
                size={22}
                className="text-cyan-400"
              />
            </div>

            <p className="mt-3 text-3xl font-bold text-white">
              {interviews.length}
            </p>
          </div>

          {/* Completed */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">
                Completed
              </p>

              <Trophy
                size={22}
                className="text-emerald-400"
              />
            </div>

            <p className="mt-3 text-3xl font-bold text-white">
              {completedInterviews.length}
            </p>
          </div>

          {/* Average Score */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Average Score
            </p>

            <p className="mt-3 text-3xl font-bold text-cyan-400">
              {averageScore}
              <span className="text-lg text-slate-500">
                /10
              </span>
            </p>
          </div>

          {/* Best Score */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Best Score
            </p>

            <p className="mt-3 text-3xl font-bold text-emerald-400">
              {bestScore}
              <span className="text-lg text-slate-500">
                /10
              </span>
            </p>
          </div>

        </div>

        {/* Account Information */}
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-8">

          <h2 className="text-xl font-bold text-white">
            Account Information
          </h2>

          <div className="mt-6 space-y-5">

            <div>
              <p className="text-sm text-slate-500">
                Full Name
              </p>

              <p className="mt-1 text-white">
                {user?.name || "Not available"}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Email Address
              </p>

              <p className="mt-1 text-white">
                {user?.email || "Not available"}
              </p>
            </div>

          </div>

        </div>

        {/* Logout */}
        <div className="mt-8 flex justify-end">

          <button
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="flex items-center gap-2 rounded-xl bg-red-500/10 px-6 py-3 font-semibold text-red-400 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LogOut size={18} />

            {logoutMutation.isPending
              ? "Logging out..."
              : "Logout"}
          </button>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default Profile;