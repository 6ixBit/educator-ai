"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { fetchUserTextContents, fetchUser } from "./actions";
import { useQuery } from "react-query";

export default function ClientComponent() {
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
    <div className="flex flex-col justify-center items-center max-w-full sm:w-8/12 lg:w-6/12">
      <div className="flex flex-row justify-between items-center gap-40 sm:gap-[525px] mt-4 mb-3">
        <button
          onClick={() => router.push("/learn/create")}
          className="box-border w-auto text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px] ml-auto"
        >
          Create
        </button>

        <div className="bg-sky-600 px-1 rounded-full  w-24 text-white  text-center">
          {Array.isArray(userTextContents) && userTextContents?.length} items
        </div>
      </div>

      <div className="flex flex-col gap-2 w-auto mt-4 items-center mb-4">
        {!isLoading &&
          !error &&
          userTextContents &&
          // @ts-ignore
          userTextContents.map((content: any, index: number) => (
            <div
              key={index}
              className="rounded border p-4 w-10/12 overflow-auto hover:border-blue-500"
              onClick={() => {
                router.push(`/learn/${content.id}`);
              }}
            >
              <p className="text-white text-sm break-words">
                {content.content}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
