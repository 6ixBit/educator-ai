import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { fetchUser } from "../app/actions";

export const useUserAuth = () => {
    const supabase = createClientComponentClient();
    const [showLoginModal, setShowLoginModal] = useState(false);
  
    const { isLoading, data: userData } = useQuery({
      queryKey: "userData",
      queryFn: () => fetchUser(supabase),
      onError: (error) => {
        console.log("Could not login user @Use.: ", error);
        setShowLoginModal(true);
      },
    });

    // @ts-ignore
    const userID = userData?.user?.id;

    useEffect(() => {
      if (!userID && !isLoading) {
        setShowLoginModal(true);
      }
    }, [userID, isLoading]);
  
    return { userID, showLoginModal, setShowLoginModal };
}