import { SupabaseClient } from "@supabase/supabase-js";
import { fetchStudyCardsFromDeck } from "../decks/actions";
import { useQuery } from "react-query";

interface IUseDeck {
  supabase: SupabaseClient;
  deck_id: string;
}

export const useDeck = ({ deck_id, supabase }: IUseDeck) => {
  const {
    isLoading: isDeckLoading,
    error: deckLoadError,
    data: deck,
  } = useQuery({
    queryKey: "fetchStudyCardsFromDeck",
    queryFn: () => fetchStudyCardsFromDeck(supabase, deck_id),
    onError: (error) => {
      console.log("fetch study cards from deck error: ", error);
    },
  });

  return { isDeckLoading, deckLoadError, deck };
};
