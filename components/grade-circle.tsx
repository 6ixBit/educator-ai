"use client";

import CountingNumbers from "./counting-numbers";
import { motion } from "framer-motion";

export default function GradeCircle({ value }: { value: number }) {
  value = isNaN(value) ? 0 : value;
  let fillColor, strokeColor, textColor;
  if (value > 70) {
    fillColor = "#DCFCE7";
    strokeColor = "#22C55E";
    textColor = "text-green-500";
  } else if (value > 59) {
    fillColor = "#FFFAE5";
    strokeColor = "#F59E0B";
    textColor = "text-yellow-500";
  } else {
    fillColor = "#FEE2E2";
    strokeColor = "#EF4444";
    textColor = "text-red-500";
  }
  return (
    <div className="relative h-full w-full">
      <motion.svg
        className="absolute inset-0 m-auto"
        viewBox="0 0 100 100"
        width={35}
        height={35}
      >
        <motion.circle
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 2, ease: "easeOut" }}
          strokeWidth={7}
          strokeDasharray="0 1"
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          cx="50"
          cy="50"
          r="45"
          fill={fillColor}
          stroke={strokeColor}
        />
      </motion.svg>
      <CountingNumbers
        value={value}
        duration={2500}
        className={`absolute inset-0 mx-auto flex items-center justify-center font-display text-md ${textColor}`}
      />
    </div>
  );
}
