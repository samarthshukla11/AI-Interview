import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLogin } from "@/hooks/useAuth";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await loginMutation.mutateAsync(data);

      toast.success(response.message);

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
          })}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
        />

        {errors.email && (
          <p className="mt-2 text-sm text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Password
        </label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
            })}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 pr-12 text-white outline-none transition focus:border-cyan-400"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        {errors.password && (
          <p className="mt-2 text-sm text-red-400">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <Link
          to="/forgot-password"
          className="text-sm text-cyan-400 hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="flex w-full items-center justify-center rounded-xl bg-cyan-500 py-3 font-semibold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loginMutation.isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          "Login"
        )}
      </button>

      <p className="text-center text-sm text-slate-400">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-cyan-400 hover:underline"
        >
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;