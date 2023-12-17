"use client";

import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

import { HorizontalSeparator } from "@/components/HorizontalSeparator";

const CollapsableSection: React.FC<{
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}> = ({ title, subtitle, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full">
      <div
        className="flex justify-between items-baseline text-white space-x-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col gap-2 items-baseline">
          <h1
            className={`mt-12 text-left font-bold text-2xl leading-relaxed font-sans ${
              isOpen ? "text-slate-500" : "text-white"
            }`}
          >
            {title}
          </h1>
          {!isOpen && <p className="text-gray-400 mt-3"> {subtitle}</p>}
        </div>

        <span>
          {isOpen ? (
            <ChevronUpIcon style={{ height: "1.6em", width: "1.8em" }} />
          ) : (
            <ChevronDownIcon style={{ height: "1.6em", width: "1.8em" }} />
          )}
        </span>
      </div>
      {!isOpen && <HorizontalSeparator />}
      {isOpen ? <div className="mt-7">{children}</div> : null}
    </div>
  );
};
export default CollapsableSection;
