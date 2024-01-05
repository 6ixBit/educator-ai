"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Table } from "@radix-ui/themes";
import { formatDate } from "@/utility";
import { useGetAllQuizzes } from "./hooks";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../hooks";

export default function Page() {
  const { userID } = useUserAuth();
  const { data, error, isLoading: isQuizLoading } = useGetAllQuizzes(userID);
  const [quizzes, setQuizzes] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      console.log("QUiz data: ", data);
      setQuizzes(data);
    }
  }, [data, isQuizLoading]);

  return (
    <div className="sm:pl-6 pl-2">
      <Card className="flex flex-col w-full  p-4 bg-white rounded-lg shadow-md mt-16">
        <CardHeader className="flex items-center flex-row justify-between pb-6">
          <CardTitle className="text-lg font-bold ">
            {/* {intl.formatMessage({ id: "cards.table.title" })} */}
            Quizzes
          </CardTitle>

          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              console.log("Add quiz?");
              router.push("/quiz/create");
            }}
          >
            Generate New Quiz
          </Button>
        </CardHeader>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell className="text-center">
                {/* {intl.formatMessage({ id: "cards.front" })} */}
                No. of Questions
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-center">
                Your attempts
                {/* {intl.formatMessage({ id: "cards.back" })} */}
              </Table.ColumnHeaderCell>

              <Table.ColumnHeaderCell className="text-center">
                {/* {intl.formatMessage({ id: "cards.actions" })} */}
                Actions
              </Table.ColumnHeaderCell>

              <Table.ColumnHeaderCell>
                {/* {intl.formatMessage({ id: "cards.actions" })} */}
                Created on
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {quizzes &&
              quizzes.map((quiz: any, index: number) => (
                <Table.Row key={index}>
                  <Table.Cell className="text-center">
                    {quiz.questions.length}
                  </Table.Cell>
                  <Table.Cell className="text-center">
                    {quiz.attempts}
                  </Table.Cell>

                  <Table.Cell className="text-center">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        router.push(`/quiz/${quiz.quiz_uuid}`);
                      }}
                    >
                      Take Quiz{" "}
                    </Button>

                    {quiz.project_id && (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="mx-1 sm:mx-2"
                        onClick={() => {
                          router.push(`/projects/${quiz.project_uuid}`);
                        }}
                      >
                        {" "}
                        View Project
                      </Button>
                    )}
                  </Table.Cell>

                  <Table.Cell className="">
                    {formatDate(quiz.created_at)}
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table.Root>
      </Card>
    </div>
  );
}
