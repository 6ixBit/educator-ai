interface ISummary {
  title: string;
  summary: string;
}

export default function Summary({ title, summary }: ISummary) {
  return (
    <div className="flex flex-col items-start mt-6 lg:w-7/12">
      <h1 className="text-white text-left font-bold mb-2 text-2xl leading-relaxed font-sans  sm:px-37">
        {title}
      </h1>

      <p className="text-gray-500 font-medium leading-loose pt-2 sm:px-37">
        {summary}
      </p>
    </div>
  );
}
