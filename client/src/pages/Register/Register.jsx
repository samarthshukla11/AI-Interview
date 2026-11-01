import AuthLayout from "@/components/layout/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <AuthLayout
      title="Create Your Account 🚀"
      subtitle="Start practicing AI-powered interviews today."
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;