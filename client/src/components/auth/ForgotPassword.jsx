import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, Mail } from "lucide-react";
import { useForm } from "react-hook-form";

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    console.log(data);

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Email Address
        </label>

        <div className="relative">
          <Mail
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
            })}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-11 pr-4 text-white outline-none transition focus:border-cyan-400"
          />
        </div>

        {errors.email && (
          <p className="mt-2 text-sm text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      <button
        disabled={loading}
        className="flex w-full items-center justify-center rounded-xl bg-cyan-500 py-3 font-semibold text-black transition hover:bg-cyan-400"
      >
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          "Send Reset Link"
        )}
      </button>

      <p className="text-center text-sm text-slate-400">
        Remember your password?{" "}
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

export default ForgotPasswordForm;