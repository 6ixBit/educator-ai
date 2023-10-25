"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import * as Form from "@radix-ui/react-form";

import { sendToSupabase, sendToServer } from "./actions";

import Summary from "./components/summary";
import FlashCards from "./components/flashcards";
import RadioGroupContainer from "@/components/RadioGroup/RadioGroupContainer";

export default function ClientComponent() {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data) {
        setUser(data);
      }
    };

    getUser();
  }, [supabase, setUser]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // TODO: Show user login modal if they aren't logged in already and return early.
    event.preventDefault();

    if (!user?.user?.id) {
      console.log("we got a freeloader here.");
      //TODO: Prompt the user to login via the UI now.
      return;
    }

    const formValue = (event.target as any).elements.content.value;
    await sendToSupabase(supabase, formValue, user?.user?.id);
    await sendToServer(formValue);
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-full">
      <Form.Root className="w-[350px] sm:w-[500px]" onSubmit={handleSubmit}>
        <Form.Field className="grid mb-[10px]" name="content">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-md font-medium my-2 leading-[35px] text-white">
              Enter what you want to learn
            </Form.Label>
            <Form.Message
              className="text-[13px] text-black opacity-[0.8]"
              match="valueMissing"
            >
              Please enter a question
            </Form.Message>
          </div>
          <Form.Control asChild>
            <textarea
              className="box-border h-40 sm:h-52 text-gray-400 w-full bg-blackA2 shadow-blackA6 inline-flex appearance-none items-center justify-center rounded-[4px] p-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6 resize-none"
              placeholder="How did the Roman empire become so dominant?"
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <div className="flex justify-center">
            <button className="box-border w-1/2 text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]">
              Start Learning
            </button>
          </div>
        </Form.Submit>
      </Form.Root>

      <Summary
        title="The great battle of Kashtira and Tearlament"
        summary="This great battle occured on the west bank of the wall of fire, Kashtira led by AriseHeart and Tearlamenets led by resentful leader"
      />
      <FlashCards />
      <div className="mt-12 mb-4">
        <h1 className="text-lg font-medium text-white text-center pb-4 underline">
          Quiz
        </h1>
        <RadioGroupContainer />
      </div>
    </div>
  );
}
