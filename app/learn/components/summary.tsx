import { formatDate } from "@/utility";
import { Text, Card } from "@radix-ui/themes";
interface ISummary {
  summary: string;
  keypoints: { title: string; key_point: string }[];
}

export default function Summary({ summary, keypoints }: ISummary) {
  return (
    <div className="flex flex-col items-start mt-6 ">
      <Card
        asChild
        style={{
          maxWidth: 550,
          maxHeight: 600,
          height: "auto",
          backgroundColor: "white",
          padding: ".5rem",
        }}
        variant="classic"
      >
        <Text color="gray" size="2">
          {summary.split(" ").slice(0, 120).join(" ")}
        </Text>
      </Card>

      <h1 className="text-white mt-12 mb-2 text-left font-bold text-2xl leading-relaxed font-sans sm:px-37">
        Key Points
      </h1>

      <p className="text-slate-300 font-medium leading-loose pt-2 sm:px-37 mb-4">
        Here are some crucial topics I have extracted, it would be beneficial
        for you to explore them so you can build your understanding.
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
