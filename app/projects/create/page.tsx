"use client";

import * as Form from "@radix-ui/react-form";
// @ts-ignore
import * as SVGLoaders from "svg-loaders-react";

import {
  addCaseStudyToDB,
  addDeckToDB,
  addKeyPointsToDB,
  addProjectToDB,
  addStudyCardsToDB,
  generateCaseStudy,
  generateKeyPoints,
  generateQuiz,
  generateStudyCards,
} from "../actions";

import { Button } from "@/components/ui/button";
import { DropDownMenu } from "@/components/DropdownMenu";
import Header from "@/components/Header";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import ProgressBar from "@/components/ProgressBar";
import { Separator } from "@/components/ui/separator";
import { Tooltip } from "@radix-ui/themes";
import { addQuizToDB } from "../actions";
import { formatBytes } from "@/lib/utils";
import { sendDeadlineReminderEmail } from "@/emails/actions";
import { toast } from "sonner";
import { useIntl } from "react-intl";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useStore from "@/app/store";
import { useUploadPdf } from "../hooks";
import { useUserAuth } from "@/app/hooks";

export default function Page() {
  const maxCharacterLimit = 10_000;

  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { userID } = useUserAuth();
  const [level, setLevel] = useState("highSchool");
  const [textAreaWordCount, setTextAreaWordCount] = useState(0);

  // @ts-ignore
  const supabase = useStore((state) => state?.supabase);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const words = event.target.value
      .split(" ")
      .filter((word: string) => word !== "");
    setTextAreaWordCount(words.length);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    if (textAreaWordCount > maxCharacterLimit) {
      toast.error(
        "Your content exceeds the character limit, please reduce it."
      );
      setLoading(false);
      return;
    }

    const formValues = event.target as any;
    const title = formValues[0].value;
    const body = formValues[3].value;
    const project = (await addProjectToDB(supabase, body, title, userID)) || [
      {},
    ];

    // QUIZ LOGIC ------
    const quiz = await generateQuiz(body, level);
    const err_quiz = addQuizToDB(
      supabase,
      quiz?.data.quiz,
      project[0].id,
      userID
    );

    // STUDY CARD -------
    const studyCards = await generateStudyCards(body, level);
    const deck = await addDeckToDB(
      supabase,
      studyCards.deck.deck_name,
      userID,
      project[0].id
    );
    const err_studycards = await addStudyCardsToDB(
      supabase,
      userID,
      studyCards,
      deck && deck[0].id
    );

    // CASE STUDY ------
    const caseStudy = await generateCaseStudy(body, level);
    await addCaseStudyToDB(supabase, project[0].id, caseStudy.question);

    // KEY POINTS -----
    const key_points = await generateKeyPoints(body, level);
    await addKeyPointsToDB(supabase, project[0].id, key_points.data.key_points);

    console.log("NEW key points: ", key_points.data.key_points);

    setLoading(false);
    router.push(`/projects/${project[0].project_uuid}`);
  };

  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const fileInputRef = useRef(null);
  const { mutate: uploadPdf, isLoading, isError } = useUploadPdf();

  const handleAddPDF = () => {
    // @ts-ignore
    fileInputRef.current.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPdfLoading(true);
    sendDeadlineReminderEmail("hamzacarew@gmail.com");

    if (
      event.target.files &&
      event.target.files[0] &&
      event.target.files[0].type === "application/pdf"
    ) {
      setPdfFile(event.target.files[0]);
      console.log("uploaded pdf: ", event.target.files[0]);
      uploadPdf(event.target.files[0]);

      if (isError) {
        console.log("pdf errors: ", isError);
      }

      setIsPdfLoading(false);
    } else {
      toast.error("Please select a PDF file.");
    }
  };

  return (
    <>
      <Header hideSearchBar={true} handleSearch={() => {}} />

      <div className="flex justify-center items-center flex-col">
        <h1 className="text-start font-bold text-3xl mb-12 mt-6 text-zinc-700">
          Create a new project
        </h1>

        <div className="flex flex-row gap-1 justify-center mb-4">
          <Button size="sm" onClick={handleAddPDF}>
            Upload a pdf
          </Button>

          <input
            type="file"
            id="file-upload"
            accept="application/pdf"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>

        {pdfFile && <p className="text-black">{pdfFile.name}</p>}
        {<p>{pdfFile && formatBytes(pdfFile?.size)}</p>}

        {isPdfLoading && <SVGLoaders.SpinningCircles />}

        <strong className="py-3">or</strong>

        <Form.Root
          className="w-10/12 sm:w-[500px] md:w-[500px] lg:w-[685px]"
          onSubmit={handleSubmit}
        >
          <Form.Field className=" mb-[10px]" name="content">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
              <div className="flex flex-col">
                <Form.Label className="text-[16px] font-bold leading-[35px] text-black">
                  {intl.formatMessage({ id: "create.title.text" })}
                </Form.Label>
                <Form.Control asChild>
                  <input
                    className={`box-border w-auto bg-blackA2 text-black bg-white inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6 ${
                      loading ? "opacity-50 pointer-events-none" : ""
                    }`}
                    placeholder="The influence of AI"
                    required
                    disabled={loading}
                  />
                </Form.Control>
              </div>

              <div className="mb-6 flex flex-col mt-4 sm:mt-0 sm:pr-8">
                <Form.Label className=" flex flex-row items-center gap-2">
                  <p className="text-[16px] font-bold leading-[35px] text-black">
                    {intl.formatMessage({ id: "create.level.text" })}
                  </p>
                  <Tooltip content="Influences the complexity of study material generated">
                    <InfoCircledIcon />
                  </Tooltip>
                </Form.Label>

                <div className="pr-8 sm:pr-0">
                  <DropDownMenu
                    placeholder="High School"
                    options={[
                      { value: "middleSchool", label: "Middle School" },
                      { value: "highSchool", label: "High School" },
                      { value: "underGrad", label: "Under Graduate" },
                    ]}
                    onValueChange={(value) => {
                      setLevel(value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-baseline justify-between mt-1">
              <Form.Label className="text-md font-medium my-2 leading-[35px] text-black">
                {intl.formatMessage({ id: "create.body.text" })}
              </Form.Label>
            </div>

            <Form.Control asChild>
              <textarea
                className="box-border h-72 sm:h-80 text-black w-full p-6 sm:w-full shadow-blackA6 inline-flex appearance-none items-center justify-center rounded-[4px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6 resize-none"
                placeholder="How did the Roman empire become so dominant?"
                required
                disabled={loading}
                onChange={handleTextChange}
              />
            </Form.Control>

            <p className="text-stone-600 mt-2 text-right">
              {intl.formatMessage(
                { id: "create.wordcount" },
                { characters: textAreaWordCount }
              )}
            </p>

            <div className="text-center">
              <Form.Message
                className="text-[13px] text-red-500 opacity-[0.8]"
                match="valueMissing"
              >
                {intl.formatMessage({
                  id: "create.error.valuemissing.title",
                })}
              </Form.Message>
            </div>
          </Form.Field>

          <Form.Submit asChild>
            <div className="flex justify-center">
              {loading ? (
                <div className="w-9/12 mt-2">
                  <ProgressBar initialProgress={10} end={!loading} />
                </div>
              ) : (
                <Button variant="submit_blue" disabled={loading}>
                  {intl.formatMessage({ id: "button.submit.text" })}
                </Button>
              )}
            </div>
          </Form.Submit>
        </Form.Root>
      </div>
    </>
  );
}
