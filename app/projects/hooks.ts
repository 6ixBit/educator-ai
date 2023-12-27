import { useMutation, useQuery, useQueryClient } from "react-query";

import { SupabaseClient } from "@supabase/supabase-js";
import { fetchProjects } from "./actions";
import { updateProjectDate } from "./actions";
import useStore from "../store";

interface IUseProject {
  userID: string;
  supabase: SupabaseClient;
}

interface IUseProjectDateMutation {
  supabase: SupabaseClient;
  project_uuid: string;
  due_date: Date | undefined;
}

interface IUseProjectData {
  projectID: string;
  userID: string;
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
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => updateProjectDate(supabase, project_uuid, due_date),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchProject", project_uuid]);
    },
  });

  return mutation;
};

export const useProjectData = ({ projectID, userID }: IUseProjectData) => {
  // @ts-ignore
  const supabase = useStore((state) => state?.supabase);

  const fetchProject = async (projectID: string) => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("project_uuid", projectID);

    if (error) {
      console.log("error: ", error);
      return error;
    }
    return data[0];
  };

  const { isLoading: isLoadingProject, data: project } = useQuery(
    ["fetchProject", projectID],
    () => fetchProject(projectID),
    { enabled: !!userID }
  );

  return {
    isLoadingProject,
    project,
  };
};
