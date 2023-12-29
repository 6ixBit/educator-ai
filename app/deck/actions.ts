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

export const addStudyCard = async (
  supabase: SupabaseClient,
  user_id: string,
  front: string,
  back: string,
  deck_id: number,
  deck_uuid: string
) => {
  const { data, error } = await supabase
    .from("studycards")
    .insert([{ user_id, front, back, deck_id, deck_uuid }])
    .select();

  if (error) {
    throw error;
  }

  return data;
};

export const getDeckMetaData = async (
  supabase: SupabaseClient,
  deck_id: number
) => {
  const { data, error } = await supabase
    .from("decks")
    .select("name, is_private")
    .eq("id", deck_id);

  if (error) {
    throw error;
  }

  return data;
};
