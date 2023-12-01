// @ts-nocheck
"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useQuery } from "react-query";

import CaseStudy from "../features/CaseStudy";
import CollapsableSection from "../components/CollapsableSection";
import FlashCards from "../features/Flashcards";
import Overview from "../features/Overview";
import SkeletonLoader from "../components/SkeletonLoader";
import Summary from "../features/Summary";
import { Quiz } from "../features/Quiz";

import { fetchUser } from "../../actions";
import useWindowSize from "@/hooks/useWindowSize";

export default function Page({ params }: { params: { id: string } }) {
  const supabase = createClientComponentClient();
  const [isUserAuthorized, setisUserAuthorized] = useState<any>(true);
  const { isMobile } = useWindowSize();
  const grade = 89;

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
      .select("*")
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
          <Overview title={textContent?.title} date={textContent.created_at} />

          <div className="mt-10">
            <CollapsableSection
              title="Summary"
              subtitle={`${textContent?.key_points?.length || 0} key points`}
            >
              <Summary
                title={textContent?.title || "No title"}
                date={textContent.created_at}
                summary={textContent?.content || "No summary found"}
                keypoints={textContent?.key_points || [{}]}
              />
            </CollapsableSection>
          </div>

          <CollapsableSection
            title="Quiz"
            subtitle={`Reminder : ${
              textContent?.quiz_questions?.questions?.length || 0
            } questions`}
          >
            <div>
              {textContent?.quiz_questions && (
                <Quiz questions={textContent?.quiz_questions?.questions} />
              )}
            </div>
          </CollapsableSection>

          <CollapsableSection
            title="Study Cards"
            subtitle={`${
              textContent?.flash_cards?.length || 0
            } cards generated`}
          >
            {textContent?.flash_cards && (
              <FlashCards options={textContent?.flash_cards} />
            )}
          </CollapsableSection>

          <CollapsableSection
            title={
              <>
                <div className="text-right flex flex-row items-baseline">
                  Case Study
                  <p
                    className={`text-sm flex justify-center items-center text-center rounded-full border-2 ml-6 p-2 h-10  ${
                      grade < 50
                        ? "text-red-500 border-red-500"
                        : grade < 70
                        ? "text-yellow-500 border-yellow-500"
                        : "text-green-500 border-green-500"
                    }`}
                  >
                    {grade}
                  </p>
                </div>
              </>
            }
            subtitle="Difficulty: High School"
          >
            {textContent?.case_study_scenario && (
              <CaseStudy
                caseStudyText={textContent?.case_study_scenario}
                caseStudyContext={textContent?.content}
              />
            )}
          </CollapsableSection>
        </>
      ) : (
        <div className="mt-4 text-white font-bold text-2xl">
          Nope, no access for you.
        </div>
      )}
    </div>
  );
}
