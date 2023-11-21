import RadioGroupContainer from "@/components/RadioGroup/RadioGroupContainer";
import { useState } from "react";

interface IQuiz {
  question: string;
  answers?: string[];
}

export default function Quiz({ question, answers }: IQuiz) {
  const [radioGrpVal, setRadioGrpVal] = useState<any>(null);

  return (
    <div className="mt-12 mb-4 w-full">
      <div className="flex justify-between flex-row items-baseline">
        <h1 className="text-white text-left pb-1 font-bold mb-3 text-2xl leading-relaxed">
          Quiz
        </h1>

        <h2 className="text-gray-500 text-sm mb-3 font-normal">
          {answers?.length} questions
        </h2>
      </div>

      <RadioGroupContainer
        question={question}
        options={answers || []}
        handleValueChange={(value: any) => {
          setRadioGrpVal(value);
        }}
        value={radioGrpVal}
      >
        {radioGrpVal && (
          <h1 className="mt-4 text-md text-lime-500">
            Your choice: {radioGrpVal}
          </h1>
        )}
      </RadioGroupContainer>
    </div>
  );
}
