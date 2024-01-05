"use client";

import {
  addStudyCard,
  deleteStudyCard,
  getDeckMetaData,
  incrementStudyAttempt,
} from "./actions";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { SupabaseClient } from "@supabase/supabase-js";
import { fetchStudyCardsFromDeck } from "../decks/actions";
import { toast } from "sonner";
import useStore from "../store";

interface IUseDeck {
  supabase: SupabaseClient;
  deck_id?: string;
  deck_uuid?: string;
}

export const useDeck = ({ deck_id, supabase, deck_uuid }: IUseDeck) => {
  const fetchDeck = async () => {
    if (deck_uuid) {
      const resolvedDeckID = await getDeckMetaData(supabase, deck_uuid);

      if (Array.isArray(resolvedDeckID) && resolvedDeckID.length > 0) {
        return fetchStudyCardsFromDeck(supabase, resolvedDeckID[0].id);
      }
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

export const useGetDeckMetaData = (deck_uuid: string) => {
  // @ts-ignore
  const supabase = useStore((state) => state?.supabase);

  return useQuery({
    queryKey: ["getDeckMetaData", deck_uuid],
    queryFn: async () => {
      const result = await getDeckMetaData(supabase, deck_uuid);
      return result;
    },
    onError: (error) => {
      toast("Failed to fetch deck, please try again later.");
    },
    enabled: !!deck_uuid,
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

export const useIncrementStudyAttempt = () => {
  // @ts-ignore
  const supabase = useStore((state) => state?.supabase);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({
      deck_uuid,
      current_attempts,
    }: {
      deck_uuid: string;
      current_attempts: number;
    }) => incrementStudyAttempt(supabase, deck_uuid, current_attempts),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getDeckMetaData");
      },
    }
  );

  return mutation;
};
