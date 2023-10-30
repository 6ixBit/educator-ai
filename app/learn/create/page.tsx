"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { fetchUser } from "../actions";
import { useRouter } from "next/navigation";
import * as Form from "@radix-ui/react-form";
import { useQuery } from "react-query";

import { sendToSupabase, sendToServer } from "../actions";

export default function ClientComponent() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const { data: user } = useQuery({
    queryKey: "userData",
    queryFn: () => fetchUser(supabase),
  });

  // @ts-ignore
  const userID = user?.user?.id;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // TODO: Show user login modal if they aren't logged in already and return early.
    event.preventDefault();

    // @ts-ignore
    if (!userID) {
      console.log("we got a freeloader here.");
      return;
    }

    const formValue = (event.target as any).elements.content.value;
    const data = await sendToSupabase(supabase, formValue, userID);
    await sendToServer(formValue);

    router.push(`/learn/${data[0].id}`);
  };

  return (
    <div className="flex flex-col  justify-center items-center sm:w-8/12 lg:w-6/12">
      <Form.Root
        className="w-[320px] sm:w-[500px] md:w-[500px] lg:w-[685px]"
        onSubmit={handleSubmit}
      >
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
            <button className="box-border w-1/2 text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-full bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]">
              Start Learning
            </button>
          </div>
        </Form.Submit>
      </Form.Root>
    </div>
  );
}
