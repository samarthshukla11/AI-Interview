import api from "../api/axios";

export const createInterview = async (interviewData) => {
  const { data } = await api.post("/interviews", interviewData);
  return data;
};

export const getMyInterviews = async () => {
  const { data } = await api.get("/interviews");
  return data;
};

export const getInterviewById = async (id) => {
  console.log("Fetching interview:", id);

  const { data } = await api.get(`/interviews/${id}`);

  return data;
};

export const submitAnswer = async ({
  interviewId,
  questionId,
  answer,
}) => {
  const { data } = await api.put(
    `/interviews/${interviewId}/questions/${questionId}/answer`,
    {
      answer,
    }
  );

  return data;
};
export const completeInterview = async (interviewId) => {
  const { data } = await api.put(
    `/interviews/${interviewId}/complete`
  );

  return data;
};