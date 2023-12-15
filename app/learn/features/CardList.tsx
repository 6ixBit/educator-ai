import Image from "next/image";
import { useRouter } from "next/navigation";
import { delete_item } from "../../actions";
import { useMutation, useQueryClient } from "react-query";
import { Modal } from "@/components/Modal";
import { formatDate } from "@/utility";
import ArrowLogo from "@/components/ArrowLogo";
import { SupabaseClient } from "@supabase/supabase-js";
import { useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";

interface ICardList {
  userTextContents: any;
  supabase: SupabaseClient;
}

export default function CardList({ userTextContents, supabase }: ICardList) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isMobile, isTablet, isDesktop } = useWindowSize();
  const [showModal, setShowModal] = useState(false);

  const mutation = useMutation({
    mutationFn: (item_id: string) => {
      return delete_item(supabase, "id", item_id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("textContents");
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-x-4 xl:gap-x-2 justify-items-center">
      {userTextContents &&
        // @ts-ignore
        userTextContents.map((content: any, index: number) => (
          <div
            key={index}
            className="flex flex-col my-2 rounded-lg border w-52 h-72 md:w-60 lg:w-52 xl:w-72 p-6 sm:p-8 hover:border-blue-500 bg-off-white space-y-4"
            onClick={(e) => {
              router.push(`/learn/${content.id}`);
            }}
          >
            {content.title && (
              <h1 className="text-sky-500 text-xl font-bold font-sans overflow-ellipsis overflow-hidden whitespace-nowrap">
                {content.title}
              </h1>
            )}

            {content.created_at && (
              <h2 className="text-gray-500 font-medium text-sm mb-3">
                {formatDate(content.created_at)}
              </h2>
            )}

            <div className="h-20 overflow-hidden mb-3">
              <p className="text-base leading-relaxed">
                {isMobile
                  ? content.content.split(" ").slice(0, 14).join(" ")
                  : content.content.split(" ").slice(0, 50).join(" ")}
              </p>
            </div>

            <div className="flex flex-row justify-between pt-4">
              <div className="flex gap-3"></div>
              <ArrowLogo />
            </div>
          </div>
        ))}
    </div>
  );
}
