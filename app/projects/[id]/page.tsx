"use client";

import Link from "next/link";
import LoginModal from "@/components/LoginModal";
import Overview from "@/app/projects/Overview";
import { Table } from "@radix-ui/themes";
import { useIntl } from "react-intl";
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
  const intl = useIntl();

  if (!isLoadingProject && project) {
    if (project.user_id !== userID) {
      setisUserAuthorized(false);
    }
  }

  return (
    <>
      {!isUserAuthorized && <div>You are not allowed to see this.</div>}

      <div className="sm:px-7 px-1">
        <Link
          href="/projects"
          className=" py-2 px-4 w-32 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
        >
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
          </svg>{" "}
          Projects
        </Link>
      </div>

      <div className="grid grid-col-1 sm:grid-cols-2 px-1.5 sm:px-8 mt-8">
        <Overview
          title={project?.title}
          date={project?.created_at}
          content={project?.content}
          grade={parseFloat(project?.grade)}
        />

        <div className="md:pl-16 mt-16 md:mt-52">
          <h1 className="text-slate-500 pb-2 text-lg font-bold">
            {intl.formatMessage({ id: "title.statistics" })}
          </h1>

          <div className="bg-white rounded-lg p-4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>
                    {intl.formatMessage({ id: "title.attempts" })}
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>
                    {intl.formatMessage({ id: "title.avgscore" })}
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.RowHeaderCell>Quizzes</Table.RowHeaderCell>
                  <Table.Cell className="text-center">1</Table.Cell>
                  <Table.Cell>10 / 10</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.RowHeaderCell>Study Cards</Table.RowHeaderCell>
                  <Table.Cell className="text-center">5</Table.Cell>
                  <Table.Cell>5 / 10</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.RowHeaderCell>Case Studies</Table.RowHeaderCell>
                  <Table.Cell className="text-center">2</Table.Cell>
                  <Table.Cell>6 / 10</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
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
