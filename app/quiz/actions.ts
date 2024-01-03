import { SupabaseClient } from "@supabase/supabase-js";

export const GetQuizForProject = async (
  supabase: SupabaseClient,
  project_id: string
) => {
  const { data, error } = await supabase
    .from("quiz")
    .select("*")
    .eq("project_id", project_id);

  if (data) {
    return data;
  }

  return error;
};

export const GetAllQuizzes = async (
  supabase: SupabaseClient,
  user_uuid: string
) => {
  const { data, error } = await supabase
    .from("quiz")
    .select("*")
    .eq("user_uuid", user_uuid);

  if (data) {
    return data;
  }

  return error;
};

export const GetQuizByUUID = async (
  supabase: SupabaseClient,
  quiz_uuid: string
) => {
  const { data, error } = await supabase
    .from("quiz")
    .select("*")
    .eq("quiz_uuid", quiz_uuid);

  if (data) {
    return data;
  }

  return error;
};

export const incrementQuizAttempt = async (
  supabase: SupabaseClient,
  quiz_uuid: string,
  current_attempts: number
) => {
  const { data, error } = await supabase
    .from("quiz")
    .update({ attempts: current_attempts + 1 })
    .eq("quiz_uuid", quiz_uuid)
    .select();

  if (error) {
    throw error;
  }

  return data;
};

export const addQuizPercentageScore = async (
  supabase: SupabaseClient,
  quiz_uuid: string,
  current_scores: [],
  score: number
) => {
  const { data, error } = await supabase
    .from("quiz")
    .update({ user_scores: [...current_scores, score] })
    .eq("quiz_uuid", quiz_uuid);

  if (error) {
    throw error;
  }

  return data;
};
