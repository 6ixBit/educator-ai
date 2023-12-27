"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { Modal } from "./Modal";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function ({
  showModal,
  setShowStudyCardModal,
}: {
  showModal: boolean;
  setShowStudyCardModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");

  const handleFrontChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFrontText(event?.target.value);
  };

  const handleBackChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBackText(event.target.value);
  };

  const handleSubmit = () => {
    // TODO: Check whether front and back are not empty, if they are. Show the user a warning and dont submit.

    return "";
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
