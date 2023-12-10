"use client";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Table } from "@radix-ui/themes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { fetchUserTextContents, fetchUser } from "../actions";
import { useQuery } from "react-query";
import { useState } from "react";
import { useIntl } from "react-intl";
import useWindowSize from "@/hooks/useWindowSize";
import Skeleton from "@mui/material/Skeleton";
import { Modal } from "@/components/Modal";
import Link from "next/link";
import { useEffect } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import SearchHeader from "../learn/components/SearchHeader";
import CardList from "../learn/features/CardList";
import GradeCircle from "@/components/grade-circle";

export default function Page() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const intl = useIntl();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isMobile } = useWindowSize();

  const { isLoading: isLoadingUser, data: userData } = useQuery({
    queryKey: "userData",
    queryFn: () => fetchUser(supabase),
    onError: (error) => {
      console.log("Could not login user.: ", error);
      setShowLoginModal(true);
    },
  });

  // @ts-ignore
  const userID = userData?.user?.id;
  useEffect(() => {
    if (!userID && !isLoadingUser) {
      setShowLoginModal(true);
    }
  }, [userID, isLoadingUser]);

  const {
    isLoading,
    error,
    data: userTextContents,
  } = useQuery({
    queryKey: "textContents",
    queryFn: () => fetchUserTextContents(supabase, userID),
    enabled: !!userID,
    onError: (error) => {
      console.log("fetch items error: ", error);
      setShowLoginModal(true);
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const filteredUserTextContents = Array.isArray(userTextContents)
    ? userTextContents.filter(
        (content: { content: string; title: string }) =>
          content.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          content.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="flex flex-col md:flex-row flex-wrap mt-6 gap-4">
      <div className="flex justify-center w-full flex-col">
        <SearchHeader handleSearch={handleSearch} />
        {Array.isArray(userTextContents) && (
          <div className="font-sans text-slate-300 text-center p-2 h-6 flex-row">
            <p className="text-blue-p px-1 text-center">
              {filteredUserTextContents.length}{" "}
              {intl.formatMessage({ id: "home.items" })}
            </p>
          </div>
        )}
      </div>

      <Card className="flex flex-col w-full p-4 bg-white rounded-lg shadow-md">
        <CardHeader className="flex items-start justify-start pb-2">
          <CardTitle className="text-lg font-bold">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {!isLoading && !error && filteredUserTextContents && (
            // @ts-ignore
            <CardList
              userTextContents={filteredUserTextContents}
              supabase={supabase}
            />
          )}
        </CardContent>
      </Card>
      <div className="flex flex-col md:flex-row w-full justify-between space-y-4 md:space-y-0 md:space-x-4">
        <Card className="flex flex-col w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md">
          <CardHeader className="flex items-start justify-between pb-6">
            <CardTitle className="text-lg font-bold ">
              Upcoming Due Dates
            </CardTitle>
          </CardHeader>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Grade</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.RowHeaderCell>
                  <GradeCircle value={67} />
                </Table.RowHeaderCell>
                <Table.Cell>Quadratic equations</Table.Cell>
                <Table.Cell>January 1, 2023</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.RowHeaderCell>
                  {" "}
                  <GradeCircle value={77} />
                </Table.RowHeaderCell>
                <Table.Cell>Of Mice and Men</Table.Cell>
                <Table.Cell>February 15, 2023</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.RowHeaderCell>
                  <GradeCircle value={42} />
                </Table.RowHeaderCell>
                <Table.Cell>Molecular Theory</Table.Cell>
                <Table.Cell>March 30, 2023</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Card>

        <Card className="flex flex-col w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-lg font-bold">New Section</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-bold">Title for New Section</h3>
            <p className="text-gray-600">This is a new section.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
