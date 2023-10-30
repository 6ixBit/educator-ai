"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

import Summary from "../components/summary";
import FlashCards from "../components/flashcards";
import RadioGroupContainer from "@/components/RadioGroup/RadioGroupContainer";
import SkeletonLoader from "../components/SkeletonLoader";
import { fetchUser } from "../actions";
import useWindowSize from "@/hooks/useWindowSize";
import { useQuery } from "react-query";

export default function Page({ params }: { params: { id: string } }) {
  const supabase = createClientComponentClient();
  const [radioGrpVal, setRadioGrpVal] = useState<any>(null);
  const [isUserAuthorized, setisUserAuthorized] = useState<any>(true);
  const { isMobile } = useWindowSize();

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: userData,
  } = useQuery({
    queryKey: "userData",
    queryFn: () => fetchUser(supabase),
  });

  if (errorUser) {
    console.log("get text error: ", errorUser);
    return;
  }

  // @ts-ignore
  const userID: string = userData?.user?.id;

  const fetchContent = async () => {
    const { data, error } = await supabase
      .from("text-content")
      .select("content, user_id, ai_response")
      .eq("id", BigInt(params.id));

    if (error) {
      return error;
    }
    return data[0];
  };

  const {
    isLoading: isLoadingTextContent,
    error,
    data: textContent,
  } = useQuery({
    queryKey: "textContent",
    queryFn: () => fetchContent(),
    enabled: !!userID,
  });

  if (error) {
    console.log("GET error: ", error);
    throw error;
  }

  if (!isLoadingTextContent && textContent) {
    // @ts-ignore
    if (textContent.user_id !== userID) {
      console.log("no auth");
      setisUserAuthorized(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center max-w-full">
      {isLoadingUser || isLoadingTextContent ? (
        <div className="mt-4">
          <SkeletonLoader width={isMobile ? 120 : 260} height={70} />
        </div>
      ) : isUserAuthorized ? (
        <>
          <Summary
            // @ts-ignore
            title={textContent?.ai_response?.title || "No title"}
            // @ts-ignore
            summary={textContent?.content || "No summary found."}
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
