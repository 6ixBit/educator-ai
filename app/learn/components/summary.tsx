import { formatDate } from "@/utility";
interface ISummary {
  title: string;
  summary: string;
  date?: string;
}

export default function Summary({ title, summary, date }: ISummary) {
  return (
    <div className="flex flex-col items-start mt-6 ">
      <h1 className="text-white text-left font-bold mb-0 text-4xl leading-relaxed font-sans  sm:px-37">
        {title}
      </h1>

      <h2 className="text-gray-500 font-medium text-sm mb-3">
        {date ? formatDate(date) : ""}
      </h2>

      <p className="text-slate-300 font-medium leading-loose pt-2 sm:px-37">
        {summary}
      </p>
    </div>
  );
}
