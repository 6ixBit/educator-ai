import { SupabaseClient } from "@supabase/supabase-js";

export const fetchDecks = async (supabase: SupabaseClient, id: string) => {
    const { data, error } = await supabase
      .from("decks")
      .select("*")
      .eq("user_id", id)
      .order("created_at", { ascending: false });
  
    if (data) {
      return data;
    }
  
    return error;
};

