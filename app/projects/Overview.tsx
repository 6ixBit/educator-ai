"use client";

import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/datepicker";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import GradeCircle from "@/components/grade-circle";
import { Separator } from "@/components/ui/separator";
import { Table } from "@radix-ui/themes";
import { calculateDaysUntilDeadline } from "@/lib/utils";
import { formatDate } from "@/utility";
import { nFormatter } from "@/utility";
import { useIntl } from "react-intl";

interface IOverview {
  title: string;
  date: any;
  content: string;
  grade: number;
  project_uuid: string;
  due_date: Date | string | undefined;
  deck_uuid?: string;
}

export default function Overview({
  title,
  date,
  content,
  grade,
  project_uuid,
  due_date,
  deck_uuid,
}: IOverview) {
  const intl = useIntl();
  const pathname = usePathname();
  const router = useRouter();

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
        <div className="max h-40">
          <h1 className="text-slate-500 pb-2 text-lg font-bold">
            {intl.formatMessage({ id: "section.teachersNotes" })}
          </h1>
          <div className="bg-white rounded-lg p-4">
            <h2 className="text-black">
              On review of your report card and consideration of your grade, I
              believe you are in a pretty good position to take an exam on this
              topic.
            </h2>
          </div>
        </div>

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
              </Table.Body>
            </Table.Root>
          </div>
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

          {/* <div className="flex justify-between items-center mb-2">
            <p className="text-black">
              {intl.formatMessage({ id: "button.takequiz" })}
            </p>
            <Button size="sm">
              {intl.formatMessage({ id: "button.start" })}
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
