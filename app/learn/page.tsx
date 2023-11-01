"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { fetchUserTextContents, fetchUser } from "./actions";
import { useQuery } from "react-query";
import SkeletonLoader from "./components/SkeletonLoader";
import ArrowLogo from "@/components/ArrowLogo";
import ClampLines from "react-clamp-lines";
import { formatDate } from "@/utility";
import Image from "next/image";
import EditLogo from "@/components/EditLogo";
import { useState } from "react";

import Modal from "@/components/Modal/Modal";

export default function ClientComponent() {
  const [signInClicked, setSignInClicked] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

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
  const userID = userData?.user?.id;

  const {
    isLoading,
    error,
    data: userTextContents,
  } = useQuery({
    queryKey: "textContents",
    queryFn: () => fetchUserTextContents(supabase, userID),
    enabled: !!userID,
  });

  if (error) {
    console.log("get text error: ", error);
    return;
  }

  return (
    <div className="flex flex-col max-w-full w-10/12 sm:w-8/12 lg:w-10/12">
      <div className="flex flex-row justify-between items-center mt-4 mb-3">
        <button
          onClick={() => router.push("/learn/create")}
          className="bg-cyan-500 transform transition-transform duration-200 hover:scale-110 shadow-md shadow-cyan-500/50 w-20 text-white rounded-md font-medium shadow-blackA4 h-[35px] flex items-center justify-center"
        >
          Create
        </button>

        {Array.isArray(userTextContents) && (
          <div className="font-sans w-20 text-white font-medium text-center p-2 bg-neutral-400 rounded-full flex items-center justify-center h-6">
            {userTextContents.length} items
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 w-auto mt-4 items-center mb-4">
        {(isLoadingUser || isLoading) && (
          <SkeletonLoader height={100} width={320} />
        )}

        {!isLoading &&
          !error &&
          userTextContents &&
          // @ts-ignore
          userTextContents.map((content: any, index: number) => (
            <div
              key={index}
              className="flex flex-col rounded border w-full p-6 sm:p-8 hover:border-blue-500 bg-off-white"
              onClick={(e) => {
                if (e.target !== e.currentTarget) return;
                router.push(`/learn/${content.id}`);
              }}
            >
              {content.ai_response.title && (
                <h1 className="text-sky-500 text-lg font-medium font-sans overflow-ellipsis overflow-hidden">
                  {content.ai_response.title}
                </h1>
              )}

              {content.created_at && (
                <h2 className="text-gray-500 font-medium text-sm mb-3">
                  {formatDate(content.created_at)}
                </h2>
              )}
              {/* 
              <p className="text-gray-600 text-md font-sans break-words text-clip overflow-hidden">
                {content.content}
              </p> */}

              <ClampLines
                text={content.content}
                id="really-unique-id"
                lines={5}
              />

              <div className="flex flex-row justify-between mt-4">
                <div className="flex gap-3">
                  <Modal
                    trigger={() => (
                      <Image
                        src="/trash.png"
                        width={20}
                        height={20}
                        alt="delete button"
                        style={{ transition: "transform 0.2s", zIndex: 1 }}
                        className="hover:scale-110"
                      />
                    )}
                  />
                  <EditLogo />
                </div>
                <ArrowLogo />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
