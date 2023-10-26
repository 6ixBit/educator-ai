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

  if (!isLoading && userTextContents) {
    console.log(userTextContents);
  }

  return (
    <div className="flex flex-col justify-center items-center max-w-full">
      <button className="box-border w-auto text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]">
        Add new product
      </button>

      <div className="flex flex-col gap-2 w-auto mt-4 items-center">
        {!isLoading &&
          !error &&
          userTextContents &&
          userTextContents.map((content: any, index: number) => (
            <div
              key={index}
              className="rounded border p-4 w-10/12 overflow-auto"
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
