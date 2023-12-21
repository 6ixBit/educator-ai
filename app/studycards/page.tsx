"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import SearchHeader from "@/components/SearchHeader";
import { fetchStudyCardsFromDeck } from "./actions";
import { truncate } from "@/utility";
import { useDecks } from "./hooks";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useStore from "../store";
import { useUserAuth } from "@/hooks/useUserAuth";

export default function Page() {
  const intl = useIntl();
  const { userID } = useUserAuth();
  // @ts-ignore
  const supabase = useStore((state) => state?.supabase);
  const router = useRouter();

  const { isDecksLoading, decks } = useDecks({ supabase, userID });
  const [deckDataMap, setDeckDataMap] = useState({});

  useEffect(() => {
    if (Array.isArray(decks)) {
      decks.forEach(async (deck) => {
        const cards = await fetchStudyCardsFromDeck(supabase, deck.id);
        const deckCardsMap = {
          [deck.name]: { cards, deck_uuid: deck.deck_uuid },
        };

        setDeckDataMap((prevDecks) => ({
          ...prevDecks,
          ...deckCardsMap,
        }));
      });
    }
  }, [decks]);

  //   const [searchTerm, setSearchTerm] = useState("")

  //   const handleSearch = (value: string) => {
  //     setSearchTerm(value);
  //   };

  //   const filteredDecks = Array.isArray(Decks)
  //     ? Object.entries(Decks).filter(([deckName]) =>
  //         deckName.toLowerCase().includes(searchTerm.toLowerCase())
  //       )
  //     : [];

  return (
    <div className="flex flex-col justify-center mt-6">
      {/* <SearchHeader handleSearch={handleSearch} /> */}

      <Card className="flex flex-col w-full p-4 bg-white rounded-lg shadow-md mt-10">
        <CardHeader className="flex flex-row items-baseline justify-between pb-2">
          <CardTitle className="text-lg font-bold">
            {intl.formatMessage({ id: "decks.title" })}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-wrap">
          {Object.entries(deckDataMap).map(([deckName, deckData], index) => (
            <div
              key={index}
              className="p-4 m-2 bg-white rounded-lg shadow-md w-60 h-32 flex-shrink-0 relative"
              onClick={() => router.push(`/deck/${deckData.deck_uuid}`)}
            >
              <div className="font-semibold font-sans">
                {truncate(deckName, 30)}
              </div>
              <div className="pt-4 absolute bottom-0 pb-4 text-gray-500">
                <span className="font-bold">{deckData.cards.length}</span> cards
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}