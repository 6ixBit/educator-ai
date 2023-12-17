"use client";

import LoginModal from "@/components/LoginModal";
import Overview from "@/app/projects/Overview";
import { useState } from "react";
import { useUserAuth } from "@/hooks/useUserAuth";
import { useUserData } from "@/hooks/useUserData";

export default function Page({
  params: { id: projectID },
}: {
  params: { id: string };
}) {
  const { userID, showLoginModal, setShowLoginModal } = useUserAuth();
  const [isUserAuthorized, setisUserAuthorized] = useState(true);
  const { isLoadingProject, project } = useUserData({ projectID, userID });

  if (!isLoadingProject && project) {
    if (project.user_id !== userID) {
      setisUserAuthorized(false);
    }
  }

  return (
    <>
      {!isUserAuthorized && <div>You are not allowed to see this.</div>}

      <div className="grid grid-col-1 sm:grid-cols-2 px-8 mt-8">
        <Overview title={project?.title} date={project?.created_at} />

        <div className="md:pl-20 mt-16 md:mt-52">
          <h1 className="text-slate-500 pb-2 text-lg font-bold">
            RIver so way eh
          </h1>

          <div className="bg-white rounded-lg p-4">
            <h2 className="text-black">
              On review of your report card and consideration of your grade, I
              believe you are in a pretty good position to take an exam on this
              topic.
            </h2>
          </div>
        </div>
      </div>

      <LoginModal
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
      />
    </>
  );
}
