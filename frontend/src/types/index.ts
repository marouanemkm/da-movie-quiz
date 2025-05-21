export type GameQuestion = {
  hash: string;
  movie: string;
  actor: string;
  movieImage: string;
  actorImage: string;
};

export type SubmitAnswerRequest = {
  hash: string;
  answer: "yes" | "no";
};

export type SubmitAnswerResponse = {
  correct: boolean;
};
