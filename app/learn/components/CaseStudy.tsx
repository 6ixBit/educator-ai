"use client";

import * as Form from "@radix-ui/react-form";
import { gradeCaseStudy } from "../actions";
import { useState } from "react";

interface ICaseStudy {
  caseStudyText: string;
  caseStudyContext: string;
}

export default function CaseStudy({
  caseStudyText,
  caseStudyContext,
}: ICaseStudy) {
  const [grades, setGrade] = useState({
    grade: 40,
    understanding: 2,
    accuracy: 4,
    knowledge: 1,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formValues = event.target as any;
    const userAnswer = formValues[0].value;

    const response = await gradeCaseStudy(
      caseStudyText,
      caseStudyContext,
      userAnswer
    );

    setGrade(response);

    console.log("I wish I knew...", response);
  };

  return (
    <div className="mt-12 mb-4">
      <div className="flex flex-row gap-2 mb-3 justify-between">
        <h1 className="text-white text-left pb-1 font-bold mb-0 text-2xl leading-relaxed">
          Case Study
        </h1>

        <div className="text-right flex flex-row items-baseline">
          <h2 className="text-gray-500 font-medium text-md mb-3 pr-3">
            Your Last grade:
          </h2>

          <p
            className={`text-sm rounded-full border-2 p-2 ${
              grades.grade < 50
                ? "text-red-500 border-red-500"
                : grades.grade < 70
                ? "text-yellow-500 border-yellow-500"
                : "text-green-500 border-green-500"
            }`}
          >
            {grades.grade}
          </p>
        </div>
      </div>

      <p className="text-slate-300 mb-2">{caseStudyText}</p>

      <Form.Root
        className="w-full sm:w-[500px] md:w-[500px] lg:w-[685px]"
        onSubmit={handleSubmit}
      >
        <Form.Field className="grid mb-[10px] mx-auto" name="content">
          <Form.Control asChild>
            <textarea
              className="box-border h-24 mt-4 sm:h-40 text-black w-11/12 mx-auto bg-blackA2 shadow-blackA6 inline-flex appearance-none items-center justify-center rounded-[4px] p-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6 resize-none"
              placeholder="Answer this to the best of your ability"
              required
            />
          </Form.Control>

          <div className="text-center">
            <Form.Message
              className="text-[13px] text-red-500 opacity-[0.8] mx-auto"
              match="valueMissing"
            >
              Please enter an answer.
            </Form.Message>
          </div>
        </Form.Field>

        <div className="flex flex-col sm:flex-row gap-2 justify-between">
          <div className="flex flex-col">
            <p
              className={`text-sm  text-center py-2 px-4 flex items-center justify-center ${
                grades.understanding < 3
                  ? "text-red-500 border-red-500"
                  : grades.understanding < 7
                  ? "text-yellow-500 border-yellow-500"
                  : "text-green-500 border-green-500"
              }`}
            >
              {grades.understanding}
            </p>
            <p className="text-white">Understanding</p>
          </div>
          <div className="flex flex-col">
            <p
              className={`text-sm text-center py-2 px-4 flex items-center justify-center ${
                grades.accuracy < 3
                  ? "text-red-500 border-red-500"
                  : grades.accuracy < 7
                  ? "text-yellow-500 border-yellow-500"
                  : "text-green-500 border-green-500"
              }`}
            >
              {grades.accuracy}
            </p>
            <p className="text-white">Accuracy</p>
          </div>
          <div className="flex flex-col">
            <p
              className={`text-sm text-center py-2 px-4 flex items-center justify-center ${
                grades.knowledge < 3
                  ? "text-red-500 border-red-500"
                  : grades.knowledge < 7
                  ? "text-yellow-500 border-yellow-500"
                  : "text-green-500 border-green-500"
              }`}
            >
              {grades.knowledge}
            </p>
            <p className="text-white">Knowledge</p>
          </div>
        </div>

        <Form.Submit asChild>
          <div className="flex justify-center">
            <button className="box-border mt-6 w-1/4 text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-full bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
              Grade me
            </button>
          </div>
        </Form.Submit>
      </Form.Root>
    </div>
  );
}
