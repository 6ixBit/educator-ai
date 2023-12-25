import { useMutation, useQuery } from "react-query";

import { SupabaseClient } from "@supabase/supabase-js";
import { fetchProjects } from "./actions";
import { updateProjectDate } from "./actions";

interface IUseProject {
  userID: string;
  supabase: SupabaseClient;
}

interface IUseProjectDateMutation {
  supabase: SupabaseClient;
  project_uuid: string;
  due_date: Date | undefined;
}

export const useProject = ({ userID, supabase }: IUseProject) => {
  const {
    isLoading: isProjectLoading,
    error: projectLoadError,
    data: projects,
  } = useQuery({
    queryKey: "fetchProjects",
    queryFn: () => fetchProjects(supabase, userID),
    enabled: !!userID,
    onError: (error) => {
      console.log("fetch items error: ", error);
    },
  });

  return { isProjectLoading, projectLoadError, projects };
};

export const useProjectDateMutation = ({
  project_uuid,
  supabase,
  due_date,
}: IUseProjectDateMutation) => {
  const mutation = useMutation({
    mutationFn: () => updateProjectDate(supabase, project_uuid, due_date),
  });

  return mutation;
};
