"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import HamburgerMenu from "@/components/HamburgerMenu";
import LoginModal from "@/components/LoginModal";
import SearchHeader from "@/components/SearchHeader";
import { Skeleton } from "@mui/material";
import { fetchStudyCardsFromDeck } from "./actions";
import { truncate } from "@/utility";
import { useDecks } from "./hooks";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useStore from "../store";
import { useUserAuth } from "../hooks";
import useWindowSize from "@/hooks/useWindowSize";

export default function Page() {
  const intl = useIntl();
  const { userID, showLoginModal, setShowLoginModal } = useUserAuth();
  // @ts-ignore
  const supabase = useStore((state) => state?.supabase);
  const router = useRouter();
  const { isMobile } = useWindowSize();

  const { isDecksLoading, decksLoadError, decks } = useDecks({
    supabase,
    userID,
  });
  const [deckDataMap, setDeckDataMap] = useState<{
    [key: string]: { cards: [{}]; deck_name: string };
  }>({});

  useEffect(() => {
    if (Array.isArray(decks)) {
      decks.forEach(async (deck) => {
        const cards = await fetchStudyCardsFromDeck(supabase, deck.id);
        const deckCardsMap = {
          [deck.deck_uuid]: { cards, deck_name: deck.name },
        };

        setDeckDataMap((prevDecks) => ({
          ...prevDecks,
          ...deckCardsMap,
        }));
      });
    }
  }, [decks]);

  const getDeckCount = (deck_uuid: string) => {
    return deckDataMap[deck_uuid]?.cards?.length || 0;
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const filteredDecks = Array.isArray(decks)
    ? decks.filter((deck) =>
        deck.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="flex flex-col justify-center mt-1">
      <LoginModal
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
      />

      <div className="flex flex-row">
        {isMobile && (
          <div className="pl-4">
            <HamburgerMenu
              items={[
                {
                  name: "Projects",
                  url: "/projects",
                },
                {
                  name: "Study cards",
                  url: "/studycards",
                },
                {
                  name: "Quiz",
                  url: "/quiz",
                },
              ]}
            />
          </div>
        )}
        <div className=" w-full flex-col">
          <SearchHeader handleSearch={handleSearch} />
          {Array.isArray(filteredDecks) && (
            <div className="font-sans text-slate-300 text-center p-2 h-6 flex-row mb-6">
              <p className="text-blue-p px-1 text-center">
                <b>{filteredDecks.length}</b>{" "}
                {intl.formatMessage({ id: "decks.items" })}
              </p>
            </div>
          )}
        </div>
      </div>

      <Card className="flex flex-col w-full p-4 bg-white rounded-lg shadow-md mt-5">
        <CardHeader className="flex flex-row items-baseline justify-between pb-2">
          <CardTitle className="text-lg font-bold">
            {intl.formatMessage({ id: "decks.title" })}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-wrap justify-center">
          {isDecksLoading ? (
            <div className="flex flex-col gap-4 sm:flex-row">
              <Skeleton variant="rounded" width={200} height={150} />
              <Skeleton variant="rounded" width={200} height={150} />
              <Skeleton variant="rounded" width={200} height={150} />
            </div>
          ) : decksLoadError ? (
            <div>Error: Loading projects</div>
          ) : filteredDecks.length === 0 ? (
            <div>You have 0 decks</div>
          ) : (
            filteredDecks.map((deck, index) => (
              <div
                key={index}
                className="p-4 m-2 bg-white rounded-lg shadow-md w-60 h-32 flex-shrink-0 relative border cursor-pointer border-gray-300  hover:border-blue-600"
                onClick={() => router.push(`/deck/${deck.deck_uuid}`)}
                style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="font-semibold font-sans">
                  {truncate(deck.name, 30)}
                </div>

                <div className="pt-4 absolute bottom-0 pb-4 text-gray-500">
                  <span className="font-bold">
                    {getDeckCount(deck.deck_uuid)}
                  </span>{" "}
                  cards
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
