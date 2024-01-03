"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import FlashCards from "@/app/decks/Flashcards";
import RandomizeLogo from "@/components/icons/RandomizeLogo";
import { Separator } from "@/components/ui/separator";
import { randomizeArray } from "@/lib/utils";
import { toast } from "sonner";
import { useDeck } from "../../hooks";
import { useGetDeckMetaData } from "../../hooks";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import useStore from "@/app/store";

export default function Page() {
  const pathname = usePathname();
  const router = useRouter();
  const [deck, setDeck] = useState<any>();
  const [deckName, setDeckName] = useState("");
  const [isDeckEmpty, setIsDeckEmpty] = useState(false);
  // @ts-ignore
  const supabase = useStore((state) => state?.supabase);
  const deck_uuid = pathname.split("/")[2];

  const { data, isLoading: isDeckLoading } = useDeck({
    supabase,
    deck_uuid,
  });

  // GET CARDS ASSOCIATED WITH DECK
  useEffect(() => {
    if (data && !isDeckLoading) {
      setDeck(data);

      if (data.length === 0) {
        setIsDeckEmpty(true);
      }
    }
  }, [data]);

  const { data: metaData, isLoading: isMetaDataLoading } = useGetDeckMetaData(
    supabase,
    deck && deck.length > 0 ? deck[0].deck_id : undefined
  );

  // GET META DATA
  useEffect(() => {
    if (metaData && metaData.length > 0 && !isMetaDataLoading) {
      setDeckName(metaData[0].name);
    }
  }, [metaData, isMetaDataLoading]);

  const handleStart = () => {
    // TODO: Start swapping of cards
    console.log("start");
    return null;
  };

  const handleRandomize = () => {
    setDeck(randomizeArray(deck));
    toast("Shuffled!");
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

        <div className="text-black pt-4">{deckName}</div>
        <div>{deck && !isDeckLoading && <FlashCards options={deck} />}</div>
        <div className="flex justify-center items-center gap-2 mt-8">
          <Button
            onClick={handleStart}
            className="bg-green-500 text-white"
            disabled={isDeckEmpty}
          >
            Start
          </Button>
          <Button onClick={handleRandomize} disabled={isDeckEmpty}>
            <RandomizeLogo />
            <p className="px-2">Randomize Order</p>
          </Button>
        </div>
      </div>
    </>
  );
}
