import { useEffect, useState } from "react";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { fetchUser } from "../app/actions";
import { useQuery } from "react-query";

export const useUserAuth = () => {
  const supabase = createClientComponentClient();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { isLoading, data: userData } = useQuery({
    queryKey: "userData",
    queryFn: () => fetchUser(supabase),
    onError: (error) => {
      console.log("Could not login user: ", error);
      setShowLoginModal(true);
    },
  });

  // @ts-ignore
  const userID = userData?.user?.id;

  // @ts-ignore
  const userEmail = userData?.user?.email;

  useEffect(() => {
    if (!userID && !isLoading) {
      setShowLoginModal(true);
    }
  }, [userID, isLoading]);

  return { userID, userEmail, showLoginModal, setShowLoginModal };
};
