export type initialStateType = {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};
