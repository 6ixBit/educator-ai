"use client";

import * as Form from "@radix-ui/react-form";

import { Button, Tooltip } from "@radix-ui/themes";

import { DropDownMenu } from "@/components/DropdownMenu";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useIntl } from "react-intl";
import { useState } from "react";
import { useUserAuth } from "@/hooks/useUserAuth";

export default function Page() {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState("highSchool");
  const [textAreaWordCount, setTextAreaWordCount] = useState(0);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const words = event.target.value
      .split(" ")
      .filter((word: string) => word !== "");
    setTextAreaWordCount(words.length);
  };

  const handleSubmit = () => {
    return {};
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-start font-bold text-3xl mb-12 mt-6 text-zinc-700">
        Create a new project
      </h1>

      {/* <div className="w-6/12 xl:w-7/12 2xl:w-3/12">
        <Button className="w-full" radius="full" variant="surface">
          Upload a PDF
        </Button>
      </div>

      <strong className="py-3">or</strong> */}

      <div>
        <Form.Root
          className="w-full sm:w-[500px] md:w-[500px] lg:w-[685px]"
          onSubmit={handleSubmit}
        >
          <Form.Field className=" mb-[10px]" name="content">
            <div className="flex flex-col sm:flex-row sm:items-baseline">
              <div className="flex flex-col">
                <Form.Label className="text-[16px] font-bold leading-[35px] text-black">
                  {intl.formatMessage({ id: "create.title.text" })}
                </Form.Label>
                <Form.Control asChild>
                  <input
                    className="box-border w-auto bg-blackA2 text-black bg-white inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
                    placeholder="The influence of AI "
                    required
                    disabled={loading}
                  />
                </Form.Control>
              </div>

              <div className="mb-6 flex flex-col ml-auto mt-4 sm:mt-0">
                <Form.Label className=" flex flex-row items-center gap-2">
                  <p className="text-[16px] font-bold leading-[35px] text-black">
                    {intl.formatMessage({ id: "create.level.text" })}
                  </p>
                  <Tooltip content="Influences the complexity of study material generated">
                    <InfoCircledIcon />
                  </Tooltip>
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
                className="box-border h-72 sm:h-80 text-black w-56 p-6  sm:w-full  shadow-blackA6 inline-flex appearance-none items-center justify-center rounded-[4px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6 resize-none"
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
                  id: "create.error.valuemissing.content",
                })}
              </Form.Message>
            </div>
          </Form.Field>

          <Form.Submit asChild>
            <div className="flex justify-center">
              <button
                disabled={loading}
                className="box-border w-1/2 text-black shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-full bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]"
              >
                {intl.formatMessage({ id: "button.submit.text" })}
              </button>
            </div>
          </Form.Submit>
        </Form.Root>
      </div>
    </div>
  );
}
