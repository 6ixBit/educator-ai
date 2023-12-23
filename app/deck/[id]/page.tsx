"use client";

import { useEffect, useState } from "react";

import { Button } from "@radix-ui/themes";
import FlashCards from "@/app/studycards/Flashcards";
import LoginModal from "@/components/LoginModal";
import { fetchStudyCardsFromDeck } from "@/app/studycards/actions";
import { getDeckIDFromUUID } from "../actions";
import useStore from "@/app/store";
import { useUserAuth } from "@/hooks/useUserAuth";

export default function Page({
  params: { id: deckUUID },
}: {
  params: { id: string };
}) {
  const { showLoginModal, setShowLoginModal } = useUserAuth();
  const [studyCards, setStudyCards] = useState([]);
  const [deckData, setDeckData] = useState({});
  // @ts-ignore
  const supabase = useStore((state) => state?.supabase);

  useEffect(() => {
    // @ts-ignore
    const response = getDeckIDFromUUID(supabase, deckUUID);
    response.then((result) => {
      // @ts-ignore
      setDeckData({ ...result[0] });
    });
  }, [deckUUID, supabase]);

  useEffect(() => {
    if (deckData) {
      // @ts-ignore
      fetchStudyCardsFromDeck(supabase, deckData.id).then((res) => {
        const validStudyCards =
          Array.isArray(res) &&
          res
            .filter((card) => card.front && card.back)
            .map(({ front, back }) => ({ front, back }));
        // @ts-ignore
        setStudyCards(validStudyCards);
      });
    }
  }, [deckData, supabase]);

  return (
    <div className="flex flex-col justify-center mt-16">
      <LoginModal
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
      />
      <div className="w-8/12 pl-20">
        <div className="flex justify-between">
          <h1 className="font-bold">
            {(deckData as { name: string })?.name || "None"}
          </h1>
          <Button variant="outline">Practise deck</Button>
        </div>
        {studyCards.length} cards
        <FlashCards options={studyCards} />
      </div>
    </div>
  );
}
