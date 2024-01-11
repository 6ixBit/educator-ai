"use client";

import { useGetDeckMetaData, useIncrementStudyAttempt } from "../deck/hooks";
import { useGetQuizForProject, useIncrementQuizAttempt } from "../quiz/hooks";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/datepicker";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import GradeCircle from "@/components/grade-circle";
import { Separator } from "@/components/ui/separator";
import { Table } from "@radix-ui/themes";
import { calculateDaysUntilDeadline } from "@/lib/utils";
import { formatDate } from "@/utility";
import { getAvgOfArray } from "@/lib/utils";
import { nFormatter } from "@/utility";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useState } from "react";

interface IOverview {
  title: string;
  date: any;
  content: string;
  grade: number;
  project_uuid: string;
  due_date: Date | string | undefined;
  deck_uuid?: string;
  project_id: string;
  key_points: any;
}

export default function Overview({
  title,
  date,
  content,
  grade,
  project_uuid,
  due_date,
  deck_uuid,
  project_id,
  key_points,
}: IOverview) {
  const intl = useIntl();
  const pathname = usePathname();
  const router = useRouter();

  const [mainQuiz, setMainQuiz] = useState<any>();
  const [mainDeck, setMainDeck] = useState<any>();

  const { data, error, isLoading } = useGetQuizForProject(project_id);
  const { data: loadedDeck, isLoading: isMainDeckLoading } =
    // @ts-ignore
    useGetDeckMetaData(deck_uuid);

  useEffect(() => {
    if (data) {
      setMainQuiz(Array.isArray(data) && data[0]);
    }
  }, [isLoading, data]);

  useEffect(() => {
    if (loadedDeck) {
      setMainDeck(Array.isArray(loadedDeck) && loadedDeck[0]);
    }
  }, [isMainDeckLoading, loadedDeck]);

  return (
    <div className="flex flex-col justify-start">
      <div className="flex flex-row gap-6 items-center">
        <h1 className="text-black text-left font-bold mb-0 text-2xl sm:text-4xl leading-relaxed font-sans pb-3">
          {title}
        </h1>

        <div className="w-12 h-12 sm:ml-0 ml-8 ">
          <GradeCircle value={grade} />
        </div>
      </div>

      <h2 className="text-gray-500 font-medium text-sm mb-1">
        {date ? formatDate(date) : ""}
      </h2>

      <div>
        <h2 className="text-gray-500 font-medium text-md mb-0 w-max">
          <strong className="font-bold">
            {content ? nFormatter(content.split(" ").length) : 0}
          </strong>{" "}
          {intl.formatMessage({ id: "word.count.text" })}
        </h2>
      </div>

      <h2 className="text-gray-500 font-medium text-sm pt-12">
        {due_date ? (
          <span>
            {calculateDaysUntilDeadline(due_date.toString()) < 0 ? (
              <span style={{ color: "red" }}>
                Deadline passed{" "}
                {Math.abs(calculateDaysUntilDeadline(due_date.toString()))} days
                ago
              </span>
            ) : (
              <div>
                <span style={{ color: "red" }}>
                  {calculateDaysUntilDeadline(due_date.toString())} days
                </span>

                <span> till deadline</span>
              </div>
            )}
          </span>
        ) : null}
      </h2>

      <div className="flex flex-row pt-2 items-center justify-between">
        <DatePicker
          project_uuid={project_uuid}
          current_deadline={due_date ? new Date(due_date) : undefined}
        />
        <Button
          className="w-32"
          size="sm"
          variant="default"
          onClick={() => {
            router.push(pathname + "/original");
          }}
        >
          <EyeOpenIcon className="mr-2" />
          {intl.formatMessage({ id: "button.vieworiginal" })}
        </Button>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 sm:gap-6">
        <div className="">
          <h1 className="text-slate-500 pb-2 text-lg font-bold">
            {intl.formatMessage({ id: "section.summary" })}
          </h1>
          <div className="bg-white rounded-lg p-4 space-y-2">
            {key_points && key_points.key_points ? (
              Array.isArray(key_points.key_points) &&
              key_points.key_points.length > 0 ? (
                key_points.key_points.map((point: any, index: any) => (
                  <div key={index} className="break-words my-4">
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                      {point.title}
                    </h4>
                    <p className="leading-7 [&:not(:first-child)]:mt-2">
                      {point.key_point}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No key points available.</p>
              )
            ) : (
              // You can render a loading state or null if you don't want to show anything
              <p className="text-gray-500">Loading key points...</p>
            )}
          </div>
        </div>

        <div>
          <div className="sm:mt-0 mt-16">
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
                  {mainQuiz && (
                    <Table.Row>
                      <Table.RowHeaderCell>Quizzes</Table.RowHeaderCell>
                      <Table.Cell className="text-center">
                        {mainQuiz.attempts}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {getAvgOfArray(mainQuiz.user_scores).toFixed(2)}%
                      </Table.Cell>
                    </Table.Row>
                  )}

                  {mainDeck && (
                    <Table.Row>
                      <Table.RowHeaderCell>Study Cards</Table.RowHeaderCell>
                      <Table.Cell className="text-center">
                        {mainDeck.attempts}
                      </Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table.Root>
            </div>
          </div>

          <div className="mt-16">
            <h1 className="text-slate-500 pb-2 text-lg font-bold">
              {intl.formatMessage({ id: "title.checklist" })}
            </h1>

            <div className="bg-white rounded-lg p-4">
              {deck_uuid && (
                <div className="flex justify-between items-center mb-2">
                  <p className="text-black">
                    {intl.formatMessage({ id: "button.flashcards" })}
                  </p>
                  <Button
                    size="sm"
                    onClick={() => router.push(`/deck/${deck_uuid}`)}
                  >
                    {intl.formatMessage({ id: "button.start" })}
                  </Button>
                </div>
              )}

              <Separator className="my-2" />

              {mainQuiz && (
                <div className="flex justify-between items-center mb-2">
                  <p className="text-black">
                    {intl.formatMessage({ id: "button.takequiz" })}
                  </p>

                  <Button
                    size="sm"
                    onClick={() => router.push(`/quiz/${mainQuiz.quiz_uuid}`)}
                  >
                    {intl.formatMessage({ id: "button.start" })}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
