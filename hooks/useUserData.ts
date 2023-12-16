import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useQuery } from "react-query";

interface IuseUserData {
  projectID: string;
  userID: string;
}

export const useUserData = ({ projectID, userID }: IuseUserData) => {
  const supabase = createClientComponentClient();

  const fetchProject = async () => {
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

  const { isLoading: isLoadingProject, data: project } = useQuery({
    queryKey: "getProject",
    queryFn: () => fetchProject(),
    enabled: !!userID,
  });

  return {
    isLoadingProject,
    project,
  };
};
