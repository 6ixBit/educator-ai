"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import SearchHeader from "@/components/SearchHeader";
import { fetchStudyCardsForDeck } from "./actions";
import { useDecks } from "./hooks";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useState } from "react";
import useStore from "../store";
import { useUserAuth } from "@/hooks/useUserAuth";

export default function Page() {
  const intl = useIntl();
  const [searchTerm, setSearchTerm] = useState("");
  const { userID } = useUserAuth();
  // @ts-ignore
  const supabase = useStore((state) => state?.supabase);

  const decks = useDecks({ supabase, userID }).decks;
  const [Decks, setDecks] = useState({});

  useEffect(() => {
    if (Array.isArray(decks)) {
      decks.forEach(async (deck) => {
        const cards = await fetchStudyCardsForDeck(supabase, deck.id);
        const deckCardsMap = { [deck.name]: cards };

        setDecks((prevDecks) => ({
          ...prevDecks,
          ...deckCardsMap,
        }));
      });
    }
  }, [decks]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className="flex flex-col justify-center mt-6">
      <SearchHeader handleSearch={handleSearch} />

      <Card className="flex flex-col w-full p-4 bg-white rounded-lg shadow-md">
        <CardHeader className="flex flex-row items-baseline justify-between pb-2">
          <CardTitle className="text-lg font-bold">
            {intl.formatMessage({ id: "decks.title" })}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-wrap">
          {Object.entries(Decks).map(([deckName, cards], index) => (
            <div
              key={index}
              className="p-4 m-2 bg-white rounded-lg shadow-md w-60 h-32 flex-shrink-0"
            >
              <div>{deckName}</div>
              <div className="pt-4">{cards.length} cards</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
