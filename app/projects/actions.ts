import { SupabaseClient } from "@supabase/supabase-js";

export const fetchProjects = async (supabase: SupabaseClient, id: string) => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", id)
    .order("created_at", { ascending: false });

  if (data) {
    return data;
  }

  return error;
};

export const addProjectToDB = async (
  supabase: SupabaseClient,
  content: string,
  title: string,
  user_id: string
) => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .insert([{ content, user_id, title }])
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error Adding Project: ", error);
  }
};
