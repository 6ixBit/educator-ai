import Image from "next/image";
import { useRouter } from "next/navigation";
import { delete_item } from "../actions";
import { useMutation, useQueryClient } from "react-query";
import ClampLines from "react-clamp-lines";
import Modal from "@/components/Modal/Modal";
import { formatDate } from "@/utility";
import ArrowLogo from "@/components/ArrowLogo";
import { SupabaseClient } from "@supabase/supabase-js";

interface ICardList {
  userTextContents: [{}];
  supabase: SupabaseClient;
}

export default function CardList({ userTextContents, supabase }: ICardList) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (item_id: string) => {
      return delete_item(supabase, "id", item_id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("textContents");
    },
  });

  return (
    <>
      {userTextContents &&
        // @ts-ignore
        userTextContents.map((content: any, index: number) => (
          <div
            key={index}
            className="flex flex-col rounded border w-full h-60 p-6 sm:p-8 hover:border-blue-500 bg-off-white"
            onClick={(e) => {
              router.push(`/learn/${content.id}`);
            }}
          >
            {content.title && (
              <h1 className="text-sky-500 text-xl font-medium font-sans overflow-ellipsis overflow-hidden">
                {content.title}
              </h1>
            )}

            {content.created_at && (
              <h2 className="text-gray-500 font-medium text-sm mb-3">
                {formatDate(content.created_at)}
              </h2>
            )}
            {/* <div className="h-20 overflow-hidden mb-3">
              <ClampLines
                text={content.content}
                id="really-unique-id"
                lines={3}
                ellipsis="..."
                className="custom-class"
                innerElement="p"
              />
            </div> */}

            <div className="h-20 overflow-hidden mb-3">
              <p>
                {
                  // Split the content into words, take the first 30, and join them back into a string
                  content.content.split(" ").slice(0, 30).join(" ")
                }
                {/* {
                  // If the content has more than 30 words, add an ellipsis
                  content.content.split(" ").length > 30 && "..."
                } */}
              </p>
            </div>

            <div className="flex flex-row justify-between mt-4">
              <div className="flex gap-3">
                <Modal
                  title="Delete"
                  description="Are you sure you want to delete this item?"
                  actionButtons={
                    <button
                      className="rounded-lg bg-red-200 text-red-700 px-2 py-1"
                      onClick={() => {
                        mutation.mutate(content.id);
                      }}
                    >
                      Delete item
                    </button>
                  }
                  trigger={() => (
                    <Image
                      src="/trash.png"
                      width={20}
                      height={20}
                      alt="delete button"
                      style={{ transition: "transform 0.2s" }}
                      className="hover:scale-110"
                    />
                  )}
                />
                {/* <EditLogo /> */}
              </div>
              <ArrowLogo />
            </div>
          </div>
        ))}
    </>
  );
}
