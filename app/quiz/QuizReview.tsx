import { IQuestion, IWrongAnswer } from "./types";

export default function QuizReview({
  wrongAnswers,
  questions,
  handleRetry,
}: {
  wrongAnswers: IWrongAnswer[];
  questions: IQuestion[];
  handleRetry: () => void;
}) {
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
          onClick={handleRetry}
        >
          Retry
        </button>
      </div>

      <div className="text-xl text-white mt-4">Result</div>

      {wrongAnswers.map((item, index) => (
        <div key={index} className="mt-6">
          <h2 className="text-black text-sm mb-3 font-normal">
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
}
