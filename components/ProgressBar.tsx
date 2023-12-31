import { Progress } from "./ui/progress";
import React from "react";

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

  return <Progress value={progress} />;
};

export default ProgressBar;
