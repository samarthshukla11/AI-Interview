import AuthLayout from "@/components/layout/AuthLayout";
import ForgotPasswordForm from "@/components/auth/ForgotPassword";

const ForgotPassword = () => {
  return (
    <AuthLayout
      title="Forgot Password?"
      subtitle="Enter your email and we'll send you a password reset link."
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPassword;