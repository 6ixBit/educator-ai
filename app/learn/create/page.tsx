"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { fetchUser, update_row } from "../actions";
import { useRouter } from "next/navigation";
import * as Form from "@radix-ui/react-form";
import { useQuery } from "react-query";
import { useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import DropDownMenu from "@/components/DropdownMenu/DropdownMenu";

import { sendToSupabase, sendToServer } from "../actions";

export default function ClientComponent() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState("highSchool");

  const { data: user } = useQuery({
    queryKey: "userData",
    queryFn: () => fetchUser(supabase),
  });

  // @ts-ignore
  const userID = user?.user?.id;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // TODO: Show user login modal if they aren't logged in already and return early.
    setLoading(true);
    event.preventDefault();

    // @ts-ignore
    if (!userID) {
      console.log("we got a freeloader here.");
      return;
    }

    const formValues = event.target as any;
    const title = formValues[0].value;
    const body = formValues[1].value;

    const data = await sendToSupabase(supabase, body, title, userID);
    const pageID = data[0].id;
    const { case_study, flash_cards, processed } = await sendToServer(body);

    update_row(
      supabase,
      {
        case_study_scenario: case_study.scenario,
        case_study_questions: case_study.questions,
        case_study_answers: case_study.answers,
        summary_of_content: processed,
        flash_cards: flash_cards.flash_cards,
        level: level,
      },
      pageID
    );

    setLoading(false);
    router.push(`/learn/${pageID}`);
  };

  return (
    <div className="flex flex-col justify-center items-center sm:justify-start sm:items-start max-w-full w-9/12 sm:w-8/12 lg:w-9/12">
      <Form.Root
        className="w-full sm:w-[500px] md:w-[500px] lg:w-[685px]"
        onSubmit={handleSubmit}
      >
        <Form.Field className="grid mb-[10px]" name="content">
          <div className="flex flex-row justify-between items-baseline">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
              Title
            </Form.Label>
            <Form.Message
              className="text-[13px] text-red-500 opacity-[0.8]"
              match="valueMissing"
            >
              Please enter a title
            </Form.Message>
          </div>

          <Form.Control asChild>
            <input
              className="box-border w-full bg-blackA2 text-black bg-white shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
              placeholder="The influence of AI "
              required
              disabled={loading}
            />
          </Form.Control>

          <div className="flex items-baseline justify-between mt-4">
            <Form.Label className="text-md font-medium my-2 leading-[35px] text-white">
              What you want to learn
            </Form.Label>
          </div>
          <Form.Control asChild>
            <textarea
              className="box-border h-40 sm:h-52 text-black w-full bg-blackA2 shadow-blackA6 inline-flex appearance-none items-center justify-center rounded-[4px] p-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6 resize-none"
              placeholder="How did the Roman empire become so dominant?"
              required
              disabled={loading}
            />
          </Form.Control>
          <p className="text-slate-300 mt-2 text-right">
            0 / 10,000 characters
          </p>

          <div className="mb-6 flex flex-col">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
              Level
            </Form.Label>

            <div className="flex flex-row justify-between items-baseline">
              <DropDownMenu
                onValueChange={(value) => {
                  setLevel(value);
                }}
              />

              <h2 className="text-gray-500 font-medium text-sm mb-3">
                Scale of study content
              </h2>
            </div>
          </div>

          <div className="text-center">
            <Form.Message
              className="text-[13px] text-red-500 opacity-[0.8]"
              match="valueMissing"
            >
              Please enter some content...
            </Form.Message>
          </div>
        </Form.Field>

        <Form.Submit asChild>
          <div className="flex justify-center">
            <button
              disabled={loading}
              className="box-border w-1/2 text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-full bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]"
            >
              Submit
            </button>
          </div>
        </Form.Submit>
      </Form.Root>
    </div>
  );
}
