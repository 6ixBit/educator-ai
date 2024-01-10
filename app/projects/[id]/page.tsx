"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Link from "next/link";
import LoginModal from "@/components/LoginModal";
import Overview from "@/app/projects/Overview";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { useGetMainDeckForProject } from "../hooks";
import { useProjectData } from "../hooks";
import { useUserAuth } from "@/app/hooks";

export default function Page({
  params: { id: project_uuid },
}: {
  params: { id: string };
}) {
  const { userID, showLoginModal, setShowLoginModal } = useUserAuth();
  const [projectID, setProjectID] = useState(null);
  const [isUserAuthorized, setisUserAuthorized] = useState(true);
  const { isLoadingProject, project } = useProjectData({
    project_uuid,
    userID,
  });

  const [userDeck, setUserDeck] = useState<any>();

  useEffect(() => {
    if (!isLoadingProject && project) {
      if (project.user_id !== userID) {
        setisUserAuthorized(false);
        // setProjectID(project.id); - User is not authorized so we cant get set the markup.
      } else {
        setProjectID(project.id);
      }
    }
  }, [project, isLoadingProject]);

  const { data: mainDeck, isLoading } = useGetMainDeckForProject(
    projectID || undefined
  );

  useEffect(() => {
    setUserDeck(mainDeck);
  }, [mainDeck, isLoading]);

  return (
    <>
      {!isUserAuthorized && (
        <div className="text-black">You are not allowed to see this.</div>
      )}

      <div className="sm:px-7 px-1">
        <Header hideSearchBar={true} handleSearch={() => {}} />
      </div>

      <div className="grid grid-cols-1 px-1.5 sm:px-8 mt-8">
        <Overview
          title={project?.title}
          date={project?.created_at}
          content={project?.content}
          project_uuid={project?.project_uuid}
          grade={parseFloat(project?.grade)}
          due_date={project?.due_date}
          project_id={project?.id}
          key_points={project?.key_points}
          deck_uuid={userDeck && userDeck[0] ? userDeck[0].deck_uuid : null}
        />

        <Toaster />
      </div>

      <LoginModal
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
      />
    </>
  );
}
