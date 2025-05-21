import type {
  GameQuestion,
  SubmitAnswerRequest,
  SubmitAnswerResponse,
} from "../types";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const fetchQuestion = async (): Promise<GameQuestion> => {
  const res = await fetch(`${API_BASE}/play`);
  if (!res.ok) throw new Error("Failed to fetch question");
  return await res.json();
};

export const submitAnswer = async (
  data: SubmitAnswerRequest
): Promise<SubmitAnswerResponse> => {
  const res = await fetch(`${API_BASE}/play`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to submit answer");
  return await res.json();
};
