import AuthLayout from "@/components/layout/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Sign in to continue your interview journey."
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;