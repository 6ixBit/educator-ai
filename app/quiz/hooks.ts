import { GetAllQuizzes, GetQuizByUUID, GetQuizForProject } from "./actions";

import { toast } from "sonner";
import { useQuery } from "react-query";
import useStore from "../store";

export const useGetQuizForProject = (project_id: string) => {
  // @ts-ignore
  const supabase = useStore((state) => state?.supabase);

  return useQuery({
    queryKey: "getQuizForProject",
    queryFn: () => GetQuizForProject(supabase, project_id),
    enabled: !!project_id,
    onError: (error) => {
      toast.error(
        "Failed to fetch quiz for this project, please try again later."
      );
    },
  });
};

export const useGetAllQuizzes = (user_uuid: string) => {
  // @ts-ignore
  const supabase = useStore((state) => state?.supabase);

  return useQuery({
    queryKey: "getQuizForProject",
    queryFn: () => GetAllQuizzes(supabase, user_uuid),
    enabled: !!user_uuid,
    onError: (error) => {
      toast.error(
        "Failed to fetch quiz for this project, please try again later."
      );
    },
  });
};

export const useGetQuizByUUID = (quiz_uuid: string) => {
  // @ts-ignore
  const supabase = useStore((state) => state?.supabase);

  return useQuery({
    queryKey: "getQuizForProject",
    queryFn: () => GetQuizByUUID(supabase, quiz_uuid),
    enabled: !!quiz_uuid,
    onError: (error) => {
      toast.error("Failed to fetch quiz, please try again later.");
    },
  });
};
