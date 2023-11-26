import React, { useState } from "react";
import HorizontalSeparator from "@/components/HorizontalSeparator/HorizontalSeparator";
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
        <div className="flex flex-col gap-2">
          <h1 className="text-white mt-12  text-left font-bold text-2xl leading-relaxed font-sans ">
            {title}
          </h1>
          <p className="text-gray-400 mt-3"> {subtitle}</p>
        </div>

        <span>{isOpen ? "👆" : "👇"}</span>
      </div>
      {!isOpen && <HorizontalSeparator />}
      {isOpen ? (
        <div>{children}</div>
      ) : (
        <div className="opacity-50 overflow-hidden h-5 text-white">
          {children}
        </div>
      )}
    </div>
  );
};
export default CollapsableSection;
