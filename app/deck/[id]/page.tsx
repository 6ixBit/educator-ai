"use client";

import { useEffect, useState } from "react";

import FlashCards from "@/app/studycards/Flashcards";
import { fetchStudyCardsFromDeck } from "@/app/studycards/actions";
import { getDeckIDFromUUID } from "../actions";
import useStore from "@/app/store";

export default function Page({
  params: { id: deckUUID },
}: {
  params: { id: string };
}) {
  const [studyCards, setStudyCards] = useState([]);
  const [deckID, setDeckID] = useState("");
  const supabase = useStore((state) => state?.supabase);

  useEffect(() => {
    const response = getDeckIDFromUUID(supabase, deckUUID);
    response.then((result) => {
      setDeckID(result[0]?.id);
    });
  }, [deckUUID, supabase]);

  useEffect(() => {
    if (deckID) {
      fetchStudyCardsFromDeck(supabase, deckID).then((result) => {
        const validStudyCards = result
          .filter((card) => card.front && card.back)
          .map(({ front, back }) => ({ front, back }));
        setStudyCards(validStudyCards);
      });
    }
  }, [deckID, supabase]);

  return (
    <div className="flex flex-col justify-center mt-6">
      <FlashCards options={studyCards} />
    </div>
  );
}
