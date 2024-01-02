import { useEffect, useState } from "react";

import { fetchUser } from "./actions";
import { getUserAPIKey } from "./actions";
import { useQuery } from "react-query";
import useStore from "./store";

export const useAPIKey = (user_id: string) => {
  // @ts-ignore
  const supabase = useStore((state) => state?.supabase);

  return useQuery({
    queryKey: ["getUserAPIKey", user_id],
    queryFn: () => getUserAPIKey(supabase, user_id),
    onError: (error) => {},
    enabled: !!user_id,
  });
};

export const useUserAuth = () => {
  // @ts-ignore
  const supabase = useStore((state) => state?.supabase);
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
