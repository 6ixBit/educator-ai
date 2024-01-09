import { Button } from "@/components/ui/button";

export function QuizRev({
  handleRetry,
  score,
}: {
  handleRetry: () => void;
  score: number;
}) {
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
          {score}/5
        </div>
      </div>
      <div className="space-y-6">
        <div className="flex flex-col bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">
            Question 1
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            What is the capital of Australia?
          </p>
          <div className="mt-2 text-green-600 font-semibold">
            Your answer: Canberra
          </div>
          <div className="mt-1 text-sm text-gray-500">
            Correct! Canberra is the capital of Australia.
          </div>
        </div>
        <div className="flex flex-col bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">
            Question 2
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Who wrote the novel '1984'?
          </p>
          <div className="mt-2 text-red-600 font-semibold">
            Your answer: Aldous Huxley
          </div>
          <div className="mt-1 text-sm text-gray-500">
            Incorrect. The novel '1984' was written by George Orwell.
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p className="text-lg font-semibold mb-2 dark:text-gray-100">
          Great job! You're almost there.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Keep practicing to improve your score!
        </p>
        <Button className="mt-4" onClick={handleRetry}>
          Try Again
        </Button>
      </div>
    </div>
  );
}
