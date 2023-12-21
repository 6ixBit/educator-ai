import { fetchProjects } from "./actions";
import { useQuery } from "react-query";

interface IUseProject {
  userID: string;
  supabase: any;
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
      //setShowLoginModal(true);
    },
  });

  return { isProjectLoading, projectLoadError, projects };
};
