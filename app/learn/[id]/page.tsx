// @ts-nocheck
"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

import Summary from "../components/Summary";
import FlashCards from "../components/Flashcards";
import RadioGroupContainer from "@/components/RadioGroup/RadioGroupContainer";
import SkeletonLoader from "../components/SkeletonLoader";
import { fetchUser } from "../actions";
import useWindowSize from "@/hooks/useWindowSize";
import { useQuery } from "react-query";
import CaseStudy from "../components/CaseStudy";

export default function Page({ params }: { params: { id: string } }) {
  const supabase = createClientComponentClient();
  const [radioGrpVal, setRadioGrpVal] = useState<any>(null); // TODO: Gross pls make into it's own component.
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
      .select(
        "content, user_id, title, flash_cards, case_study_scenario, summary_of_content, case_study_questions, case_study_answers"
      )
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
    console.log("returned vals: ", textContent);
    if (textContent.user_id !== userID) {
      setisUserAuthorized(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center max-w-full w-9/12 sm:w-8/12 lg:w-9/12">
      {isLoadingUser || isLoadingTextContent ? (
        <div className="mt-4">
          <SkeletonLoader width={isMobile ? 120 : 260} height={70} />
        </div>
      ) : isUserAuthorized ? (
        <>
          <Summary
            // @ts-ignore
            title={textContent?.title || "No title"}
            // @ts-ignore
            summary={textContent?.content || "No summary found."}
          />

          {/* @ts-ignore */}
          {textContent.flash_cards && (
            <FlashCards options={textContent.flash_cards} />
          )}

          {/* @ts-ignore */}
          {textContent?.case_study_scenario && (
            <CaseStudy text={textContent?.case_study_scenario} />
          )}

          <div className="mt-12 mb-4">
            <h1 className="text-lg font-medium text-white text-center pb-4">
              Quiz
            </h1>

            <RadioGroupContainer
              question={textContent?.case_study_questions[0]}
              options={textContent?.case_study_answers}
              handleValueChange={(value: any) => {
                setRadioGrpVal(value);
              }}
              value={radioGrpVal}
            >
              {radioGrpVal && (
                <h1 className="mt-4 text-md text-lime-500">
                  Your choice: {radioGrpVal}
                </h1>
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
