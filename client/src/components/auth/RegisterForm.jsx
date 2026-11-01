import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRegister } from "@/hooks/useAuth";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      const response = await registerMutation.mutateAsync(payload);

      toast.success(response.message);

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Full Name
        </label>

        <input
          type="text"
          placeholder="Enter your full name"
          {...register("name", {
            required: "Name is required",
          })}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
        />

        {errors.name && (
          <p className="mt-2 text-sm text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
          })}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
        />

        {errors.email && (
          <p className="mt-2 text-sm text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Password
        </label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 pr-12 text-white outline-none focus:border-cyan-400"
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

      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Confirm Password
        </label>

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm password"
          {...register("confirmPassword", {
            required: "Confirm your password",
            validate: (value) =>
              value === password || "Passwords do not match",
          })}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
        />

        {errors.confirmPassword && (
          <p className="mt-2 text-sm text-red-400">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={registerMutation.isPending}
        className="flex w-full items-center justify-center rounded-xl bg-cyan-500 py-3 font-semibold text-black transition hover:bg-cyan-400 disabled:opacity-60"
      >
        {registerMutation.isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          "Create Account"
        )}
      </button>

      <p className="text-center text-sm text-slate-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-cyan-400 hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;