import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createInterview,
  getMyInterviews,
  getInterviewById,
  submitAnswer,
  completeInterview,
} from "../services/interview";

export const useCreateInterview = () => {
  return useMutation({
    mutationFn: createInterview,
  });
};

export const useMyInterviews = () => {
  return useQuery({
    queryKey: ["interviews"],
    queryFn: getMyInterviews,
  });
};

export const useInterview = (id) => {
  return useQuery({
    queryKey: ["interview", id],
    queryFn: () => getInterviewById(id),
    enabled: !!id,
  });
};

export const useSubmitAnswer = () => {
  return useMutation({
    mutationFn: submitAnswer,
  });
};
export const useCompleteInterview = () => {
  return useMutation({
    mutationFn: completeInterview,
  });
};