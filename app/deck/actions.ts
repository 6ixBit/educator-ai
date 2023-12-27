import { SupabaseClient } from "@supabase/supabase-js";

export const getDeckIDFromUUID = async (
  supabase: SupabaseClient,
  deck_uuid: string
) => {
  const { data, error } = await supabase
    .from("decks")
    .select("*")
    .eq("deck_uuid", deck_uuid);

  if (data) {
    return data;
  }

  return error;
};

export const deleteStudyCard = async (
  suapbase: SupabaseClient,
  card_uuid: string
) => {
  const { error } = await suapbase
    .from("studycards")
    .delete()
    .eq("card_uuid", card_uuid);

  return error;
};
