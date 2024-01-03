import { useMutation, useQueryClient } from "react-query";

import ArrowLogo from "@/components/icons/ArrowLogo";
import { Modal } from "@/components/Modal"; // TODO: Add delete modal
import { SupabaseClient } from "@supabase/supabase-js";
import { delete_item } from "../actions";
import { formatDate } from "@/utility";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";

interface ICardList {
  projects: any;
  supabase: SupabaseClient;
}

export default function CardList({ projects, supabase }: ICardList) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isMobile } = useWindowSize();
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 xl:gap-x-2 justify-items-center  ">
      {projects &&
        // @ts-ignore
        projects.map((project: any, index: number) => (
          <div
            key={index}
            className="flex cursor-pointer flex-col my-2 rounded-lg border w-52 h-72 md:w-60 lg:w-52 xl:w-60 p-6 sm:p-8 hover:border-blue-500 bg-off-white space-y-4"
            onClick={(e) => {
              router.push(`/projects/${project.project_uuid}`);
            }}
          >
            {project.title && (
              <h1 className="text-sky-500 text-xl font-bold font-sans overflow-ellipsis overflow-hidden whitespace-nowrap">
                {project.title}
              </h1>
            )}

            {project.created_at && (
              <h2 className="text-gray-500 font-medium text-sm mb-3">
                {formatDate(project.created_at)}
              </h2>
            )}

            <div className="h-20 overflow-hidden mb-3">
              <p className="text-base leading-relaxed">
                {isMobile
                  ? project.content.split(" ").slice(0, 14).join(" ")
                  : project.content.split(" ").slice(0, 50).join(" ")}
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
