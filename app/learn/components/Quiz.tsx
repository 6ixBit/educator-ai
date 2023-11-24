import RadioGroupContainer from "@/components/RadioGroup/RadioGroupContainer";
import { useState } from "react";

interface IQuiz {
  questions: IQuestion[];
}

interface IQuestion {
  question: string;
  wrong_answers: string[];
  correct_answer: string;
}

interface IWrongAnswer {
  question: string;
  correctAnswer: string;
  userAnswer: string;
}

export default function Quiz({ questions }: IQuiz) {
  const [currentOption, setCurrentOption] = useState(0);
  const [radioGrpVal, setRadioGrpVal] = useState<any>(null);
  const [userAnswers, setUserAnswers] = useState<Array<string>>([]);
  const [wrongAnswers, setWrongAnswers] = useState<Array<IWrongAnswer>>([]);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const handleNext = () => {
    if (currentOption < questions.length - 1) {
      setUserAnswers([...userAnswers, radioGrpVal]);

      const isAnswerWrong =
        radioGrpVal !== questions[currentOption].correct_answer;
      if (isAnswerWrong) {
        const wrongAnswer = {
          question: questions[currentOption].question,
          correctAnswer: questions[currentOption].correct_answer,
          userAnswer: radioGrpVal,
        };
        setWrongAnswers([...wrongAnswers, wrongAnswer]);
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

        <div className="flex flex-row gap-1">
          <h2 className="text-slate-300 text-sm mb-3 font-normal">
            {currentOption + 1} /
          </h2>

          <h2 className="text-gray-500 text-sm mb-3 font-normal">
            {questions?.length} questions
          </h2>
        </div>
      </div>

      {isQuizComplete ? (
        <QuizReview questions={questions} wrongAnswers={wrongAnswers} />
      ) : (
        <>
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
            {currentOption === questions.length - 1 && (
              <button
                onClick={() => {
                  setUserAnswers([...userAnswers, radioGrpVal]);

                  const isAnswerWrong =
                    radioGrpVal !== questions[currentOption].correct_answer;
                  if (isAnswerWrong) {
                    const wrongAnswer = {
                      question: questions[currentOption].question,
                      correctAnswer: questions[currentOption].correct_answer,
                      userAnswer: radioGrpVal,
                    };

                    setWrongAnswers([...wrongAnswers, wrongAnswer]);
                    setIsQuizComplete(true);
                  }
                }}
                className="bg-green-500 text-white rounded-full w-20 text-center h-8"
              >
                Submit
              </button>
            )}

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
        </>
      )}
    </div>
  );
}
const QuizReview = ({
  wrongAnswers,
  questions,
}: {
  wrongAnswers: IWrongAnswer[];
  questions: IQuestion[];
}) => {
  const score = questions.length - wrongAnswers.length;

  return (
    <>
      {(() => {
        const percentage = (score / questions.length) * 100;
        let colorClass = "";
        let emoji = "";

        if (percentage < 30) {
          colorClass = "text-red-500";
          emoji = "😢";
        } else if (percentage < 70) {
          colorClass = "text-yellow-500";
          emoji = "😐";
        } else {
          colorClass = "text-green-500";
          emoji = "😄";
        }
        return (
          <h2
            className={`${colorClass} text-center text-xl mb-3 mt-7 font-mono`}
          >
            You scored {score} out of {questions.length} {emoji}
          </h2>
        );
      })()}
      <div className="flex justify-center">
        <button
          className="bg-yellow-500 text-white rounded-full w-20 text-center h-8 mt-2"
          onClick={() => {
            console.log("Retry.");
          }}
        >
          Retry
        </button>
      </div>

      <div className="text-xl text-white mt-4">Result</div>

      {wrongAnswers.map((item, index) => (
        <div key={index} className="mt-6">
          <h2 className="text-slate-300 text-sm mb-3 font-normal">
            Q: {item.question}
          </h2>

          <div className="flex flex-row justify-between">
            <h2 className="text-red-500 text-sm mb-3 font-normal pl-8">
              Your answer
            </h2>
            <h2 className="text-green-500 text-sm mb-3 font-normal pl-8">
              Correct answer
            </h2>
          </div>
          <div className="flex flex-row justify-between">
            <h2 className="text-red-500 text-sm mb-3 font-normal pl-8">
              {item.userAnswer}
            </h2>
            <h2 className="text-green-500 text-sm mb-3 font-normal pl-8 text-center">
              {item.correctAnswer}
            </h2>
          </div>
        </div>
      ))}
    </>
  );
};
