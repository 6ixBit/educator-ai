"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

import Summary from "../components/summary";
import FlashCards from "../components/flashcards";
import RadioGroupContainer from "@/components/RadioGroup/RadioGroupContainer";

export default function Page({ params }: { params: { id: string } }) {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<any>(null);
  const [content, setContent] = useState<any>(null);
  const [radioGrpVal, setRadioGrpVal] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data) {
        setUser(data);
        // TODO: If userID does not match userID from post then render opaque modal on top of page.
      }
    };

    const getContent = async () => {
      const { data, error } = await supabase
        .from("text-content")
        .select("content")
        .eq("id", BigInt(params.id));

      if (error) {
        throw error;
      }

      setContent(data);
      console.log("Received DB data: ", content, data);
    };

    getContent();
    getUser();
  }, [supabase, setUser, setContent]);

  return (
    <div className="flex flex-col justify-center items-center max-w-full">
      <p className="text-white font-md">Your Learn ID: {params.id}</p>
      <Summary title="Example" summary={content[0].content} />
      <FlashCards />
      <div className="mt-12 mb-4">
        <h1 className="text-lg font-medium text-white text-center pb-4 underline">
          Quiz
        </h1>
        <RadioGroupContainer
          handleValueChange={(value: any) => {
            setRadioGrpVal(value);
          }}
          value={radioGrpVal}
        >
          {radioGrpVal && (
            <h1 className="text-white">Your choice: {radioGrpVal}</h1>
          )}
        </RadioGroupContainer>
      </div>
    </div>
  );
}
