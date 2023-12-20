import { fetchDecks } from "./actions";
import { useQuery } from "react-query";

interface IuseDecks {
  userID: string;
  supabase: any;
}

export const useDecks = ({ userID, supabase }: IuseDecks) => {
  const {
    isLoading: isDecksLoading,
    error: decksLoadError,
    data: decks,
  } = useQuery({
    queryKey: "fetchDecks",
    queryFn: () => fetchDecks(supabase, userID),
    enabled: !!userID,
    onError: (error) => {
      console.log("fetch items error: ", error);
    },
  });

  return { isDecksLoading, decksLoadError, decks };
};
