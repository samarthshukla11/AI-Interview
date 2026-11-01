import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useCreateInterview } from "@/hooks/useInterview";
import { useState } from "react";

const InterviewForm = () => {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    experience: 0,
    interviewType: "Technical",
    difficulty: "Medium",
    numberOfQuestions: 10,
  });

  const navigate = useNavigate();
  const { mutate, isPending } = useCreateInterview();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.company.trim()) {
      toast.error("Please enter a company name.");
      return;
    }

    if (!formData.role.trim()) {
      toast.error("Please enter a job role.");
      return;
    }

    if (
      formData.experience < 0 ||
      formData.experience > 50
    ) {
      toast.error(
        "Experience must be between 0 and 50 years."
      );
      return;
    }

    if (
      formData.numberOfQuestions < 1 ||
      formData.numberOfQuestions > 20
    ) {
      toast.error(
        "Questions must be between 1 and 20."
      );
      return;
    }

    mutate(formData, {
      onSuccess: (data) => {
        toast.success("Interview Created!");

        console.log(
          "Created interview:",
          data.interview
        );

        navigate(`/interview/${data.interview._id}`);
      },

      onError: (error) => {
        toast.error(
          error.response?.data?.message ||
            "Something went wrong"
        );
      },
    });
  };

  const inputClass =
    "w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30";

  const labelClass =
    "mb-2 block text-sm font-medium text-slate-300";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:rounded-3xl sm:p-8"
    >
      {/* Company */}
      <div>
        <label className={labelClass}>
          Company
        </label>

        <input
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Google"
          className={inputClass}
        />
      </div>

      {/* Role */}
      <div>
        <label className={labelClass}>
          Role
        </label>

        <input
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Software Engineer"
          className={inputClass}
        />
      </div>

      {/* Experience + Questions */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass}>
            Experience (Years)
          </label>

          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            min="0"
            max="50"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            Number of Questions
          </label>

          <input
            type="number"
            name="numberOfQuestions"
            value={formData.numberOfQuestions}
            onChange={handleChange}
            min="1"
            max="20"
            className={inputClass}
          />
        </div>
      </div>

      {/* Interview Type */}
      <div>
        <label className={labelClass}>
          Interview Type
        </label>

        <select
          name="interviewType"
          value={formData.interviewType}
          onChange={handleChange}
          className={inputClass}
        >
          <option>Technical</option>
          <option>HR</option>
          <option>Mixed</option>
        </select>
      </div>

      {/* Difficulty */}
      <div>
        <label className={labelClass}>
          Difficulty
        </label>

        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className={inputClass}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>

      {/* Start Button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-cyan-500 py-3.5 text-base font-semibold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50 sm:py-4 sm:text-lg"
      >
        {isPending
          ? "Creating Interview..."
          : "🚀 Start AI Interview"}
      </button>
    </form>
  );
};

export default InterviewForm;