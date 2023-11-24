import RadioGroupContainer from "@/components/RadioGroup/RadioGroupContainer";
import { useState } from "react";

interface IQuiz {
  questions: [{ question: string; wrong_answers: []; correct_answer: string }];
}

export default function Quiz({ questions }: IQuiz) {
  const [currentOption, setCurrentOption] = useState(0);
  const [radioGrpVal, setRadioGrpVal] = useState<any>(null);
  const [userAnswers, setUserAnswers] = useState<Array<any>>([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<
    Array<{ question: string; correctAnswer: string; userAnswer: string }>
  >([]);

  const handleNext = () => {
    if (currentOption < questions.length - 1) {
      setUserAnswers([...userAnswers, radioGrpVal]);

      // TODO: Rework, this looks like shit.
      if (radioGrpVal === questions[currentOption].correct_answer) {
        setCorrectAnswers(correctAnswers + 1);
      } else {
        setWrongAnswers([
          ...wrongAnswers,
          {
            question: questions[currentOption].question,
            correctAnswer: questions[currentOption].correct_answer,
            userAnswer: radioGrpVal,
          },
        ]);
      }
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
          {questions?.length} questions
        </h2>
      </div>

      <h2 className="text-slate-200 text-left mb-8">
        {questions[currentOption].question}
      </h2>

      <RadioGroupContainer
        options={[
          ...questions[currentOption].wrong_answers,
          questions[currentOption].correct_answer,
        ]}
        handleValueChange={(value: any) => {
          setRadioGrpVal(value);
        }}
        value={radioGrpVal}
      />
      <div className="flex flex-row justify-between mt-6 gap-2">
        <button
          onClick={() => {
            handlePrev();
          }}
          disabled={currentOption === 0}
          className={`text-yellow-500 rounded-lg w-20 text-center h-8 ${
            currentOption === 0 ? "opacity-50" : ""
          }`}
        >
          Prev
        </button>
        <button
          onClick={() => {
            console.log(wrongAnswers);
          }}
          className="bg-green-500 text-white rounded-full w-20 text-center h-8"
        >
          Submit
        </button>
        <button
          onClick={() => {
            handleNext();
            setRadioGrpVal(null);
          }}
          disabled={currentOption === questions.length - 1}
          className={`border-blue-500 text-blue-500 border-2 rounded-full w-20 text-center h-8 ${
            currentOption === questions.length - 1 ? "opacity-50" : ""
          }`}
        >
          Next
        </button>
      </div>

      <h2 className="text-gray-500 text-sm mb-3 mt-2 font-normal">
        Correct answers: {correctAnswers}
      </h2>
      {wrongAnswers.map((item, index) => (
        <div key={index} className="mt-12">
          <h2 className="text-red-500 text-sm mb-3 font-normal">
            Wrong answer for: {item.question}
          </h2>
          <h2 className="text-green-500 text-sm mb-3 font-normal">
            Correct answer is: {item.correctAnswer}
          </h2>
        </div>
      ))}
    </div>
  );
}
