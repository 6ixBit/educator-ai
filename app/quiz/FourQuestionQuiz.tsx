import { useAddQuizPercentageScore, useIncrementQuizAttempt } from "./hooks";
import { useEffect, useState } from "react";

import { IQuestion } from "./types";
import { QuizRev } from "./NewQuizReview";

interface IQuiz {
  questions: IQuestion[];
  uuid: string;
  attempts: number;
  current_scores: [];
}

export function FourQuestionQuiz({
  questions,
  uuid,
  attempts,
  current_scores,
}: IQuiz) {
  if (!questions || questions.length === 0) {
    return null;
  }

  const { mutate: mutateQuizAttempt } = useIncrementQuizAttempt();
  const { mutate: mutateQuizScore } = useAddQuizPercentageScore();

  const [quizFinished, setQuizFinished] = useState(false);
  const [currentOption, setCurrentOption] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    new Array(questions.length).fill("")
  );
  const [shuffledAnswers, setShuffledAnswers] = useState<string[][]>([]);

  useEffect(() => {
    const shuffled = questions.map((question) => {
      const allAnswers = [...question.wrong_answers, question.correct_answer];
      return allAnswers.sort(() => Math.random() - 0.5);
    });
    setShuffledAnswers(shuffled);
  }, [questions]);

  const isLastQuestion = currentOption === questions.length - 1;

  const handleAnswerSelection = (answer: string) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentOption] = answer;
    setSelectedAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentOption(currentOption + 1);
    }
  };

  const handlePrevious = () => {
    if (currentOption > 0) {
      setCurrentOption(currentOption - 1);
    }
  };

  const handleRetry = () => {
    setCurrentOption(0);
    setSelectedAnswers(new Array(questions.length).fill(""));

    const shuffled = questions.map((question) => {
      const allAnswers = [...question.wrong_answers, question.correct_answer];
      return allAnswers.sort(() => Math.random() - 0.5);
    });
    setShuffledAnswers(shuffled);
    setQuizFinished(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correct_answer ? 1 : 0);
    }, 0);
  };

  const getResults = () => {
    return questions.map((question, index) => ({
      question: question.question,
      correctAnswer: question.correct_answer,
      userAnswer: selectedAnswers[index],
      isCorrect: question.correct_answer === selectedAnswers[index],
    }));
  };

  const calcPercentage = (score: number, totalQuestions: number) => {
    return (score / totalQuestions) * 100;
  };

  if (quizFinished) {
    const score = calculateScore();
    const results = getResults();

    return (
      <div className="flex justify-center">
        <QuizRev handleRetry={handleRetry} score={score} results={results} />
      </div>
    );
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl/none md:max-w-3xl">
          {questions[currentOption].question}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-2xl mt-12 px-2 sm:pr-0">
        {shuffledAnswers[currentOption]?.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelection(answer)}
            className={`border-2 ${
              selectedAnswers[currentOption] === answer
                ? "border-blue-500 bg-blue-100 text-blue-800"
                : "border-gray-300 bg-gray-100 text-gray-800"
            } rounded-md p-4 lg:w-full w-11/12 hover:bg-blue-500 hover:text-white transition-colors duration-200`}
          >
            {answer}
          </button>
        ))}
      </div>

      <div className="flex justify-between w-full max-w-2xl mt-10">
        <button
          onClick={handlePrevious}
          className="border-2 border-yellow-500 bg-yellow-100 text-yellow-800 rounded-md p-4 hover:bg-yellow-500 hover:text-white transition-colors duration-200"
          disabled={currentOption === 0}
        >
          Previous
        </button>
        {isLastQuestion ? (
          <button
            onClick={() => {
              mutateQuizAttempt({
                quiz_uuid: uuid,
                current_attempts: attempts,
              });
              mutateQuizScore({
                quiz_uuid: uuid,
                current_scores: current_scores,
                score: calcPercentage(calculateScore(), questions.length),
              });

              setQuizFinished(true);
            }}
            className="border-2 border-gray-500 bg-gray-100 text-gray-800 rounded-md p-4 hover:bg-gray-500 hover:text-white transition-colors duration-200"
          >
            Finish
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="border-2 border-green-500 bg-green-100 text-green-800 rounded-md p-4 hover:bg-green-500 hover:text-white transition-colors duration-200"
          >
            Next
          </button>
        )}
      </div>
    </section>
  );
}
