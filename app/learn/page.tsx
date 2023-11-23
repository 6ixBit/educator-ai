"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { fetchUserTextContents, fetchUser } from "./actions";
import { useQuery } from "react-query";
import SkeletonLoader from "./components/SkeletonLoader";

import CardList from "./components/CardList";

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
    <div className="flex flex-col max-w-full w-10/12 sm:w-8/12 lg:w-10/12">
      <div className="my-3">
        <SearchHeader />
      </div>
      <div className="flex flex-row justify-between items-center mt-8 mb-3">
        <button
          onClick={() => router.push("/learn/create")}
          className="bg-cyan-500 transform transition-transform duration-200 hover:scale-110 shadow-md shadow-cyan-500/50 w-28 text-white rounded-full font-medium shadow-blackA4 h-[35px] flex items-center justify-center"
        >
          Add a file
        </button>

        {Array.isArray(userTextContents) && (
          <div className="font-sans w-20 text-slate-300  text-center p-2 flex items-center justify-center h-6">
            {userTextContents.length} items
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 w-auto mt-4 items-center mb-4">
        {(isLoadingUser || isLoading) && (
          <SkeletonLoader height={100} width={320} />
        )}

        {!isLoading && !error && userTextContents && (
          // @ts-ignore
          <CardList userTextContents={userTextContents} supabase={supabase} />
        )}
      </div>
    </div>
  );
}
const SearchHeader = () => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <h1 className="text-3xl font-bold mb-2 text-slate-300">
        What will you{" "}
        <span
          style={{
            background: "linear-gradient(to right, #1BFFFF, #ED1E79)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Learn
        </span>{" "}
        today?
      </h1>
      <div className="rounded-full border w-60">
        <input
          type="text"
          className="border rounded-md py-2 px-4 flex-grow text-left text-white"
          placeholder="Search..."
        />
      </div>
    </div>
  );
};
