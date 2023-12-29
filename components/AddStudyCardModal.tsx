"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addStudyCard, getDeckIDFromUUID } from "@/app/deck/actions";

import { Button } from "@/components/ui/button";
import { Modal } from "./Modal";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useQueryClient } from "react-query";
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
  const [deckID, setDeckID] = useState<string | null>("");
  const { userID } = useUserAuth();
  const queryClient = useQueryClient();

  // @ts-ignore
  const supabase = useStore((state) => state?.supabase);
  const pathname = usePathname();
  const deck_uuid = pathname.split("/").pop() ?? "";

  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");

  useEffect(() => {
    getDeckIDFromUUID(supabase, deck_uuid).then((res) => {
      setDeckID(res[0].id);
    });
  }, []);

  const handleFrontChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFrontText(event?.target.value);
  };

  const handleBackChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBackText(event.target.value);
  };

  const handleSubmit = () => {
    if (frontText !== "" && backText !== "") {
      // TODO: Trigger an error to show.
      addStudyCard(supabase, userID, frontText, backText, deckID || "").then(
        (res) => {
          console.log({ res, status: "success" });
        }
      );

      queryClient.invalidateQueries("fetchStudyCardsFromDeck");
      toast("Added new card.");
      setShowStudyCardModal(false);
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
