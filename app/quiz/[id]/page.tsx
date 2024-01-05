"use client";

import { Card } from "@/components/ui/card";
import GradeCircle from "@/components/grade-circle";
import Quiz from "../Quiz";
import { toast } from "sonner";
import { useEffect } from "react";
import { useGetQuizByUUID } from "../hooks";

export default function Page({
  params: { id: quiz_uuid },
}: {
  params: { id: string };
}) {
  const { data, error, isLoading } = useGetQuizByUUID(quiz_uuid);
  const fakeGrade = 66;

  useEffect(() => {
    if (data) {
      console.log("id: ", data);
    }

    if (error) {
      toast.error("Failed to load quiz, please try again later.");
    }
  }, [data, isLoading]);

  return (
    <div className="sm:pl-6 pl-2">
      <Card className="flex flex-col w-full  p-4 bg-white rounded-lg shadow-md mt-16">
        <div className="flex flex-col gap-1">
          <GradeCircle value={fakeGrade} />
          <p className="text-black font-mono">Avg Grade</p>
        </div>
        {data && (
          <Quiz
            questions={data[0].questions}
            uuid={data[0].quiz_uuid}
            attempts={data[0].attempts}
            current_scores={data[0].user_scores || []}
          />
        )}
      </Card>
    </div>
  );
}
