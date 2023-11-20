import React from "react";
import * as Progress from "@radix-ui/react-progress";

interface IProgress {
  initialProgress: number;
  end: boolean;
}

const ProgressBar = ({ initialProgress, end }: IProgress) => {
  const [progress, setProgress] = React.useState(initialProgress);

  React.useEffect(() => {
    if (end === true) {
      setProgress(100);
    } else {
      const timer1 = setTimeout(() => {
        setProgress(25);
      }, 700);

      const timer2 = setTimeout(() => {
        setProgress(45);
      }, 1300);

      const timer3 = setTimeout(() => {
        setProgress(60);
      }, 1300);

      const timer4 = setTimeout(() => {
        setProgress(75);
      }, 1900);

      const timer5 = setTimeout(() => {
        setProgress(90);
      }, 2200);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
        clearTimeout(timer5);
      };
    }
  }, [end]);

  return (
    <Progress.Root
      className="bg-black relative h-[15px] w-[200px] overflow-hidden rounded-full z-10"
      style={{
        // Fix overflow clipping in Safari
        // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
        transform: "translateZ(0)",
      }}
      value={progress}
    >
      <Progress.Indicator
        className="duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)] h-full w-full bg-white transition-transform"
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  );
};

export default ProgressBar;
