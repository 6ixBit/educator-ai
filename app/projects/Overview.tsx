import { formatDate } from "@/utility";
import { Button } from "@radix-ui/themes";
import GradeCircle from "@/components/grade-circle";
import { EyeOpenIcon } from "@radix-ui/react-icons";

interface IOverview {
  title: string;
  date: any;
}

export default function Overview({ title, date }: IOverview) {
  const grade = 88;

  return (
    <div className="flex flex-col justify-start">
      <div className="flex flex-row gap-6 items-center">
        <h1 className="text-black text-left font-bold mb-0 text-2xl sm:text-4xl leading-relaxed font-sans pb-3">
          {title}
        </h1>

        <div className="w-12 h-12 ml-6 mb-4 sm:mb-0 sm:pl-0 xl:ml-28 2xl:ml-60">
          <GradeCircle value={grade} />
        </div>
      </div>

      <h2 className="text-gray-500 font-medium text-sm mb-1">
        {date ? formatDate(date) : ""}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2">
        <h2 className="text-gray-500 font-medium text-md mb-0">1.4k words</h2>

        <span className="pl-0 sm:pl-12 pt-4 sm:pt-0 xl:ml-24">
          <Button className="w-36">
            <EyeOpenIcon />
            View Original
          </Button>
        </span>
      </div>

      <div className="mt-16">
        <h1 className="text-slate-500 pb-2 text-lg font-bold">
          Teachers notes
        </h1>

        <div className="bg-white rounded-lg p-4">
          <h2 className="text-black">
            On review of your report card and consideration of your grade, I
            believe you are in a pretty good position to take an exam on this
            topic.
          </h2>
        </div>
      </div>

      <div className="mt-16">
        <h1 className="text-slate-500 pb-2 text-lg font-bold">
          Learning Checklist
        </h1>

        <div className="bg-white rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-black">Take Quiz</p>
            <Button radius="full" size="3"></Button>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-black">Study Flash Cards</p>
            <Button radius="full" size="3">
              Start{" "}
            </Button>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-black">Attempt a case study</p>
            <Button radius="full" size="3">
              Start{" "}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}