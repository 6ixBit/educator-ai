"use client";

import { addStudyCard, deleteStudyCard, getDeckMetaData } from "./actions";
import { useMutation, useQuery, useQueryClient } from "react-query";

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

      return fetchStudyCardsFromDeck(supabase, resolvedDeckID[0].id);
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
  });
};

export const useDeckMetaData = (supabase: SupabaseClient, deck_id: number) => {
  return useQuery({
    queryKey: ["deckMetaData", deck_id],
    queryFn: () => getDeckMetaData(supabase, deck_id),
    onError: (error) => {
      toast("Failed to fetch deck metadata, please try again later.");
    },
    enabled: !!deck_id,
  });
};

export const useAddStudyCardToDeck = (supabase: SupabaseClient) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({
      user_id,
      front,
      back,
      deck_uuid,
      deck_id,
    }: {
      user_id: string;
      front: string;
      back: string;
      deck_uuid: string;
      deck_id: number;
    }) => addStudyCard(supabase, user_id, front, back, deck_id, deck_uuid),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("fetchStudyCardsFromDeck");
      },
    }
  );

  return mutation;
};

export const useDeleteStudyCardFromDeck = (supabase: SupabaseClient) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ card_uuid }: { card_uuid: string }) =>
      deleteStudyCard(supabase, card_uuid),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("fetchStudyCardsFromDeck");
      },
    }
  );

  return mutation;
};
