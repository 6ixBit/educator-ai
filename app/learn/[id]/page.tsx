"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

import Summary from "../components/summary";
import FlashCards from "../components/flashcards";
import RadioGroupContainer from "@/components/RadioGroup/RadioGroupContainer";
import { useQuery } from "react-query";
import { text } from "stream/consumers";

export default function Page({ params }: { params: { id: string } }) {
  const supabase = createClientComponentClient();
  const [radioGrpVal, setRadioGrpVal] = useState<any>(null);
  const [isUserAuthorized, setisUserAuthorized] = useState<any>(true);

  const fetchUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (data) {
      return data;
    }

    return error;
  };

  const fetchContent = async () => {
    const { data, error } = await supabase
      .from("text-content")
      .select("content, user_id")
      .eq("id", BigInt(params.id));

    if (data) {
      return data;
    }

    return error;
  };

  const { isLoading, error, data: userData } = useQuery("userData", fetchUser);
  const {
    isLoading: isLoadingTextContent,
    error: errorTextContent,
    data: textContent,
  } = useQuery("textContent", fetchContent);

  if (userData && textContent) {
    if (
      // @ts-ignore
      userData?.user?.id !== textContent[0].user_id &&
      isUserAuthorized
    ) {
      setisUserAuthorized(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center max-w-full">
      {isUserAuthorized ? (
        <>
          <p className="text-white font-md">Your Learn ID: {params.id}</p>

          <Summary
            title="Example"
            summary={
              (textContent &&
                Array.isArray(textContent) &&
                textContent[0]?.content) ||
              ""
            }
          />

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
        </>
      ) : (
        <>
          <h1 className="text-white font-lg">Oi, stop snooping!</h1>

          <p className="text-gray-800 font-md">
            This is not your post, go to your own.
          </p>
        </>
      )}
    </div>
  );
}
