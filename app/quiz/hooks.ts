import {
  GetAllQuizzes,
  GetQuizByUUID,
  GetQuizForProject,
  incrementQuizAttempt,
} from "./actions";
import { useMutation, useQuery } from "react-query";

import { toast } from "sonner";
import { useQueryClient } from "react-query";
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

export const useIncrementQuizAttempt = () => {
  // @ts-ignore
  const supabase = useStore((state) => state?.supabase);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({
      quiz_uuid,
      current_attempts,
    }: {
      quiz_uuid: string;
      current_attempts: number;
    }) => incrementQuizAttempt(supabase, quiz_uuid, current_attempts),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getQuizForProject");
      },
    }
  );

  return mutation;
};
