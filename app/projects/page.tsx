"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

import CardList from "./CardList";
import GradeCircle from "@/components/grade-circle";
import HamburgerMenu from "@/components/HamburgerMenu";
import Header from "@/components/Header";
import LoginModal from "@/components/LoginModal";
import SearchHeader from "@/components/SearchHeader";
import Skeleton from "@mui/material/Skeleton";
import { Table } from "@radix-ui/themes";
import { formatDate } from "@/utility";
import { useIntl } from "react-intl";
import { useProject } from "./hooks";
import { useRouter } from "next/navigation";
import useStore from "../store";
import { useUserAuth } from "../hooks";
import useWindowSize from "@/hooks/useWindowSize";

export default function Page() {
  const intl = useIntl();
  const router = useRouter();
  const { isMobile } = useWindowSize();
  // @ts-ignore
  const supabase = useStore((state) => state?.supabase);

  const { userID, showLoginModal, setShowLoginModal } = useUserAuth();
  const { projects, isProjectLoading, projectLoadError } = useProject({
    userID,
    supabase,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const filteredProjects = Array.isArray(projects)
    ? projects.filter(
        (content: { content: string; title: string }) =>
          content.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          content.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const todaysDate = new Date();

  const dueProjects =
    Array.isArray(projects) &&
    projects.filter((proj) => {
      const projectDate = new Date(proj.due_date);
      return projectDate >= todaysDate;
    });

  return (
    <div className="flex flex-col md:flex-row flex-wrap mt-1 gap-4">
      <LoginModal
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
      />

      <div className="flex justify-center w-full flex-row gap-4 sm:gap-8 flex-baseline">
        {/* {isMobile && (
          <div className="pl-4">
            <HamburgerMenu
              items={[
                {
                  name: "Projects",
                  url: "/projects",
                },
                {
                  name: "Study cards",
                  url: "/decks",
                },
                {
                  name: "Quiz",
                  url: "/quiz",
                },
              ]}
            />
          </div>
        )}

        <div className="w-full flex-col">
          <SearchHeader handleSearch={handleSearch} />
          {Array.isArray(projects) && (
            <div className="font-sans text-slate-300 text-center p-2 h-6 flex-row mb-6">
              <p className="text-blue-p px-1 text-center">
                <b>{filteredProjects.length}</b>{" "}
                {intl.formatMessage({ id: "project.items" })}
              </p>
            </div>
          )}
        </div> */}
      </div>

      <Card className="flex flex-col w-full p-4 bg-white rounded-lg shadow-md max-h-120 sm:max-h-160 overflow-y-scroll">
        <CardHeader className="flex flex-row items-baseline justify-between pb-2 sm:px-2 px-0">
          <CardTitle className="text-lg font-bold pb-3">
            {intl.formatMessage({ id: "title.recentactivity" })}
          </CardTitle>

          <button
            onClick={() => router.push("/projects/create")}
            className="bg-cyan-500 cursor-pointer font-bold transform transition-transform hover:scale-110 shadow-md shadow-cyan-500/50 w-28 text-white rounded-full h-[35px] flex items-center justify-center"
          >
            {intl.formatMessage({ id: "button.add.project" })}
          </button>
        </CardHeader>

        {filteredProjects.length === 0 &&
          Array.isArray(projects) &&
          projects.length === 0 && (
            <p className="text-xl text-center italic pt-12 font-semibold">
              Add a project to get started
            </p>
          )}

        <CardContent>
          {isProjectLoading ? (
            <div className="flex flex-col gap-4 sm:flex-row justify-center">
              <Skeleton variant="rectangular" width={240} height={288} />
              <Skeleton variant="rectangular" width={240} height={288} />
              <Skeleton variant="rectangular" width={240} height={288} />
              <Skeleton variant="rectangular" width={240} height={288} />
            </div>
          ) : projectLoadError ? (
            <div>Error: Loading projects</div>
          ) : (
            <CardList projects={filteredProjects} supabase={supabase} />
          )}
        </CardContent>
      </Card>
      <div className="flex flex-col md:flex-row w-full justify-between space-y-4 md:space-y-0 md:space-x-4">
        <Card className="flex flex-col w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md">
          <CardHeader className="flex items-start justify-between pb-6">
            <CardTitle className="text-lg font-bold ">
              {Array.isArray(dueProjects) && dueProjects.length < 1
                ? intl.formatMessage({ id: "title.noupcomingdueduates" })
                : intl.formatMessage({ id: "title.upcomingduedates" })}
            </CardTitle>
          </CardHeader>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>
                  {intl.formatMessage({ id: "title.grade" })}
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>
                  {intl.formatMessage({ id: "title.title" })}
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>
                  {intl.formatMessage({ id: "title.date" })}
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {Array.isArray(dueProjects) &&
                dueProjects.map((project, idx) => (
                  <Table.Row key={idx}>
                    <Table.RowHeaderCell>
                      <GradeCircle value={project.grade} />
                    </Table.RowHeaderCell>
                    <Table.Cell>{project.title}</Table.Cell>
                    <Table.Cell>
                      {formatDate(project.due_date, true)}
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table.Root>
        </Card>

        {/* <Card className="flex flex-col w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-lg font-bold">New Section</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-bold">Title for New Section</h3>
            <p className="text-gray-600">This is a new section.</p>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}
