"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@mui/material";
import { useRef } from "react";

export default function Page() {
  // Create a reference to the hidden file input
  const fileInputRef = useRef(null);

  // Function to trigger the file input click event
  const handleButtonClick = () => {
    fileInputRef.current.click();
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
      </Card>
    </div>
  );
}
