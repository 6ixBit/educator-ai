import * as Form from "@radix-ui/react-form";

interface ICaseStudy {
  text: string;
}

export default function CaseStudy({ text }: ICaseStudy) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submit");
  };

  return (
    <div className="mt-12 mb-4">
      <h1 className="text-xl font-medium text-white text-center pb-4">
        Case Study
      </h1>

      <p className="text-white">{text}</p>

      <Form.Root
        className="w-full sm:w-[500px] md:w-[500px] lg:w-[685px]"
        onSubmit={handleSubmit}
      >
        <Form.Field className="grid mb-[10px]" name="content">
          <Form.Control asChild>
            <textarea
              className="box-border h-40 mt-4 sm:h-52 text-black w-full bg-blackA2 shadow-blackA6 inline-flex appearance-none items-center justify-center rounded-[4px] p-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6 resize-none"
              placeholder="Answer this to the best of your ability"
              required
            />
          </Form.Control>

          <div className="text-center">
            <Form.Message
              className="text-[13px] text-red-500 opacity-[0.8]"
              match="valueMissing"
            >
              Please enter an answer.
            </Form.Message>
          </div>
        </Form.Field>
        <Form.Submit asChild>
          <div className="flex justify-center">
            <button className="box-border w-1/2 text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-full bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]">
              Grade me
            </button>
          </div>
        </Form.Submit>
      </Form.Root>
    </div>
  );
}
