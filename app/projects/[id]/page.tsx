"use client";

import { useUserAuth } from "@/hooks/useUserAuth";
import { useUserData } from "@/hooks/useUserData";
import { useState } from "react";
import Overview from "@/app/projects/Overview";
import Image from "next/image";
import LoginModal from "@/components/LoginModal";

export default function Page({
  params: { id: projectID },
}: {
  params: { id: string };
}) {
  const { userID, showLoginModal, setShowLoginModal } = useUserAuth();
  const [isUserAuthorized, setisUserAuthorized] = useState(true);
  const { isLoadingProject, project } = useUserData({ projectID, userID });

  console.log("id: ", projectID);

  if (!isLoadingProject && project) {
    if (project.user_id !== userID) {
      setisUserAuthorized(false);
    }
  }

  return (
    <>
      {!isUserAuthorized && <div>You are not allowed to see this.</div>}

      <div className="grid grid-col-1 sm:grid-cols-2 px-8 mt-7">
        <Overview title={project?.title} date={project?.created_at} />
      </div>

      <LoginModal
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
      />
    </>
  );
}
