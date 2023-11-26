import { formatDate } from "@/utility";
interface ISummary {
  title: string;
  summary: string;
  date?: string;
  keypoints: { title: string; key_point: string }[];
}

export default function Summary({ title, summary, date, keypoints }: ISummary) {
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

      <h1 className="text-white mt-12 mb-6 text-left font-bold text-4xl leading-relaxed font-sans  sm:px-37">
        Key Points
      </h1>

      <p className="text-slate-300 font-medium leading-loose pt-2 sm:px-37 mb-4">
        Here are some crucial points I have extracted, it would be beneficial
        for you to explore them.
      </p>

      {keypoints?.map((keypoint, index) => (
        <div key={index} className="bg-gray-100 p-4 my-2 rounded-md ">
          <h2 className="text-black text-left font-bold mb-1 text-2xl leading-relaxed font-sans">
            {keypoint.title}
          </h2>
          <p className="text-gray-600 text-left font-light text-lg leading-relaxed">
            {keypoint.key_point}
          </p>
        </div>
      ))}
    </div>
  );
}
