"use client";

import * as Form from "@radix-ui/react-form";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { DropDownMenu } from "@/components/DropdownMenu";
import ProgressBar from "@/components/ProgressBar";
import { toast } from "sonner";
import { useIntl } from "react-intl";

export default function Page() {
  const maxWordCount = 50_000;
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const [textAreaWordCount, setTextAreaWordCount] = useState(0);

  const [difficulty, setDifficulty] = useState();
  const [questionCount, setQuestionCount] = useState();

  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    // @ts-ignore
    fileInputRef.current.click();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    if (textAreaWordCount > maxWordCount) {
      toast.error(
        "Your content exceeds the character limit, please reduce it."
      );
      setLoading(false);
      return;
    }

    const formValues = event.target as any;
    const textArea = formValues[0].value;

    console.log("Text area: ", textArea);
    console.log(difficulty);
    console.log(questionCount);

    // TODO: Send request to server

    // setLoading(false);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const words = event.target.value
      .split(" ")
      .filter((word: string) => word !== "");
    setTextAreaWordCount(words.length);
  };

  return (
    <div className="sm:pl-6 pl-2">
      <Card className="flex flex-col w-full  p-4 bg-white rounded-lg shadow-md mt-16">
        <CardHeader className="flex items-center  justify-between pb-6">
          <CardTitle className="text-lg font-bold">Generate Quiz</CardTitle>

          <CardDescription className=" px-4 sm:px-16">
            You can generate quizzes from here and have them exist as standalone
            quizzes or link them to an existing project.
          </CardDescription>
        </CardHeader>

        <div className="flex flex-row gap-1 justify-center mb-4">
          <Button size="sm" onClick={handleButtonClick}>
            Upload a text file
          </Button>

          <Button size="sm" onClick={handleButtonClick}>
            Upload a pdf
          </Button>

          <input
            type="file"
            id="file-upload"
            accept=".txt, application/pdf"
            style={{ display: "none" }}
            ref={fileInputRef}
          />
        </div>

        <Form.Root className=" mt-6" onSubmit={handleSubmit}>
          <Form.Field className=" mb-[10px] px-8" name="content">
            <Form.Control asChild>
              <textarea
                className="box-border h-60 sm:h-80 text-black w-full p-6 sm:w-full shadow-blackA6 inline-flex appearance-none items-center justify-center rounded-[4px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6 resize-none"
                placeholder="Or enter content for question generation directly..."
                required
                disabled={loading}
                onChange={handleTextChange}
              />
            </Form.Control>
            {textAreaWordCount} / {maxWordCount.toLocaleString()} words
            <div className="text-center">
              <Form.Message
                className="text-[13px] text-red-500 opacity-[0.8]"
                match="valueMissing"
              >
                {intl.formatMessage({
                  id: "create.error.valuemissing.quizcontent",
                })}
              </Form.Message>
            </div>
          </Form.Field>

          <div className="flex flex-col sm:mb-0 mb-4 max-w-lg  sm:flex-row gap-4 justify-between px-0 sm:px-8 mt-7">
            <div className="flex flex-col max-w-lg">
              <p>Question Type</p>
              <DropDownMenu
                placeholder="True or False"
                options={[
                  { value: "true_or_false", label: "True or False" },
                  { value: "mcq", label: "Multiple Choice Question" },
                ]}
                onValueChange={(value) => {
                  setDifficulty(value);
                }}
              />
            </div>

            <div className="flex flex-col">
              <p>Difficulty</p>
              <DropDownMenu
                placeholder="Easy"
                options={[
                  { value: "easy", label: "Easy" },
                  { value: "medium", label: "Medium" },
                  { value: "hard", label: "Hard" },
                ]}
                onValueChange={(value) => {
                  setDifficulty(value);
                }}
              />
            </div>

            <div className="flex flex-col">
              <p>Count</p>
              <DropDownMenu
                placeholder="5"
                options={[
                  { value: "5", label: "5" },
                  { value: "10", label: "10" },
                  { value: "15", label: "15" },
                  { value: "20", label: "20" },
                  { value: "25", label: "25" },
                  { value: "30", label: "30" },
                  { value: "35", label: "35" },
                  { value: "40", label: "40" },
                  { value: "45", label: "45" },
                  { value: "50", label: "50" },
                  { value: "55", label: "55" },
                  { value: "60", label: "60" },
                  { value: "65", label: "65" },
                  { value: "70", label: "70" },
                  { value: "75", label: "75" },
                  { value: "80", label: "80" },
                  { value: "85", label: "85" },
                  { value: "90", label: "90" },
                  { value: "95", label: "95" },
                  { value: "100", label: "100" },
                ]}
                onValueChange={(value) => {
                  setQuestionCount(value);
                }}
              />
            </div>
          </div>
          <Form.Submit asChild>
            <div className="flex justify-center">
              {loading ? (
                <div className="w-9/12 mt-2">
                  <ProgressBar initialProgress={10} end={!loading} />
                </div>
              ) : (
                <Button variant="submit_blue" disabled={loading}>
                  {intl.formatMessage({ id: "button.generate.quiz" })}
                </Button>
              )}
            </div>
          </Form.Submit>
        </Form.Root>
      </Card>
    </div>
  );
}
