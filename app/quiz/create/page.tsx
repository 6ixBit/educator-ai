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
import { Input } from "@mui/material";
import ProgressBar from "@/components/ProgressBar";
import { useIntl } from "react-intl";

export default function Page() {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);

  // Create a reference to the hidden file input
  const fileInputRef = useRef(null);

  // Function to trigger the file input click event
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = () => {
    console.log("Form submitted with raw text.");
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(event.target.value);
  };

  return (
    <div className="sm:pl-6 pl-2">
      <Card className="flex flex-col w-full  p-4 bg-white rounded-lg shadow-md mt-16">
        <CardHeader className="flex items-center  justify-between pb-6">
          <CardTitle className="text-lg font-bold">Generate Quiz</CardTitle>

          <CardDescription>
            You can generate quizzes from here and have them exist as standalone
            quizzes or link them to an existing project.
          </CardDescription>
        </CardHeader>

        <div className="flex flex-row gap-1 justify-center">
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

        <Form.Root
          className="w-10/12 sm:w-[500px] md:w-[500px] lg:w-[685px] mt-6"
          onSubmit={handleSubmit}
        >
          <Form.Field className=" mb-[10px]" name="content">
            <Form.Control asChild>
              <textarea
                className="box-border h-72 sm:h-80 text-black w-full p-6 sm:w-full shadow-blackA6 inline-flex appearance-none items-center justify-center rounded-[4px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6 resize-none"
                placeholder="How did the Roman empire become so dominant?"
                required
                disabled={loading}
                onChange={handleTextChange}
              />
            </Form.Control>
          </Form.Field>

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
