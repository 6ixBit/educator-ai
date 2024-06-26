import { fetchProjects, getMainDeckForProject } from "./actions";

import { SupabaseClient } from "@supabase/supabase-js";
import { toast } from "sonner";
import { uploadPdf } from "./actions";
import { useMutation } from "react-query";
import { useQuery } from "react-query";
import useStore from "../store";

interface IUseProject {
  userID: string;
  supabase: SupabaseClient;
}

interface IUseProjectData {
  project_uuid: string;
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

export const useProjectData = ({ project_uuid, userID }: IUseProjectData) => {
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
    ["fetchProject", project_uuid],
    () => fetchProject(project_uuid),
    { enabled: !!userID }
  );

  return {
    isLoadingProject,
    project,
  };
};

export const useGetMainDeckForProject = (project_id: number | undefined) => {
  // @ts-ignore
  const supabase = useStore((state) => state?.supabase);

  return useQuery({
    queryKey: ["getMainDeckForProject", project_id],
    queryFn: () => getMainDeckForProject(supabase, project_id),
    onError: (error) => {
      toast.error("Failed to load deck for your project");
    },
    enabled: !!project_id,
  });
};

export function useUploadPdf() {
  // @ts-ignore
  return useMutation<any, Error, File>((file: File) => uploadPdf(file), {
    onSuccess: () => {
      toast.success("PDF uploaded successfully.");
    },
    onError: (error) => {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file.");
    },
  });
}
