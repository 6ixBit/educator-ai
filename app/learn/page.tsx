"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import * as Form from "@radix-ui/react-form";

export default function ClientComponent() {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data) {
        setUser(data);
        console.log("your user: ", data);
      }
    };

    getUser();
  }, [supabase, setUser]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formValue = (event.target as any).elements.content.value;

    sendToAPI(formValue, user.user.id);
  };

  const sendToAPI = async (content: string, user_id: string) => {
    const { data, error } = await supabase
      .from("text-content")
      .insert([{ content, user_id }])
      .select();

    console.log("data: ", data);
  };

  return (
    <div>
      <Form.Root className="w-[350px] sm:w-[500px]" onSubmit={handleSubmit}>
        <Form.Field className="grid mb-[10px]" name="content">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-md font-medium my-2 leading-[35px] text-white">
              What you want to learn
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
              className="box-border h-40 sm:h-52 text-gray-500 w-full bg-blackA2 shadow-blackA6 inline-flex appearance-none items-center justify-center rounded-[4px] p-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6 resize-none"
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
    </div>
  );
}
