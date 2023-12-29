"use client";

import { useQuery, useQueryClient } from "react-query";

import { SupabaseClient } from "@supabase/supabase-js";
import { fetchStudyCardsFromDeck } from "../decks/actions";
import { getDeckIDFromUUID } from "./actions";
import { toast } from "sonner";

interface IUseDeck {
  supabase: SupabaseClient;
  deck_id?: string;
  deck_uuid?: string;
}

export const useDeck = ({ deck_id, supabase, deck_uuid }: IUseDeck) => {
  const fetchDeck = async () => {
    if (deck_uuid) {
      const resolvedDeckID = await getDeckIDFromUUID(supabase, deck_uuid);
      console.log("resolved deck ID: ", resolvedDeckID);

      return fetchStudyCardsFromDeck(supabase, resolvedDeckID.toString());
    } else {
      return fetchStudyCardsFromDeck(supabase, deck_id || "");
    }
  };

  return useQuery({
    queryKey: "fetchStudyCardsFromDeck",
    queryFn: fetchDeck,
    onError: (error) => {
      toast("Failed to fetch deck, please try again.");
    },
    staleTime: 20000,
  });
};
