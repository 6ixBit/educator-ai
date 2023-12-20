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

export const fetchStudyCardsForDeck = async (supabase: SupabaseClient, deckId: string) => {
    const { data, error } = await supabase
        .from("studycards")
        .select("*")
        .eq("deck_id", deckId)
        .order("created_at", { ascending: false });

    if (data) {
        return data;
    }

    return error; 
}
