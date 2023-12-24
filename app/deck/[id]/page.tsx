"use client";

import { useEffect, useState } from "react";

import { Button } from "@radix-ui/themes";
import FlashCards from "@/app/studycards/Flashcards";
import Link from "next/link";
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
    <div className="flex flex-col justify-center mt-1">
      <div className="sm:px-7 px-1">
        <Link
          href="/projects"
          className=" py-2 px-4 w-28 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>{" "}
          Decks
        </Link>
      </div>
      <LoginModal
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
      />
      <div className="w-8/12 pl-8">
        <div className="flex justify-between mt-8">
          <h1 className="font-bold text-lg">
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
