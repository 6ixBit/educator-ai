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
  const [deckData, setDeckData] = useState({});
  const supabase = useStore((state) => state?.supabase);

  useEffect(() => {
    const response = getDeckIDFromUUID(supabase, deckUUID);
    response.then((result) => {
      setDeckData({ ...result[0] });
    });
  }, [deckUUID, supabase]);

  useEffect(() => {
    if (deckData) {
      fetchStudyCardsFromDeck(supabase, deckData.id).then((result) => {
        const validStudyCards = result
          .filter((card) => card.front && card.back)
          .map(({ front, back }) => ({ front, back }));
        setStudyCards(validStudyCards);
      });
    }
  }, [deckData, supabase]);

  return (
    <div className="flex flex-col justify-center mt-6">
      <h1 className="font-bold">{deckData.name}</h1>
      {studyCards.length} cards
      <FlashCards options={studyCards} />
    </div>
  );
}
