interface ISummary {
  title: string;
  summary: string;
}

export default function Summary({ title, summary }: ISummary) {
  return (
    <div className="flex flex-col items-center mt-16 text-center">
      <h1 className="text-white font-bold mb-2 text-2xl leading-relaxed font-sans">
        {title}
      </h1>

      <p className="text-gray-500 font-medium leading-loose">{summary}</p>
    </div>
  );
}
