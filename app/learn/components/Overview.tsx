interface IOverview {
  title: string;
}

export default function Overview({ title }: IOverview) {
  const grade = 88;

  return (
    <div className="flex flex-col justify-start">
      <div className="flex flex-row gap-6 items-baseline">
        <h1 className="text-white text-left font-bold mb-0 text-4xl leading-relaxed font-sans  sm:px-37">
          {title}
        </h1>

        <p
          className={`text-sm flex justify-center items-center text-center rounded-full border-2 p-2 h-10 ${
            grade < 50
              ? "text-red-500 border-red-500"
              : grade < 70
              ? "text-yellow-500 border-yellow-500"
              : "text-green-500 border-green-500"
          }`}
        >
          {grade}
        </p>
      </div>

      <h2 className="text-gray-500 font-medium text-md mb-1">1.4k words</h2>

      <h2 className="text-white mt-4">
        On review of your report card and consideration of your grade, I believe
        you are in a pretty good position to take an exam on this topic.
      </h2>
    </div>
  );
}
