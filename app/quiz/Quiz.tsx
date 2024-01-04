import { IQuestion, IWrongAnswer } from "./types";
import { useAddQuizPercentageScore, useIncrementQuizAttempt } from "./hooks";

import QuizReview from "./QuizReview";
import { RadioGroupContainer } from "@/components/RadioGroup";
import { useState } from "react";

interface IQuiz {
  questions: IQuestion[];
  uuid: string;
  attempts: number;
  current_scores: [];
}

const calcPercentage = (score: number, totalQuestions: number) => {
  return (score / totalQuestions) * 100;
};

export default function Quiz({
  questions,
  uuid,
  attempts,
  current_scores,
}: IQuiz) {
  if (!questions || questions.length === 0) {
    return null;
  }

  const [currentOption, setCurrentOption] = useState(0);
  const [radioGrpVal, setRadioGrpVal] = useState<any>(null);
  const [userAnswers, setUserAnswers] = useState<Array<string>>([]);
  const [wrongAnswers, setWrongAnswers] = useState<Array<IWrongAnswer>>([]);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const { mutate: mutateQuizAttempt } = useIncrementQuizAttempt();
  const { mutate: mutateQuizScore } = useAddQuizPercentageScore();

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

  const handleRetry = () => {
    setCurrentOption(0);
    setUserAnswers([]);
    setWrongAnswers([]);
    setIsQuizComplete(false);
  };

  return (
    <div className="mt-6 mb-4 w-full">
      <div className="flex justify-end flex-row items-baseline">
        <div className="flex flex-row gap-1">
          <h2 className="text-black text-md mb-3 font-normal">
            {currentOption + 1} /
          </h2>

          <h2 className="text-black text-sm mb-3 font-normal">
            {questions?.length} questions
          </h2>
        </div>
      </div>

      {isQuizComplete ? (
        <QuizReview
          questions={questions}
          wrongAnswers={wrongAnswers}
          handleRetry={handleRetry}
        />
      ) : (
        <>
          <h2 className="text-black text-left mb-8">
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
              className={`text-yellow-500 rounded-lg w-20 text-center cursor-pointer h-8 ${
                currentOption === 0 ? "opacity-50" : ""
              }`}
            >
              Prev
            </button>
            {currentOption === questions.length - 1 && (
              <button
                onClick={() => {
                  // Process the last answer
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
                  setUserAnswers([...userAnswers, radioGrpVal]);

                  // Calculate percentage
                  const correctAnswers =
                    questions.length -
                    wrongAnswers.length -
                    (isAnswerWrong ? 1 : 0);
                  const percentage = calcPercentage(
                    correctAnswers,
                    questions.length
                  );

                  // Mutate data
                  mutateQuizAttempt({
                    quiz_uuid: uuid,
                    current_attempts: attempts,
                  });
                  mutateQuizScore({
                    quiz_uuid: uuid,
                    current_scores: current_scores,
                    score: percentage,
                  });

                  // Set quiz as complete
                  setIsQuizComplete(true);
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
              className={`border-blue-500 text-blue-500 border-2 rounded-full w-20 text-center h-8 cursor-pointer ${
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

// TODO: Update Quiz score on project page.
// TODO: Show users average percentage on quiz test page.
// TODO: Take user to quiz button on quiz page.
// TODO: Show Key points on project page.
// TODO: Add practise counter for study cards.

// BONUS:
// TODO: Add delete button for Projects.
// TODO: Change color of flash cards back to green, handle large text scenario.
