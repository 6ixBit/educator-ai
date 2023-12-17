"use client";

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

      <div className="grid grid-col-1 sm:grid-cols-2 px-8 mt-8">
        <Overview title={project?.title} date={project?.created_at} />

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
