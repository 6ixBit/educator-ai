"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { fetchUser, update_row } from "../actions";
import { useRouter } from "next/navigation";
import * as Form from "@radix-ui/react-form";
import { useQuery } from "react-query";
import { useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import { DropDownMenu } from "@/components/DropdownMenu";
import { useIntl } from "react-intl";
import { Text } from "@radix-ui/themes";

import { sendToDB, sendFormDataForProcessing, generateQuiz } from "../actions";

export default function ClientComponent() {
  const intl = useIntl();
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
    setLoading(true);
    event.preventDefault();

    const formValues = event.target as any;
    const title = formValues[0].value;
    const body = formValues[3].value;

    const data = await sendToDB(supabase, body, title, userID);
    const pageID = data[0].id;

    const { case_study, flash_cards, key_points } =
      await sendFormDataForProcessing(body);
    const questions = await generateQuiz(body);

    update_row(
      supabase,
      {
        case_study_scenario: case_study.scenario,
        quiz_questions: questions,
        key_points: key_points,
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
      <Text size="3"></Text>
      <h1 className="text-white text-2xl text-center mt-8 mb-8 font-medium">
        Create your new learning project!
      </h1>
      <Form.Root
        className="w-full sm:w-[500px] md:w-[500px] lg:w-[685px]"
        onSubmit={handleSubmit}
      >
        <Form.Field className="grid mb-[10px]" name="content">
          <div className="flex flex-row items-baseline">
            <div className="flex flex-col">
              <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
                {intl.formatMessage({ id: "create.title.text" })}
              </Form.Label>
              <Form.Control asChild>
                <input
                  className="box-border w-auto bg-blackA2 text-black bg-white shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
                  placeholder="The influence of AI "
                  required
                  disabled={loading}
                />
              </Form.Control>
            </div>

            <div className="mb-6 flex flex-col ml-auto">
              <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
                {intl.formatMessage({ id: "create.level.text" })}
              </Form.Label>

              <div className="flex flex-row justify-between items-baseline">
                <DropDownMenu
                  placeholder="High School"
                  options={[
                    { value: "middleSchool", label: "Middle School" },
                    { value: "highSchool", label: "High School" },
                    { value: "underGrad", label: "Under Graduate" },
                  ]}
                  onValueChange={(value) => {
                    setLevel(value);
                    console.log(value);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-baseline justify-between mt-1">
            <Form.Label className="text-md font-medium my-2 leading-[35px] text-white">
              {intl.formatMessage({ id: "create.body.text" })}
            </Form.Label>
          </div>

          <Form.Control asChild>
            <textarea
              className="box-border h-40 sm:h-52 text-black w-full  shadow-blackA6 inline-flex appearance-none items-center justify-center rounded-[4px] p-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6 resize-none"
              placeholder="How did the Roman empire become so dominant?"
              required
              disabled={loading}
            />
          </Form.Control>

          <p className="text-slate-300 mt-2 text-right">
            {intl.formatMessage({ id: "create.charcount" }, { characters: 99 })}
          </p>

          <div className="text-center">
            <Form.Message
              className="text-[13px] text-red-500 opacity-[0.8]"
              match="valueMissing"
            >
              {intl.formatMessage({ id: "create.error.valuemissing.content" })}
            </Form.Message>
          </div>
        </Form.Field>

        <Form.Submit asChild>
          <div className="flex justify-center">
            <button
              disabled={loading}
              className="box-border w-1/2 text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-full bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]"
            >
              {intl.formatMessage({ id: "button.submit.text" })}
            </button>
          </div>
        </Form.Submit>
      </Form.Root>
    </div>
  );
}
