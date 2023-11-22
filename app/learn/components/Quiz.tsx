import RadioGroupContainer from "@/components/RadioGroup/RadioGroupContainer";
import { useState } from "react";

interface IQuiz {
  question: string;
  answers: string[];
}

export default function Quiz({ question, answers }: IQuiz) {
  const [currentOption, setCurrentOption] = useState(0);
  const [radioGrpVal, setRadioGrpVal] = useState<any>(null);

  const handleNext = () => {
    if (currentOption < answers.length - 1) {
      setCurrentOption(currentOption + 1);
    }
  };

  const handlePrev = () => {
    if (currentOption > 0) {
      setCurrentOption(currentOption - 1);
    }
  };

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

      <h2 className="text-slate-200 text-left mb-8">{question}</h2>

      <RadioGroupContainer
        options={answers || []}
        handleValueChange={(value: any) => {
          setRadioGrpVal(value);
        }}
        value={radioGrpVal}
      />

      <div className="flex flex-row justify-center mt-6">
        <button
          onClick={handleNext}
          disabled={currentOption === answers.length - 1}
          className={`bg-blue-500 text-white rounded-lg w-20 text-center h-8 ${
            currentOption === answers.length - 1 ? "opacity-50" : ""
          }`}
        >
          Next
        </button>
      </div>

      {/* {radioGrpVal && (
        <h1 className="mt-4 text-md text-lime-500">
          Your choice: {radioGrpVal}
        </h1>
      )} */}
    </div>
  );
}
