"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

import Summary from "../components/summary";
import FlashCards from "../components/flashcards";
import RadioGroupContainer from "@/components/RadioGroup/RadioGroupContainer";
import SkeletonLoader from "../components/SkeletonLoader";
import { fetchUser } from "../actions";
import { useQuery } from "react-query";

export default function Page({ params }: { params: { id: string } }) {
  const supabase = createClientComponentClient();
  const [radioGrpVal, setRadioGrpVal] = useState<any>(null);
  const [isUserAuthorized, setisUserAuthorized] = useState<any>(true);

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

  // TODO: Leverage hold on query call than this.

  const {
    isLoading,
    error,
    data: userData,
  } = useQuery("userData", () => fetchUser(supabase));
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
      {isLoading || isLoadingTextContent ? (
        <div className="mt-4">
          <SkeletonLoader width={260} height={70} />
        </div>
      ) : isUserAuthorized ? (
        <>
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
        <div className="mt-4 text-white font-bold text-2xl">
          Nope, no access for you.
        </div>
      )}
    </div>
  );
}
