export default function NoQuiz() {
  return (
    <div className="mt-12 mb-4 w-full">
      <h1 className="text-white text-left pb-1 font-bold mb-3 text-2xl leading-relaxed">
        No Quiz Available
      </h1>

      <button
        className="border text-black"
        onClick={() => {
          console.log("generate quiz");
        }}
      >
        Generate Quiz
      </button>
    </div>
  );
}
