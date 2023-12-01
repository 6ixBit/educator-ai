"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { fetchUserTextContents, fetchUser } from "./actions";
import { useQuery } from "react-query";
import SkeletonLoader from "./components/SkeletonLoader";
import { useState } from "react";
import SearchHeader from "./components/SearchHeader";
import CardList from "./features/CardList";
import { useIntl } from "react-intl";
import useWindowSize from "@/hooks/useWindowSize";
import Skeleton from "@mui/material/Skeleton";
import { Modal } from "@/components/Modal";
import Link from "next/link";
import { useEffect } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export default function ClientComponent() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const intl = useIntl();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isMobile } = useWindowSize();

  const { isLoading: isLoadingUser, data: userData } = useQuery({
    queryKey: "userData",
    queryFn: () => fetchUser(supabase),
    onError: (error) => {
      console.log("Could not login user.: ", error);
      setShowLoginModal(true);
    },
  });

  // @ts-ignore
  const userID = userData?.user?.id;
  useEffect(() => {
    if (!userID && !isLoadingUser) {
      setShowLoginModal(true);
    }
  }, [userID, isLoadingUser]);

  const {
    isLoading,
    error,
    data: userTextContents,
  } = useQuery({
    queryKey: "textContents",
    queryFn: () => fetchUserTextContents(supabase, userID),
    enabled: !!userID,
    onError: (error) => {
      console.log("fetch items error: ", error);
      setShowLoginModal(true);
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const filteredUserTextContents = Array.isArray(userTextContents)
    ? userTextContents.filter(
        (content: { content: string; title: string }) =>
          content.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          content.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="flex flex-col max-w-full w-10/12 sm:w-8/12 lg:w-10/12">
      <div className="my-3">
        <SearchHeader handleSearch={handleSearch} />
      </div>

      <div className="flex flex-row justify-between items-center mt-8 mb-3">
        {(isLoadingUser || isLoading) && (
          <Skeleton
            variant="rounded"
            animation="wave"
            sx={{ bgcolor: "grey.700" }}
            width={100}
            height={50}
          />
        )}

        <button
          onClick={() => router.push("/create")}
          className="bg-cyan-500 transform transition-transform duration-200 hover:scale-110 shadow-md shadow-cyan-500/50 w-28 text-white rounded-full font-medium  h-[35px] flex items-center justify-center"
        >
          {intl.formatMessage({ id: "button.add.file" })}
        </button>

        {Array.isArray(userTextContents) && (
          <div className="font-sans w-20 text-slate-300  text-center p-2 flex items-center justify-center h-6">
            {filteredUserTextContents.length}{" "}
            {intl.formatMessage({ id: "home.items" })}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 w-auto mtx-4 py-2 items-center mb-4">
        {(isLoadingUser || isLoading) && (
          <SkeletonLoader height={200} width={isMobile ? 320 : 500} />
        )}

        {!isLoading && !error && filteredUserTextContents && (
          // @ts-ignore
          <CardList
            userTextContents={filteredUserTextContents}
            supabase={supabase}
          />
        )}
      </div>
      <Modal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        title="Hold up! You need an account to see this!"
        hideCloseButton={true}
        preventOutsideClick={true}
        description={
          <div className="flex justify-center mt-6">
            <Link href="/login">
              <div className="border-2 border-slate-600 rounded-full px-5 py-1 w-full glow flex items-center flex-row gap-4 hover:bg-slate-200 transition-colors duration-200">
                <p className="text-black text-lg">Sign In</p>
                <ArrowRightIcon style={{ height: "1.8em", width: "1.8em" }} />
              </div>
            </Link>
          </div>
        }
      />
    </div>
  );
}
