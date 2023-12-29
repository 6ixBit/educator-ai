"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { Modal } from "./Modal";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAddStudyCardToDeck } from "@/app/deck/hooks";
import { useDeck } from "@/app/deck/hooks";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import useStore from "@/app/store";
import { useUserAuth } from "@/hooks/useUserAuth";

export default function ({
  showModal,
  setShowStudyCardModal,
}: {
  showModal: boolean;
  setShowStudyCardModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const pathname = usePathname();
  const deck_uuid = pathname.split("/").pop() ?? "";
  const { userID } = useUserAuth();
  const supabase = useStore((state) => state?.supabase);
  const { data: deck, isLoading: isDeckLoading } = useDeck({
    supabase,
    deck_uuid,
  });
  const [deckID, setDeckID] = useState<number | null>(0);

  const { mutate } = useAddStudyCardToDeck(supabase);

  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");

  useEffect(() => {
    if (!isDeckLoading && deck) {
      setDeckID(deck[0].deck_id);
    }
  }, [deck, isDeckLoading]);

  const handleFrontChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFrontText(event?.target.value);
  };

  const handleBackChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBackText(event.target.value);
  };

  const handleSubmit = () => {
    if (frontText !== "" && backText !== "") {
      mutate({
        user_id: userID,
        front: frontText,
        back: backText,
        deck_id: deckID || 0,
        deck_uuid: deck_uuid,
      });

      toast("Added new card.");
      setShowStudyCardModal(false);
    } else {
      console.log("we else out.");
    }
  };

  return (
    <Modal
      open={showModal}
      onOpenChange={setShowStudyCardModal}
      title="Add new card"
      description={
        <div className="grid grid-cols-1">
          <Tabs defaultValue="front" className="pt-3">
            <div className=" mx-auto flex justify-center mb-4">
              <TabsList className="">
                <TabsTrigger value="front">Front</TabsTrigger>
                <TabsTrigger value="back">Back</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="front" className="text-center">
              <Textarea
                id="front"
                placeholder="Front text goes here"
                onChange={handleFrontChange}
                value={frontText}
              />
            </TabsContent>
            <TabsContent value="back" className="text-center">
              <Textarea
                id="back"
                placeholder="Back text goes here"
                onChange={handleBackChange}
                value={backText}
              />
            </TabsContent>
          </Tabs>

          <Button size="sm" className="mt-6" onClick={handleSubmit}>
            Submit{" "}
          </Button>
        </div>
      }
    />
  );
}
