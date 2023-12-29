"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import FlashCards from "@/app/decks/Flashcards";
import RandomizeLogo from "@/components/RandomizeLogo";
import { Separator } from "@/components/ui/separator";
import { useDeck } from "../../hooks";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import useStore from "@/app/store";

export default function Page() {
  const pathname = usePathname();
  const router = useRouter();
  const [userDeck, setDeck] = useState<any>();
  // @ts-ignore
  const supabase = useStore((state) => state?.supabase);
  const deck_uuid = pathname.split("/")[2];

  const { data: deck, isLoading: isDeckLoading } = useDeck({
    supabase,
    deck_uuid,
  });

  useEffect(() => {
    if (deck && !isDeckLoading) {
      setDeck(deck);
    }
  }, [deck]);

  const handleStart = () => {
    // TODO: Start swapping of cards
    console.log("start");
    return null;
  };

  const handleRandomize = () => {
    // TODO: Randomize the order.
    console.log("Randomize.");

    return null;
  };

  return (
    <>
      <div className="sm:px-7 px-1">
        <div>
          <Button variant="outline" size="sm" onClick={() => router.back()}>
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
            </svg>
            Deck
          </Button>
          <Separator className="mt-4" />
        </div>

        <div>
          {userDeck && !isDeckLoading && <FlashCards options={userDeck} />}
        </div>
        <div className="flex justify-center items-center gap-2 mt-8">
          <Button onClick={handleStart} className="bg-green-500 text-white">
            Start
          </Button>
          <Button onClick={handleRandomize}>
            <RandomizeLogo />
            <p className="px-2">Randomize Order</p>
          </Button>
        </div>
      </div>
    </>
  );
}
