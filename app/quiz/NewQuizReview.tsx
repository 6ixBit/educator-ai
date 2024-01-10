import { Button } from "@/components/ui/button";

interface QuizRevProps {
  handleRetry: () => void;
  score: number;
  results: {
    question: string;
    correctAnswer: string;
    userAnswer: string;
    isCorrect: boolean;
  }[];
}

export function QuizRev({ handleRetry, score, results }: QuizRevProps) {
  return (
    <div className="max-w-2xl w-full sm:w-3/4 lg:w-1/2 xl:w-1/3 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-100">
        Quiz Review
      </h1>
      <div className="flex items-center justify-center mb-8">
        <h2 className="text-lg font-semibold dark:text-gray-100">
          Your Score:
        </h2>
        <div className="ml-2 text-3xl font-bold text-primary-500">
          {score}/{results.length}
        </div>
      </div>
      <div className="space-y-6">
        {results.map((result, index) => (
          <div
            key={index}
            className="flex flex-col bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
          >
            <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">
              Question {index + 1}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {result.question}
            </p>
            <div
              className={`mt-2 font-semibold ${
                result.isCorrect ? "text-green-600" : "text-red-600"
              }`}
            >
              Your answer: {result.userAnswer || "No answer provided"}
            </div>
            {!result.isCorrect && (
              <div className="mt-1 text-sm text-gray-500">
                Correct answer: {result.correctAnswer}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <p className="text-lg font-semibold mb-2 dark:text-gray-100">
          Great job! You're almost there.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Keep practicing to improve your score!
        </p>
        <Button className="mt-6" onClick={handleRetry}>
          Try Again
        </Button>
      </div>
    </div>
  );
}
