import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useCurrentUser } from "@/hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const {
    data,
    isLoading,
    isError,
  } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <Loader2
          className="animate-spin text-cyan-400"
          size={40}
        />
      </div>
    );
  }

  if (isError || !data?.success) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;