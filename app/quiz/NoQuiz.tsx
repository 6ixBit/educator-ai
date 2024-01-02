export default function NoQuiz() {
  return (
    <div className=" mb-4 w-full">
      <button
        className=" text-white rounded-full border-2  px-3 py-2 bg-green-400 "
        onClick={() => {
          console.log("generate quiz");
        }}
      >
        Generate Quiz
      </button>
    </div>
  );
}
