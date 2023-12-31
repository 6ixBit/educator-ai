"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import LoginModal from "@/components/LoginModal";
import Overview from "@/app/projects/Overview";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { useGetMainDeckForProject } from "../hooks";
import { useProjectData } from "../hooks";
import { useState } from "react";
import { useUserAuth } from "@/hooks/useUserAuth";

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

  if (!isLoadingProject && project) {
    if (project.user_id !== userID) {
      setisUserAuthorized(false);
      setProjectID(project.id);
    }
  }
  const { data: mainDeck } = useGetMainDeckForProject(projectID);

  return (
    <>
      {!isUserAuthorized && (
        <div className="text-black">You are not allowed to see this.</div>
      )}

      <div className="sm:px-7 px-1">
        <Link href="/projects">
          <Button variant="outline" size="sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Projects
          </Button>
        </Link>
      </div>

      <Separator className="mt-4" />

      <div className="grid grid-cols-1 px-1.5 sm:px-8 mt-8">
        <Overview
          title={project?.title}
          date={project?.created_at}
          content={project?.content}
          project_uuid={project?.project_uuid}
          grade={parseFloat(project?.grade)}
          due_date={project?.due_date}
          deck_uuid={mainDeck && mainDeck[0] ? mainDeck[0].deck_uuid : null}
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
